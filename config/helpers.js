var path = require('path');

// Helper functions
var _root = path.resolve(__dirname, '..');

console.log('root directory:', root());

function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

function isWebpackDevServer() {
  return process.argv[1] && !! (/webpack-dev-server$/.exec(process.argv[1]));
}

exports.hasProcessFlag = hasProcessFlag;
exports.root = root;
exports.isWebpackDevServer = isWebpackDevServer;
