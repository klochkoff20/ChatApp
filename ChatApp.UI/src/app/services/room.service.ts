import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RoomModel } from '../models/room.interface';
import { environment } from 'src/environments/environment';


@Injectable({providedIn: 'root'})
export class RoomService {
  host = environment.url + '/Room'

  constructor(private http: HttpClient) {
  }

  getRooms() {
    return this.http.get<RoomModel[]>(this.host);
  }

  postRoom(room: RoomModel) {
    return this.http.post<RoomModel>(this.host, room);
  }

  updateRoom(room: RoomModel) {
    return this.http.put<RoomModel>(this.host, room);
  }

  deleteRoom(id: number) {
    return this.http.delete(this.host + '/' + id);
  }
}