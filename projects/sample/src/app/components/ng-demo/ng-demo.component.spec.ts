import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDemoComponent } from './ng-demo.component';

describe('NgDemoComponent', () => {
  let component: NgDemoComponent;
  let fixture: ComponentFixture<NgDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgDemoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'Ng Demo' title`, () => {
    expect(component.title).toEqual('Ng Demo');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Hello, Ng Demo',
    );
  });
});
