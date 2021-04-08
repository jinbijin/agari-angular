import { CDK_TABLE_TEMPLATE } from '@angular/cdk/table';
import { Component, Directive, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';
import { TableConfiguration } from 'src/app/instrumentation/data/table-configuration.type';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { AgariTableComponent } from './agari-table.component';

describe('AgariTableComponent', () => {
  let page: Page;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        TestHostComponent,
        AgariTableComponent,
        MatHeaderRowDefStubDirective,
        MatRowDefStubDirective
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    page = new Page(TestBed.createComponent(TestHostComponent));
  });

  it('should create', () => {
    page.host.tableConfiguration = {
      dataSource: new MatTableDataSource<any>(),
      columns: []
    };
    page.detectChanges();

    expect(page.root).toBeTruthy();
  });

  it('should display displayable columns', () => {
    page.host.tableConfiguration = {
      dataSource: new MatTableDataSource<any>([{ name: 'test' }]),
      columns: [{ id: 'test', header: 'Test', cell: element => element.name }]
    };
    page.detectChanges();

    expect(page.root.displayedColumns).toEqual(['test']);
  });

  it('should not display non-displayable columns', () => {
    page.host.tableConfiguration = {
      dataSource: new MatTableDataSource<any>([{ name: 'test' }]),
      columns: [
        {
          id: 'test',
          displayed: false,
          header: 'Test',
          cell: element => element.name
        }
      ]
    };
    page.detectChanges();

    expect(page.root.displayedColumns).toEqual([]);
  });
});

class Page extends PageBase<TestHostComponent> {
  public get root(): AgariTableComponent {
    return this.component(AgariTableComponent);
  }

  public get host(): TestHostComponent {
    return this.component();
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

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[matHeaderRowDef]',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['columns: matHeaderRowDef']
})
class MatHeaderRowDefStubDirective {}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[matRowDef]',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['columns: matRowDefColumns']
})
class MatRowDefStubDirective {}
