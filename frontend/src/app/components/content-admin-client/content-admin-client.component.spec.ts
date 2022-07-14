import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentAdminClientComponent } from './content-admin-client.component';

describe('ContentAdminClientComponent', () => {
  let component: ContentAdminClientComponent;
  let fixture: ComponentFixture<ContentAdminClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentAdminClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentAdminClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
