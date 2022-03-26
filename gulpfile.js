const gulp = require("gulp");
// const uglify = require('gulp-uglify');
const ts = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require("sass"));
const tsProject = ts.createProject("tsconfig.json");

/**
 * Transpile typescript to javascript
 * @param cb: gulp task callback
 */
function buildTypescript(cb) {
  //  TODO: Add uglify and prevent to generate d.ts
  //  https://www.typescriptlang.org/docs/handbook/gulp.html#browserify
  const result = gulp
    .src("./ts/**/*.ts")
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./js"));
  cb();
  return result;
}

/**
 * Transpile scss to css
 * @param cb: gulp callback
 */
function buildScss(cb) {
  const result = gulp
    .src("./scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass.sync({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./css"));
  cb();
  return result;
}

gulp.task("default", gulp.parallel(buildTypescript, buildScss));

gulp.task("watch", () => {
  gulp.watch("./ts/**/*.ts", buildTypescript);
  gulp.watch("./scss/**/*.scss", buildScss);
});
