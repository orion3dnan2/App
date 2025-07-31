/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * System Settings API responses
 */
export interface SystemSettingsResponse {
  message: string;
  settings?: any;
}

export interface SystemHealthResponse {
  status: "healthy" | "warning" | "critical";
  services: Record<string, any>;
  metrics: Record<string, number>;
  lastChecked: string;
}

export interface SystemLogsResponse {
  logs: any[];
  total: number;
  limit: number;
  offset: number;
}

export interface TestConfigResponse {
  success: boolean;
  message: string;
}

export interface BackupResponse {
  success: boolean;
  message: string;
  filename?: string;
  size?: string;
}

export interface CacheResponse {
  success: boolean;
  message: string;
  clearedItems?: number;
}
