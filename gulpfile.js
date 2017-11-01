const gulp = require('gulp');
const babel = require('gulp-babel');
const minify = require('gulp-minify');
const path = require('path');
const getFolderSize = require('get-folder-size');
const downloadGithubRelease = require('download-github-release');
const mkdirp = require('mkdirp');
const del = require('del');
const archiver = require('archiver');
const fs = require('fs');
const moment = require('moment');

gulp.task('transpile', ['clean'], () => {
    return gulp.src('src/**/*.js')
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(gulp.dest(path.join(process.cwd(), 'dist')));
});

gulp.task('clean', () => {
    return del([path.join(process.cwd(), 'dist/**')]);
});

gulp.task('calculateSize', ['minify'], (done) => {
    getFolderSize(path.join(process.cwd(), 'dist'), /phaser.js/g, (error, distSize) => {
        getFolderSize(path.join(process.cwd(), 'assets'), (error, assetSize) => {
            console.log(`Size: ${((distSize + assetSize) / 1024.0).toFixed(2)} KB`);
            done();
        });
    });
});

gulp.task('minify', ['transpile'], () => {
    return gulp.src('dist/**/*.js')
        .pipe(minify({
            ext: { min: '.js' },
            noSource: true,
            preserveComments: () => false,
            ignoreFiles: ['phaser.js']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['minify', 'calculateSize'], () => {
    const destination = path.join(process.cwd(), 'dist');
    console.log(`Successfully build project to ${destination}`);
});

gulp.task('pack', ['build'], (done) => {
    const zip = archiver('zip');

    const directories = ['dist', 'assets', 'libs'];
    const files = ['index.html'];

    const now = moment();

    const destination =path.join(process.cwd(), 'artifacts', now.format('YYYY'), now.format('MM'), now.format('DD'));
    mkdirp.sync(destination);

    const output = fs.createWriteStream(path.join(destination, `${now.format('YYYY-MM-DD_HH-mm-ss')}_artifact.zip`));

    zip.on('error', error => console.error(error));
    zip.pipe(output);

    directories.forEach((directory) => zip.directory(path.join(process.cwd(), directory), directory));
    files.forEach((file) => {
        const stream = fs.readFileSync(path.join(process.cwd(), file));
        zip.append(stream, { name: file });
    });

    zip.finalize((error, bytes) => {
        if (error) {
            return console.error(`Error while packing archive ${error}`);
        }

        console.log(`Packed archive. Size ${bytes}`);
    });
});

gulp.task('updatePhaser', () => {
    const destination = path.join(process.cwd(), 'libs');

    mkdirp.sync(destination);
    return downloadGithubRelease('photonstorm', 'phaser-ce', destination, () => true, asset => asset.name === 'phaser.js')
        .then(() => console.log('Downloaded latest phaser artifact'));
});