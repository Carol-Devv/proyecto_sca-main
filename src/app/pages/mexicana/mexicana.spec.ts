import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mexicana } from './mexicana';

describe('Mexicana', () => {
  let component: Mexicana;
  let fixture: ComponentFixture<Mexicana>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mexicana]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mexicana);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
