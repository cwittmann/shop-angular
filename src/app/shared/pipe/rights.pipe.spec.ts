import { RightsPipe } from './rights.pipe';
import { RightsService } from '../service/rights.service';
import { StoreService } from '../service/store.service';
import { BackendService } from '../service/backend.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OrderService } from '../service/order.service';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('RightsPipe', () => {
  httpClient: HttpClient;
  backendService: BackendService;
  orderService: OrderService;
  storeService: StoreService;
  rightsService: RightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule.withRoutes([])],
    }).compileComponents();

    this.backendService = new BackendService(this.httpClient);
    this.storeService = new StoreService(
      this.backendService,
      this.orderService
    );
    this.rightsService = new RightsService(this.storeService);
  });

  afterEach(() => {
    this.backendService = null;
    this.storeService = null;
    this.rightsService = null;
  });

  it('create an instance', () => {
    const pipe = new RightsPipe(this.rightsService);
    expect(pipe).toBeTruthy();
  });
});
