import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRightListComponent } from './user-right-list.component';

describe('UserRightListComponent', () => {
  let component: UserRightListComponent;
  let fixture: ComponentFixture<UserRightListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRightListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRightListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
