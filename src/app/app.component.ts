import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SidebarComponent } from './beatmaps/components/sidebar/sidebar.component';
import { MatCardModule } from '@angular/material/card';
import { SearchbarComponent } from "./beatmaps/components/searchbar/searchbar.component"; 
import { CallbackComponent } from './beatmaps/components/callback/callback.component';
import { ProfileButtonComponent } from './beatmaps/components/profile-button/profile-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSlideToggleModule,
    MatSidenavModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    SidebarComponent,
    MatCardModule,
    SearchbarComponent,
    CallbackComponent,
    ProfileButtonComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'routing-app';
}
