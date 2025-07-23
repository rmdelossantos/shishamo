import { GET } from "../indicators/route";
import { IndicatorEntry, WorldBankData } from "@/types/worldBank";

global.fetch = jest.fn();

describe("GET /api/wb/indicators", () => {
  const mockEntries: IndicatorEntry[] = [
    {
      country: { id: "US", value: "United States" },
      indicator: { id: "SP.POP.TOTL", value: "Population" },
      value: 100,
      decimal: 0,
      date: "2022",
    },
    {
      country: { id: "US", value: "United States" },
      indicator: { id: "SP.POP.TOTL", value: "Population" },
      value: null,
      decimal: 0,
      date: "2021",
    },
  ];
  const mockMeta: WorldBankData = {
    page: 1,
    pages: 1,
    perPage: "10",
    total: 2,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns indicator data on success", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => [mockMeta, mockEntries],
    });
    const req = {
      url: "http://localhost/api/wb/indicators?code=US&indicator=SP.POP.TOTL&years=1",
    } as Request;
    const res = await GET(req);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.data.length).toBe(1);
    expect(json.data[0].value).toBe(100);
  });

  it("returns 400 if required params are missing", async () => {
    const req = { url: "http://localhost/api/wb/indicators" } as Request;
    const res = await GET(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/Missing required/);
  });

  it("returns 502 on unexpected API response", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => [null, null],
    });
    const req = {
      url: "http://localhost/api/wb/indicators?code=US&indicator=SP.POP.TOTL",
    } as Request;
    const res = await GET(req);
    expect(res.status).toBe(502);
    const json = await res.json();
    expect(json.error).toMatch(/Unexpected/);
  });

  it("returns 500 on fetch error", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("fail"));
    const req = {
      url: "http://localhost/api/wb/indicators?code=US&indicator=SP.POP.TOTL",
    } as Request;
    const res = await GET(req);
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toMatch(/Failed/);
  });
});
