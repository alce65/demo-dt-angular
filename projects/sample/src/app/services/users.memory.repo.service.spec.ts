import { TestBed } from '@angular/core/testing';

import { UsersMemoryRepoService } from './users.memory.repo.service';

describe('UsersMemoryRepoService', () => {
  let service: UsersMemoryRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersMemoryRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
