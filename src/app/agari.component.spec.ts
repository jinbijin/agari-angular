import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AgariComponent } from './agari.component';

describe('AgariComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AgariComponent]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AgariComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'agari-angular'`, () => {
    const fixture = TestBed.createComponent(AgariComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('agari-angular');
  });
});
