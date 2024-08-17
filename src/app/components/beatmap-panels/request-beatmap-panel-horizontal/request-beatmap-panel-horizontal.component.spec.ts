import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestBeatmapPanelHorizontalComponent } from './request-beatmap-panel-horizontal.component';

describe('BeatmapPanelHorizontalComponent', () => {
  let component: RequestBeatmapPanelHorizontalComponent;
  let fixture: ComponentFixture<RequestBeatmapPanelHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestBeatmapPanelHorizontalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestBeatmapPanelHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
