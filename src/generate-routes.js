const fse = require("fs-extra");
const path = require("path");
const { generateRoutes } = require("vue-route-generator");

const code = generateRoutes({
  pages: path.join(__dirname, "./pages"),
});

fse.outputFileSync(path.join(__dirname, "./router/routes.js"), code);
