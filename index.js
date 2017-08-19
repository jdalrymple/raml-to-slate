const RamlToSlate = require('./src/RamlToSlate');

// module.exports = () => new RamlToSlate();

RamlToSlate.convert('./index.raml')
.then(console.log)