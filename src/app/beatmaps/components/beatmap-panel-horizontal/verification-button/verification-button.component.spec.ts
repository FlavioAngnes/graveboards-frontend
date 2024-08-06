import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationButtonComponent } from './verification-button.component';

describe('VerificationButtonComponent', () => {
  let component: VerificationButtonComponent;
  let fixture: ComponentFixture<VerificationButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificationButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerificationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
