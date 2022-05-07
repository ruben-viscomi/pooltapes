import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniDetailComponent } from './mini-detail.component';

describe('MiniDetailComponent', () => {
  let component: MiniDetailComponent;
  let fixture: ComponentFixture<MiniDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
