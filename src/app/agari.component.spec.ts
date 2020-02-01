import { async, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { AgariComponent } from './agari.component';
import { PageModule } from './page/page.module';

describe('AgariComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule, PageModule],
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
