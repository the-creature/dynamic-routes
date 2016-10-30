const converter = require('./converter');

module.exports = function(source) {
  if(typeof source == 'string'){
    source = JSON.parse(source);
  }

  const {root, notFound, containers, sections} = source;
  converter.setContainersDirectory(containers);

  const rootRoute = converter.makeRoute({
    path: '/',
    container: root,
  });
  const notFoundRoute = converter.makeRoute({
    path: '*',
    container: notFound
  });

  const result = `{childRoutes:[${rootRoute}]}`;
  const compiledSections = [];

  for (const id in sections) {
    if(!sections.hasOwnProperty(id)) continue;

    const subRoutes = sections[id].map(converter.makeRoute).join(',');
    compiledSections.push(`"${id}": [${subRoutes}]`);
  }

  return `module.exports = function(section){
    const sections = {${compiledSections.join(',')}};
    const routes = ${result};
    
    routes.childRoutes[0].getChildRoutes = function getChildRoutes(partialNextState, callback) {
      require.ensure([], function (require) {
        const current = sections[section] || []; 
        current.push(${notFoundRoute});
       
        callback(null, current);
      });
    };
    
    return routes;
  };`;
};