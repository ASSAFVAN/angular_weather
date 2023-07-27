import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { API_KEY, baseUrl } from './config';
import { AutocompleteInterface } from '../types/autocompleteInterface';
import { CurrentConditionsInterface } from '../types/currentConditionsInterface';
import { FiveDaysForecastInterface } from '../types/fiveDaysForecastInterface';
import { CityCodeInterface } from '../types/commonInterface';
import { GeoPositionInterface } from '../types/geoPositionInterface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private selectedSuggestionSubject = new BehaviorSubject<CityCodeInterface>({
    keyCode: '',
    cityName: '',
  });

  private isCeliusSubject = new BehaviorSubject<boolean>(true);
  isCelsius$ = this.isCeliusSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAutocompleteResults(query: string): Observable<AutocompleteInterface[]> {
    return this.http.get<AutocompleteInterface[]>(
      `${baseUrl}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${query}&language=en-us`
    );
  }

  getCurrentCityConditions(
    locationKey: string
  ): Observable<CurrentConditionsInterface> {
    return this.http.get<CurrentConditionsInterface>(
      `${baseUrl}/currentconditions/v1/${locationKey}?apikey=${API_KEY}`
    );
  }

  getFiveDaysForcast(
    locationKey: string
  ): Observable<FiveDaysForecastInterface> {
    return this.http.get<FiveDaysForecastInterface>(
      `${baseUrl}/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&metric=true&details=true`
    );
  }

  getWeatherByGeoPosition(
    lat: number,
    lon: number
  ): Observable<GeoPositionInterface> {
    return this.http.get<GeoPositionInterface>(
      `${baseUrl}/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat}%2C${lon}&details=true`
    );
  }

  setSelectedSuggestion(keyCode: string, cityName: string): void {
    this.selectedSuggestionSubject.next({ keyCode, cityName });
  }

  getSelectedSuggestion(): Observable<CityCodeInterface> {
    return this.selectedSuggestionSubject.asObservable();
  }

  toggleTemperature(): void {
    const tempValue = this.isCeliusSubject.getValue();
    this.isCeliusSubject.next(!tempValue);
  }

  getIsCelsiusValue(): boolean {
    return this.isCeliusSubject.getValue();
  }
}
