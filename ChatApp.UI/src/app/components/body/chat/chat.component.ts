import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MessageModel } from "src/app/models/message.interface";
import { MessageService } from 'src/app/services/message.service';
import { SetNicknameComponent } from './set-nickname/set-nickname.component';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy{
  messageForm: FormGroup;
  uniqueId: string;
  roomName: string;
  nickName: string;
  userCount: number;
  messages = new Array<MessageModel>();
  private messageService: MessageService = new MessageService();

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.subscribeToEvents();

    window.onbeforeunload = () => {
      this.messageService.leaveRoom(this.roomName);
    }
  }
  
  ngOnInit() {
    this.roomName = this.route.snapshot.params['name'];
    
    this.messageForm = new FormGroup({
      'message': new FormControl(null, [Validators.required, Validators.max(1024)])
    });
    
    this.dialog.open(SetNicknameComponent, { panelClass: 'custom-dialog-container' }).afterClosed().subscribe(responce => {
      this.nickName = responce;
    });    
  }

  ngOnDestroy() {
    this.messageService.leaveRoom(this.roomName);
  }

  subscribeToEvents() {
    this.messageService.userConnected.subscribe((userId: string) => {
      this.uniqueId = userId;
      this.messageService.joinRoom(this.roomName);
    });

    this.messageService.userCount.subscribe((userCount: number) => {
      this.userCount = userCount;
    });

    this.messageService.messageReceived.subscribe((message: MessageModel) => {
      if (message.senderId == this.uniqueId) {
        message.fromOwner = true;
        this.messages.push(message);
      } else {
        message.fromOwner = false;
        this.messages.push(message);
      }
    });
  }

  sendMessage() {
    let message: MessageModel = {
      senderId: this.uniqueId,
      nickName: this.nickName,
      fromOwner: true,
      date: new Date(),
      content: this.messageForm.get('message').value
    };

    this.messageService.sendMessage(message, this.roomName);
    this.messageForm.reset();
  }
}