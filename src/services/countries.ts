import { FetchCountriesParams, CountriesResponse } from "@/types/countries";

export const getCountries = async ({
  page,
  perPage = 50,
  timeoutMs = 10000,
}: FetchCountriesParams): Promise<CountriesResponse> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(
      `/api/wb/countries?page=${page}&per_page=${perPage}`,
      { signal: controller.signal }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }

    const result: CountriesResponse = await response.json();
    return result;
  } finally {
    clearTimeout(timeout);
  }
};
