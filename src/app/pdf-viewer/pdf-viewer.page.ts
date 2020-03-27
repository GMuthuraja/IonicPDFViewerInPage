import { Component, OnInit } from '@angular/core';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

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
    private platform: Platform,
    private androidPermissions: AndroidPermissions) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.pdfSrc = this.router.getCurrentNavigation().extras.state.url;
    }
  }

  onError(error) {
    this.erroText = error;
  }

  viewPDF() {
    if (this.platform.is('android')) {
      this.checkPermission();
    } else {
      this.savePDF();
    }
  }

  checkPermission() {
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
    let path = (this.file.externalRootDirectory || this.file.dataDirectory);
    fileTransfer.download(this.pdfSrc, path + 'Download/' + 'pdfviewer_sample.pdf').then(result => {
      alert("File Downloaded Successfully");
    }).catch(error => {
      console.log(error, 'Error while downloading the file');
    });
  }
}
