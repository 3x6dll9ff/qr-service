import { Wifi, Copy, Check, MessageCircle, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useState } from 'react';
import { Property, Language } from '../types';
import { translations } from '../lib/translations';
import { toast } from 'sonner@2.0.3';

interface WelcomeScreenProps {
  property: Property;
  onContinue: () => void;
  language: Language;
}

export function WelcomeScreen({ property, onContinue, language }: WelcomeScreenProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const t = translations[language];

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleExtendStay = () => {
    toast.success(t.extendStay, {
      description: language === 'ru' ? 'Запрос отправлен арендодателю' : language === 'me' ? 'Zahtjev poslat vlasniku' : 'Request sent to host',
    });
  };

  const handleAskQuestion = () => {
    toast.success(t.askQuestion, {
      description: language === 'ru' ? 'Арендодатель свяжется с вами' : language === 'me' ? 'Vlasnik će vas kontaktirati' : 'Host will contact you',
    });
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex flex-col items-center justify-center px-4 py-6 overflow-hidden">
      <div className="w-full max-w-sm mx-auto space-y-5 overflow-y-auto">
        <div className="text-center text-white space-y-3">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto">
            <Wifi className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-medium">{t.welcome}!</h1>
          <p className="opacity-90 text-sm">{property.name}</p>
        </div>

        <Card className="bg-white p-4 space-y-4">
          <h3 className="text-center text-blue-600 text-base font-medium">{t.wifiCredentials}</h3>
          
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-xs font-medium">{t.wifiNetwork}:</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(property.wifi.ssid, 'ssid')}
                  className="h-8 w-8 p-0"
                >
                  {copiedField === 'ssid' ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-blue-600" />
                  )}
                </Button>
              </div>
              <p className="break-all text-sm font-mono">{property.wifi.ssid}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-xs font-medium">{t.password}:</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(property.wifi.password, 'password')}
                  className="h-8 w-8 p-0"
                >
                  {copiedField === 'password' ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-blue-600" />
                  )}
                </Button>
              </div>
              <p className="break-all text-sm font-mono">{property.wifi.password}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-white p-4 space-y-4">
          <h3 className="text-center text-blue-600 text-base font-medium">{t.hostContact}</h3>
          
          <div className="grid grid-cols-2 gap-2.5">
            <Button
              onClick={handleExtendStay}
              variant="outline"
              className="flex flex-col items-center space-y-1.5 h-auto py-3 rounded-lg"
            >
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="text-xs text-center leading-tight font-medium">{t.extendStay}</span>
            </Button>
            
            <Button
              onClick={handleAskQuestion}
              variant="outline"
              className="flex flex-col items-center space-y-1.5 h-auto py-3 rounded-lg"
            >
              <MessageCircle className="w-5 h-5 text-blue-600" />
              <span className="text-xs text-center leading-tight font-medium">{t.askQuestion}</span>
            </Button>
          </div>
        </Card>

        <Button onClick={onContinue} className="w-full bg-white text-blue-600 hover:bg-white/90 h-11 text-sm font-medium">
          {t.openApp}
        </Button>
      </div>
    </div>
  );
}
