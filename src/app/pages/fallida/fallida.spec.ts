import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fallida } from './fallida';

describe('Fallida', () => {
  let component: Fallida;
  let fixture: ComponentFixture<Fallida>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fallida]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fallida);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
