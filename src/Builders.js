const Ejs = require('ejs');
const { SectionTemplates, LanguageTemplates } = require('./Templater');
const Utils = require('./Utils');
const Promise = require('bluebird');
const HttpStatusCodes = require("http-status-codes")

function buildRequestSamples(method, endpoint, addGenericSamples = false) {
  let samples = []
  let extraSamples = []
  let languages = []

  if (method.annotations && method.annotations.codeSamples) {
    samples = method.annotations.codeSamples.structuredValue;
  }

  if (addGenericSamples) {
    languages = samples.map((sample) => sample.lang);

    extraLanguages = languages.filter((lang) => !languagesFound.includes(lang));

    for (let lang of extraLanguages) {
      let request = {
        url: endpoint,
        method: method.method,
      }

      if (method.queryParameters) request.qs = method.queryParameters;
      if (method.body) request.body = method.body;
      if (method.header) request.headers = method.header;

      usages.push({
        lang: lang,
        source: Ejs.render(LanguageTemplates[lang], request)
      });
    }
  }

  return samples.concat(extraSamples);
}

function buildResponseSamples(responses) {
  if (!responses) return [];

  let samples = [];

  for (let code of Object.keys(responses)) {
    for (let sample of Object.keys(responses[code].body)) {
      samples.push({
        statusCode: code,
        statusText: HttpStatusCodes.getStatusText(code),
        lang: sample.replace('application/', ''),
        source: JSON.stringify(responses[code].body[sample].examples[0].value,null,2)
      })
    }
  }

  return samples
}

function getResponseDescription(responses){
  if(!responses) return '';

  return responses[Object.keys(responses)[0]].description
}

function buildRequestParameters(method, uriParameters) {
  let ups = []
  let qps = []
  let bps = []

  // Uri parameters
  if(uriParameters){
   for (let param of Object.values(uriParameters)) {
      ups.push({
        name: param.name,
        type: param.type[0],
        default: param.default,
        description: param.description,
        required: param.required,
      })
    }
  }

  // Query parameters
  if(method.queryParameters){
    for (let param of Object.values(method.queryParameters)) {
      qps.push({
        name: param.name,
        type: param.type[0],
        default: param.default,
        description: param.description,
        required: param.required,
      })
    }
  }

  // Body Parameters
  if(method.body){
   for (let param of Object.values(method.body)) {
      bps.push({
        name: param.name,
        type: param.type[0],
        default: param.default,
        description: param.description,
        required: param.required,
      })
    }
  }

  return [ups, qps, bps]
}

function buildDocumentation(api) {
  return renderFilePromise(SectionTemplates.documentation, { documentation: api.specification.documentation })
}

function buildHeader(api) {
  const headerData = {
    languages: ['javascript', 'bash'],
    title: api.specification.title,
    allowSearch: true,
    tocFooters: [],
    includes: [],
  }

  return renderFilePromise(SectionTemplates.header, headerData)
}

async function buildResources(api) {
  let renderedPromises =  Utils.traverseResources(api, (resource) =>
    renderFilePromise(SectionTemplates.resource, buildResource(resource))
  );


  let resolved = await Promise.all(renderedPromises)  

  return resolved.join(' ');
}

function buildResource(resource) {  
  const resourceData = {
    title: resource.displayName,
    methods: []
  }

  for (let method of Object.values(resource.methods)) {
    let [qps, ups, bps] = buildRequestParameters(method, resource.uriParameters);
    let resourceMethod = {
      displayName: method.displayName,
      method: method.method,
      endpoint: resource.completeRelativeUri,
      requestDescription: method.description,
      requestSamples: buildRequestSamples(method, resource.completeRelativeUri),
      responseSamples: buildResponseSamples(method.responses),
      responseDescription: getResponseDescription(method.responses),
      qps,
      ups,
      bps,
      // rps
    }

    resourceData.methods.push(resourceMethod)
  }

  return resourceData;
}

function renderFilePromise(file, object) {
  return new Promise((resolve, reject) => {
    Ejs.renderFile(file, object, (error, string) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(string);
    });
  });
}

module.exports = {
  buildResources,
  buildHeader,
  buildDocumentation,
}