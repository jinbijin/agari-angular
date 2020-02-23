import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { RoundParticipantCountInputComponent } from './round-participant-count-input.component';

describe('RoundParticipantCountInputComponent', () => {
  let page: Page;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, RoundParticipantCountInputComponent],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    page = new Page(TestBed.createComponent(TestHostComponent));
    page.detectChanges();
  });

  it('should create', () => {
    expect(page.rootComponent).toBeTruthy();
  });

  it('should set values correctly', async () => {
    page.hostComponent.formControl.setValue({
      roundCount: 4,
      participantCount: 20
    });
    page.detectChanges();
    await page.fixture.whenStable();

    expect(page.rootComponent.controls.roundCount.value).toEqual(4);
    expect(page.rootComponent.controls.participantCount.value).toEqual(20);
  });

  it('should be deactivatable', async () => {
    page.hostComponent.formControl.disable();
    page.detectChanges();
    await page.fixture.whenStable();

    expect(page.rootComponent.controls.roundCount.disabled).toEqual(true);
    expect(page.rootComponent.controls.participantCount.disabled).toEqual(true);
  });

  it('should be activatable', async () => {
    page.hostComponent.formControl.enable();
    page.detectChanges();
    await page.fixture.whenStable();

    expect(page.rootComponent.controls.roundCount.disabled).toEqual(false);
    expect(page.rootComponent.controls.participantCount.disabled).toEqual(
      false
    );
  });

  it('should take valid inputs', async () => {
    page.rootComponent.controls.roundCount.setValue(4);
    page.rootComponent.controls.participantCount.setValue(20);
    page.detectChanges();
    await page.fixture.whenStable();

    expect(page.rootComponent.formGroup.valid).toBe(true);
    expect(page.rootComponent.controls.roundCount.valid).toBe(true);
    expect(page.rootComponent.controls.roundCount.errors).toBe(null);
    expect(page.rootComponent.controls.participantCount.valid).toBe(true);
    expect(page.rootComponent.controls.participantCount.errors).toBe(null);
    expect(page.rootComponent.validate(page.hostComponent.formControl)).toBe(
      null
    );
  });

  it('should give an error for negative round count', async () => {
    page.rootComponent.controls.roundCount.setValue(-1);
    page.rootComponent.controls.participantCount.setValue(20);
    page.detectChanges();
    await page.fixture.whenStable();

    expect(page.rootComponent.formGroup.valid).toBe(false);
    expect(page.rootComponent.controls.roundCount.valid).toBe(false);
    expect(page.rootComponent.controls.roundCount.errors).toEqual({
      min: { min: 1, actual: -1 }
    });
    expect(page.rootComponent.controls.participantCount.valid).toBe(true);
    expect(page.rootComponent.controls.participantCount.errors).toBe(null);
    expect(page.rootComponent.validate(page.hostComponent.formControl)).toEqual(
      {
        roundParticipantCount: {}
      }
    );
  });

  it('should give an error for empty round count', async () => {
    page.rootComponent.controls.participantCount.setValue(20);
    page.detectChanges();
    await page.fixture.whenStable();

    expect(page.rootComponent.formGroup.valid).toBe(false);
    expect(page.rootComponent.controls.roundCount.valid).toBe(false);
    expect(page.rootComponent.controls.roundCount.errors).toEqual({
      required: true
    });
    expect(page.rootComponent.controls.participantCount.valid).toBe(true);
    expect(page.rootComponent.controls.participantCount.errors).toBe(null);
    expect(page.rootComponent.validate(page.hostComponent.formControl)).toEqual(
      {
        roundParticipantCount: {}
      }
    );
  });

  it('should give an error for empty participant count', async () => {
    page.rootComponent.controls.roundCount.setValue(4);
    page.detectChanges();
    await page.fixture.whenStable();

    expect(page.rootComponent.formGroup.valid).toBe(false);
    expect(page.rootComponent.controls.roundCount.valid).toBe(true);
    expect(page.rootComponent.controls.roundCount.errors).toBe(null);
    expect(page.rootComponent.controls.participantCount.valid).toBe(false);
    expect(page.rootComponent.controls.participantCount.errors).toEqual({
      required: true
    });
    expect(page.rootComponent.validate(page.hostComponent.formControl)).toEqual(
      {
        roundParticipantCount: {}
      }
    );
  });

  it('should give an error for negative participant count', async () => {
    page.rootComponent.controls.roundCount.setValue(4);
    page.rootComponent.controls.participantCount.setValue(-4);
    page.detectChanges();
    await page.fixture.whenStable();

    expect(page.rootComponent.formGroup.valid).toBe(false);
    expect(page.rootComponent.controls.roundCount.valid).toBe(true);
    expect(page.rootComponent.controls.roundCount.errors).toBe(null);
    expect(page.rootComponent.controls.participantCount.valid).toBe(false);
    expect(page.rootComponent.controls.participantCount.errors).toEqual({
      min: { min: 1, actual: -4 },
      minParticipant: { min: 20, actual: -4 }
    });
    expect(page.rootComponent.validate(page.hostComponent.formControl)).toEqual(
      {
        roundParticipantCount: {}
      }
    );
  });

  it('should give an error for improper participant count', async () => {
    page.rootComponent.controls.roundCount.setValue(4);
    page.rootComponent.controls.participantCount.setValue(21);
    page.detectChanges();
    await page.fixture.whenStable();

    expect(page.rootComponent.formGroup.valid).toBe(false);
    expect(page.rootComponent.controls.roundCount.valid).toBe(true);
    expect(page.rootComponent.controls.roundCount.errors).toBe(null);
    expect(page.rootComponent.controls.participantCount.valid).toBe(false);
    expect(page.rootComponent.controls.participantCount.errors).toEqual({
      mod: { modulus: 4, remainder: 0, actual: 1 }
    });
    expect(page.rootComponent.validate(page.hostComponent.formControl)).toEqual(
      {
        roundParticipantCount: {}
      }
    );
  });

  it('should give an error for insufficient participant count', async () => {
    page.rootComponent.controls.roundCount.setValue(4);
    page.rootComponent.controls.participantCount.setValue(16);
    page.detectChanges();
    await page.fixture.whenStable();

    expect(page.rootComponent.formGroup.valid).toBe(false);
    expect(page.rootComponent.controls.roundCount.valid).toBe(true);
    expect(page.rootComponent.controls.roundCount.errors).toBe(null);
    expect(page.rootComponent.controls.participantCount.valid).toBe(false);
    expect(page.rootComponent.controls.participantCount.errors).toEqual({
      minParticipant: { min: 20, actual: 16 }
    });
    expect(page.rootComponent.validate(page.hostComponent.formControl)).toEqual(
      {
        roundParticipantCount: {}
      }
    );
  });
});

class Page extends PageBase<TestHostComponent> {
  public get rootComponent(): RoundParticipantCountInputComponent {
    return this.component(
      RoundParticipantCountInputComponent
    ) as RoundParticipantCountInputComponent;
  }

  public get hostComponent(): TestHostComponent {
    return this.component() as TestHostComponent;
  }
}

@Component({
  template: `
    <agari-round-participant-count-input
      [formControl]="formControl"
    ></agari-round-participant-count-input>
  `
})
class TestHostComponent {
  public formControl: FormControl;

  constructor() {
    this.formControl = new FormControl(undefined);
  }
}
