import { Moon, Sun, Languages, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "../contexts/ThemeContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function ThemeToggle() {
  const { theme, toggleTheme, t } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative text-current hover:bg-white/10 transition-colors"
      title={t("theme.toggle")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">{t("theme.toggle")}</span>
    </Button>
  );
}

export function LanguageToggle() {
  const { language, toggleLanguage, t, isRTL } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="relative text-current hover:bg-white/10 transition-colors"
      title={t("language.toggle")}
    >
      <div className="flex items-center justify-center">
        <span className="text-sm font-bold">
          {language === "ar" ? "ع" : "En"}
        </span>
      </div>
      <span className="sr-only">{t("language.toggle")}</span>
    </Button>
  );
}

export function FontFamilySelector() {
  const { fontFamily, setFontFamily, t, language } = useTheme();

  const fonts = [
    {
      id: "cairo",
      name: language === "ar" ? "القاهرة" : "Cairo",
      preview: "أبجد Abcd",
    },
    {
      id: "tajawal",
      name: language === "ar" ? "تجول" : "Tajawal",
      preview: "أبجد Abcd",
    },
    {
      id: "noto-kufi",
      name: language === "ar" ? "نوتو كوفي" : "Noto Kufi",
      preview: "أبجد Abcd",
    },
    {
      id: "amiri",
      name: language === "ar" ? "أميري" : "Amiri",
      preview: "أبجد Abcd",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-current hover:bg-white/10"
        >
          <Globe className="w-4 h-4 mr-2" />
          <span className="text-xs">
            {fonts.find((f) => f.id === fontFamily)?.name}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={language === "ar" ? "start" : "end"}
        className="w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
      >
        {fonts.map((font) => (
          <DropdownMenuItem
            key={font.id}
            onClick={() => setFontFamily(font.id as any)}
            className={`cursor-pointer ${fontFamily === font.id ? "bg-primary-50 dark:bg-primary-900/20" : ""}`}
          >
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between">
                <span className="font-medium">{font.name}</span>
                {fontFamily === font.id && (
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                )}
              </div>
              <span
                className={`text-sm text-gray-600 dark:text-gray-400 font-${font.id}`}
              >
                {font.preview}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function LanguageAndThemeControls() {
  const { isRTL } = useTheme();

  return (
    <div
      className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
    >
      <LanguageToggle />
      <ThemeToggle />
      <div className="hidden md:block">
        <FontFamilySelector />
      </div>
    </div>
  );
}
