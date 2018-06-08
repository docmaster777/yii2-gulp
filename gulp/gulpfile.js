var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		less           = require('gulp-less'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		ftp            = require('vinyl-ftp'),
		notify         = require("gulp-notify"),
		rsync          = require('gulp-rsync');
		smartgrid      = require('smart-grid');

// gulp.task('browser-sync', function() {
//     browserSync({
//         server: {
// 			proxy: "pasadena.loc"
//         },
//         notify: false,
//         // tunnel: true,
//         // tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
//     });
// });

gulp.task('less', function () {
    gulp.src('app/less/main.less')
        .pipe(less())
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleanCSS()) // Опционально, закомментировать при отладке
        // .pipe(cleanCSS())
        .pipe(gulp.dest('../web/css'))
});

gulp.task('watch', ['less'], function() {
    gulp.watch('app/less/main.less', ['less']);
});

/* It's principal settings in smart grid project */
gulp.task('smartgrid', function() {
    var settings = {
        outputStyle: 'less', /* less || scss || sass || styl */
        columns: 12, /* number of grid columns */
        offset: '10px', /* gutter width px || % */
        mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
        container: {
            maxWidth: '960px', /* max-width оn very large screen */
            fields: '5px'    /* side fields */
        },
        breakPoints: {
            // lg: {
            //     width: '1100px', /* -> @media (max-width: 1100px) */
            // },
            // md: {
            //     width: '960px'
            // },
            sm: {
                width: '780px',
                fields: '5px', /* set fields only if you want to change container.fields */
                offset: '5px'
            },
            xs: {
                width: '560px'
            }
			/*
			 We can create any quantity of break points.

			 some_name: {
			 width: 'Npx',
			 fields: 'N(px|%|rem)',
			 offset: 'N(px|%|rem)'
			 }
			 */
        }
    };
    smartgrid('app/less/', settings);
});


gulp.task('default', ['watch']);



