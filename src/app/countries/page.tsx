"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ChevronLeft,
  ChevronRight,
  Globe,
  Grid3X3,
  List,
  Eye,
  MapPin,
  Building2,
  DollarSign,
} from "lucide-react";
import { WorldBankCountry } from "@/types/countries";
import { TableView } from "@/components/commons/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Column } from "@/types/table";
import { getCountries } from "@/services/countries";
import InputFilter from "@/components/commons/inputFilter";
import Loading from "@/app/countries/loading";

type ViewMode = "cards" | "table";

const countryColumns: Column<WorldBankCountry>[] = [
  {
    key: "name",
    header: "Country",
    className: "font-medium",
  },
  {
    key: "iso2Code",
    header: "Code",
    render: (item) => <Badge variant="secondary">{item.iso2Code}</Badge>,
  },
  {
    key: "region",
    header: "Region",
    render: (item) => item.region.value,
  },
  {
    key: "incomeLevel",
    header: "Income Level",
    render: (item) => item.incomeLevel.value,
  },
  {
    key: "capitalCity",
    header: "Capital",
    render: (item) => item.capitalCity || "N/A",
  },
  {
    key: "id",
    header: "Actions",
    className: "w-[100px]",
    render: (item) => (
      <Link href={`/countries/${item.iso2Code.toLowerCase()}`}>
        <Button variant="ghost" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </Link>
    ),
  },
];

const CountryCardsView = ({ data }: { data: WorldBankCountry[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    {data.map((country) => (
      <Link
        key={country.id}
        href={`/countries/${country.iso2Code.toLowerCase()}`}
      >
        <Card className="h-full hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="grid grid-cols-[1fr_auto] gap-2 text-lg items-start">
              <span className="line-clamp-2 break-words">{country.name}</span>
              <Badge variant="secondary" className="justify-self-end">
                {country.iso2Code}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm break-words">
              <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">Region:</span>
              <span className="truncate">{country.region.value}</span>
            </div>
            <div className="flex items-center gap-2 text-sm break-words">
              <DollarSign className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">Income:</span>
              <span className="truncate">{country.incomeLevel.value}</span>
            </div>
            {country.capitalCity && (
              <div className="flex items-center gap-2 text-sm break-words">
                <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">Capital:</span>
                <span className="truncate">{country.capitalCity}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    ))}
  </div>
);

const CountriesPage = () => {
  const [countries, setCountries] = useState<WorldBankCountry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredCountries, setFilteredCountries] = useState<
    WorldBankCountry[]
  >([]);
  const [viewMode, setViewMode] = useState<ViewMode>("table");

  useEffect(() => {
    fetchCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter(
        (country) =>
          country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          country.iso2Code.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  }, [countries, searchTerm]);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getCountries({ page: currentPage });

      setCountries(data.data);
      setTotalPages(Math.floor(data.total / 50));
    } catch (err) {
      setError(
        (err as Error).name === "AbortError"
          ? "Request timed out. Please try again."
          : "An unexpected error occurred"
      );
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Countries</h1>
          <p className="text-muted-foreground">
            Explore economic and demographic data from countries worldwide
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <InputFilter value={searchTerm} onChange={handleSearch} />

          <div className="flex gap-2">
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("table")}
            >
              <List className="h-4 w-4 mr-2" />
              Table
            </Button>
            <Button
              variant={viewMode === "cards" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("cards")}
            >
              <Grid3X3 className="h-4 w-4 mr-2" />
              Cards
            </Button>
          </div>
        </div>
      </div>

      {filteredCountries.length === 0 ? (
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No countries found</h3>
          <p className="text-muted-foreground">
            {searchTerm
              ? "Try adjusting your search terms"
              : "No data available"}
          </p>
        </div>
      ) : viewMode === "cards" ? (
        <CountryCardsView data={filteredCountries} />
      ) : (
        <TableView data={filteredCountries} columns={countryColumns} />
      )}

      {!searchTerm && filteredCountries.length > 0 && (
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>

          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CountriesPage;
