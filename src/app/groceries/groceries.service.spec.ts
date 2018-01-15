import { TestBed, inject } from '@angular/core/testing';

import { GroceriesService } from './groceries.service';

describe('GroceriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroceriesService]
    });
  });

  it('should be created', inject([GroceriesService], (service: GroceriesService) => {
    expect(service).toBeTruthy();
  }));
});
