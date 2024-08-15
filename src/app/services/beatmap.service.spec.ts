import { TestBed } from '@angular/core/testing';

import { BeatmapService } from './beatmap.service';

describe('BeatmapService', () => {
  let service: BeatmapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeatmapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
