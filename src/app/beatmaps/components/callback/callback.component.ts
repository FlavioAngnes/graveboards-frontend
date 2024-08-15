import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import {NgOptimizedImage} from "@angular/common";

@Component({
    selector: 'app-callback',
    standalone: true,
    templateUrl: './callback.component.html',
    imports: [
        NgOptimizedImage
    ],
    styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.route.queryParams.subscribe(params => {
        const code = params['code'];
        const error = params['error'];

        if (error) {
          console.error('Authorization error:', error);
          this.router.navigate(['/']);
        } else if (code) {
          this.authService.handleCallback(code);
        } else {
          console.error('Authorization code not found in query parameters');
          this.router.navigate(['/']);
        }
      });
    }
  }
}