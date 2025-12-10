import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Resurreccion } from './resurreccion';

describe('Resurreccion', () => {
  let component: Resurreccion;
  let fixture: ComponentFixture<Resurreccion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Resurreccion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Resurreccion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
