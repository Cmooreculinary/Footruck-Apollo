import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider, useAuth } from "./AuthContext";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe("AuthProvider", () => {
  let container;
  let root;
  let latestAuth;
  let consoleError;

  const Probe = () => {
    latestAuth = useAuth();
    return null;
  };

  const renderProvider = async () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);

    await act(async () => {
      root.render(
        <AuthProvider>
          <Probe />
        </AuthProvider>
      );
    });

    await act(async () => {
      await Promise.resolve();
    });
  };

  beforeEach(() => {
    process.env.REACT_APP_BACKEND_URL = "https://api.example.test";
    window.history.pushState({}, "", "/");
    global.fetch = jest.fn();
    latestAuth = null;
    consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(async () => {
    if (root) {
      await act(async () => {
        root.unmount();
      });
    }
    container?.remove();
    consoleError.mockRestore();
    delete process.env.REACT_APP_BACKEND_URL;
    root = null;
    container = null;
  });

  test("loads the current user on mount", async () => {
    const user = {
      user_id: "user_123",
      email: "owner@example.test",
      name: "Food Truck Owner",
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(user),
    });

    await renderProvider();

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.example.test/api/auth/me",
      { credentials: "include" }
    );
    expect(latestAuth.user).toEqual(user);
    expect(latestAuth.loading).toBe(false);
    expect(latestAuth.isAuthenticated).toBe(true);
  });

  test("clears auth state when the current-user check fails", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: jest.fn(),
    });

    await renderProvider();

    expect(latestAuth.user).toBeNull();
    expect(latestAuth.loading).toBe(false);
    expect(latestAuth.isAuthenticated).toBe(false);
  });

  test("skips the current-user check while processing an OAuth callback hash", async () => {
    window.history.pushState({}, "", "/dashboard#session_id=oauth_session_123");

    await renderProvider();

    expect(global.fetch).not.toHaveBeenCalled();
    expect(latestAuth.loading).toBe(false);
    expect(latestAuth.user).toBeNull();
  });

  test("logout posts to the API and clears the local user", async () => {
    const user = {
      user_id: "user_123",
      email: "owner@example.test",
      name: "Food Truck Owner",
    };

    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(user),
      })
      .mockResolvedValueOnce({ ok: true });

    await renderProvider();

    await act(async () => {
      await latestAuth.logout();
    });

    expect(global.fetch).toHaveBeenLastCalledWith(
      "https://api.example.test/api/auth/logout",
      {
        method: "POST",
        credentials: "include",
      }
    );
    expect(latestAuth.user).toBeNull();
    expect(latestAuth.isAuthenticated).toBe(false);
  });
});
