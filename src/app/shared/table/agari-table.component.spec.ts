import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatHeaderCellHarness,
  MatHeaderRowHarness,
  MatRowHarness
} from '@angular/material/table/testing';
import { TableConfiguration } from 'src/app/instrumentation/data/table-configuration.type';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { AgariTableComponent } from './agari-table.component';

describe('AgariTableComponent', () => {
  let page: Page;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, AgariTableComponent],
      imports: [MatTableModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    page = new Page(TestBed.createComponent(TestHostComponent));
  });

  it('should create', () => {
    page.hostComponent.tableConfiguration = {
      dataSource: new MatTableDataSource<any>(),
      columns: []
    };
    page.detectChanges();

    expect(page.rootComponent).toBeTruthy();
  });

  it('should have default settings', async () => {
    page.hostComponent.tableConfiguration = {
      dataSource: new MatTableDataSource<any>([{ name: 'test' }]),
      columns: [{ id: 'test', header: 'Test', cell: element => element.name }]
    };
    page.detectChanges();

    const headerRows = await page.loader.getAllHarnesses(MatHeaderRowHarness);
    expect(headerRows.length).toEqual(1);
    const headerCells = await page.loader.getAllHarnesses(MatHeaderCellHarness);
    expect(headerCells.length).toEqual(1);
    const rows = await page.loader.getAllHarnesses(MatRowHarness);
    expect(rows.length).toEqual(1);
  });

  it('should have optional headers', async () => {
    page.hostComponent.tableConfiguration = {
      dataSource: new MatTableDataSource<any>([{ name: 'test' }]),
      headers: false,
      columns: [{ id: 'test', cell: element => element.name }]
    };
    page.detectChanges();

    const headerRows = await page.loader.getAllHarnesses(MatHeaderRowHarness);
    expect(headerRows.length).toEqual(0);
    const headerCells = await page.loader.getAllHarnesses(MatHeaderCellHarness);
    expect(headerCells.length).toEqual(0);
    const rows = await page.loader.getAllHarnesses(MatRowHarness);
    expect(rows.length).toEqual(1);
  });

  it('should have optional columns', async () => {
    page.hostComponent.tableConfiguration = {
      dataSource: new MatTableDataSource<any>([{ name: 'test' }]),
      columns: [
        {
          id: 'test',
          header: 'Test',
          cell: element => element.name,
          displayed: false
        }
      ]
    };
    page.detectChanges();

    const headerRows = await page.loader.getAllHarnesses(MatHeaderRowHarness);
    expect(headerRows.length).toEqual(1);
    const headerCells = await page.loader.getAllHarnesses(MatHeaderCellHarness);
    expect(headerCells.length).toEqual(0);
    const rows = await page.loader.getAllHarnesses(MatRowHarness);
    expect(rows.length).toEqual(1);
  });
});

class Page extends PageBase<TestHostComponent> {
  public get rootComponent(): AgariTableComponent {
    return this.component(AgariTableComponent) as AgariTableComponent;
  }

  public get hostComponent(): TestHostComponent {
    return this.component() as TestHostComponent;
  }
}

@Component({
  template: `
    <agari-table [tableConfiguration]="tableConfiguration"></agari-table>
  `
})
class TestHostComponent {
  public tableConfiguration: TableConfiguration<any>;
}
