import { TestBed } from '@angular/core/testing';

import { CoursesMemoryRepoService } from './courses.memory.repo.service';

describe('CoursesMemoryRepoService', () => {
  let service: CoursesMemoryRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesMemoryRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
