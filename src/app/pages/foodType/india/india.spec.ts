import { ComponentFixture, TestBed } from '@angular/core/testing';

import { India } from './india';

describe('India', () => {
  let component: India;
  let fixture: ComponentFixture<India>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [India]
    })
    .compileComponents();

    fixture = TestBed.createComponent(India);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
