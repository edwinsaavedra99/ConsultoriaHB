import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAreasComponent } from './popup-areas.component';

describe('PopupAreasComponent', () => {
  let component: PopupAreasComponent;
  let fixture: ComponentFixture<PopupAreasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupAreasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
