import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { RoomModel } from 'src/app/models/room.interface';
import { RoomService } from 'src/app/services/room.service';


@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.scss']
})
export class UpdateRoomComponent implements OnInit {
  updateRoomForm: FormGroup;

  constructor(
    private roomService: RoomService,
    private matDialogRef: MatDialogRef<UpdateRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public room: RoomModel
  ) {
    matDialogRef.backdropClick().subscribe(() => {
      this.close();
    });
  }

  ngOnInit() {
    this.updateRoomForm = new FormGroup({
      'roomName': new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      'roomDescription': new FormControl(null, [Validators.maxLength(128)])
    });

    this.updateRoomForm.get('roomName').setValue(this.room.name);
    this.updateRoomForm.get('roomDescription').setValue(this.room.description);
  }

  updateRoom() {
    let updatedRoom: RoomModel = {
      id: this.room.id,
      name: this.updateRoomForm.get('roomName').value,
      description: this.updateRoomForm.get('roomDescription').value
    }

    this.roomService.updateRoom(updatedRoom).subscribe(() => {
      this.matDialogRef.close({ error: null })
    }, error => {
      this.matDialogRef.close({ error: error });
    });
  }

  close() {
    this.matDialogRef.close({ error: -1 });
  }
}