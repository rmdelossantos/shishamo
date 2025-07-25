import { NextResponse } from "next/server";
import {
  WorldBankCountry,
  WorldBankData,
  CountriesResponse,
} from "@/types/countries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "1000";

  const url = `https://api.worldbank.org/v2/country?format=json&page=${page}&per_page=${per_page}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 300 },
    });

    const json = await res.json();
    const [metadataRaw, countriesRaw] = json as [
      WorldBankData,
      WorldBankCountry[]
    ];

    if (!metadataRaw || !Array.isArray(countriesRaw)) {
      return NextResponse.json(
        { error: "Unexpected World Bank API response" },
        { status: 502 }
      );
    }

    const response: CountriesResponse = {
      data: countriesRaw,
      total: metadataRaw.total,
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch countries" },
      { status: 500 }
    );
  }
}
