import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { RoomModel } from 'src/app/models/room.interface';
import { RoomService } from 'src/app/services/room.service';
import { UpdateRoomComponent } from './update-room/update-room.component';
import { DeleteRoomComponent } from './delete-room/delete-room.component';
import { BotProtectionComponent } from './bot-protection/bot-protection.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashboardForm: FormGroup;
  rooms: RoomModel[] = [];
  isLoading = false;
  error = null;

  constructor(private roomService: RoomService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.dashboardForm = new FormGroup({
      'roomName': new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      'roomDescription': new FormControl(null, [Validators.maxLength(128)])
    });

    this.GetRooms();
  }

  GetRooms() {
    this.isLoading = true;

    this.roomService.getRooms().subscribe(responce => {
      this.rooms = responce;
      this.isLoading = false;
      this.handleError();
    }, error => {
      this.error = error.message;
      console.log(error);
    });
  }

  onCreateRoom() {
    let room: RoomModel = {
      id: 0,
      name: this.dashboardForm.get('roomName').value,
      description: this.dashboardForm.get('roomDescription').value
    };

    this.roomService.postRoom(room).subscribe(() => {
      this.GetRooms();
      this.dashboardForm.reset();
    }, error => {
      this.error = error.message;
      console.log(error);
    });
  }

  onUpdateRoom(room: RoomModel) {
    this.dialog.open(UpdateRoomComponent, { data: room, panelClass: 'custom-dialog-container' }).afterClosed().subscribe(responce => {
      if (!responce.error)
        this.GetRooms();
      else if (responce.error !== -1) {
        this.error = responce.error.message;
        console.log(responce.error);
      }
    });
  }

  onDeleteRoom(room: RoomModel) {
    this.dialog.open(DeleteRoomComponent, { data: room, panelClass: 'custom-dialog-container' }).afterClosed().subscribe(responce => {
      if (!responce.error)
        this.GetRooms();
      else if (responce.error !== -1) {
        this.error = responce.error.message;
        console.log(responce.error);
      }
    });
  }

  onJoinRoom(room: RoomModel) {
    this.dialog.open(BotProtectionComponent, { data: room.name, panelClass: 'custom-dialog-container' });
  }

  handleError() {
    this.error = null;
  }
}