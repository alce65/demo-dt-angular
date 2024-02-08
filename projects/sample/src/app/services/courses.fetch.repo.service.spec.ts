import { TestBed } from '@angular/core/testing';

import { CoursesFetchRepoService } from './courses.fetch.repo.service';

describe('CoursesFetchRepoService', () => {
  let service: CoursesFetchRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesFetchRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
