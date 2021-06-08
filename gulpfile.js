var gulp  =require('gulp');
var $ = require('gulp-load-plugins')();
var autoprefixer = require('autoprefixer');
var mainBowerFiles = require('main-bower-files');
var browserSync = require('browser-sync').create();
var minimist = require('minimist');


var envOptions = {
  sting: 'env',
  default: {env: 'develop'}
}

var options = minimist(process.argv.slice(2), envOptions)


gulp.task('copyAssets',function () {
  return gulp.src('./source/assets/**')
  .pipe(gulp.dest('./public/'))
})

gulp.task('clean', function () {
  return gulp.src(['./.tmp','./public'], {
    read: false,
    allowEmpty:true
  })
    .pipe($.clean());
});

gulp.task('pug',function () {
  // return gulp.src(['./source/**/*.pug','./source/views/**/*.pug'])
  return gulp.src('./source/views/**/*.pug')
    .pipe($.plumber())
    .pipe($.pug({
      pretty: true
    }))
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.stream())
})


gulp.task('sass', function () {
  return gulp.src('./source/sass/**/*.sass')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    // 編譯完成
    .pipe($.postcss([autoprefixer()]))
    .pipe($.if(options.env==='production',$.cleanCss()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream())
});

gulp.task('babel', () =>
    gulp.src('./source/js/**/*.js')
        .pipe($.sourcemaps.init())
        .pipe($.babel({
            presets: ['@babel/env']
        }))
        // .pipe($.concat('all.js'))
        .pipe($.if(options.env==='production',$.uglify({
          compress: {
            drop_console: false
          }
        })))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('./public/js'))
        .pipe(browserSync.stream())
);

gulp.task('vendorJs',function () {
  return gulp.src('./.tmp/vendors/**/*.js')
    .pipe($.concat('vendors.js'))
    .pipe($.if(options.env==='production',$.uglify()))
    .pipe(gulp.dest('./public/js'))
});

gulp.task('image-min',function () {
  return gulp.src('./source/assets/images/*')
  .pipe($.if(options.env==='production',$.imagemin()))
  .pipe(gulp.dest('./public/images'))
})

gulp.task('browser-sync', function() {
  return browserSync.init({
    server: {
      baseDir: "./public",
      // reloadDebounce: 2000 //重新整理的間隔必須超過 2 秒
    }
  });
});

gulp.task('deploy', function() {
  return gulp.src('./public/**/*')
    .pipe($.ghPages());
});

gulp.task('watch', function () {
  gulp.watch('./source/sass/**/*.sass', gulp.series('sass'));
  gulp.watch('./source/js/**/*.js', gulp.series('babel'));
  gulp.watch('./source/**/*.pug', gulp.series('pug'));
  // gulp.watch('./source/**/*.jade', gulp.series('jade'));
});

gulp.task('build',
  gulp.series(
    'clean',
    'vendorJs',
    gulp.parallel('copyAssets','pug', 'sass', 'babel','image-min')));
// gulp.task('build', gulp.series(gulp.series('clean','jade','sass','babel','bower','vendorJs')))

// gulp.task('default', gulp.series('pug','sass','babel','bower','vendorJs','image-min',gulp.parallel('browser-sync','watch')))

gulp.task('default',
  gulp.series(
    'clean',
    'vendorJs',
    gulp.parallel('copyAssets','pug', 'sass', 'babel','image-min'),
    function(done) {    
      browserSync.init({
        server: {
          baseDir: "./public",
          reloadDebounce: 2000 //重新整理的間隔必須超過 2 秒
        }
      });
      
      gulp.watch('./source/assets/**', gulp.series('copyAssets'));
      gulp.watch('./source/sass/**/*.sass', gulp.series('sass'));
      gulp.watch('./source/js/**/*.js', gulp.series('babel'));
      gulp.watch('./source/**/*.pug', gulp.series('pug'));

      done();
    }
    
  )
);