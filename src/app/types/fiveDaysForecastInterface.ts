export interface FiveDaysForecastInterface {
  Headline: ForecastHeadline;
  DailyForecasts: ForecastDetails[];
}

interface ForecastHeadline {
  EffectiveDate: string;
  EffectiveEpochDate: number;
  Severity: number;
  Text: string;
  Category: string;
  EndDate: string;
  EndEpochDate: number;
  MobileLink: string;
  Link: string;
}

export interface ForecastDetails {
  Date: string;
  EpochDate: number;
  Temperature: {
    Minimum: Temperature;
    Maximum: Temperature;
  };
  Day: {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
  };
  Night: {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
  };
  Sun: {
    Rise: string;
    Set: string;
  };
  RealFeelTemperature: {
    Maximum: {
      Value: number;
      Unit: string;
      UnitType: number;
      Phrase: string;
    };
  };
  Sources: string[];
  MobileLink: string;
  Link: string;
}

interface Temperature {
  Value: number;
  Unit: string;
  UnitType: number;
}
