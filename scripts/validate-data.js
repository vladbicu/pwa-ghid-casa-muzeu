import { readFileSync } from 'fs';

const toursData = JSON.parse(readFileSync('public/data/tours.json', 'utf8'));
const stopsData = JSON.parse(readFileSync('public/data/stops.json', 'utf8'));
const industryData = JSON.parse(readFileSync('public/data/industry.json', 'utf8'));

const LANGS = ['ro', 'en', 'fr', 'it'];
const errors = [];

// --- Validate stops ---
const stopIds = new Set(stopsData.stops.map((s) => s.id));
const seenShortCodes = new Map();

for (const stop of stopsData.stops) {
  if (!stop.id) {
    errors.push('Stop missing "id"');
    continue;
  }
  for (const lang of LANGS) {
    if (!stop.title?.[lang]) {
      errors.push(`Stop "${stop.id}" missing title.${lang}`);
    }
  }
  if (stop.shortCode !== undefined) {
    if (seenShortCodes.has(stop.shortCode)) {
      errors.push(
        `Duplicate shortCode ${stop.shortCode}: "${stop.id}" and "${seenShortCodes.get(stop.shortCode)}"`,
      );
    } else {
      seenShortCodes.set(stop.shortCode, stop.id);
    }
  }
}

// --- Validate tours ---
for (const tour of toursData.tours) {
  if (!tour.id) {
    errors.push('Tour missing "id"');
    continue;
  }
  for (const lang of LANGS) {
    if (!tour.title?.[lang]) {
      errors.push(`Tour "${tour.id}" missing title.${lang}`);
    }
  }
  for (const stopId of tour.stopIds ?? []) {
    if (!stopIds.has(stopId)) {
      errors.push(`Tour "${tour.id}" references unknown stop: "${stopId}"`);
    }
  }
}

// --- Validate industry sections ---
for (const section of industryData.sections) {
  if (!section.id) {
    errors.push('Industry section missing "id"');
    continue;
  }
  for (const lang of LANGS) {
    if (!section.title?.[lang]) {
      errors.push(`Industry section "${section.id}" missing title.${lang}`);
    }
  }
  if (section.shortCode !== undefined) {
    if (!Number.isInteger(section.shortCode) || section.shortCode <= 0) {
      errors.push(`Industry section "${section.id}" shortCode must be a positive integer`);
    } else if (seenShortCodes.has(section.shortCode)) {
      errors.push(
        `Duplicate shortCode ${section.shortCode}: "${section.id}" and "${seenShortCodes.get(section.shortCode)}"`,
      );
    } else {
      seenShortCodes.set(section.shortCode, section.id);
    }
  }
}

// --- Validate shortCode integrity on stops ---
for (const stop of stopsData.stops) {
  if (stop.shortCode !== undefined) {
    if (!Number.isInteger(stop.shortCode) || stop.shortCode <= 0) {
      errors.push(`Stop "${stop.id}" shortCode must be a positive integer`);
    }
  }
}

// --- Report ---
if (errors.length > 0) {
  console.error('Validation errors:');
  for (const err of errors) {
    console.error(`  ✗ ${err}`);
  }
  process.exit(1);
} else {
  console.log(
    `✓ ${stopsData.stops.length} opriri valide, ${toursData.tours.length} tururi, ${industryData.sections.length} secțiuni industrie`,
  );
  process.exit(0);
}
