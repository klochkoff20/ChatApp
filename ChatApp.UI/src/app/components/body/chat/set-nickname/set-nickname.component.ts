import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-set-nickname',
  templateUrl: './set-nickname.component.html',
  styleUrls: ['./set-nickname.component.scss']
})
export class SetNicknameComponent implements OnInit {
  setNickNameForm: FormGroup;

  constructor(
    private matDialogRef: MatDialogRef<SetNicknameComponent>,
  ) {
    matDialogRef.backdropClick().subscribe(() => {
      this.close();
    });
  }

  ngOnInit() {
    this.setNickNameForm = new FormGroup({
      'name': new FormControl(null, [Validators.maxLength(50)])
    });
  }

  setNickName() {
    this.matDialogRef.close(this.setNickNameForm.get('name').value);
  }

  close() {
    this.matDialogRef.close('anonymous');
  }
}