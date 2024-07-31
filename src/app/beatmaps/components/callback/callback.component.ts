import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../services.service';


@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss',
  providers: [ServicesService]
})
export class CallbackComponent implements OnInit{

  constructor(
    private route: ActivatedRoute,
    private servicesService: ServicesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params["code"];
      if (code) {
        this.servicesService.postToken(code).subscribe(
          response => {
            console.log('Login successful:', response);

            sessionStorage.setItem('auth_token', response.token);

            this.router.navigate(['/']);
          }
        )
      } else {
        console.error('No code parameter found');
      };
    })
  };
}