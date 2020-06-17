import { TestBed } from '@angular/core/testing';

import { RightsService } from './rights.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreService } from './store.service';
import { User } from '../model/User';
import { Role } from '../model/Role';
import { Right } from '../model/Right';

describe('RightsService', () => {
  let service: RightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule.withRoutes([])],
      providers: [StoreService],
    });
    service = TestBed.inject(RightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false when parameters are undefined', () => {
    let result = service.userHasRights(undefined, undefined);
    expect(result).toBe(false);
  });
});
