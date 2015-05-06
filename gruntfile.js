module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({

    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 0                   
        },        
        files: {"css/styles.css":  
        [ "less/reset.less", 
          "less/header.less", 
          "less/footer.less", 
          "less/styles.less", 
          "less/fancybox.less"
          ] 
        }
      }
    },
    watch: {
        styles: {
          files: ['less/*', 'pages/*.html', 'js/*.js','js/analytics/min/*.js','js/analytics/config/*.js'], 
          tasks: ['less:development'],
          options: {
            nospawn: true,
            livereload: true
          }
        }
    }
    
  });

  grunt.registerTask('default', ['less', 'watch']);
};
