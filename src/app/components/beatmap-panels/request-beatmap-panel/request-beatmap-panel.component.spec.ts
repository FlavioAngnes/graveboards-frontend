import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestBeatmapPanelComponent } from './request-beatmap-panel.component';

describe('RequestPanelComponent', () => {
  let component: RequestBeatmapPanelComponent;
  let fixture: ComponentFixture<RequestBeatmapPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestBeatmapPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestBeatmapPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
