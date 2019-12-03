var gulp 		= require('gulp'),
	sass 		= require("gulp-sass"),
	browserSync = require('browser-sync'),
	concat		= require('gulp-concat'),
	uglify		= require('gulp-uglifyjs'),
	cssnano		= require('gulp-cssnano'),
	rename		= require('gulp-rename'),
	del			= require('del'),
 	imagemin    = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
	cache       = require('gulp-cache'), // Подключаем библиотеку кеширования
	autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавл

gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.sass')
			.pipe(sass())
			.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true}))
			.pipe(gulp.dest('app/css'))
			.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('scripts', function(){
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/bootstrap/js/modal.min.js',
		'app/libs/owl-carousel/owl.carousel.js'
		])
	.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
	.pipe(uglify()) // Сжимаем JS файл
	.pipe(gulp.dest('app/js/'));
});

gulp.task('css-min', ['sass'], function(){
	return gulp.src('app/css/main.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'))
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({ // Сжимаем их с наилучшими настройками
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        })))
        .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

// task of clining /dest
gulp.task('clean', function(){
	return del.sync('dist');
});

gulp.task('watch', ['browser-sync', 'sass', 'scripts', 'css-min' ], function(){
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['sass', 'scripts'], function(){
	var buildCss = gulp.src('app/css/main.min.css')
		.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/js/*.html')
		.pipe(gulp.dest('dist'))
});

gulp.task('default', ['watch']);
gulp.task('clear', function () {
    return cache.clearAll();
})

// gulp.watch('watch-files', ['task1', 'task2']);

// *.sass - выбирает все файлы, имеющие определенное расширение (в данном случае, .sass) в корневой папке проекта.
// **/*.js - выбирает все файлы с расширением .js во всех папках проекта.
// !header.sass - исключает файл из общей выборки
// *.+(scss|sass) - задает комплексный шаблон для нескольких типов файлов, разделенных вертикальной чертой. В данном примере в выборкупопадут любые sass и scss файлы в корне проекта.

// _part-1.sass
// @import to main file
// Обратите внимание, что при импорте в Sass простых CSS файлов библиотек, расширение файла .css не указывается.
