"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
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
import Link from "next/link";
import { CountriesResponse, WorldBankCountry } from "@/types/worldBank";

type ViewMode = "cards" | "table";

export default function CountriesPage() {
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

      const response = await fetch(
        `/api/wb/countries?page=${currentPage}&per_page=50`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch countries");
      }

      const data: CountriesResponse = await response.json();

      setCountries(data.data);
      setTotalPages(Math.floor(data.total / 50));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-4" />
          <div className="flex gap-4 mb-4">
            <Skeleton className="h-10 w-full max-w-md" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  const renderCardsView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {filteredCountries.map((country) => (
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

  const renderTableView = () => (
    <div className="mb-8">
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Income Level</TableHead>
                <TableHead>Capital</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCountries.map((country, index) => (
                <TableRow key={country.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">{country.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{country.iso2Code}</Badge>
                  </TableCell>
                  <TableCell>{country.region.value}</TableCell>
                  <TableCell>{country.incomeLevel.value}</TableCell>
                  <TableCell>{country.capitalCity || "N/A"}</TableCell>
                  <TableCell>
                    <Link href={`/countries/${country.iso2Code.toLowerCase()}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Countries</h1>
          <p className="text-muted-foreground">
            Explore economic and demographic data from countries worldwide
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>

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

      {viewMode === "cards" ? renderCardsView() : renderTableView()}

      {filteredCountries.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No countries found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms
          </p>
        </div>
      )}

      {!searchTerm && (
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
}
