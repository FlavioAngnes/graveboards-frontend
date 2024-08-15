import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedDifficultyListComponent } from './detailed-difficulty-list.component';

describe('DifficultyListDetailedComponent', () => {
  let component: DetailedDifficultyListComponent;
  let fixture: ComponentFixture<DetailedDifficultyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedDifficultyListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailedDifficultyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
