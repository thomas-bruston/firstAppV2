import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInput } from './input';

describe('AppInput', () => {
  let component: AppInput;
  let fixture: ComponentFixture<AppInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppInput],
    }).compileComponents();

    fixture = TestBed.createComponent(AppInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
