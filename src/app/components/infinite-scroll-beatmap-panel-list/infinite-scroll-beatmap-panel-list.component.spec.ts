import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteScrollBeatmapPanelListComponent } from './infinite-scroll-beatmap-panel-list.component';

describe('InfiniteScrollBeatmapPanelListComponent', () => {
  let component: InfiniteScrollBeatmapPanelListComponent;
  let fixture: ComponentFixture<InfiniteScrollBeatmapPanelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfiniteScrollBeatmapPanelListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfiniteScrollBeatmapPanelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
