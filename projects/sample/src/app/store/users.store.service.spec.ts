import { TestBed } from '@angular/core/testing';

import { UsersStoreService } from './users.store.service';

describe('UsersStoreService', () => {
  let service: UsersStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
