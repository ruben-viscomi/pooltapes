import { TestBed } from '@angular/core/testing';

import { MediaMetadataService } from './media-metadata.service';

describe('MediaMetadataService', () => {
  let service: MediaMetadataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaMetadataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
