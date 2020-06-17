import { RightsPipe } from './rights.pipe';
import { RightsService } from '../service/rights.service';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('RightsPipe', () => {
  let pipe: RightsPipe;

  beforeEach(() => {
    const rightsServiceSpy = jasmine.createSpyObj('RightsService', [
      'userHasRights',
    ]);

    rightsServiceSpy.userHasRights.and.returnValue(true);

    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule.withRoutes([])],
      providers: [{ provide: RightsService, useValue: rightsServiceSpy }],
    }).compileComponents();

    let rightsService = TestBed.get(RightsService);
    pipe = new RightsPipe(rightsService);
  });

  afterEach(() => {});

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform to false with undefined parameter', () => {
    let result = pipe.transform(undefined);
    expect(result).toBe(false);
  });

  it('should transform to false with empty array', () => {
    let result = pipe.transform([]);
    expect(result).toBe(false);
  });

  it('should transform to false with one-element array', () => {
    let result = pipe.transform(['Order']);
    expect(result).toBe(false);
  });

  it('should transform to false with three-element array', () => {
    let result = pipe.transform(['Order', 'Write', 'Read']);
    expect(result).toBe(false);
  });

  it('should transform to true with two-element array', () => {
    let result = pipe.transform(['Order', 'Write']);
    expect(result).toBe(true);
  });
});
