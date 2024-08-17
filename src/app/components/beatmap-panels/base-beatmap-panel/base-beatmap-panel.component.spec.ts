import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseBeatmapPanelComponent } from './base-beatmap-panel.component';

describe('BeatmapPanelComponent', () => {
  let component: BaseBeatmapPanelComponent;
  let fixture: ComponentFixture<BaseBeatmapPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseBeatmapPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseBeatmapPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
