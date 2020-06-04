import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightDetailComponent } from './right-detail.component';

describe('RightDetailComponent', () => {
  let component: RightDetailComponent;
  let fixture: ComponentFixture<RightDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
