import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.css'],
})
export class RoomsBookingComponent implements OnInit {
  id: number = 0;

  id$ = this.router.params.pipe(map((params) => params['roomid']));

  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    /* this.id = this.router.snapshot.params['roomid']; */
    /*     this.id$ = */
    /* this.router.paramMap.subscribe((params) => {
      params.get('roomid');
    }); */
    /* this.router.params.subscribe((params) => { this.id = params['roomid']}); */
  }
}
