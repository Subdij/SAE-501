import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPopupComponent } from './add-popup.component';

describe('AddPopupComponent', () => {
  let component: AddPopupComponent;
  let fixture: ComponentFixture<AddPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPopupComponent]
    });
    fixture = TestBed.createComponent(AddPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
