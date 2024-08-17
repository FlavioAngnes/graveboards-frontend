import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestButtonDialogComponent } from './request-button-dialog.component';

describe('RequestButtonDialogComponent', () => {
  let component: RequestButtonDialogComponent;
  let fixture: ComponentFixture<RequestButtonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestButtonDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestButtonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
