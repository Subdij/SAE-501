import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSondageComponent } from './card-sondage.component';

describe('CardSondageComponent', () => {
  let component: CardSondageComponent;
  let fixture: ComponentFixture<CardSondageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardSondageComponent]
    });
    fixture = TestBed.createComponent(CardSondageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
