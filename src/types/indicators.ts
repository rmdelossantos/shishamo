export type FetchIndicatorParams = {
  countryCode: string;
  indicatorCode: string;
  selectedYears: string;
  timeoutMs?: number;
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
