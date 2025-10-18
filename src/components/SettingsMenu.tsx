import { Phone, Mail, Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Language, Theme } from '../types';
import { translations } from '../lib/translations';
import { BottomSheet } from './ui/mobile-modal';

interface SettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  contactPhone: string;
}

export function SettingsMenu({
  isOpen,
  onClose,
  language,
  onLanguageChange,
  theme,
  onThemeChange,
  contactPhone,
}: SettingsMenuProps) {
  const t = translations[language];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'me', label: 'Crnogorski', flag: '🇲🇪' },
  ];

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={t.settings}
      className="max-h-[85vh]"
    >
      <div className="space-y-6">
            {/* Language Selection */}
            <div className="space-y-3">
              <h4 className="text-foreground text-base font-medium">{t.language}</h4>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all active:scale-[0.98] ${
                      language === lang.code
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <span className="text-lg flex-shrink-0">{lang.flag}</span>
                      <span className="text-foreground text-sm font-medium truncate">{lang.label}</span>
                    </div>
                    {language === lang.code && (
                      <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0 ml-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="space-y-3">
              <h4 className="text-foreground text-base font-medium">{t.theme}</h4>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    {theme === 'light' ? (
                      <Sun className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                    ) : (
                      <Moon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    )}
                    <span className="text-foreground text-sm font-medium truncate">
                      {theme === 'light' ? t.lightTheme : t.darkTheme}
                    </span>
                  </div>
                  <Switch
                    checked={theme === 'dark'}
                    onCheckedChange={(checked) =>
                      onThemeChange(checked ? 'dark' : 'light')
                    }
                    className="flex-shrink-0"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 pb-4">
              <h4 className="text-foreground text-base font-medium">{t.contactInfo}</h4>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-muted-foreground text-xs font-medium">{t.phone}</p>
                    <a
                      href={`tel:${contactPhone}`}
                      className="text-foreground hover:text-primary transition-colors text-sm truncate block font-medium"
                    >
                      {contactPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-muted-foreground text-xs font-medium">{t.email}</p>
                    <a
                      href="mailto:support@example.com"
                      className="text-foreground hover:text-primary transition-colors text-sm break-all block font-medium"
                    >
                      support@example.com
                    </a>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <p className="text-center text-muted-foreground text-sm font-medium">
                    {t.support24}
                  </p>
                </div>
              </div>
            </div>
      </div>
    </BottomSheet>
  );
}