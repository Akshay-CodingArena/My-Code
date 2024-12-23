const fs = require("fs");
const { execSync } = require("child_process");
const cssnano = require("cssnano");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const terser = require("terser");
// const { PurgeCSS } = require("purgecss");

async function minifyCss(filePath) {
  filePath = "build/css/" + filePath;
  try {
    // const minifiedContent = execSync(`npx postcss ${filePath}`).toString();
    const fileContent = fs.readFileSync(filePath, "utf8");
    // ,cssnano
    const minifiedContent = await postcss([
      autoprefixer({ browsers: "last 2 versions" }),
      cssnano,
    ])
      .process(fileContent)
      .then((result) => {
        result.warnings().forEach((warn) => {
          console.warn(warn.toString());
        });
        return result.css;
      });
    // const minifiedContent = await postcss([
    //   cssnano

    // ])
    //   .process(fileContent, { from: filePath })
    //   .then(result => result.css);
    // console.log("--------------MinifiedCOntent", minifiedContent,"---------MinifiedEnd-------------")
    fs.writeFileSync(`${filePath}`, minifiedContent, "utf8");
    // execSync(`npx postcss ${filePath} > ${filePath.split(".")[0]+"test.css"}`);
    // const fileContent = fs.readFileSync(filePath, 'utf8');
    // console.log("///////////////////////////////////////////filePath", filePath)
    // console.log("yahoo",CleanCSS)
    // const minifiedContent = new CleanCSS({ version: '4.2.1' }).minify(fileContent, {
    //   output: {
    //     comments: false,
    //   },
    // });
    // fs.writeFileSync(filePath, minifiedContent.code, 'utf8');
    // console.log(`Minified: ${filePath}`);
  } catch (error) {
    console.error(`Error minifying: ${filePath}`);
    console.error(error);
  }
}

async function minifyJs(filePath) {
  filePath = "build/js/" + filePath;
  try {
    // const minifiedContent = execSync(`npx postcss ${filePath}`).toString();
    if (filePath) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      // ,cssnano
      console.log(filePath, "-----------");
      if (fileContent) {
        const minifiedContent = terser.minify(fileContent, {
          output: {
            comments: false,
          },
        });

        // console.log("Minified content is",minifiedContent)
        //     console.log("Content Minified", minifiedContent ,minifiedContent.code)
        fs.writeFileSync(`${filePath}`, minifiedContent.code, "utf8");
      }
    }
  } catch (error) {
    console.error(`Error minifying: ${filePath}`);
    console.error(error);
  }
}

// async function cleanCss() {
//   const cleanerCss = await new PurgeCSS().purge({
//     content: ["./build/index.html", "./build/static/js/*.js"],
//     css: ["./build/css/new.css"],
//   });
//   console.log("usedCcssss", cleanerCss);
//   fs.writeFileSync(`build/newCSS.css`, cleanerCss[0].css, "utf8");
//   console.log("usedCcssss", cleanerCss);
// }

// Specify the CSS files to minify
const cssFiles = [
  "build/css/*.css", // Adjust this path based on your build output
  // Add more paths if needed
];

console.log("Running Post Script");
const files = fs.readdirSync("build/css");
files.forEach(minifyCss);
const jsFiles = fs.readdirSync("build/js");
jsFiles.forEach(minifyJs);
// cleanCss();
