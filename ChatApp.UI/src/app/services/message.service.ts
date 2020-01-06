import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { HubConnectionBuilder } from '@aspnet/signalr';

import { MessageModel } from '../models/message.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class MessageService implements OnInit {
  userConnected = new EventEmitter<string>();
  messageReceived = new EventEmitter<MessageModel>();
  userCount = new EventEmitter<number>();
  private _hubConnection: signalR.HubConnection;

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  ngOnInit() {
    this._hubConnection.invoke("OnConnectedAsync").catch(err => {
      return console.error(err.toString());
    });
  }

  private createConnection(): void {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(environment.url + "/messages")
      .build();
  }

  private startConnection(): void {
    this._hubConnection
      .start()
      .catch(err => {
        console.log(err);
        console.log('Error while establishing connection, retrying...');
        setTimeout(() => { this.startConnection(); }, 5000);
      });
  }

  sendMessage(message: MessageModel, room: string) {
    this._hubConnection.invoke("SendMessageToGroup", room, message).catch(err => {
      return console.error(err.toString());
    });
  }

  joinRoom(room: string) {
    this._hubConnection.invoke("JoinGroup", room).catch(err => {
      return console.error(err.toString());
    });
  }

  leaveRoom(room: string) {
    this._hubConnection.invoke("LeaveGroup", room).catch(err => {
      return console.error(err.toString());
    });
  }

  registerOnServerEvents() {
    this._hubConnection.on("UserConnected", (connectionId: string) => {
      this.userConnected.emit(connectionId);
    });

    this._hubConnection.on('ReceiveMessage', (data: MessageModel) => {
      this.messageReceived.emit(data);
    });

    this._hubConnection.on("UserCount", (userCount: number) => {
      this.userCount.emit(userCount);
    });
  }
}