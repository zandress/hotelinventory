import { HttpEventType, HttpRequest } from '@angular/common/http';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  SkipSelf,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, map, Observable, of, Subject, Subscription } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { ConfigService } from '../services/config.service';
import { Room, RoomList } from './rooms';
import { RoomsService } from './services/rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit, AfterViewInit, AfterViewChecked {
  hotelName = 'Hilton Hotel';

  numberOfRooms = 10;

  hideRooms = true;

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };

  title = 'Room List';

  roomList: RoomList[] = [];

  stream = new Observable<string>((observer) => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    /* observer.error('error'); */
  });

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent)
  headerChildrenComponent!: QueryList<HeaderComponent>;

  totalBytes = 0;

  subscription!: Subscription;

  error$ = new Subject<string>();

  getError$ = this.error$.asObservable();

  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      /* console.log(err); */
      this.error$.next(err.message);
      return of([]);
    })
  );

  priceFilter = new FormControl(0);

  roomsCount$ = this.roomsService.getRooms$.pipe(map((rooms) => rooms.length));

  constructor(@SkipSelf() private roomsService: RoomsService,
  private configService: ConfigService,) {}

  ngOnInit(): void {
    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made!');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request success!');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
          break;
        }
      }
    });

    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('complete'),
      error: (err) => console.log('err'),
    });
    this.stream.subscribe((data) => console.log(data));
    /*  this.roomsService.getRooms$.subscribe((rooms) => {
      this.roomList = rooms;
    }); */
  }

  ngDoCheck() {
    console.log('on changes is called');
  }

  ngAfterViewInit(): void {
    this.headerComponent.title = 'Rooms View';

    this.headerChildrenComponent.last.title = 'Last Title';
    /* this.headerChildrenComponent.get(0).title = "First Title"; */
  }

  ngAfterViewChecked() {}

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'Rooms List';
  }

  selectRoom(room: RoomList) {
    console.log(room);
  }

  addRoom() {
    const room: RoomList = {
      /* roomNumber: '4', */
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 500,
      photos: 'https://unsplash.com/photos/oxeCZrodz78',
      checkinTime: new Date('24-Oct-2022'),
      checkoutTime: new Date('25-Oct-2022'),
      rating: 4.5,
    };

    /* this.roomList.push(room); */
    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 500,
      photos: 'https://unsplash.com/photos/oxeCZrodz78',
      checkinTime: new Date('24-Oct-2022'),
      checkoutTime: new Date('25-Oct-2022'),
      rating: 4.5,
    };

    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom() {
    this.roomsService.deleteRoom('3').subscribe((data) => {
      this.roomList = data;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
