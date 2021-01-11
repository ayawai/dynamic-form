const { override } = require("react-app-rewired");
const paths = require("react-scripts/config/paths");
const path = require("path");

paths.appBuild = path.join(path.dirname(paths.appBuild), 'view');
