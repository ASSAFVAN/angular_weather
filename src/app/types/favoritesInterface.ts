import { CurrentConditionsInterface } from './currentConditionsInterface';

export interface FavoritesInterface {
  cityCode: string;
  cityName: string;
  currentWeather: CurrentConditionsInterface;
}
