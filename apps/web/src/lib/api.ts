import axios from "axios";

export const api = axios.create({
  baseURL: (import.meta.env["VITE_API_URL"] as string | undefined) ?? "/api/v1",
  headers: { "Content-Type": "application/json" },
  timeout: 10_000,
});

api.interceptors.response.use(
  (res) => res,
  (err: unknown) => {
    const message = axios.isAxiosError(err)
      ? ((err.response?.data as { error?: { message?: string } } | undefined)?.error?.message ??
        err.message)
      : "Unknown error";
    return Promise.reject(new Error(message));
  }
);
