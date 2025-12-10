import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Estilos } from './estilos';

describe('Estilos', () => {
  let component: Estilos;
  let fixture: ComponentFixture<Estilos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Estilos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Estilos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
