import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { RoundParticipantCountInputComponent } from './round-participant-count-input.component';

describe('RoundParticipantCountInputComponent integration', () => {
  let page: Page;

  describe('with MatFormField', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        declarations: [TestHostComponent, RoundParticipantCountInputComponent],
        imports: [ReactiveFormsModule, NoopAnimationsModule, MatFormFieldModule, MatInputModule],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    });

    beforeEach(() => {
      page = new Page(TestBed.createComponent(TestHostComponent));
      page.detectChanges();
    });

    it('should set values correctly', async () => {
      page.host.formControl.setValue({
        roundCount: 4,
        participantCount: 20
      });
      page.detectChanges();
      await page.fixture.whenStable();

      expect(page.root.controls.roundCount.value).toEqual(4);
      expect(page.root.controls.participantCount.value).toEqual(20);
    });

    it('should be deactivatable', async () => {
      page.host.formControl.disable();
      page.detectChanges();
      await page.fixture.whenStable();

      expect(page.root.controls.roundCount.disabled).toEqual(true);
      expect(page.root.controls.participantCount.disabled).toEqual(true);
    });

    it('should be activatable', async () => {
      page.host.formControl.enable();
      page.detectChanges();
      await page.fixture.whenStable();

      expect(page.root.controls.roundCount.disabled).toEqual(false);
      expect(page.root.controls.participantCount.disabled).toEqual(false);
    });
  });
});

class Page extends PageBase<TestHostComponent> {
  public get root(): RoundParticipantCountInputComponent {
    return this.component(RoundParticipantCountInputComponent);
  }

  public get host(): TestHostComponent {
    return this.component();
  }
}

@Component({
  template: `
    <agari-round-participant-count-input [formControl]="formControl"></agari-round-participant-count-input>
  `
})
class TestHostComponent {
  public formControl: FormControl;

  public constructor() {
    this.formControl = new FormControl(undefined);
  }
}
