import { Component } from '@angular/core';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

  constructor(private router: Router) { }

  onSubmit() {
    if (this.pdfSrc) {
      let navigationExtras: NavigationExtras = {
        state: {
          url: this.pdfSrc
        }
      };

      this.router.navigate(['pdf-viewer'], navigationExtras);
    }
  }
}
