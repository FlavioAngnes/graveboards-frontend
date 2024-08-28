import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteBeatmapsetListingComponent } from './infinite-beatmapset-listing.component';

describe('InfiniteScrollBeatmapPanelListComponent', () => {
  let component: InfiniteBeatmapsetListingComponent;
  let fixture: ComponentFixture<InfiniteBeatmapsetListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfiniteBeatmapsetListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfiniteBeatmapsetListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
