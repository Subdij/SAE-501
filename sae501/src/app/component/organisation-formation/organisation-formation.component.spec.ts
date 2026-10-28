import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationFormationComponent } from './organisation-formation.component';

describe('OrganisationFormationComponent', () => {
  let component: OrganisationFormationComponent;
  let fixture: ComponentFixture<OrganisationFormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganisationFormationComponent]
    });
    fixture = TestBed.createComponent(OrganisationFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
