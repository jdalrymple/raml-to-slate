const _ = require('lodash');

function traverseRAML(parent, node, callback) {
  let outputs = [];
  let output = callback(parent);

  if (output) outputs.push(output);

  // Recursive call this function for all subresources
  if (parent[node]) {
    parent[node].forEach((child) => {
      outputs.push(traverseRAML(child, node, callback));
    });
  }

  return outputs;
}

function traverseResources(api, callback) {
  let output = []

  for (resource of api.specification.resources) {
    output.push(traverseRAML(resource, 'resources', callback))
  }

  return _.flattenDeep(output)
}

module.exports = {
  traverseResources
}