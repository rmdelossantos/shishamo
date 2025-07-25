import { GET } from "@/app/api/wb/countries/route";
import { WorldBankCountry, WorldBankData } from "@/types/countries";

global.fetch = jest.fn();

describe("GET /api/wb/countries", () => {
  const mockCountries: WorldBankCountry[] = [
    {
      id: "US",
      iso2Code: "US",
      name: "United States",
      region: { id: "NAC", value: "North America" },
      adminregion: { id: "", value: "" },
      incomeLevel: { id: "HIC", value: "High income" },
      lendingType: { id: "LNX", value: "Not classified" },
      capitalCity: "Washington D.C.",
      longitude: "-77.032",
      latitude: "38.8895",
    },
  ];
  const mockMeta: WorldBankData = {
    page: 1,
    pages: 1,
    perPage: "1000",
    total: 1,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns countries data on success", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => [mockMeta, mockCountries],
    });
    const req = { url: "http://localhost/api/wb/countries" } as Request;
    const res = await GET(req);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json).toEqual({ data: mockCountries, total: 1 });
  });

  it("returns 502 on unexpected API response", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => [null, null],
    });
    const req = { url: "http://localhost/api/wb/countries" } as Request;
    const res = await GET(req);
    expect(res.status).toBe(502);
    const json = await res.json();
    expect(json.error).toMatch(/Unexpected/);
  });

  it("returns 500 on fetch error", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("fail"));
    const req = { url: "http://localhost/api/wb/countries" } as Request;
    const res = await GET(req);
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toMatch(/Failed/);
  });
});
