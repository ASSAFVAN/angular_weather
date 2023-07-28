import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { FavoritesService } from 'src/app/services/favorites.service';
import { WeatherService } from 'src/app/services/weather.service';
import { FavoritesInterface } from 'src/app/types/favoritesInterface';
import { convertTime, ToFahrenheit } from 'src/app/utils/utils';

@Component({
  selector: 'app-favorite-city',
  templateUrl: './favorite-city.component.html',
  styleUrls: ['./favorite-city.component.scss'],
})
export class FavoriteCityComponent {
  @Input() isCelsius = false;
  @Input() item: FavoritesInterface;

  isDayTime = true;
  convertTime = convertTime;
  toFahrenheit = ToFahrenheit;

  constructor(
    private favoritesService: FavoritesService,
    private weatherService: WeatherService,
    private router: Router
  ) {}

  goToCityForecast(item: FavoritesInterface): void {
    this.weatherService.setSelectedSuggestion(item.cityCode, item.cityName);
    this.router.navigate(['/']);
  }

  removeFromFavorites(cityCode: string): void {
    this.favoritesService.removeFromFavorites(cityCode);
  }
}
