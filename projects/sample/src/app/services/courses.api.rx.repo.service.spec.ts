import { TestBed } from '@angular/core/testing';

import { CoursesApiRxRepoService } from './courses.api.rx.repo.service';

describe('CoursesApiRxRepoService', () => {
  let service: CoursesApiRxRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesApiRxRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
