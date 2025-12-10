import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rapida } from './rapida';

describe('Rapida', () => {
  let component: Rapida;
  let fixture: ComponentFixture<Rapida>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rapida]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rapida);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
