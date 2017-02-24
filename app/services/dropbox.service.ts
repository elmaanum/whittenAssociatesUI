import {Injectable} from '@angular/core';

@Injectable()
export class DropBoxService {
    private _Dropbox = require('dropbox');
    private dbx = new this._Dropbox({accessToken: 'WxhNEEnJHygAAAAAAAAGLoPVg1_2nScbMl6_FNpxOewoRgNf3q3uzkoneRVy5N2s'});

    getFileList() {
        return this.dbx.filesListFolder({path: '', recursive: true, include_media_info: true})
    }

    getThumbNails(result) {
        console.log("filelist", result)
        var array = [];
        for (var i = 0; result.entries[i]; i++) {
            if (result.entries[i]['media_info']) {
                this.dbx.filesGetThumbnail({path: result.entries[i].path_lower, size:'w1024h768'})
                .then(function (data) {
                    //console.log("filesGetThumbnail", data)
                    var urlCreator = window.URL;
                    var imageUrl = urlCreator.createObjectURL(data.fileBlob);
                    var folderName = data.path_display.split('/')[1];
                    array.push({imageUrl:imageUrl,folderName:folderName})
                    //array.push({folderName:folderName})
                })
                .catch(function (err) {
                    throw err;
                });
            }
        }
        console.log('array',array)

        return array
    }

    getTemporaryDownloadLink(result) {
        var array = [];
        for (var i = 0; result.entries[i]; i++) {
            if (result.entries[i]['.tag'] === 'file') {
                this.dbx.filesGetTemporaryLink({path: result.entries[i].path_lower})
                .then(function (data) {
                    //console.log("filesGetTemporaryLink", data)
                    array.push(data)
                })
                .catch(function (err) {
                    throw err;
                });
            }
        }
        return array
    }

    getDropBox() {
        return this.getFileList().then( result => {
            var thumbnails = this.getThumbNails(result)
            var tempDLObjectsArray = this.getTemporaryDownloadLink(result)
            console.log('tempDLObjectsArray',tempDLObjectsArray)
            return thumbnails
        });
    }

}