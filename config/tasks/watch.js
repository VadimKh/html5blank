var gulp = require('gulp');
var _ = require('underscore');
var watch = require('gulp-watch');
var config = require('../config');

gulp.task('syncExcludedFolder', function(){
    _.each(config.excludeFolders, function(folder) {
        gulp.src(config.themeDistributive + '/' + folder + '/**/*').pipe(gulp.dest(config.themePath + '/' + folder));
    });
});

gulp.task('sync', function(){
    return gulp.src(config.themeDistributive + '/*')
        .pipe(gulp.dest(config.themePath));
});


gulp.task('watch', ['browserSync'], function () {
    _.each(config.css.preprocessors, function(preprocessor) {
        var path = [];
        _.each(preprocessor.prefix, function (pref) {
            path.push(config.css.distPath + '/**/*.' + pref);
        });

        watch(path, function(){
            gulp.start([preprocessor.preProcessor]);
        });
    });

    watch(config.js.src, function(){ gulp.start(['scripts']) });
    watch(config.img.src, function(){ gulp.start(['images']) });

    watch(config.themeDistributive + '/*', function(){ gulp.start(['sync']) });
    _.each(config.excludeFolders, function(folder) {
        watch(config.themeDistributive + '/' + folder + '/**/*', function(){ gulp.start(['syncExcludedFolder']) });
    });
});
