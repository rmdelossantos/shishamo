import { NextResponse } from "next/server";
import {
  IndicatorEntry,
  WorldBankData,
  IndicatorResponse,
} from "@/types/worldBank";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const indicator = searchParams.get("indicator");
  const yearsParam = searchParams.get("years");
  const years = Number(yearsParam) || 10;

  if (!code || !indicator) {
    return NextResponse.json(
      { error: "Missing required query parameters: code and indicator" },
      { status: 400 }
    );
  }

  const url = `https://api.worldbank.org/v2/country/${code}/indicator/${indicator}?format=json&per_page=${years}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 300 },
    });

    const json = await res.json();
    const [metadataRaw, entriesRaw] = json as [WorldBankData, IndicatorEntry[]];

    if (!metadataRaw || !Array.isArray(entriesRaw)) {
      return NextResponse.json(
        { error: "Unexpected World Bank API response" },
        { status: 502 }
      );
    }

    const data = entriesRaw
      .filter((entry) => entry.value !== null)
      .sort((a, b) => Number(b.date) - Number(a.date))
      .slice(0, years);

    const response: IndicatorResponse = { data };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch indicator data" },
      { status: 500 }
    );
  }
}
