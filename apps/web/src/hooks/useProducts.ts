import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  comparePrice?: number;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  category: { _id: string; name: string; slug: string; image?: string };
  stock: number;
  featured: boolean;
  salesCount: number;
  inStock: boolean;
}

interface ProductsResponse {
  success: boolean;
  data: Product[];
}

interface ProductQuery {
  featured?: boolean;
  limit?: number;
  category?: string;
}

export function useProducts(query: ProductQuery = {}) {
  return useQuery({
    queryKey: ["products", query],
    queryFn: async () => {
      const { data } = await api.get<ProductsResponse>("/products", { params: query });
      return data.data;
    },
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data } = await api.get<{ success: boolean; data: Product }>(`/products/${slug}`);
      return data.data;
    },
    enabled: Boolean(slug),
  });
}
