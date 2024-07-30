import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ServicesService } from '../../services.service';


@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [MatIconModule,
    AsyncPipe,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss',
  providers: [ServicesService],
})
export class SearchbarComponent {

  constructor(private servicesService: ServicesService) { }

  onLoginButtonClick(): void {
    this.servicesService.getAuthorizationUrl().subscribe(
      response => {
        let authorizationUrl = response.authorization_url
        window.location.href = authorizationUrl;
      }
    );
  }


}
