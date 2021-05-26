const fs = require("fs-extra");

(async function build() {
  //Publish no cdn production
  var buildFiles = Object.assign(await fs.readdir("./dist/FormWebComponent"));

  var manifest = {
    entrypoints: [],
  };

  buildFiles.forEach((file) => {
    file.split(".").pop().match("js|css") &&
      (manifest.entrypoints = [
        ...manifest.entrypoints,
        {
          url: `http://localhost:9002/app-formulario/static/${file}`,
          type: file.split(".").pop().match(/js/) ? "script" : "link",
        },
      ]);
  });

  buildFiles.files = buildFiles
    .filter((f) => f !== "assets" && f !== "svg")
    .map((s) => "./dist/FormWebComponent/" + s);
  Object.values(manifest).map((item) => console.log(item));

  await fs.ensureDir(
    "C:\\Users\\leo_g\\source\\ui\\app-ionic\\microfrontend-cdn-server\\src\\app-formulario\\static"
  );
  buildFiles.files.forEach(async (f) => {
    await fs.outputFile(
      `C:\\Users\\leo_g\\source\\ui\\app-ionic\\microfrontend-cdn-server\\src\\app-formulario\\static\\${
        f.split("/")[3]
      }`,
      await fs.readFile(f)
    );
  });

  //Publish no checkout
  await fs.ensureDir(
    "C:\\Users\\leo_g\\source\\ui\\app-ionic\\microfrontend-cdn-server\\src\\app-formulario"
  );
  await fs.outputFile(
    "C:\\Users\\leo_g\\source\\ui\\app-ionic\\microfrontend-cdn-server\\src\\app-formulario\\app-formulario-manifest.json",
    JSON.stringify(manifest)
  );
})();
