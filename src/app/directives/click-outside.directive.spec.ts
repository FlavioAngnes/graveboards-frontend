import { Component } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ClickOutsideDirective } from './click-outside.directive';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <div id="inside" appClickOutside (clickOutside)="onClickOutside($event)">
      Inside
    </div>
    <div id="outside">
      Outside
    </div>
  `
})
class TestComponent {
  @Output() clickOutside = new EventEmitter<Event>();

  onClickOutside(event: Event): void {
    this.clickOutside.emit(event);
  }
}

describe('ClickOutsideDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClickOutsideDirective, TestComponent]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new ClickOutsideDirective(fixture.debugElement.query(By.css('#inside')));
    expect(directive).toBeTruthy();
  });

  it('should emit clickOutside event when clicking outside the element', () => {
    spyOn(component, 'onClickOutside');
    const outsideElement = fixture.debugElement.query(By.css('#outside')).nativeElement;
    outsideElement.click();
    fixture.detectChanges();
    expect(component.onClickOutside).toHaveBeenCalled();
  });

  it('should not emit clickOutside event when clicking inside the element', () => {
    spyOn(component, 'onClickOutside');
    const insideElement = fixture.debugElement.query(By.css('#inside')).nativeElement;
    insideElement.click();
    fixture.detectChanges();
    expect(component.onClickOutside).not.toHaveBeenCalled();
  });
});