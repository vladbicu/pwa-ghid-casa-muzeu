import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import JSZip from 'jszip';
import { Download, QrCode, Table } from 'lucide-react';
import { useTours, useIndustrySections, useStops, getLocalizedText } from '../../hooks/useData';
import { useSettings } from '../../context/SettingsContext';
import { useTenant } from '../../config/TenantContext';

const QR_OPTIONS = {
  width: 200,
  margin: 1,
  color: { dark: '#2C1810', light: '#FFFCF5' },
} as const;

const QR_EXPORT_OPTIONS = {
  width: 400,
  margin: 2,
  color: { dark: '#2C1810', light: '#FFFCF5' },
} as const;

interface QREntity {
  id: string;
  label: string;
  url: string;
}

function QRCard({ entity }: { entity: QREntity }) {
  const [dataUrl, setDataUrl] = useState('');

  useEffect(() => {
    QRCode.toDataURL(entity.url, QR_OPTIONS).then(setDataUrl).catch(console.error);
  }, [entity.url]);

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${entity.id}.png`;
    a.click();
  };

  return (
    <div className="bg-museum-cream rounded-xl p-4 border border-museum-walnut/10 flex flex-col items-center gap-3 shadow-warm">
      {dataUrl ? (
        <img src={dataUrl} alt={entity.label} className="rounded-lg w-[150px] h-[150px]" />
      ) : (
        <div className="w-[150px] h-[150px] bg-museum-sand rounded-lg animate-pulse" />
      )}
      <p className="text-xs font-medium text-museum-walnut text-center leading-tight line-clamp-2">
        {entity.label}
      </p>
      <button
        onClick={handleDownload}
        disabled={!dataUrl}
        className="text-xs text-museum-moss hover:underline disabled:opacity-40 flex items-center gap-1 transition-opacity"
      >
        <Download size={12} /> PNG
      </button>
    </div>
  );
}

function triggerDownload(url: string, filename: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function AdminQRPage() {
  const { data: tours } = useTours();
  const { data: sections } = useIndustrySections();
  const { data: stops } = useStops();
  const { language } = useSettings();
  const tenant = useTenant();

  const baseUrl = `${window.location.origin}${tenant.baseUrl}`;

  const entities: QREntity[] = [
    ...(tours ?? []).map((t) => ({
      id: `tour-${t.id}`,
      label: getLocalizedText(t.title, language) ?? t.id,
      url: `${baseUrl}tour/${t.id}`,
    })),
    ...sections.map((s) => ({
      id: `industry-${s.id}`,
      label: getLocalizedText(s.title, language) ?? s.id,
      url: `${baseUrl}industry/${s.id}`,
    })),
  ];

  const stopTourMap = new Map<string, string>();
  for (const tour of tours ?? []) {
    for (const stopId of tour.stopIds) {
      stopTourMap.set(stopId, tour.id);
    }
  }

  const codesRows = [
    ...(stops ?? [])
      .filter((s) => s.shortCode !== undefined)
      .map((s) => ({
        code: s.shortCode!,
        id: s.id,
        room: s.roomId,
        title: s.title.ro,
        tour: stopTourMap.get(s.id) ?? '',
      })),
    ...sections
      .filter((s) => s.shortCode !== undefined)
      .map((s) => ({
        code: s.shortCode!,
        id: s.id,
        room: '—',
        title: s.title.ro,
        tour: 'industrie',
      })),
  ].sort((a, b) => a.code - b.code);

  const handleDownloadCSV = () => {
    const header = ['Cod', 'ID', 'Cameră', 'Titlu (RO)', 'Tur'];
    const rows = [
      header,
      ...codesRows.map((r) => [String(r.code), r.id, r.room, r.title, r.tour]),
    ];
    const csv = rows.map((r) => r.map((v) => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    triggerDownload(URL.createObjectURL(blob), 'labels.csv');
  };

  const [zipping, setZipping] = useState(false);

  const handleDownloadZIP = async () => {
    setZipping(true);
    try {
      const zip = new JSZip();
      for (const entity of entities) {
        const dataUrl = await QRCode.toDataURL(entity.url, QR_EXPORT_OPTIONS);
        zip.file(`${entity.id}.png`, dataUrl.split(',')[1], { base64: true });
      }
      const blob = await zip.generateAsync({ type: 'blob' });
      triggerDownload(URL.createObjectURL(blob), 'qr-codes.zip');
    } finally {
      setZipping(false);
    }
  };

  return (
    <main className="pb-24 pt-6 px-4 md:px-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-museum-walnut mb-1">Admin — QR &amp; Coduri</h1>
        <p className="text-sm text-museum-walnut/60">Generare și export materiale tipărite</p>
      </div>

      {/* Section 1: QR codes */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-museum-walnut mb-4 flex items-center gap-2">
          <QrCode size={20} className="text-museum-moss" />
          QR Codes
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {entities.map((entity) => (
            <QRCard key={entity.id} entity={entity} />
          ))}
        </div>
      </section>

      {/* Section 2: Numeric codes table */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-museum-walnut mb-4 flex items-center gap-2">
          <Table size={20} className="text-museum-moss" />
          Coduri numerice
        </h2>
        <div className="overflow-x-auto rounded-xl border border-museum-walnut/10 shadow-warm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-museum-sand text-museum-walnut/70 text-xs uppercase tracking-wider">
                <th className="text-left px-4 py-3 font-semibold">Cod</th>
                <th className="text-left px-4 py-3 font-semibold">ID Stop</th>
                <th className="text-left px-4 py-3 font-semibold">Cameră</th>
                <th className="text-left px-4 py-3 font-semibold">Titlu (RO)</th>
                <th className="text-left px-4 py-3 font-semibold">Tur</th>
              </tr>
            </thead>
            <tbody>
              {codesRows.map((row, i) => (
                <tr
                  key={row.id}
                  className={`border-t border-museum-walnut/5 ${
                    i % 2 === 0 ? 'bg-museum-cream' : 'bg-museum-beige'
                  }`}
                >
                  <td className="px-4 py-2.5 font-mono font-bold text-museum-moss">
                    {row.code}
                  </td>
                  <td className="px-4 py-2.5 font-mono text-xs text-museum-walnut/70">
                    {row.id}
                  </td>
                  <td className="px-4 py-2.5 text-xs text-museum-walnut/60">{row.room}</td>
                  <td className="px-4 py-2.5 text-museum-walnut">{row.title}</td>
                  <td className="px-4 py-2.5 text-xs text-museum-walnut/60">{row.tour}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Export buttons */}
      <section>
        <h2 className="text-lg font-semibold text-museum-walnut mb-4 flex items-center gap-2">
          <Download size={20} className="text-museum-moss" />
          Export
        </h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleDownloadCSV}
            className="flex items-center gap-2 bg-museum-moss text-museum-cream px-5 py-2.5 rounded-full font-semibold shadow-warm hover:bg-museum-moss/90 active:scale-95 transition-all"
          >
            <Download size={16} /> Export CSV
          </button>
          <button
            onClick={handleDownloadZIP}
            disabled={zipping}
            className="flex items-center gap-2 bg-museum-walnut text-museum-cream px-5 py-2.5 rounded-full font-semibold shadow-warm hover:bg-museum-walnut/90 active:scale-95 transition-all disabled:opacity-60"
          >
            <Download size={16} />
            {zipping ? 'Se generează…' : 'Export ZIP QR'}
          </button>
        </div>
      </section>
    </main>
  );
}
