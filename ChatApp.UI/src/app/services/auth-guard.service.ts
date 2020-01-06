import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router'
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { RoomService } from './room.service';
import { RoomModel } from '../models/room.interface';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private roomService: RoomService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {

    return this.roomService.getRooms().pipe(
      map(responce => {
        let rooms: RoomModel[] = responce;

        if (rooms.some(room => room.name == route.params['name'])) {
          return true;
        } else {
          this.router.navigate(['/not-found']);
          return false;
        }
      })
    );
  }
}