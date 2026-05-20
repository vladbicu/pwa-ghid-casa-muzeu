import { readFileSync, writeFileSync } from 'fs';

const stopsData = JSON.parse(readFileSync('public/data/stops.json', 'utf8'));
const toursData = JSON.parse(readFileSync('public/data/tours.json', 'utf8'));
const industryData = JSON.parse(readFileSync('public/data/industry.json', 'utf8'));

// Build stop → tour lookup
const stopToTour = new Map();
for (const tour of toursData.tours) {
  for (const stopId of tour.stopIds) {
    stopToTour.set(stopId, tour.id);
  }
}

const rows = [['Cod', 'ID', 'Cameră', 'Titlu (RO)', 'Tur']];

for (const stop of stopsData.stops) {
  if (stop.shortCode === undefined) continue;
  rows.push([stop.shortCode, stop.id, stop.roomId, stop.title.ro, stopToTour.get(stop.id) ?? '']);
}

for (const section of industryData.sections) {
  if (section.shortCode === undefined) continue;
  rows.push([section.shortCode, section.id, '', section.title.ro, 'industrie']);
}

rows.slice(1).sort((a, b) => Number(a[0]) - Number(b[0]));
const sorted = [rows[0], ...rows.slice(1).sort((a, b) => Number(a[0]) - Number(b[0]))];
const csv = sorted.map((r) => r.map((v) => `"${v}"`).join(',')).join('\n');
writeFileSync('labels.csv', csv);
console.log(`✓ labels.csv generat cu ${sorted.length - 1} etichete`);
