import { Component } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor() {}

  hubConnection: any;

  ngOnInit() {
    console.log(signalR);

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(
        'https://dev-dcrm-back.asist-lab.com/api/CoreAPIService/notification?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI4IiwianRpIjoiMDg3MzY5MmItMTJiOS00MDZiLTk0MTgtNDk3Y2NkNjcwZDg4Iiwicm9sZSI6InN1cGVyX2FkbWluIiwicGVybWlzc2lvbiI6WyJyZXF1ZXN0X21hbmFnZSIsInJlcXVlc3RfY3JlYXRlIiwidXNlcl9zdXBlcl9mdWxsIiwibWFpbGJveF9tYW5hZ2UiLCJtYWlsYm94X3JlYWQiLCJ1c2VyX21hbmFnZXJfY3JlYXRlIiwicmVxdWVzdF9yZWFkIiwidXNlcl9yZWd1bGFyX2NyZWF0ZSJdLCJuYmYiOjE2ODMyOTY1ODQsImV4cCI6MTY4MzM4Mjk4NCwiaWF0IjoxNjgzMjk2NTg0fQ.RsWvh2Px8FXKoNqG7MSTupuobmhDcTbGmvNIvBgDF9k')
      .build();

    this.hubConnection.on('Notify', (res: any) => console.log('hi', res));

    this.hubConnection.start()
        .then((res: any) => console.log(res))
        .catch(function (err: any) {
            return console.error(err.toString());
        });
  }

  onSend() {
    this.hubConnection.on(
      'Receive',

      () => {
        this.hubConnection
          .invoke('Send', 'Any message')
          .catch(function (err: any) {
            return console.error(err.toString());
          });
      }
    );
  }
}
