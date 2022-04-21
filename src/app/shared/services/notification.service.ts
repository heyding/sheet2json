import {Injectable} from '@angular/core';
import {filter, Observable, Subject} from 'rxjs';
import {Notification, NotificationType} from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private subject = new Subject<Notification>();
  private defaultId = 'default-notification';

  constructor() {
  }

  // enable subscribing to notifications observable
  onNotification(id = this.defaultId): Observable<Notification> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  // convenience methods
  success(options?: any) {
    this.notify(new Notification({...options, type: NotificationType.Success}));
  }

  error(options?: any) {
    this.notify(new Notification({...options, type: NotificationType.Error}));
  }

  // main notification method
  notify(notification: Notification) {
    notification.id = notification.id || this.defaultId;
    this.subject.next(notification);
  }

  // clear notifications
  clear(id = this.defaultId) {
    this.subject.next(new Notification({id}));
  }


}
