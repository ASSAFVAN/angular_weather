import { InjectionToken } from '@angular/core';

export interface NotificationsConfig {
  serverError: string;
  onlyEnglishLettersError: string;
}

export const notificationsConfig: NotificationsConfig = {
  serverError: 'An error occurred while fetching results. Please try again.',
  onlyEnglishLettersError: 'Please use only english letters',
};

export const NOTIFICATIONS_CONFIG = new InjectionToken<NotificationsConfig>(
  'notifications-config'
);
