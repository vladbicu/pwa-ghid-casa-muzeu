import { createRequire } from 'module';
import { readFileSync, mkdirSync } from 'fs';

const require = createRequire(import.meta.url);
const QRCode = require('qrcode');

const tenant = JSON.parse(readFileSync('public/tenant.json', 'utf8'));
const toursData = JSON.parse(readFileSync('public/data/tours.json', 'utf8'));
const industryData = JSON.parse(readFileSync('public/data/industry.json', 'utf8'));

const BASE_URL = (tenant.contact?.website ?? 'https://casabukowina.ro') + tenant.baseUrl;
const OUTPUT_DIR = 'dist/qr';

mkdirSync(OUTPUT_DIR, { recursive: true });

const QR_OPTIONS = {
  width: 400,
  margin: 2,
  color: { dark: '#2C1810', light: '#FFFCF5' },
};

for (const tour of toursData.tours) {
  const url = `${BASE_URL}tour/${tour.id}`;
  await QRCode.toFile(`${OUTPUT_DIR}/tour-${tour.id}.png`, url, QR_OPTIONS);
  console.log(`  ✓ tour-${tour.id}.png  →  ${url}`);
}

for (const section of industryData.sections) {
  const url = `${BASE_URL}industry/${section.id}`;
  await QRCode.toFile(`${OUTPUT_DIR}/industry-${section.id}.png`, url, QR_OPTIONS);
  console.log(`  ✓ industry-${section.id}.png  →  ${url}`);
}

const total = toursData.tours.length + industryData.sections.length;
console.log(`\n✓ ${total} QR codes generate în ${OUTPUT_DIR}/`);
