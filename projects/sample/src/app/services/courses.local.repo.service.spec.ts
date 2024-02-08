import { TestBed } from '@angular/core/testing';

import { CoursesLocalRepoService } from './courses.local.repo.service';

describe('CoursesLocalRepoService', () => {
  let service: CoursesLocalRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesLocalRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
