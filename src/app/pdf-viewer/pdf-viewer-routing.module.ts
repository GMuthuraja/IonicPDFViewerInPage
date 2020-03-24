import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PdfViewerPage } from './pdf-viewer.page';

const routes: Routes = [
  {
    path: '',
    component: PdfViewerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PdfViewerPageRoutingModule {}
