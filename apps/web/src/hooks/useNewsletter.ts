import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/api";

export function useNewsletter() {
  return useMutation({
    mutationFn: async (email: string) => {
      const { data } = await api.post<{ success: boolean; data: { email: string } }>(
        "/newsletter/subscribe",
        { email }
      );
      return data.data;
    },
  });
}
