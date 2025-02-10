'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true,
});

const fs = require('fs');
const path = require('path');
const stripJsonComments = require('./strip-json-comments');
const _ = require('lodash');

class TransformPages {
  constructor({ includes, pagesJsonDir }) {
    this.includes = includes;
    this.uniPagesJSON = this.readPagesJSON(pagesJsonDir);
    this.routes = this.getPagesRoutes().concat(this.getSubPackagesRoutes());
    this.tabbar = this.getTabbarRoutes();
    this.routesMap = this.transformPathToKey(this.routes);
  }

  readPagesJSON(pagesPath) {
    const extname = path.extname(pagesPath);
    if (extname === '.js') {
      delete require.cache[pagesPath];
      return require(pagesPath);
    }
    const content = fs.readFileSync(pagesPath, 'utf-8');
    return JSON.parse(stripJsonComments(content));
  }

  getPagesRoutes(pages = this.uniPagesJSON.pages, rootPath = null) {
    let routes = [];
    for (let i = 0; i < pages.length; i++) {
      const item = pages[i];
      let route = {};
      for (let j = 0; j < this.includes.length; j++) {
        const key = this.includes[j];
        let value = item[key];
        if (key === 'path') {
          value = rootPath ? `/${rootPath}/${value}` : `/${value}`;
        }
        if (key === 'aliasPath' && i == 0 && rootPath == null) {
          route[key] = route[key] || '/';
        } else if (value !== undefined) {
          route[key] = value;
        }
      }
      routes.push(route);
    }
    return routes;
  }

  getSubPackagesRoutes() {
    if (!(this.uniPagesJSON && this.uniPagesJSON.subPackages)) {
      return [];
    }
    const subPackages = this.uniPagesJSON.subPackages;
    let routes = [];
    for (let i = 0; i < subPackages.length; i++) {
      const subPages = subPackages[i].pages;
      const root = subPackages[i].root;
      const subRoutes = this.getPagesRoutes(subPages, root);
      routes = routes.concat(subRoutes);
    }
    return routes;
  }

  getTabbarRoutes() {
    if (!(this.uniPagesJSON && this.uniPagesJSON.tabBar && this.uniPagesJSON.tabBar.list)) {
      return [];
    }
    const tabbar = this.uniPagesJSON.tabBar.list;
    let tabbarMap = [];
    tabbar.forEach((bar) => {
      tabbarMap.push('/' + bar.pagePath);
    });
    return tabbarMap;
  }

  transformPathToKey(list) {
    if (!_.isArray(list) || _.isEmpty(list)) {
      return [];
    }
    let map = {};
    list.forEach((i) => {
      map[i.path] = i;
    });
    return map;
  }
}

function uniReadPagesV3Plugin({ pagesJsonDir, includes }) {
  let defaultIncludes = ['path', 'aliasPath', 'name'];
  includes = [...defaultIncludes, ...includes];
  let pages = new TransformPages({
    pagesJsonDir,
    includes,
  });
  return {
    name: 'uni-read-pages-v3',
    config(config) {
      return {
        define: {
          ROUTES: pages.routes,
          ROUTES_MAP: pages.routesMap,
          TABBAR: pages.tabbar,
        },
      };
    },
  };
}

module.exports = uniReadPagesV3Plugin;
