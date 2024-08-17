import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestBeatmapPanelHorizontalPlaceholderComponent } from './request-beatmap-panel-horizontal-placeholder.component';

describe('RequestBeatmapPanelHorizontalPlaceholderComponent', () => {
  let component: RequestBeatmapPanelHorizontalPlaceholderComponent;
  let fixture: ComponentFixture<RequestBeatmapPanelHorizontalPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestBeatmapPanelHorizontalPlaceholderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestBeatmapPanelHorizontalPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
