import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatmapPanelPlaceholderComponent } from './beatmap-panel-placeholder.component';

describe('BeatmapPanelPlaceholderComponent', () => {
  let component: BeatmapPanelPlaceholderComponent;
  let fixture: ComponentFixture<BeatmapPanelPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeatmapPanelPlaceholderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeatmapPanelPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
