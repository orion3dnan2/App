import { AppSettings } from "../../shared/types";

export class AppSettingsService {
  private static readonly STORAGE_KEY = "bayt_al_sudani_app_settings";

  // Default app settings
  private static defaultSettings: AppSettings = {
    theme: {
      primaryColor: "#2563eb",
      secondaryColor: "#f59e0b",
      fontFamily: "Cairo",
      layout: "modern",
    },
    branding: {
      appName: "البيت السوداني",
      logo: "/placeholder.svg",
      favicon: "/favicon.ico",
      heroBackground:
        "https://cdn.builder.io/api/v1/image/assets%2Fb1a0c751ea8f428fb17cf787dc4c95b1%2Fada8ce46064846e687a3341dd0ab9c15?format=webp&width=1200",
      tagline: "سوق الخدمات وشركات السودان في الخليج والعالم",
    },
    features: {
      enableMarketplace: true,
      enableProducts: true,
      enableCompanies: true,
      enableJobs: true,
      enableServices: true,
      enableAds: true,
      enableReviews: true,
      enableChat: false,
    },
    navigation: {
      visibleSections: [
        "marketplace",
        "products",
        "companies",
        "jobs",
        "services",
        "ads",
      ],
      customOrder: [
        "marketplace",
        "products",
        "companies",
        "jobs",
        "services",
        "ads",
      ],
    },
    localization: {
      defaultLanguage: "ar",
      supportedLanguages: ["ar", "en"],
      rtlSupport: true,
    },
    policies: {
      termsOfService: "تطبق الشروط والأحكام العامة للموقع...",
      privacyPolicy: "نحن نحترم خصوصيتك ونحمي بياناتك...",
      refundPolicy: "يمكن إرجاع المنتجات خلال 7 أيام...",
    },
  };

  static getSettings(): AppSettings {
    try {
      const settingsStr = localStorage.getItem(this.STORAGE_KEY);
      if (settingsStr) {
        const saved = JSON.parse(settingsStr);
        // Merge with defaults to ensure all properties exist
        return { ...this.defaultSettings, ...saved };
      }
      return this.defaultSettings;
    } catch {
      return this.defaultSettings;
    }
  }

  static saveSettings(settings: AppSettings): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
      // Apply settings to the document
      this.applySettings(settings);
    } catch (error) {
      console.error("Failed to save app settings:", error);
    }
  }

  static updateTheme(theme: Partial<AppSettings["theme"]>): void {
    const currentSettings = this.getSettings();
    const updatedSettings = {
      ...currentSettings,
      theme: { ...currentSettings.theme, ...theme },
    };
    this.saveSettings(updatedSettings);
  }

  static updateBranding(branding: Partial<AppSettings["branding"]>): void {
    const currentSettings = this.getSettings();
    const updatedSettings = {
      ...currentSettings,
      branding: { ...currentSettings.branding, ...branding },
    };
    this.saveSettings(updatedSettings);
  }

  static updateFeatures(features: Partial<AppSettings["features"]>): void {
    const currentSettings = this.getSettings();
    const updatedSettings = {
      ...currentSettings,
      features: { ...currentSettings.features, ...features },
    };
    this.saveSettings(updatedSettings);
  }

  static resetToDefaults(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.applySettings(this.defaultSettings);
  }

  // Apply settings to the document/DOM
  private static applySettings(settings: AppSettings): void {
    // Update CSS custom properties for theme
    const root = document.documentElement;

    // Convert hex to HSL for CSS variables
    const hexToHsl = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0,
        s = 0,
        l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }

      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    };

    // Apply primary color
    if (settings.theme.primaryColor) {
      const primaryHsl = hexToHsl(settings.theme.primaryColor);
      root.style.setProperty("--primary", primaryHsl);
    }

    // Apply secondary color
    if (settings.theme.secondaryColor) {
      const secondaryHsl = hexToHsl(settings.theme.secondaryColor);
      root.style.setProperty("--secondary", secondaryHsl);
    }

    // Apply font family
    if (settings.theme.fontFamily) {
      root.style.setProperty("--font-family", settings.theme.fontFamily);
    }

    // Update page title
    if (settings.branding.appName) {
      document.title = settings.branding.appName;
    }

    // Update favicon
    if (settings.branding.favicon) {
      const favicon = document.querySelector(
        'link[rel="icon"]',
      ) as HTMLLinkElement;
      if (favicon) {
        favicon.href = settings.branding.favicon;
      }
    }
  }

  // Initialize settings on app load
  static initialize(): void {
    const settings = this.getSettings();
    this.applySettings(settings);
  }

  // Color palette helpers
  static getColorPalettes() {
    return {
      "البرتقالي والأزرق": { primary: "#2563eb", secondary: "#f59e0b" },
      "الأخضر والذهبي": { primary: "#059669", secondary: "#d97706" },
      "البنفسجي والوردي": { primary: "#7c3aed", secondary: "#ec4899" },
      "الأحمر والبرتقالي": { primary: "#dc2626", secondary: "#ea580c" },
      "الأزرق الداكن والفيروزي": { primary: "#1e40af", secondary: "#0891b2" },
      "الأخضر الزيتي والذهبي": { primary: "#365314", secondary: "#ca8a04" },
    };
  }

  // Font families
  static getFontFamilies() {
    return {
      Cairo: "Cairo, sans-serif",
      Amiri: "Amiri, serif",
      Tajawal: "Tajawal, sans-serif",
      Almarai: "Almarai, sans-serif",
      "IBM Plex Sans Arabic": "IBM Plex Sans Arabic, sans-serif",
    };
  }
}

// React hook for app settings
export const useAppSettings = () => {
  const settings = AppSettingsService.getSettings();

  return {
    settings,
    updateTheme: AppSettingsService.updateTheme,
    updateBranding: AppSettingsService.updateBranding,
    updateFeatures: AppSettingsService.updateFeatures,
    saveSettings: AppSettingsService.saveSettings,
    resetToDefaults: AppSettingsService.resetToDefaults,
    colorPalettes: AppSettingsService.getColorPalettes(),
    fontFamilies: AppSettingsService.getFontFamilies(),
  };
};
