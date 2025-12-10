import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Japonesa } from './japonesa';

describe('Japonesa', () => {
  let component: Japonesa;
  let fixture: ComponentFixture<Japonesa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Japonesa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Japonesa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
