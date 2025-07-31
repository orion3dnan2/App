// خدمة API موحدة للويب والجوال
export class ApiService {
  private static baseURL = import.meta.env.VITE_API_URL || "/api";
  private static platform = "web"; // سيتم تغييرها في التطبيق الجوال

  // تعيين منصة التطبيق
  static setPlatform(platform: "web" | "mobile") {
    this.platform = platform;
  }

  // الحصول على العناوين الافتراضية
  private static getHeaders(includeAuth = true): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "X-Platform": this.platform,
    };

    if (includeAuth) {
      const token = this.getToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  // إدارة الرموز المميزة
  static setToken(token: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
    }
    // في React Native استخدم AsyncStorage
    // await AsyncStorage.setItem('auth_token', token);
  }

  static getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token");
    }
    return null;
    // في React Native:
    // return await AsyncStorage.getItem('auth_token');
  }

  static removeToken() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
    }
    // في React Native:
    // await AsyncStorage.removeItem('auth_token');
  }

  // طلب HTTP عام
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API Request failed:", error);
      throw error;
    }
  }

  // طلبات المصادقة
  static async login(credentials: {
    username: string;
    password: string;
  }): Promise<any> {
    const response = await this.request<any>("/auth/login", {
      method: "POST",
      headers: this.getHeaders(false),
      body: JSON.stringify({
        ...credentials,
        platform: this.platform,
      }),
    });

    if (response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  static async register(userData: {
    fullName: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    accountType: string;
    country?: string;
    city?: string;
    businessName?: string;
    businessType?: string;
  }): Promise<any> {
    const response = await this.request<any>("/auth/register", {
      method: "POST",
      headers: this.getHeaders(false),
      body: JSON.stringify({
        ...userData,
        platform: this.platform,
      }),
    });

    if (response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  static async logout(): Promise<void> {
    await this.request("/auth/logout", { method: "POST" });
    this.removeToken();
  }

  static async getCurrentUser(): Promise<any> {
    return this.request("/auth/me");
  }

  // طلبات الشركات
  static async getCompanies(filters?: {
    industry?: string;
    country?: string;
    size?: string;
    search?: string;
  }): Promise<any[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }

    const endpoint = `/companies${params.toString() ? `?${params.toString()}` : ""}`;
    return this.request(endpoint);
  }

  static async getCompany(id: string): Promise<any> {
    return this.request(`/companies/${id}`);
  }

  // طلبات المنتجات
  static async getProducts(filters?: {
    category?: string;
    storeId?: string;
    search?: string;
    priceRange?: string;
  }): Promise<any[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }

    const endpoint = `/products${params.toString() ? `?${params.toString()}` : ""}`;
    return this.request(endpoint);
  }

  // طلبات المتاجر
  static async getStores(): Promise<any[]> {
    return this.request("/stores");
  }

  static async getStore(id: string): Promise<any> {
    return this.request(`/stores/${id}`);
  }

  static async createStore(storeData: {
    name: string;
    description?: string;
    category: string;
    phone: string;
    email: string;
    address?: string;
    city: string;
    country?: string;
    workingHours?: {
      start: string;
      end: string;
      days: string[];
    };
    logo?: string;
    banner?: string;
    notificationSettings?: any;
    shippingSettings?: any;
  }): Promise<any> {
    return this.request("/stores", {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(storeData),
    });
  }

  static async updateStore(id: string, storeData: any): Promise<any> {
    return this.request(`/stores/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(storeData),
    });
  }

  static async deleteStore(id: string): Promise<any> {
    return this.request(`/stores/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
  }

  static async getStoreAnalytics(id: string): Promise<any> {
    return this.request(`/stores/${id}/analytics`);
  }

  static async updateStoreStatus(id: string, status: string): Promise<any> {
    return this.request(`/stores/${id}/status`, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify({ status }),
    });
  }

  static async getProduct(id: string): Promise<any> {
    return this.request(`/products/${id}`);
  }

  // طلبات الوظائف
  static async getJobs(filters?: {
    category?: string;
    type?: string;
    location?: string;
    search?: string;
  }): Promise<any[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }

    const endpoint = `/jobs${params.toString() ? `?${params.toString()}` : ""}`;
    return this.request(endpoint);
  }

  static async getJob(id: string): Promise<any> {
    return this.request(`/jobs/${id}`);
  }

  // طلبات المتاجر
  static async getStores(filters?: {
    category?: string;
    location?: string;
    search?: string;
  }): Promise<any[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }

    const endpoint = `/stores${params.toString() ? `?${params.toString()}` : ""}`;
    return this.request(endpoint);
  }

  // طلبات الخدمات
  static async getServices(filters?: {
    category?: string;
    location?: string;
    search?: string;
  }): Promise<any[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }

    const endpoint = `/services${params.toString() ? `?${params.toString()}` : ""}`;
    return this.request(endpoint);
  }

  // طلبات خاصة بالجوال
  static async getMobileConfig(): Promise<any> {
    return this.request("/mobile/config");
  }

  static async syncData(): Promise<any> {
    return this.request("/mobile/sync");
  }

  // رفع الملفات
  static async uploadFile(
    file: File | Blob,
    type: "avatar" | "product" | "company",
  ): Promise<any> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    const headers: HeadersInit = {
      "X-Platform": this.platform,
    };

    const token = this.getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseURL}/upload`, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error("فشل في رفع الملف");
    }

    return response.json();
  }
}

// هوك React للاستخدام في المكونات
import { useState, useEffect } from "react";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callApi = async <T>(apiCall: () => Promise<T>): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, callApi };
};
