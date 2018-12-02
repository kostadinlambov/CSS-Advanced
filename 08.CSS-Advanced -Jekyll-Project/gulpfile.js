var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var $ = require('gulp-load-plugins')();

var path = {
	SCSS_SRC	: './scss/**/*.scss',
	SCSS_DST	: './css',
	CSS_JKDST	: './docs/css',
	HTML_SRC	: ['./*.html','./_posts/*.*','./_layouts/*.*', './_includes/*.*'],
}

gulp.task('scss', function () {
	
	gulp.src( path.SCSS_SRC )
	.pipe($.sourcemaps.init())
	.pipe($.sass())
	.pipe($.autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
	.pipe($.size({ showFiles: true }))
	// minify scss
	.pipe($.csso())
	.pipe($.size({ showFiles: true }))
	.pipe($.sourcemaps.write('map'))
	.pipe(gulp.dest( path.SCSS_DST ))
	.pipe(gulp.dest( path.CSS_JKDST ))
	.pipe(browserSync.stream({ match: '**/*.css' }))
	;
	
});

// jekyll build
gulp.task('jekyll', function () {
	require('child_process').exec('bundle exec jekyll build --baseurl=', {stdio: 'inherit'}, function(){
		browserSync.reload();
	});
});



// jekyll serve
gulp.task('serve', function() {
	
	//browserSync.init({
		//proxy: {
			//target: "http://127.0.0.1:4000/"
		//}
	//});
	
	//browserSync.init({
		//server: {
			//baseDir: "./docs/"
		//}
	//});
	
	gulp.watch(path.SCSS_SRC, ['scss', 'jekyll']);
	// gulp.watch(path.SCSS_SRC, ['scss']);
	//gulp.watch(path.HTML_SRC, ['jekyll']);
	gulp.watch(path.HTML_SRC).on('change', browserSync.reload);
	
});

gulp.task('default', ['scss','jekyll','serve']);

// SCSS + build 

gulp.task('build', function () {
	require('child_process').exec('bundle exec jekyll build', {stdio: 'inherit'}, function(){
		browserSync.reload();
	});
});

// gulp.task('serveNew', function () {
// 	require('child_process').exec('bundle exec jekyll serve', {stdio: 'inherit'}, function(){
// 		browserSync.reload();
// 	});
// });

gulp.task('defaultGit', ['scss','build']);