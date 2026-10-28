import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertionFormationComponent } from './insertion-formation.component';

describe('InsertionFormationComponent', () => {
  let component: InsertionFormationComponent;
  let fixture: ComponentFixture<InsertionFormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertionFormationComponent]
    });
    fixture = TestBed.createComponent(InsertionFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
