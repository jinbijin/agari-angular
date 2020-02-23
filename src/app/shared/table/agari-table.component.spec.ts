import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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
    page.component.tableConfiguration = {
      dataSource: new MatTableDataSource<any>([{ name: 'test' }]),
      columns: [{ id: 'test', cell: element => element.name }]
    };
    page.detectChanges();

    expect(page.root).toBeTruthy();
  });
});

class Page extends PageBase<TestHostComponent> {
  constructor(fixture: ComponentFixture<TestHostComponent>) {
    super(fixture);

    this.loader = TestbedHarnessEnvironment.loader(fixture);
  }

  public loader: HarnessLoader;

  get root(): HTMLElement {
    return this.query<HTMLElement>('agari-table');
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
