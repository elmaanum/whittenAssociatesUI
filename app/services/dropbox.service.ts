import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class DropBoxService {
    private _Dropbox = require('dropbox');
    private dbx = new this._Dropbox({accessToken: 'WxhNEEnJHygAAAAAAAAGLoPVg1_2nScbMl6_FNpxOewoRgNf3q3uzkoneRVy5N2s'});
    private thumbnails = [];

    constructor() {}

   getThumbnails(){ 
        console.log('get.thumbnails',this.thumbnails)
        return this.thumbnails
    }

    setThumbnails(){
        // new Promise((resolve, reject)=> {
            console.log('set.thumbnails',this.thumbnails)

            let promises = []
            this.getFileList()
            .then(result => {
                result.entries.forEach(element => {
                    
                    if (element['media_info']) {
                        var thumbPromise = this.dbx.filesGetThumbnail({path: element.path_lower, size:'w1024h768'})
                        promises.push(thumbPromise)
                    }
                })
            })
            .then(result => {
                Observable.forkJoin(promises)
                .subscribe(t => {
                    let thumbNails=[];
                    for (var key in t) {
                        if (t.hasOwnProperty(key)) {
                            var element = t[key];
                            this.thumbnails.push({
                                imageUrl:window.URL.createObjectURL(element['fileBlob']),
                                folderName:element['path_display'].split('/')[1]
                            })
                        }
                    }
                    console.log('set.thumbnails',this.thumbnails)

                    // resolve(thumbNails)
                })
            })
        // })
    }

    getFileList() {
        return this.dbx.filesListFolder({path: '', recursive: true, include_media_info: true})
    }
    
    // temporarily unused

    // getThumbNailInfo(result) {
    //     return new Observable(observer => {
    //         for (var i = 0; result.entries[i]; i++) {
    //             if (result.entries[i]['media_info']) {
    //                 this.dbx.filesGetThumbnail({path: result.entries[i].path_lower, size:'w1024h768'})
    //                 .then(function (data) {
    //                     observer.next(data)
    //                 })
    //                 .catch(function (err) {
    //                     throw err;
    //                 });
    //             }
    //         }
    //     })
    // }

    // setThumbnailsOld() {
    //     return new Promise((resolve, reject)=> {
    //         let filelist = this.getFileList();
    //         let thumbnailinfo = filelist.then(result => {
    //             return this.getThumbNailInfo(result)
    //         })
    //         .then(result =>{            
    //             result.forEach(value => {
    //                 this.thumbnails.push({
    //                     imageUrl:window.URL.createObjectURL(value['fileBlob']),
    //                     folderName:value['path_display'].split('/')[1]
    //                 })
    //             })
    //         })
    //         resolve(this.thumbnails)
    //     })
    // }

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

    // getThumbs(){
    //     return new Promise((resolve, reject)=> {

    //         this.setThumbnails().then(result=>{
    //             resolve(result)
    //         })
    //     })
    // }
}



// export const THUMBNAILS = new DropBoxService().getThumbs()