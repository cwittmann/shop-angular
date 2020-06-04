import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleRightDetailComponent } from './role-right-detail.component';

describe('RoleRightDetailComponent', () => {
  let component: RoleRightDetailComponent;
  let fixture: ComponentFixture<RoleRightDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleRightDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleRightDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
