import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcoursTrackComponent } from './parcours-track.component';

describe('ParcoursTrackComponent', () => {
  let component: ParcoursTrackComponent;
  let fixture: ComponentFixture<ParcoursTrackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParcoursTrackComponent]
    });
    fixture = TestBed.createComponent(ParcoursTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
