import { FetchIndicatorParams, IndicatorResponse } from "@/types/indicators";

export const getIndicators = async ({
  countryCode,
  indicatorCode,
  selectedYears,
  timeoutMs = 10000,
}: FetchIndicatorParams): Promise<IndicatorResponse> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(
      `/api/wb/indicators?code=${countryCode.toUpperCase()}&indicator=${indicatorCode}&years=${selectedYears}`,
      { signal: controller.signal }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const result: IndicatorResponse = await response.json();
    return result;
  } finally {
    clearTimeout(timeout);
  }
};
