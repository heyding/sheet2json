export class Notification {
  id: string | undefined;
  type: NotificationType | undefined;
  autoClose: boolean | undefined;
  keepAfterRouteChange: boolean | undefined;
  fade: boolean | undefined;

  constructor(init?: Partial<Notification>) {
    Object.assign(this, init);
  }
}

export enum NotificationType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning'
}
