import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleRightListComponent } from './role-right-list.component';

describe('RoleRightListComponent', () => {
  let component: RoleRightListComponent;
  let fixture: ComponentFixture<RoleRightListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoleRightListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleRightListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
