const gulp = require('gulp');
const less = require('gulp-less');
const watch = require('gulp-watch');
const clean = require('gulp-clean');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');

const paths = {
	html: 'src/*.html',
	mainJs: 'src/inc/js/main.js',
	allSrcJs: 'src/inc/js/*.js',
	allDistJs: 'dist/inc/js',
	allSrcStyles: 'src/inc/css/*',
	allDistStyles: 'dist/inc/css',
};

gulp.task('clean', () => {
	return gulp.src('dist/*', { read: false }).pipe(clean());
});

gulp.task('watch', () => {
	gulp.watch(paths.html, gulp.parallel('watchHTML'));
	gulp.watch(paths.allSrcStyles, gulp.parallel('moveStyles'));
	gulp.watch(paths.mainJs, gulp.parallel('watchJs'));
});

// tasks для watching
gulp.task('watchHTML', () => gulp.src(paths.html));
//gulp.task('watchStyles', () => gulp.src(paths.allSrcStyles));
gulp.task('watchJs', () => gulp.src(paths.mainJs));

// tasks для переноса в продакшн
gulp.task('moveHTML', async () => {
	return gulp.src(paths.html).pipe(gulp.dest('dist'));
});
gulp.task('moveStyles', async () => {
	return gulp
		.src(paths.allSrcStyles)
		.pipe(less())
		.pipe(gulp.dest(paths.allDistStyles));
});
gulp.task('moveScripts', async () => {
	return gulp
		.src(paths.allSrcJs)
		.pipe(
			babel({
				presets: [['@babel/preset-env']],
			})
		)
		.pipe(gulp.dest(paths.allDistJs));
});

// gulp.task('default', gulp.parallel('watchHTML', 'watchStyles', 'watchJs', 'watch'));
gulp.task(
	'build',
	gulp.series('clean', 'moveHTML', 'moveStyles', 'moveScripts')
);
