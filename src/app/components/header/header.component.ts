import { Component } from '@angular/core';

import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isCelsius = true;
  constructor(private weatherService: WeatherService) {}

  toggleTemperature(): void {
    this.weatherService.toggleTemperature();
  }

  getTempratureText(): boolean {
    return this.weatherService.getIsCelsiusValue()
      ? (this.isCelsius = true)
      : (this.isCelsius = false);
  }
}
