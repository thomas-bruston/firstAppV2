import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastDisplay } from './toast-display';

describe('ToastDisplay', () => {
  let component: ToastDisplay;
  let fixture: ComponentFixture<ToastDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
