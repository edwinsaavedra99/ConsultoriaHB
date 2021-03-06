import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponentInfo } from './list.component';

describe('ListComponentInfo', () => {
  let component: ListComponentInfo;
  let fixture: ComponentFixture<ListComponentInfo>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponentInfo ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponentInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
