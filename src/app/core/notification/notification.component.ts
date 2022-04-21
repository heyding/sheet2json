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

  headline: string | undefined;
  message: string | undefined;


  constructor(private router: Router, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    // subscribe to new notification notifications
    this.notificationsSubscription = this.notificationService.onNotification(this.id)
      .subscribe(notification => {
        this.headline = notification.headline;
        this.message = notification.message;
        // clear notifications when an empty notification is received
        if (!notification.message) {
          // filter out notifications without 'keepAfterRouteChange' flag
          this.notifications = this.notifications.filter(x => x.keepAfterRouteChange);

          // remove 'keepAfterRouteChange' flag on the rest
          this.notifications.forEach(x => delete x.keepAfterRouteChange);
          return;
        }

        // add notification to array
        this.notifications.push(notification);

        // auto close notification if required
        if (notification.autoClose) {
          setTimeout(() => this.removeNotification(notification), 3000);
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
      // fade out notification
      // @ts-ignore
      this.notifications.find(x => x === notification).fade = true;

      // remove notification after faded out
      setTimeout(() => {
        this.notifications = this.notifications.filter(x => x !== notification);
      }, 250);
    } else {
      // remove notification
      this.notifications = this.notifications.filter(x => x !== notification);
    }
  }
}
