import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private toastr: ToastrService) {}

  showError(title: string) {
    this.toastr.error(title);
  }
}

('An error occurred while fetching results. Please try again.');
