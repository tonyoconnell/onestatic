/*
Scripts
--------- 
Build your scripts 
*/

   gulp.task('script', function () {
    gulp.src(['../build/scripts/one.js','../build/scripts/plugins/**/*.js', '!../build/scripts/**/*.min.js'])
    .pipe(plumber())
    .pipe(changed(scripts + '**/*.js'))
    .pipe(prettify({config: '.jsbeautifyrc', mode: 'VERIFY_AND_WRITE'}))
    .pipe(jshint())
    .pipe(jshint.reporter('default')) 
    .pipe(concat('one.js'))
    .pipe(gulp.dest(server_scripts))
    .pipe(uglify())
    gulp.src(['../build/scripts/libraries/*.js'])
    .pipe(gulp.dest(server_scripts))
    .pipe(browsersync.reload({stream: true}))
    .pipe(size())
    .pipe(notify({message: 'Scripts Optimised'}));
});
