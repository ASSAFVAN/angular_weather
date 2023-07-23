import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs/operators';

import { WeatherService } from 'src/app/services/weather.service';
import { AutocompleteInterface } from 'src/app/types/autocompleteInterface';
import { CurrentConditionsInterface } from 'src/app/types/currentConditions';

@Component({
  selector: 'app-autocomplete-search',
  templateUrl: './autocomplete-search.component.html',
  styleUrls: ['./autocomplete-search.component.scss'],
})
export class AutocompleteSearchComponent implements OnInit {
  results$?: Observable<AutocompleteInterface[]>;
  currentCityConditions$?: Observable<CurrentConditionsInterface>;
  searchControl = new FormControl();
  errorMessage = '';

  @Input() selectedCity = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getCitiesResults();
  }

  getCitiesResults(): void {
    this.results$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap((query) => console.log('Query:', query)),
      switchMap((query) =>
        this.weatherService.getAutocompleteResults(query).pipe(
          catchError((error) => {
            this.errorMessage =
              'An error occurred while fetching results. Please try again.';
            return of([]);
          })
        )
      )
    );
  }

  selectCity(cityKey: string): void {
    console.log(cityKey, 'city key');

    this.weatherService.setSelectedSuggestion(cityKey);
    this.clearResults();
  }

  clearQuery(): void {
    this.searchControl.setValue('');
  }

  clearResults() {
    this.clearQuery();
    this.results$ = of([]);
  }

  // clearQuery(query: string): void {
  //   if (query) {
  //     this.searchControl.setValue('');
  //   }
  // }
  // clearText(inputField: string): void {
  //   inputField === 'name' ? (this.isNameEmpty = true) : (this.isEmailEmpty = true);
  //   this.signUpForm.get(inputField)?.setValue('');
  // }
}
