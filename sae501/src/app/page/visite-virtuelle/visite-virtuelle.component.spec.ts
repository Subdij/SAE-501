import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteVirtuelleComponent } from './visite-virtuelle.component';

describe('VisiteVirtuelleComponent', () => {
  let component: VisiteVirtuelleComponent;
  let fixture: ComponentFixture<VisiteVirtuelleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisiteVirtuelleComponent]
    });
    fixture = TestBed.createComponent(VisiteVirtuelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
