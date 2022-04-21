export class Notification {
  id: string | undefined;
  type: NotificationType | undefined;
  headline: string | undefined;
  message: string | undefined;
  icon: string | undefined;
  autoClose: boolean | undefined;
  keepAfterRouteChange: boolean | undefined;
  fade: boolean | undefined;

  constructor(init?: Partial<Notification>) {
    Object.assign(this, init);
  }
}

export enum NotificationType {
  Success,
  Error,
  Info,
  Warning
}
