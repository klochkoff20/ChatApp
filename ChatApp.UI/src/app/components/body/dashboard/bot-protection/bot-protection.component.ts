import { Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-bot-protection',
  templateUrl: './bot-protection.component.html',
  styleUrls: ['./bot-protection.component.scss']
})
export class BotProtectionComponent implements OnInit {
  botProtectionForm: FormGroup;
  firstNumber: number;
  secondNumber: number;
  invalidResult = false;
  timeLeft: number = 30;
  interval;

  constructor(
    private matDialogRef: MatDialogRef<BotProtectionComponent>,
    @Inject(MAT_DIALOG_DATA) public room: string,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.botProtectionForm = new FormGroup({
      'result': new FormControl(null, [Validators.required, Validators.min(0)])
    });

    this.firstNumber = Math.floor(Math.random() * 10) + 1;
    this.secondNumber = Math.floor(Math.random() * 10) + 1;

    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.close();
      }
    },1000)
  }

  openRoom() {
    if (this.botProtectionForm.get('result').value == this.firstNumber + this.secondNumber) {
      this.close();
      this.router.navigate(['/chat', this.room]);
    } else {
      this.invalidResult = true;
    }
  }

  close() {
    this.matDialogRef.close();
  }
}