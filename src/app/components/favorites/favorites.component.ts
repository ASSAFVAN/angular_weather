import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';

import { FavoritesService } from 'src/app/services/favorites.service';
import { WeatherService } from 'src/app/services/weather.service';
import { FavoritesInterface } from 'src/app/types/favoritesInterface';
import { convertTime, ToFahrenheit } from 'src/app/utils/utils';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favorites: FavoritesInterface[];
  private unsubscribe$ = new Subject<void>();
  isDayTime = true;
  convertTime = convertTime;
  toFahrenheit = ToFahrenheit;
  isCelsius = false;
  subscription: Subscription;

  constructor(
    private favoritesService: FavoritesService,
    private weatherService: WeatherService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initilize();
  }

  initilize(): void {
    this.getUpdatedWeather();
    this.subscription = this.weatherService.isCelsius$.subscribe(
      (isCelsius) => {
        this.isCelsius = isCelsius;
      }
    );
  }

  getUpdatedWeather(): void {
    this.favoritesService.favorites$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((favorites) => {
        this.favorites = favorites;
        favorites.forEach((city) => {
          this.weatherService
            .getCurrentCityConditions(city.cityCode)
            .subscribe((updatedConditions) => {
              this.favoritesService.updateWeatherDataForCity(
                city.cityCode,
                updatedConditions[0]
              );
            });
        });
      });
  }

  goToCityForecast(item: FavoritesInterface): void {
    this.weatherService.setSelectedSuggestion(item.cityCode, item.cityName);
    this.router.navigate(['/']);
  }

  removeFromFavorites(cityCode: string): void {
    this.favoritesService.removeFromFavorites(cityCode);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.subscription.unsubscribe();
  }
}
