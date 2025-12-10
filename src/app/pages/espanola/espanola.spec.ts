import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Espanola } from './espanola';

describe('Espanola', () => {
  let component: Espanola;
  let fixture: ComponentFixture<Espanola>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Espanola]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Espanola);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
