import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.route.queryParams.subscribe(params => {
        const code = params['code'];

        if (code) {
          this.authService.handleCallback(code);
        } else {
          console.error('code not found in query parameters');
        }
      });
    }
  }
}