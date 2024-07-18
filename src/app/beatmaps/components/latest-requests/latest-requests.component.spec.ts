import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestRequestsComponent } from './latest-requests.component';

describe('LatestRequestsComponent', () => {
  let component: LatestRequestsComponent;
  let fixture: ComponentFixture<LatestRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LatestRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
