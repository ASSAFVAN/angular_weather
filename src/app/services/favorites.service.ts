import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CurrentConditionsInterface } from '../types/currentConditionsInterface';
import { FavoritesInterface } from '../types/favoritesInterface';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<FavoritesInterface[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  private localStorageKey = 'favorites';

  constructor() {
    const favorites = JSON.parse(
      localStorage.getItem(this.localStorageKey) || '[]'
    );
    this.favoritesSubject.next(favorites);
  }

  private updateLocalStorage(favorites: FavoritesInterface[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(favorites));
  }

  private isExistsLocation(location: string): boolean {
    const favorites = this.getFavorites();
    const isExists = false;
    for (const property of favorites) {
      if (property.cityCode === location) {
        return true;
      }
    }
    return isExists;
  }

  getFavorites(): FavoritesInterface[] {
    return this.favoritesSubject.getValue();
  }
  addToFavorites(item: FavoritesInterface): void {
    const favorites = this.getFavorites();
    const itemExists = this.isExistsLocation(item.cityCode);
    const thruthyItem = item.currentWeather.EpochTime;

    if (thruthyItem && !itemExists) {
      favorites.push(item);
      this.favoritesSubject.next(favorites);
      this.updateLocalStorage(favorites);
    }
  }

  removeFromFavorites(cityCode: string): void {
    const favorites = this.getFavorites().filter(
      (item) => item.cityCode !== cityCode
    );
    this.favoritesSubject.next(favorites);
    this.updateLocalStorage(favorites);
  }

  updateWeatherDataForCity(
    cityId: string,
    updatedWeatherData: CurrentConditionsInterface
  ): void {
    const favorites = this.getFavorites();
    const cityIndex = favorites.findIndex((item) => item.cityCode === cityId);
    const currentWeatherChanged =
      JSON.stringify(favorites[cityIndex].currentWeather) !==
      JSON.stringify(updatedWeatherData);
    if (currentWeatherChanged) {
      favorites[cityIndex].currentWeather = updatedWeatherData;
      this.favoritesSubject.next(favorites);
      this.updateLocalStorage(favorites);
    }
  }
}
