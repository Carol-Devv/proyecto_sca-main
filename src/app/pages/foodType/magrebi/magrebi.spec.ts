import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Magrebi } from './magrebi';

describe('Magrebi', () => {
  let component: Magrebi;
  let fixture: ComponentFixture<Magrebi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Magrebi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Magrebi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
