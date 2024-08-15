import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultyListComponent } from './difficulty-list.component';

describe('DifficultyListComponent', () => {
  let component: DifficultyListComponent;
  let fixture: ComponentFixture<DifficultyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DifficultyListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DifficultyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
