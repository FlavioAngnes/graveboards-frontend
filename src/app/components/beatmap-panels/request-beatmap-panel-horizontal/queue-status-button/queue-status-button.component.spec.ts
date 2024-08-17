import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueStatusButtonComponent } from './queue-status-button.component';

describe('QueueStatusButtonComponent', () => {
  let component: QueueStatusButtonComponent;
  let fixture: ComponentFixture<QueueStatusButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueueStatusButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QueueStatusButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
