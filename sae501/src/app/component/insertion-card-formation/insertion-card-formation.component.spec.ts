import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertionCardFormationComponent } from './insertion-card-formation.component';

describe('InsertionCardFormationComponent', () => {
  let component: InsertionCardFormationComponent;
  let fixture: ComponentFixture<InsertionCardFormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertionCardFormationComponent]
    });
    fixture = TestBed.createComponent(InsertionCardFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
