module.exports = {
  common: {
    paths: require("../../config/common/paths.json")
  },
  nodeModules: {
    autoPrefixer: require("../../config/nodeModules/auto-prefixer.json"),
    browserSync: require("../../config/nodeModules/browser-sync.json"),
    jade: require("../../config/nodeModules/jade.json"),
    jshint: require("../../config/nodeModules/jshint.json"),
    jsonServer: {
      db: require("../../config/nodeModules/json-server/db.json")
    },
    sass: require("../../config/nodeModules/sass.json"),
    svgSprite: require("../../config/nodeModules/svg-sprite.json")
  },
  tasks: {
    api: require("../../config/tasks/api.json"),
    clean: require("../../config/tasks/clean.json")
  }
};
