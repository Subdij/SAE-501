import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverComponentComponent } from './cover.component';

describe('CoverComponentComponent', () => {
  let component: CoverComponentComponent;
  let fixture: ComponentFixture<CoverComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoverComponentComponent]
    });
    fixture = TestBed.createComponent(CoverComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
