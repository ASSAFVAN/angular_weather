import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';

import { WeatherService } from 'src/app/services/weather.service';
import { AutocompleteInterface } from 'src/app/types/autocompleteInterface';
import { CurrentConditionsInterface } from 'src/app/types/currentConditionsInterface';
import {
  NOTIFICATIONS_CONFIG,
  notificationsConfig,
} from 'src/app/services/notifications.config';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-autocomplete-search',
  templateUrl: './autocomplete-search.component.html',
  styleUrls: ['./autocomplete-search.component.scss'],
  providers: [{ provide: NOTIFICATIONS_CONFIG, useValue: notificationsConfig }],
})
export class AutocompleteSearchComponent implements OnInit {
  results$?: Observable<AutocompleteInterface[]>;
  currentCityConditions$?: Observable<CurrentConditionsInterface>;
  searchControl = new FormControl('', [Validators.pattern('^[a-zA-Z -]+$')]);

  @Input() selectedCity = '';

  constructor(
    private weatherService: WeatherService,
    private notifcationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.getCitiesResults();
  }

  getCitiesResults(): void {
    this.results$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query: string) => {
        if (!this.searchControl.invalid) {
          return this.weatherService.getAutocompleteResults(query).pipe(
            catchError((error) => {
              this.notifcationsService.showError(
                notificationsConfig.serverError
              );
              return of([]);
            })
          );
        } else {
          this.notifcationsService.showError(
            notificationsConfig.onlyEnglishLettersError
          );
          return of([]);
        }
      })
    );
  }

  selectCity(cityKey: string, cityName: string): void {
    this.weatherService.setSelectedSuggestion(cityKey, cityName);
    this.clearQuery();
  }

  clearQuery(): void {
    this.searchControl.setValue('');
  }
}
