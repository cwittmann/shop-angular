import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinesComponent } from './lines.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreService } from 'src/app/shared/service/store.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('LinesComponent', () => {
  let component: LinesComponent;
  let fixture: ComponentFixture<LinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LinesComponent],
      imports: [HttpClientModule, RouterTestingModule.withRoutes([])],
      providers: [StoreService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
