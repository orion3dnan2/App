// إعداد الربط العميق بين الموقع والتطبيق الجوال

export class DeepLinkingService {
  private static APP_SCHEME = "sudanapp";
  private static WEB_DOMAIN = "baytsudani.com";

  // إنشاء رابط عميق للتطبيق الجوال
  static createMobileLink(
    path: string,
    params?: Record<string, string>,
  ): string {
    const url = new URL(`${this.APP_SCHEME}://${path}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    return url.toString();
  }

  // إنشاء رابط للويب
  static createWebLink(path: string, params?: Record<string, string>): string {
    const url = new URL(`https://${this.WEB_DOMAIN}${path}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    return url.toString();
  }

  // إنشاء رابط ذكي يتكيف مع المنصة
  static createSmartLink(
    path: string,
    params?: Record<string, string>,
  ): {
    web: string;
    mobile: string;
    universal: string;
  } {
    const webLink = this.createWebLink(path, params);
    const mobileLink = this.createMobileLink(path, params);

    // رابط عالمي يتجه للويب افتراضياً مع إمكانية فتح التطبيق
    const universalLink = `${webLink}?app=${encodeURIComponent(mobileLink)}`;

    return {
      web: webLink,
      mobile: mobileLink,
      universal: universalLink,
    };
  }

  // روابط محددة للكيانات
  static getProductLinks(productId: string) {
    return this.createSmartLink("/products", { id: productId });
  }

  static getCompanyLinks(companyId: string) {
    return this.createSmartLink("/companies", { id: companyId });
  }

  static getJobLinks(jobId: string) {
    return this.createSmartLink("/jobs", { id: jobId });
  }

  static getStoreLinks(storeId: string) {
    return this.createSmartLink("/stores", { id: storeId });
  }

  // مشاركة المحتوى
  static async shareContent(
    type: "product" | "company" | "job" | "store",
    id: string,
    title: string,
  ) {
    let links;

    switch (type) {
      case "product":
        links = this.getProductLinks(id);
        break;
      case "company":
        links = this.getCompanyLinks(id);
        break;
      case "job":
        links = this.getJobLinks(id);
        break;
      case "store":
        links = this.getStoreLinks(id);
        break;
      default:
        return;
    }

    const shareData = {
      title: `${title} - البيت السوداني`,
      text: `شاهد هذا المحتوى على البيت السوداني`,
      url: links.universal,
    };

    if (navigator.share && this.isMobileDevice()) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log("Error sharing:", error);
        this.fallbackShare(links.universal);
      }
    } else {
      this.fallbackShare(links.universal);
    }
  }

  // مشاركة بديلة
  private static fallbackShare(url: string) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        alert("تم نسخ الرابط");
      });
    } else {
      // إنشاء حقل نص مؤقت للنسخ
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert("تم نسخ الرابط");
    }
  }

  // فحص إذا كان الجهاز محمول
  private static isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  }

  // فحص إذا كان التطبيق مثبت (للويب)
  static async isAppInstalled(): Promise<boolean> {
    if (this.isMobileDevice()) {
      try {
        // محاولة فتح التطبيق
        const timeout = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 1000),
        );

        const appOpened = new Promise((resolve) => {
          const link = document.createElement("a");
          link.href = this.createMobileLink("/");
          link.click();
          setTimeout(() => resolve(true), 500);
        });

        await Promise.race([timeout, appOpened]);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }

  // توجيه المستخدم للتطبيق أو المتجر
  static async redirectToApp(fallbackUrl?: string) {
    const isInstalled = await this.isAppInstalled();

    if (isInstalled) {
      // فتح التطبيق
      window.location.href = this.createMobileLink("/");
    } else {
      // توجيه لمتجر التطبيقات
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isAndroid = /Android/.test(navigator.userAgent);

      if (isIOS) {
        window.location.href = "https://apps.apple.com/app/sudan-house";
      } else if (isAndroid) {
        window.location.href =
          "https://play.google.com/store/apps/details?id=com.sudanhouse.app";
      } else if (fallbackUrl) {
        window.location.href = fallbackUrl;
      }
    }
  }
}
