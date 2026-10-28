import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SondageDetailsComponent } from './sondage-details.component';

describe('SondageDetailsComponent', () => {
  let component: SondageDetailsComponent;
  let fixture: ComponentFixture<SondageDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SondageDetailsComponent]
    });
    fixture = TestBed.createComponent(SondageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
