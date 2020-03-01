import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTableHarness } from '@angular/material/table/testing';
import { TableConfiguration } from 'src/app/instrumentation/data/table-configuration.type';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { AgariTableComponent } from './agari-table.component';

describe('AgariTableComponent integration', () => {
  let page: Page;

  describe('with MatTable', () => {
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

    it('should have default settings', async () => {
      page.host.tableConfiguration = {
        dataSource: new MatTableDataSource<any>([{ name: 'test' }]),
        columns: [{ id: 'test', header: 'Test', cell: element => element.name }]
      };
      page.detectChanges();

      const matTable = await page.loader.getHarness(MatTableHarness);
      expect(matTable).toBeTruthy();

      const matHeaderRows = await matTable.getHeaderRows();
      expect(matHeaderRows.length).toEqual(1);
      expect((await matTable.getFooterRows()).length).toEqual(0);
      expect((await matTable.getRows()).length).toEqual(1);
      expect((await matHeaderRows[0].getCells()).length).toEqual(1);
    });

    it('should have optional headers', async () => {
      page.host.tableConfiguration = {
        dataSource: new MatTableDataSource<any>([{ name: 'test' }]),
        headers: false,
        columns: [{ id: 'test', cell: element => element.name }]
      };
      page.detectChanges();

      const matTable = await page.loader.getHarness(MatTableHarness);
      expect(matTable).toBeTruthy();

      expect((await matTable.getHeaderRows()).length).toEqual(0);
      expect((await matTable.getFooterRows()).length).toEqual(0);
      expect((await matTable.getRows()).length).toEqual(1);
    });

    it('should have optional columns', async () => {
      page.host.tableConfiguration = {
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

      const matTable = await page.loader.getHarness(MatTableHarness);
      expect(matTable).toBeTruthy();

      const matHeaderRows = await matTable.getHeaderRows();
      expect(matHeaderRows.length).toEqual(1);
      expect((await matTable.getFooterRows()).length).toEqual(0);
      expect((await matTable.getRows()).length).toEqual(1);
      expect((await matHeaderRows[0].getCells()).length).toEqual(0);
    });
  });
});

class Page extends PageBase<TestHostComponent> {
  public get root(): AgariTableComponent {
    return this.component(AgariTableComponent) as AgariTableComponent;
  }

  public get host(): TestHostComponent {
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
