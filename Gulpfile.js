// call node modules
const { watch, src, dest, series } = require("gulp");
const gulp = require("gulp"),
	sass = require("gulp-sass")(require("sass")),
	rename = require("gulp-rename"),
	jsmin = require("gulp-terser"),
	imgmin = require("gulp-imagemin"),
	cssmin = require("gulp-clean-css"),
	prefixer = require("gulp-autoprefixer"),
	concat = require("gulp-concat"),
	live = require("browser-sync").create(),
	postcss = require("gulp-postcss"),
	tailwind = require("tailwindcss"),
	ts = require("gulp-typescript");

// create files and dests vars
const sassFiles = "./src/sass/**/*.sass",
	sassDest = "./dist/css";
const htmlFiles = "./*.html",
	htmlDest = "./dist";
const tsFiles = "./src/scripts/**/*.ts",
	tsDest = "./dist/js";
const imgFiles = "./src/imgs/**/*",
	imgDest = "./dist/imgs";

// create tasks function
const sassFunction = function () {
	return src(sassFiles, { sourcemaps: true })
		.pipe(sass())
		.pipe(postcss([tailwind("./tailwind.config.js")]))
		.pipe(prefixer("last 7 versions"))
		.pipe(dest(sassDest));
};
const cssminFunction = function () {
	return src("./dist/css/main.css")
		.pipe(cssmin())
		.pipe(rename("all.min.css"))
		.pipe(dest(sassDest));
};
const jsminFunction = function () {
	return src("dist/js/*.js")
		.pipe(jsmin())
		.pipe(rename("all.min.js"))
		.pipe(gulp.dest("dist/js/all.min.js"));
};

const tsFunction = function () {
	return gulp
		.src(tsFiles)
		.pipe(
			ts({
				noImplicitAny: true,
			})
		)
		.pipe(gulp.dest(tsDest));
};

const htmlFunction = function () {
	return src(htmlFiles).pipe(dest(htmlDest));
};

const imgminFunction = function () {
	return src("dist/imgs/**/*").pipe(imgmin()).pipe(dest(imgDest));
};
var imgFunction = function () {
	return src(imgFiles).pipe(dest(imgDest));
};
const minFunction = function () {
	return jsminFunction(), cssminFunction(), imgminFunction();
};
var serverFunction = function (cb) {
	live.init({
		server: {
			baseDir: "./dist",
		},
	});
	cb();
};
var sync = function (cb) {
	live.reload();
	cb();
};

var watchFunction = function () {
	gulp.watch("./*.html", series(htmlFunction, sassFunction, sync));
	gulp.watch(sassFiles, series(sassFunction, sync));
	gulp.watch(tsFiles, series(tsFunction, sync));
	gulp.watch(imgDest, series(imgFunction, sync));
	gulp.watch("./dist/**/*", sync);
};

// create tasks
exports.sass = sassFunction;
exports.ts = tsFunction;
exports.jsmin = jsminFunction;
exports.cssmin = cssminFunction;
exports.min = minFunction;
exports.img = imgFunction;
exports.server = serverFunction;
exports.watch = watchFunction;

// default gulp task
exports.default = series(
	htmlFunction,
	sassFunction,
	tsFunction,
	imgFunction,
	serverFunction,
	watchFunction
);
