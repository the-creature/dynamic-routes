let containersDirectory = '';

function requireContainer(route) {
  const path = resolve(containersDirectory, route.container);
  return `require('${path}').default`;
}

function makeRoute(route) {
  return `{
    path: '${route.path}',
    getComponents: ${componentDefinition(route)},
    ${defineChildrenIfExists(route)}
  }`
}

function childDefinition(route) {
  const subRoutes = route.child.map(r => {
    const item = r;
    item.container = resolve(route.container, r.container);
    item.path = resolve(route.path, r.path);

    return makeRoute(item);
  });

  return `function getChildRoutes(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, [${subRoutes.join(',')}])
    })
  }`;
}

function segmentDefinition(route) {

}

function defineChildrenIfExists(route) {
  if(!route.child && !route.segments) return '';

  return `getChildRoutes: `+ (route.child? childDefinition(route): segmentDefinition(route))
}

function componentDefinition(route) {
  return `function getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, ${requireContainer(route)})
    })
  }`
}

function resolve(parent, route) {
  return [parent, route]
    .join('/')
    .replace(/\/\//gm, '/');
}

function setContainersDirectory(path) {
  containersDirectory = path;
}

module.exports = {
  makeRoute,
  resolve,
  componentDefinition,
  setContainersDirectory,
};