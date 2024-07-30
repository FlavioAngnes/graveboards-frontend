import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private servicesService: ServicesService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params["code"];
      console.log(code);
      if (code) {
        this.servicesService.postToken(code);
      } else {
        console.error('No code parameter found');
      };
    })
};



}