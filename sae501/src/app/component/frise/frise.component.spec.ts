import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriseComponent } from './frise.component';

describe('FriseComponent', () => {
  let component: FriseComponent;
  let fixture: ComponentFixture<FriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FriseComponent]
    });
    fixture = TestBed.createComponent(FriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
