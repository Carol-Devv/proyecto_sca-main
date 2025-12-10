import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Italiana } from './italiana';

describe('Italiana', () => {
  let component: Italiana;
  let fixture: ComponentFixture<Italiana>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Italiana]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Italiana);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
