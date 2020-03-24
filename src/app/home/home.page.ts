import { Component } from '@angular/core';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  erroText: any;

  constructor(
    private transfer: FileTransfer,
    private file: File,
    private androidPermissions: AndroidPermissions) { }

  onSubmit() {
    this.erroText = '';
  }

  onError(error) {
    this.erroText = error;
  }

  getPermission() {
    this.androidPermissions.hasPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
      .then(status => {
        if (status.hasPermission) {
          this.savePDF();
        } else {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
            .then(status => {
              if (status.hasPermission) {
                this.savePDF();
              }
            });
        }
      });
  }

  savePDF() {
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(this.pdfSrc, this.file.externalRootDirectory + 'Download/' + 'pdfviewer_sample.pdf').then(result => {
      alert("File Downloaded Successfully");
    }).catch(error => {
      console.log(error, 'Error while downloading the file');
    });
  }
}
