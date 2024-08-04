import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatmapPanelComponent } from './beatmap-panel.component';

describe('BeatmapPanelComponent', () => {
  let component: BeatmapPanelComponent;
  let fixture: ComponentFixture<BeatmapPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeatmapPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeatmapPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
