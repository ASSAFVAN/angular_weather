import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { FavoritesService } from 'src/app/services/favorites.service';
import { WeatherService } from 'src/app/services/weather.service';
import { CurrentConditionsInterface } from 'src/app/types/currentConditionsInterface';
import { FavoritesInterface } from 'src/app/types/favoritesInterface';
import { ToFahrenheit } from 'src/app/utils/utils';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent implements AfterViewInit, OnInit {
  @Input() currentData?: CurrentConditionsInterface;
  @Input() cityName = '';
  @Input() cityCode = '';

  isCelsius: boolean;
  toFahrenheit = ToFahrenheit;
  toggle = false;
  subscription: Subscription;

  constructor(
    private favoritesService: FavoritesService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.subscription = this.weatherService.isCelsius$.subscribe((value) => {
      this.isCelsius = value;
    });
  }

  ngAfterViewInit() {
    if (this.currentData) {
      this.setImageBackground(this.currentData.WeatherIcon);
    }
  }

  setImageBackground(icon: number): void {
    let divContainer = <HTMLElement>(
      document.getElementsByClassName('current-weather-container')[0]
    );
    if (icon !== undefined) {
      const imageUrl = `https://developer.accuweather.com/sites/default/files/${icon
        .toString()
        .padStart(2, '0')}-s.png`;
      divContainer.style.backgroundImage = `url('${imageUrl}')`;
    }
  }

  toggleFavorites(): void {
    const item: FavoritesInterface = {
      cityCode: this.cityCode,
      cityName: this.cityName,
      currentWeather: this.currentData,
    };
    const isExists = this.isExistsInFavorites(this.cityCode);

    isExists
      ? this.favoritesService.removeFromFavorites(this.cityCode)
      : this.favoritesService.addToFavorites(item);

    this.toggle = !isExists;
  }

  private isExistsInFavorites(location: string): boolean {
    const favorites = this.favoritesService.getFavorites();
    const isExists = false;
    for (const property of favorites) {
      if (property.cityCode === location) {
        return true;
      }
    }
    return isExists;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
