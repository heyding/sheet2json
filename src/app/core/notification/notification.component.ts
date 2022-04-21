import {Component, Input, OnInit} from '@angular/core';
import {Notification} from '../../shared/models/notification.model';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../shared/services/notification.service';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input() id = 'default-notification';
  @Input() fade = true;

  notifications: Notification[] = [];
  notificationsSubscription: Subscription | undefined;
  routeSubscription: Subscription | undefined;

  constructor(private router: Router, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.notificationsSubscription = this.notificationService.onNotification(this.id)
      .subscribe(notification => {
        // clear notifications when an empty notification is received
        if (!notification.type) {
          // filter out notifications without 'keepAfterRouteChange' flag
          this.notifications = this.notifications.filter(x => x.keepAfterRouteChange);
          // remove 'keepAfterRouteChange' flag on the rest
          this.notifications.forEach(x => delete x.keepAfterRouteChange);
          return;
        }
        this.notifications.push(notification);
        if (notification.autoClose) {
          setTimeout(() => this.removeNotification(notification), 7000);
        }
      });

    // clear notifications on location change
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.notificationService.clear(this.id);
      }
    });
  }

  removeNotification(notification: Notification) {
    // check if already removed to prevent error on auto close
    if (!this.notifications.includes(notification)) return;

    if (this.fade) {
      // @ts-ignore
      this.notifications.find(x => x === notification).fade = true;

      setTimeout(() => {
        this.notifications = this.notifications.filter(x => x !== notification);
      }, 250);
    } else {
      this.notifications = this.notifications.filter(x => x !== notification);
    }
  }
}
