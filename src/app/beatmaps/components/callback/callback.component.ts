import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private servicesService: ServicesService,
    private router: Router
  ) { }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.route.queryParams.subscribe(params => {
        const code = params["code"];
        
        if (code) {
          this.servicesService.postToken(code).subscribe(
            response => {
              sessionStorage.setItem('user_id', `${response.user_id}`);

              this.router.navigate(['/']);
            }
          );
        } else {
          console.error('No code parameter found');
        }
      });
    }
  }
}