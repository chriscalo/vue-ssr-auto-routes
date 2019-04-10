const fs = require("fs");
const path = require("path");
const { generateRoutes } = require("vue-route-generator");

const code = generateRoutes({
  pages: path.join(__dirname, "./pages"),
});

writeFileSyncRecursive(path.join(__dirname, "./router/routes.js"), code);

// from https://gist.github.com/drodsou/de2ba6291aea67ffc5bc4b52d8c32abd
// like writeFileSync but creates all folder paths if not exist
// ----------------------------------------------------------
function writeFileSyncRecursive(filename, content, charset) {
  // create folder path if not exists
  filename
    .split("/")
    .slice(0, -1)
    .reduce((last, folder) => {
      let folderPath = last ? last + "/" + folder : folder;
      if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
      return folderPath;
    });
  
  fs.writeFileSync(filename, content, charset);
}
