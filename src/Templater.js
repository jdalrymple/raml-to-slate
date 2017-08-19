const Fs = require('fs');
const Path = require('path');

const TemplateFolderPath = Path.resolve(__dirname,'../templates/')
const SectionTemplatePath = Path.join(TemplateFolderPath, 'sections')
const LanguageTemplatePath = Path.join(TemplateFolderPath, 'languages')

const SectionTemplates = {
  header: Path.resolve(SectionTemplatePath,'Header.ejs'),
  documentation: Path.join(SectionTemplatePath,'Documentation.ejs'),
  resource: Path.resolve(SectionTemplatePath,'Resource.ejs')
}

const LanguageTemplates = {
  javascript: Path.resolve(SectionTemplatePath,'Javascript.ejs'),
  // ruby: loadTemplate('languages/ruby.ejs'),
  // python: loadTemplate('languages/python.ejs')
  // bash: loadTemplate('languages/bash.ejs')
  // curl: loadTemplate('languages/bash.ejs')
}

module.exports = {
  SectionTemplates,
  LanguageTemplates
}