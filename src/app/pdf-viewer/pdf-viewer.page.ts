import { Component, OnInit } from '@angular/core';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.page.html',
  styleUrls: ['./pdf-viewer.page.scss'],
})

export class PdfViewerPage implements OnInit {

  erroText: any;
  pdfSrc: any;

  constructor(
    private transfer: FileTransfer,
    private file: File,
    private router: Router,
    private androidPermissions: AndroidPermissions) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.pdfSrc = this.router.getCurrentNavigation().extras.state.url;
    }
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
