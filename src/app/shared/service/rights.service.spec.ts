import { TestBed } from '@angular/core/testing';

import { RightsService } from './rights.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('RightsService', () => {
  let service: RightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule.withRoutes([])],
    });
    service = TestBed.inject(RightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
