import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UeFormationComponent } from './ue-formation.component';

describe('UeFormationComponent', () => {
  let component: UeFormationComponent;
  let fixture: ComponentFixture<UeFormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UeFormationComponent]
    });
    fixture = TestBed.createComponent(UeFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
