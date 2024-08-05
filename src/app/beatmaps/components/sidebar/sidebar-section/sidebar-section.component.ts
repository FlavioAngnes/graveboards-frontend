import {Component, Input} from '@angular/core';

@Component({
  selector: 'sidebar-section',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-section.component.html',
  styleUrl: './sidebar-section.component.scss'
})

export class SidebarSectionComponent {
  @Input() title!: string;
}
