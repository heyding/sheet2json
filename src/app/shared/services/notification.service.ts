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

  // enable subscribing to alerts observable
  onNotification(id = this.defaultId): Observable<Notification> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  // convenience methods
  success(headline: string, message: string, options?: any) {
    this.notify(new Notification({...options, type: NotificationType.Success, headline, message}));
  }

  error(headline: string, message: string, options?: any) {
    this.notify(new Notification({...options, type: NotificationType.Error, headline, message}));
  }

  // main alert method
  notify(notification: Notification) {
    notification.id = notification.id || this.defaultId;
    this.subject.next(notification);
  }

  // clear alerts
  clear(id = this.defaultId) {
    this.subject.next(new Notification({id}));
  }


}
