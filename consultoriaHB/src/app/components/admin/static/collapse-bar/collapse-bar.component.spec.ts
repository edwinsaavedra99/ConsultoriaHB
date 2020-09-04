import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapseBarComponent } from './collapse-bar.component';

describe('CollapseBarComponent', () => {
  let component: CollapseBarComponent;
  let fixture: ComponentFixture<CollapseBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollapseBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapseBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
