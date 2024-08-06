import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatmapPanelHorizontalComponent } from './beatmap-panel-horizontal.component';

describe('BeatmapPanelHorizontalComponent', () => {
  let component: BeatmapPanelHorizontalComponent;
  let fixture: ComponentFixture<BeatmapPanelHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeatmapPanelHorizontalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeatmapPanelHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
