import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialResurrecciones } from './historial-resurrecciones';

describe('HistorialResurrecciones', () => {
  let component: HistorialResurrecciones;
  let fixture: ComponentFixture<HistorialResurrecciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialResurrecciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialResurrecciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
