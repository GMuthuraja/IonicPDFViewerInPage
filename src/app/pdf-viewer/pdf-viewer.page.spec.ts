import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PdfViewerPage } from './pdf-viewer.page';

describe('PdfViewerPage', () => {
  let component: PdfViewerPage;
  let fixture: ComponentFixture<PdfViewerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfViewerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PdfViewerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
