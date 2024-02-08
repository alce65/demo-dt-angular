import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesListRxComponent } from './courses-list.component';

describe('CoursesListRxComponent', () => {
  let component: CoursesListRxComponent;
  let fixture: ComponentFixture<CoursesListRxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesListRxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesListRxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
