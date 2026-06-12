describe("apiClient", () => {
  const loadClient = (baseUrl = "https://api.example.test") => {
    jest.resetModules();
    process.env.VITE_BACKEND_URL = baseUrl;
    return require("./api").default;
  };

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
    delete process.env.VITE_BACKEND_URL;
    jest.resetModules();
  });

  test("sends JSON requests with credentials and configured API base URL", async () => {
    const client = loadClient();
    const payload = {
      primary_color: "#E8592F",
      accent_color: "#111111",
      finish_type: "gloss",
      business_name: "Test Truck",
    };
    const responseBody = { id: "design_123", ...payload };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(responseBody),
    });

    await expect(client.saveTruckDesign(payload)).resolves.toEqual(responseBody);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.example.test/api/truck-designs",
      expect.objectContaining({
        method: "POST",
        credentials: "include",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
        signal: expect.any(AbortSignal),
      })
    );
  });

  test("merges custom headers without dropping JSON defaults", async () => {
    const client = loadClient("");
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ ok: true }),
    });

    await client.request("/api/status", {
      headers: { Authorization: "Bearer session-token" },
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/status",
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer session-token",
        },
        credentials: "include",
      })
    );
  });

  test("throws a useful error for non-2xx responses", async () => {
    const client = loadClient();
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: jest.fn(),
    });

    await expect(client.getStatus()).rejects.toThrow("HTTP error! status: 500");
  });

  test("converts aborted requests into request timeout errors", async () => {
    jest.useFakeTimers();
    const client = loadClient();
    client.timeout = 25;

    global.fetch.mockImplementationOnce((url, options) => {
      return new Promise((resolve, reject) => {
        options.signal.addEventListener("abort", () => {
          const error = new Error("Aborted");
          error.name = "AbortError";
          reject(error);
        });
      });
    });

    const request = client.getStatus();
    jest.advanceTimersByTime(25);

    await expect(request).rejects.toThrow("Request timeout");
  });
});
