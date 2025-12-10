import { ComponentFixture, TestBed } from '@angular/core/testing';

import { China } from './china';

describe('China', () => {
  let component: China;
  let fixture: ComponentFixture<China>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [China]
    })
    .compileComponents();

    fixture = TestBed.createComponent(China);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
