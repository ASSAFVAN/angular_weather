import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, map, switchMap, takeUntil, tap } from 'rxjs/operators';

import { FavoritesService } from 'src/app/services/favorites.service';
import { WeatherService } from 'src/app/services/weather.service';
import { CityCodeInterface } from 'src/app/types/commonInterface';
import { CurrentConditionsInterface } from 'src/app/types/currentConditionsInterface';
import { FiveDaysForecastInterface } from 'src/app/types/fiveDaysForecastInterface';
import { GeoPositionInterface } from 'src/app/types/geoPositionInterface';
import {
  NOTIFICATIONS_CONFIG,
  notificationsConfig,
} from 'src/app/services/notifications.config';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [{ provide: NOTIFICATIONS_CONFIG, useValue: notificationsConfig }],
})
export class MainComponent implements OnInit {
  currentCityConditions$?: Observable<CurrentConditionsInterface>;
  fiveDaysForecast$?: Observable<FiveDaysForecastInterface>;
  cityForecastDetails$?: Observable<{
    current: CurrentConditionsInterface;
    forecast: FiveDaysForecastInterface;
  }>;
  private unsubscribe$ = new Subject<void>();
  cityName = '';
  cityCode = '';

  constructor(
    private weatherService: WeatherService,
    private favoritesService: FavoritesService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.getCityByGeoLocation();
  }

  getCityByGeoLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.weatherService
            .getWeatherByGeoPosition(latitude, longitude)
            .pipe(
              catchError((error) => {
                this.notificationsService.showError(
                  notificationsConfig.serverError
                );
                return of();
              })
            )
            .subscribe((locationData: GeoPositionInterface) => {
              this.cityName = locationData.LocalizedName;
              this.cityCode = locationData.Key;
              this.setDefaultCity();
              this.getCityForecast();
            });
        },
        (error) => {
          this.cityName = 'Tel Aviv';
          this.cityCode = '215854';
          this.setDefaultCity();
          this.getCityForecast();
        }
      );
    } else {
      this.cityName = 'Tel Aviv';
      this.cityCode = '215854';
      this.setDefaultCity();
      this.getCityForecast();
    }
  }

  setDefaultCity(): void {
    this.currentCityConditions$ = this.weatherService.getCurrentCityConditions(
      this.cityCode
    );
    this.fiveDaysForecast$ = this.weatherService.getFiveDaysForcast(
      this.cityCode
    );
    this.cityForecastDetails$ = combineLatest([
      this.currentCityConditions$,
      this.fiveDaysForecast$,
    ]).pipe(
      map(([current, forecast]) => ({ current, forecast })),
      catchError((error) => {
        this.notificationsService.showError(notificationsConfig.serverError);
        return of();
      })
    );
  }

  getCityForecast(): void {
    this.weatherService
      .getSelectedSuggestion()
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError((error) => {
          this.notificationsService.showError(notificationsConfig.serverError);
          return of([]);
        }),
        switchMap((city: CityCodeInterface) => {
          if (city && city.keyCode) {
            this.cityName = city.cityName;
            this.cityCode = city.keyCode;
            this.currentCityConditions$ =
              this.weatherService.getCurrentCityConditions(city.keyCode);
            this.fiveDaysForecast$ = this.weatherService.getFiveDaysForcast(
              city.keyCode
            );
            this.cityForecastDetails$ = combineLatest([
              this.currentCityConditions$,
              this.fiveDaysForecast$,
            ]).pipe(
              tap(([current, forecast]) => {
                // this.favoritesService.updateWeatherDataForCity(
                //   city.keyCode,
                //   current[0]
                // );
              }),
              map(([current, forecast]) => ({ current, forecast }))
            );
          }
          return of(null);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
