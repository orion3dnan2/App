import React from "react";
import { Button } from "@/components/ui/button";
import { Share, Download, ExternalLink } from "lucide-react";
import { DeepLinkingService } from "@/lib/deepLinking";

// مكون للتحكم في الروابط الذكية
interface SmartLinkButtonProps {
  type: "product" | "company" | "job" | "store";
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const SmartLinkButton: React.FC<SmartLinkButtonProps> = ({
  type,
  id,
  title,
  children,
  className,
}) => {
  const handleClick = () => {
    DeepLinkingService.shareContent(type, id, title);
  };

  return (
    <Button onClick={handleClick} className={className}>
      <Share className="w-4 h-4 ml-1" />
      {children}
    </Button>
  );
};

// مكون banner للتطبيق الجوال
export const AppPromoBanner: React.FC = () => {
  const [showBanner, setShowBanner] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = async () => {
      // فحص إذا كان الجهاز محمول
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        );

      if (isMobile && !localStorage.getItem("app_banner_dismissed")) {
        const isInstalled = await DeepLinkingService.isAppInstalled();
        if (!isInstalled) {
          setShowBanner(true);
        }
      }
    };

    checkMobile();
  }, []);

  const handleInstallApp = () => {
    DeepLinkingService.redirectToApp();
    setShowBanner(false);
  };

  const dismissBanner = () => {
    localStorage.setItem("app_banner_dismissed", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-4 fixed bottom-0 left-0 right-0 z-50 shadow-lg">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <span className="text-xl">🇸🇩</span>
          </div>
          <div>
            <div className="font-bold text-sm arabic">البيت السوداني</div>
            <div className="text-xs opacity-90 arabic">احصل على التطبيق</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleInstallApp}
            className="text-xs arabic"
          >
            <Download className="w-3 h-3 ml-1" />
            تحميل
          </Button>
          <button
            onClick={dismissBanner}
            className="text-white/70 hover:text-white text-lg w-6 h-6 flex items-center justify-center"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

// مكون لأزرار فتح في التطبيق
interface OpenInAppButtonProps {
  path: string;
  params?: Record<string, string>;
  children: React.ReactNode;
  className?: string;
}

export const OpenInAppButton: React.FC<OpenInAppButtonProps> = ({
  path,
  params,
  children,
  className,
}) => {
  const [isAppAvailable, setIsAppAvailable] = React.useState(false);

  React.useEffect(() => {
    const checkApp = async () => {
      const available = await DeepLinkingService.isAppInstalled();
      setIsAppAvailable(available);
    };
    checkApp();
  }, []);

  const handleOpenInApp = () => {
    const mobileLink = DeepLinkingService.createMobileLink(path, params);
    window.location.href = mobileLink;
  };

  if (!isAppAvailable) return null;

  return (
    <Button
      onClick={handleOpenInApp}
      variant="outline"
      className={`${className} arabic`}
    >
      <ExternalLink className="w-4 h-4 ml-1" />
      {children}
    </Button>
  );
};

// مكون للمزامنة التلقائية
export const SyncIndicator: React.FC = () => {
  const [syncStatus, setSyncStatus] = React.useState<
    "idle" | "syncing" | "success" | "error"
  >("idle");
  const [lastSync, setLastSync] = React.useState<Date | null>(null);

  React.useEffect(() => {
    // فحص آخر مزامنة
    const lastSyncStr = localStorage.getItem("last_sync");
    if (lastSyncStr) {
      setLastSync(new Date(lastSyncStr));
    }

    // مزامنة تلقائية كل 5 دقائق
    const interval = setInterval(performSync, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const performSync = async () => {
    try {
      setSyncStatus("syncing");

      // م��اكاة مزامنة البيانات
      await fetch("/api/mobile/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Platform": "web",
        },
      });

      localStorage.setItem("last_sync", new Date().toISOString());
      setLastSync(new Date());
      setSyncStatus("success");

      setTimeout(() => setSyncStatus("idle"), 2000);
    } catch (error) {
      setSyncStatus("error");
      setTimeout(() => setSyncStatus("idle"), 3000);
    }
  };

  const getSyncStatusIcon = () => {
    switch (syncStatus) {
      case "syncing":
        return (
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
        );
      case "success":
        return <div className="w-2 h-2 bg-green-500 rounded-full" />;
      case "error":
        return <div className="w-2 h-2 bg-red-500 rounded-full" />;
      default:
        return <div className="w-2 h-2 bg-gray-300 rounded-full" />;
    }
  };

  const getSyncMessage = () => {
    switch (syncStatus) {
      case "syncing":
        return "جاري المزامنة...";
      case "success":
        return "تم التحديث";
      case "error":
        return "خطأ في المزامنة";
      default:
        return lastSync
          ? `آخر تحديث: ${lastSync.toLocaleTimeString("ar-SA")}`
          : "لم يتم التحديث";
    }
  };

  return (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      {getSyncStatusIcon()}
      <span className="arabic">{getSyncMessage()}</span>
      {syncStatus === "idle" && (
        <button
          onClick={performSync}
          className="text-blue-500 hover:text-blue-700 arabic"
        >
          تحديث
        </button>
      )}
    </div>
  );
};

// مكون لعرض QR code للتطبيق الجوال
export const AppQRCode: React.FC = () => {
  const [showQR, setShowQR] = React.useState(false);

  // في التطبيق الحقيقي، استخدم مكتبة لإنشاء QR code
  const appStoreLink = "https://apps.apple.com/app/sudan-house";
  const playStoreLink =
    "https://play.google.com/store/apps/details?id=com.sudanhouse.app";

  return (
    <div className="text-center">
      <Button
        onClick={() => setShowQR(!showQR)}
        variant="outline"
        className="arabic"
      >
        QR Code للتطبيق
      </Button>

      {showQR && (
        <div className="mt-4 p-4 border rounded-lg bg-white">
          <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
            {/* ه��ا يكون QR Code */}
            <span className="text-gray-500 text-xs text-center">
              QR Code
              <br />
              للتطبيق الجوال
            </span>
          </div>
          <p className="text-sm text-gray-600 arabic mb-2">
            امسح الرمز بكاميرا هاتفك
          </p>
          <div className="flex gap-2 justify-center">
            <a
              href={appStoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-xs"
            >
              App Store
            </a>
            <span className="text-gray-300">|</span>
            <a
              href={playStoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 text-xs"
            >
              Google Play
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
