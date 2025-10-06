import { useState } from 'react';
import { QrCode, Keyboard } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Language } from '../types';
import { translations } from '../lib/translations';

interface QRScannerProps {
  onScanSuccess: (code: string) => void;
  language: Language;
}

export function QRScanner({ onScanSuccess, language }: QRScannerProps) {
  const [manualEntry, setManualEntry] = useState(false);
  const [code, setCode] = useState('');
  const [isScanning, setIsScanning] = useState(true);
  const t = translations[language];

  const handleManualSubmit = () => {
    if (code.trim()) {
      onScanSuccess(code);
    }
  };

  // Simulate QR scan after 2 seconds
  const simulateScan = () => {
    setTimeout(() => {
      onScanSuccess('APT-001-MOCK');
    }, 2000);
  };

  if (!manualEntry && isScanning) {
    simulateScan();
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex flex-col items-center justify-center px-4 py-6 overflow-hidden">
      <div className="w-full max-w-sm mx-auto">
        {!manualEntry ? (
          <div className="space-y-6">
            <div className="text-center text-white space-y-3">
              <QrCode className="w-16 h-16 mx-auto mb-1" />
              <h1 className="text-2xl font-medium">{t.scanQR}</h1>
              <p className="opacity-90 text-sm leading-relaxed">{t.scanInstruction}</p>
            </div>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-5">
              <div className="relative aspect-square bg-white/5 rounded-2xl flex items-center justify-center max-w-64 mx-auto">
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-white rounded-tl-lg" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-white rounded-tr-lg" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-white rounded-bl-lg" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-white rounded-br-lg" />
                
                <QrCode className="w-14 h-14 text-white/50" />
              </div>
            </Card>

            <Button
              onClick={() => setManualEntry(true)}
              variant="ghost"
              className="w-full text-white hover:bg-white/10 h-12 text-sm font-medium"
            >
              <Keyboard className="w-4 h-4 mr-2" />
              {t.enterManually}
            </Button>
          </div>
        ) : (
          <Card className="bg-white p-5 space-y-5">
            <div className="space-y-3">
              <h2 className="text-center text-xl font-medium">{t.enterManually}</h2>
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="APT-XXX-XXXX"
                className="text-center h-12 text-base"
              />
            </div>
            <div className="space-y-2">
              <Button onClick={handleManualSubmit} className="w-full h-12 text-sm font-medium">
                {t.openApp}
              </Button>
              <Button
                onClick={() => setManualEntry(false)}
                variant="outline"
                className="w-full h-12 text-sm font-medium"
              >
                {t.scanQR}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
