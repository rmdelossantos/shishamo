"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  BarChart3,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IndicatorEntry, IndicatorResponse } from "@/types/worldBank";

const INDICATORS = {
  population: {
    code: "SP.POP.TOTL",
    name: "Population",
    icon: Users,
    format: (value: number | null) =>
      value ? new Intl.NumberFormat("en-US").format(value) : "N/A",
  },
  gdp: {
    code: "NY.GDP.PCAP.CD",
    name: "GDP per Capita",
    icon: DollarSign,
    format: (value: number | null) =>
      value
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(value)
        : "N/A",
  },
};

const YEAR_RANGES = [
  { value: "5", label: "Last 5 years" },
  { value: "10", label: "Last 10 years" },
  { value: "15", label: "Last 15 years" },
  { value: "20", label: "Last 20 years" },
];

export default function CountryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const countryCode = params.code as string;

  const selectedIndicator =
    (searchParams.get("indicator") as keyof typeof INDICATORS) || "population";
  const selectedYears = searchParams.get("years") || "10";

  const [indicatorData, setIndicatorData] = useState<IndicatorEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [countryName, setCountryName] = useState<string>("");

  useEffect(() => {
    if (countryCode) {
      fetchIndicatorData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryCode, selectedIndicator, selectedYears]);

  const fetchIndicatorData = async () => {
    try {
      setLoading(true);
      setError(null);

      const indicator = INDICATORS[selectedIndicator];
      const response = await fetch(
        `/api/wb/indicators?code=${countryCode.toUpperCase()}&indicator=${
          indicator.code
        }&years=${selectedYears}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch country data");
      }

      const result: IndicatorResponse = await response.json();

      if (result.data && result.data.length > 0) {
        setCountryName(result.data[0].country.value);
        setIndicatorData(
          result.data.filter((item) => item.value !== null).reverse()
        );
      } else {
        throw new Error("No data available for this country");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const updateUrlParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`/countries/${countryCode}?${params.toString()}`);
  };

  const currentIndicator = INDICATORS[selectedIndicator];
  const IconComponent = currentIndicator.icon;
  const latestData = indicatorData[indicatorData.length - 1];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Skeleton className="h-10 w-32 mb-4" />
          <Skeleton className="h-8 w-64" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>

        <Card className="mb-6">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-24" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link href="/countries">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Countries
          </Button>
        </Link>

        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/countries">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Countries
          </Button>
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-3xl font-bold tracking-tight">{countryName}</h1>
          <Badge variant="outline" className="text-base px-3 py-1">
            {countryCode.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Indicator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={selectedIndicator}
              onValueChange={(value) => updateUrlParams("indicator", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="population">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Population
                  </div>
                </SelectItem>
                <SelectItem value="gdp">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    GDP per Capita
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Time Range
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={selectedYears}
              onValueChange={(value) => updateUrlParams("years", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {YEAR_RANGES.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Latest Value Card */}
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Latest {currentIndicator.name}
          </CardTitle>
          <IconComponent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {latestData ? currentIndicator.format(latestData.value) : "N/A"}
          </div>
          {latestData && (
            <p className="text-xs text-muted-foreground mt-1">
              as of {latestData.date}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Historical Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          {indicatorData.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Year</TableHead>
                    <TableHead className="text-right">
                      {currentIndicator.name}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {indicatorData.map((row) => (
                    <TableRow key={row.date}>
                      <TableCell className="font-medium">{row.date}</TableCell>
                      <TableCell className="text-right font-mono">
                        {currentIndicator.format(row.value)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No data available</h3>
              <p>
                No {currentIndicator.name.toLowerCase()} data found for this
                country.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
