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


gulp.task('blog', function (cb) {
  var
    tpl = fs.readFileSync('../build/templates/blank.jade'),
    jadeTpl = pureJade.compile(tpl),
    renderPost = map(function(code, filename) {
      // .attributes .body
      var parsed = frontMatter(String(code)),
          data = parsed.attributes,
          body = parsed.body;

      body = marked.parse(body);

      data.content = body;
      data.filename = filename;

      return jadeTpl(data);
    });

  return gulp.src('../build/words/*.md')
    .pipe(renderPost)
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest('../server/'))
});