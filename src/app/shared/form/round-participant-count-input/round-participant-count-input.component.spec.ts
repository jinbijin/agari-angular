import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { RoundParticipantCountInputComponent } from './round-participant-count-input.component';

describe('RoundParticipantCountInputComponent', () => {
  let page: Page;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, RoundParticipantCountInputComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    page = new Page(TestBed.createComponent(TestHostComponent));
  });

  it('should create', () => {
    expect(page.root).toBeTruthy();
  });
});

class Page extends PageBase<TestHostComponent> {
  get root(): HTMLElement {
    return this.query<HTMLElement>('agari-round-participant-count-input');
  }
}

@Component({
  template: `
    <agari-round-participant-count-input></agari-round-participant-count-input>
  `
})
class TestHostComponent {}
