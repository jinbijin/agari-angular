import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { ExcelExportConfiguration } from './excel-export-configuration.type';
import { ExcelExportDirective } from './excel-export.directive';
import { ExcelExportService } from './excel-export.service';

describe('ExcelExportDirective', () => {
  let page: Page;
  let excelExport: ExcelExportServiceStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent, ExcelExportDirective],
      providers: [
        {
          provide: ExcelExportService,
          useFactory: () => new ExcelExportServiceStub()
        }
      ]
    }).compileComponents();

    excelExport = TestBed.inject(ExcelExportService);

    page = new Page(TestBed.createComponent(TestHostComponent));
  });

  it('should create', () => {
    page.host.config = {
      data: [],
      filename: 'testfile',
      sheetname: 'testsheet'
    };
    page.detectChanges();

    expect(page.root).toBeTruthy();
  });

  it('should send config to ExcelExportService', () => {
    page.host.config = {
      data: [],
      filename: 'testfile',
      sheetname: 'testsheet'
    };
    const excelExportMock = jest.fn();
    excelExport.exportExcel = excelExportMock;
    page.detectChanges();

    page.button.click();
    page.detectChanges();

    expect(excelExportMock.mock.calls).toEqual([
      [{ data: [], filename: 'testfile', sheetname: 'testsheet' }]
    ]);
  });

  it('should not send empty data to ExcelExportService', () => {
    const excelExportMock = jest.fn();
    excelExport.exportExcel = excelExportMock;
    page.detectChanges();

    page.button.click();
    page.detectChanges();

    expect(excelExportMock.mock.calls).toEqual([]);
  });
});

class Page extends PageBase<TestHostComponent> {
  public get root(): ExcelExportDirective {
    return this.component(ExcelExportDirective);
  }

  public get host(): TestHostComponent {
    return this.component();
  }

  public get button(): HTMLElement {
    return this.query<HTMLElement>('button');
  }
}

@Component({
  template: `
    <button [agariExcelExport]="config">Test</button>
  `
})
class TestHostComponent {
  public config: ExcelExportConfiguration;
}

class ExcelExportServiceStub {
  public exportExcel: (config: ExcelExportConfiguration) => void;
}
