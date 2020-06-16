import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { StoreService } from 'src/app/shared/service/store.service';
import {
  HttpClient,
  HttpHandler,
  HttpClientModule,
} from '@angular/common/http';
import { BackendService } from 'src/app/shared/service/backend.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RightsPipe } from 'src/app/shared/pipe/rights.pipe';
import { PaginatePipe, PaginationService } from 'ngx-pagination';
import { FilterPipe } from 'src/app/shared/pipe/filter.pipe';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent, RightsPipe, PaginatePipe, FilterPipe],
      imports: [HttpClientModule, RouterTestingModule.withRoutes([])],
      providers: [PaginationService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
