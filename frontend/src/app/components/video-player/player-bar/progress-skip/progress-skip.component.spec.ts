import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressSkipComponent } from './progress-skip.component';

describe('ProgressSkipComponent', () => {
  let component: ProgressSkipComponent;
  let fixture: ComponentFixture<ProgressSkipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressSkipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressSkipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
