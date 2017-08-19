const RamlParser = require('raml-1-parser');
const Fs = require('fs-extra');
const Builders = require('./Builders');


class RamlToSlate {
  static async convert(ramlPath, outputPath = './slate.md') {
    const api = await RamlParser.load(ramlPath);

    // Build the header
    let header = await Builders.buildHeader(api);
    await Fs.outputFile(outputPath, header);

    // Then the documentation
    let docs = await Builders.buildDocumentation(api)
    await Fs.appendFile(outputPath, docs);

    // Then the resources
    let resources = await Builders.buildResources(api)
    await Fs.appendFile(outputPath, resources);
  }
}


module.exports = RamlToSlate