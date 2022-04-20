import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  displayNotification: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  // TODO make sure that the notification is closed correctly

  closeNotification(): void {
    this.displayNotification = false;
  }

}
