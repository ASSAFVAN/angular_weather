import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { MainComponent } from './components/main/main.component';
import { AutocompleteSearchComponent } from './components/autocomplete-search/autocomplete-search.component';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { FiveDaysForecastComponent } from './components/five-days-forecast/five-days-forecast.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DayComponent } from './components/day/day.component';
import { FavoriteCityComponent } from './components/favorite-city/favorite-city.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FavoritesComponent,
    MainComponent,
    AutocompleteSearchComponent,
    CurrentWeatherComponent,
    FiveDaysForecastComponent,
    PageNotFoundComponent,
    DayComponent,
    FavoriteCityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
