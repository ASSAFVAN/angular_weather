import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { apikey, baseUrl } from './config';
import { AutocompleteInterface } from '../types/autocompleteInterface';
import { CurrentConditionsInterface } from '../types/currentConditions';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private selectedSuggestionSubject = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  getAutocompleteResults(query: string): Observable<AutocompleteInterface[]> {
    return this.http.get<AutocompleteInterface[]>(
      `${baseUrl}/locations/v1/cities/autocomplete?apikey=${apikey}&q=${query}&language=en-us`
    );
  }

  getCurrentCityConditions(
    locationKey: string
  ): Observable<CurrentConditionsInterface[]> {
    return this.http.get<CurrentConditionsInterface[]>(
      `${baseUrl}/currentconditions/v1/${locationKey}?apikey=${apikey}`
    );
  }

  getFiveDaysForcast() {}

  setSelectedSuggestion(suggestion: string): void {
    this.selectedSuggestionSubject.next(suggestion);
  }

  getSelectedSuggestion(): Observable<string> {
    return this.selectedSuggestionSubject.asObservable();
  }
}
