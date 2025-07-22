export type WorldBankCountry = {
  id: string;
  iso2Code: string;
  name: string;
  region: { id: string; value: string };
  adminregion: { id: string; value: string };
  incomeLevel: { id: string; value: string };
  lendingType: { id: string; value: string };
  capitalCity: string;
  longitude: string;
  latitude: string;
};

export type WorldBankData = {
  page: number;
  pages: number;
  perPage: string;
  total: number;
};

export type CountriesResponse = {
  data: WorldBankCountry[];
  total: number;
};

export type IndicatorEntry = {
  country: { id: string; value: string };
  indicator: { id: string; value: string };
  value: number | null;
  decimal: number;
  date: string;
};

export type IndicatorResponse = {
  data: IndicatorEntry[];
};
