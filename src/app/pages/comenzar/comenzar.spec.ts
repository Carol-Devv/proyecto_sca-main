import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Comenzar } from './comenzar';

describe('Comenzar', () => {
  let component: Comenzar;
  let fixture: ComponentFixture<Comenzar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Comenzar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Comenzar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
