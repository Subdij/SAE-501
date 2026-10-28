import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanniereFormationComponent } from './banniere-formation.component';

describe('BanniereFormationComponent', () => {
  let component: BanniereFormationComponent;
  let fixture: ComponentFixture<BanniereFormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BanniereFormationComponent]
    });
    fixture = TestBed.createComponent(BanniereFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
