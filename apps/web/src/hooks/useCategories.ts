import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  sortOrder: number;
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await api.get<{ success: boolean; data: Category[] }>("/categories");
      return data.data;
    },
  });
}
