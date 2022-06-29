const gulp = require('gulp'),
	browserSync = require('browser-sync'),
	sass = require('gulp-sass')(require('sass')),
	cleanCss = require('gulp-clean-css'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
	// imagemin = require('gulp-imagemin'),
	htmlmin = require('gulp-htmlmin');

gulp.task('server', () => {
	browserSync({
		server: {
			baseDir: "dist"
		}
	});

	gulp.watch("src/*.html").on('change', browserSync.reload);
})

gulp.task('styles', function () {
	return gulp.src("src/scss/**/*.+(scss|sass)")
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(rename({ suffix: '.min', prefix: '' }))
		.pipe(autoprefixer())
		.pipe(cleanCss({ compatibility: 'ie8' }))
		.pipe(gulp.dest("dist/css"))
		.pipe(browserSync.stream());
});

gulp.task('scripts', function () {
	return gulp.src("src/js/**/*.js")
		.pipe(gulp.dest("dist/js"));
});

gulp.task('watch', function () {
	gulp.watch("src/scss/**/*.+(scss|sass|css)", gulp.parallel('styles'));
	gulp.watch("src/*.html").on('change', gulp.parallel('html'));
	gulp.watch('src/js/**/*.js').on('change', gulp.parallel('scripts'));
	gulp.watch('src/img/**/*').on('change', gulp.parallel('images'));
	gulp.watch('src/icons/**/*').on('change', gulp.parallel('icons'));
});

gulp.task('html', function () {
	return gulp.src("src/*.html")
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest("dist/"));
});

gulp.task('fonts', function () {
	return gulp.src("src/font/**/*")
		.pipe(gulp.dest("dist/font"));
});

gulp.task('images', function () {
	return gulp.src("src/img/**/*")
		// .pipe(imagemin())
		.pipe(gulp.dest("dist/img"));
});

gulp.task('icons', function () {
	return gulp.src("src/icons/**/*")
		.pipe(gulp.dest("dist/icons"));
});


gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'fonts', 'images', 'icons'));
