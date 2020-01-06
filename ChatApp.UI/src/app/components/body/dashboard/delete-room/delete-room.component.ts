import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { RoomModel } from 'src/app/models/room.interface';
import { RoomService } from 'src/app/services/room.service';


@Component({
  selector: 'app-delete-room',
  templateUrl: './delete-room.component.html',
  styleUrls: ['./delete-room.component.scss']
})
export class DeleteRoomComponent {
  constructor(
    private roomService: RoomService,
    private matDialogRef: MatDialogRef<DeleteRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public room: RoomModel
  ) {
    matDialogRef.backdropClick().subscribe(() => {
      this.close();
    });
  }

  deleteRoom() {
    this.roomService.deleteRoom(this.room.id).subscribe(() => {
      this.matDialogRef.close({ error: null })
    }, error => {
      this.matDialogRef.close({ error: error });
    });
  }

  close() {
    this.matDialogRef.close({ error: -1 });
  }
}