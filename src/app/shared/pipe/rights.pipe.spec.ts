import { RightsPipe } from './rights.pipe';
import { RightsService } from '../service/rights.service';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('RightsPipe', () => {
  let pipe: RightsPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule.withRoutes([])],
      providers: [RightsService],
    }).compileComponents();

    let rightsService = TestBed.get(RightsService);
    pipe = new RightsPipe(rightsService);
  });

  afterEach(() => {});

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
