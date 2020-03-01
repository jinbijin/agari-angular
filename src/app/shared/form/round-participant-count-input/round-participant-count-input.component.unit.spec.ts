import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
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
    page.detectChanges();
  });

  it('should create', () => {
    expect(page.root).toBeTruthy();
  });

  it('should have a default onChange', () => {
    page.root.onChange({ roundCount: 4, participantCount: 20 });
  });

  it('should have a default onTouched', () => {
    page.root.onTouched();
  });

  describe('validation messages', () => {
    it('should generate correctly for round count', () => {
      expect(page.root.roundCountErrorMessage({ required: true })).toEqual(
        'This field is required.'
      );
      expect(
        page.root.roundCountErrorMessage({ min: { min: 1, actual: -1 } })
      ).toEqual('Number of rounds must be greater than 0.');
      expect(page.root.roundCountErrorMessage({})).toBeUndefined();
    });

    it('should generate correctly for participant count', () => {
      expect(
        page.root.participantCountErrorMessage({ required: true })
      ).toEqual('This field is required.');
      expect(
        page.root.participantCountErrorMessage({ min: { min: 1, actual: -1 } })
      ).toEqual('Number of participants must be greater than 0.');
      expect(
        page.root.participantCountErrorMessage({
          mod: { modulus: 4, remainder: 0, actual: 1 }
        })
      ).toEqual('Number of participants must be divisible by 4.');
      expect(
        page.root.participantCountErrorMessage({
          minParticipant: { min: 20, actual: 16 }
        })
      ).toEqual('Number of participants must be at least 20.');
      expect(page.root.participantCountErrorMessage({})).toBeUndefined();
    });
  });

  describe('validation', () => {
    it('should not give errors for correct round counts', async () => {
      page.root.controls.roundCount.setValue(4);
      page.detectChanges();
      await page.fixture.whenStable();

      expect(page.root.controls.roundCount.valid).toEqual(true);
      expect(page.root.controls.roundCount.errors).toEqual(null);
    });

    it('should give an error for non-positive round counts', async () => {
      page.root.controls.roundCount.setValue(0);
      page.detectChanges();
      await page.fixture.whenStable();

      expect(page.root.controls.roundCount.valid).toEqual(false);
      expect(page.root.controls.roundCount.errors).toEqual({
        min: { min: 1, actual: 0 }
      });
    });

    it('should give an error for empty round count', () => {
      expect(page.root.controls.roundCount.valid).toEqual(false);
      expect(page.root.controls.roundCount.errors).toEqual({
        required: true
      });
    });

    it('should not give an error for correct participant counts', async () => {
      page.root.controls.roundCount.setValue(4);
      page.root.controls.participantCount.setValue(20);
      page.detectChanges();
      await page.fixture.whenStable();

      expect(page.root.controls.participantCount.valid).toEqual(true);
      expect(page.root.controls.participantCount.errors).toEqual(null);
    });

    it('should give an error for non-positive participant counts', async () => {
      page.root.controls.roundCount.setValue(4);
      page.root.controls.participantCount.setValue(0);
      page.detectChanges();
      await page.fixture.whenStable();

      expect(page.root.controls.participantCount.valid).toEqual(false);
      expect(page.root.controls.participantCount.errors).toEqual({
        min: { min: 1, actual: 0 }
      });
    });

    it('should give an error for improper participant counts', async () => {
      page.root.controls.roundCount.setValue(4);
      page.root.controls.participantCount.setValue(21);
      page.detectChanges();
      await page.fixture.whenStable();

      expect(page.root.controls.participantCount.valid).toEqual(false);
      expect(page.root.controls.participantCount.errors).toEqual({
        mod: { modulus: 4, remainder: 0, actual: 1 }
      });
    });

    it('should give an error for insufficient participant counts', async () => {
      page.root.controls.roundCount.setValue(4);
      page.root.controls.participantCount.setValue(16);
      page.detectChanges();
      await page.fixture.whenStable();

      expect(page.root.controls.participantCount.valid).toEqual(false);
      expect(page.root.controls.participantCount.errors).toEqual({
        minParticipant: { min: 20, actual: 16 }
      });
    });

    it('should give an error for empty participant count', async () => {
      page.root.controls.roundCount.setValue(4);
      page.detectChanges();
      await page.fixture.whenStable();

      expect(page.root.controls.participantCount.valid).toEqual(false);
      expect(page.root.controls.participantCount.errors).toEqual({
        required: true
      });
    });

    it('should validate outer form for valid input', async () => {
      page.root.controls.roundCount.setValue(4);
      page.root.controls.participantCount.setValue(20);
      page.detectChanges();
      await page.fixture.whenStable();

      expect(page.root.validate(page.host.formControl)).toEqual(null);
    });

    it('should invalidate outer form for invalid input', async () => {
      page.root.controls.roundCount.setValue(4);
      page.root.controls.participantCount.setValue(19);
      page.detectChanges();
      await page.fixture.whenStable();

      expect(page.root.validate(page.host.formControl)).toEqual({
        roundParticipantCount: {}
      });
    });
  });

  describe('ControlValueAccessor implementation', () => {
    it('should write an empty value', () => {
      page.root.writeValue(null);
      page.detectChanges();

      expect(page.root.controls.roundCount.value).toBeFalsy();
      expect(page.root.controls.participantCount.value).toBeFalsy();
    });

    it('should write a proper value', () => {
      page.root.writeValue({ roundCount: 4, participantCount: 20 });

      expect(page.root.controls.roundCount.value).toEqual(4);
      expect(page.root.controls.participantCount.value).toEqual(20);
    });

    it('should register a change function', () => {
      const mockOnChange = jest.fn(value => {});

      page.root.registerOnChange(mockOnChange);
      page.root.onChange({ roundCount: 4, participantCount: 20 });

      expect(mockOnChange.mock.calls).toEqual([
        [{ roundCount: 4, participantCount: 20 }]
      ]);
    });

    it('should register a touched function', () => {
      const mockOnTouched = jest.fn();

      page.root.registerOnTouched(mockOnTouched);
      page.root.onTouched();

      expect(mockOnTouched.mock.calls).toEqual([[]]);
    });

    it('should set disabled', () => {
      page.root.setDisabledState(true);

      expect(page.root.controls.roundCount.disabled).toEqual(true);
      expect(page.root.controls.participantCount.disabled).toEqual(true);
    });

    it('should set enabled', () => {
      page.root.setDisabledState(false);

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
