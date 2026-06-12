#!/usr/bin/env node
/**
 * ============================================================
 *  🦷  Dentist Prototyp — Demo Data Seeder
 * ============================================================
 *
 *  Erzeugt realistische Termine, Patienten, Buchungen und
 *  Aktivitäten, damit das Admin-Dashboard lebendig aussieht.
 *
 *  Nutzung:
 *    1. Erstelle/ergänze .env im Projektstamm:
 *         VITE_SUPABASE_URL=https://xxxxxx.supabase.co
 *         VITE_SUPABASE_ANON_KEY=eyJhbGci...
 *         SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...   (optional, empfohlen)
 *
 *    2. node scripts/seed-demo-data.mjs
 *
 *  Das Script ist idempotent — doppelt ausführen erzeugt
 *  keine Duplikate (gleiche E-Mail = Skip).
 * ============================================================
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// ── Load .env manually (no dotenv dependency needed) ─────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env");

let envVars = {};
try {
  const envFile = readFileSync(envPath, "utf-8");
  for (const line of envFile.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    envVars[key] = value;
  }
} catch {
  console.error("❌ Konnte .env nicht lesen. Bitte erstelle sie im Projektstamm.");
  process.exit(1);
}

const SUPABASE_URL = envVars.VITE_SUPABASE_URL;
const SUPABASE_KEY = envVars.SUPABASE_SERVICE_ROLE_KEY || envVars.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("❌ VITE_SUPABASE_URL und VITE_SUPABASE_ANON_KEY müssen in .env definiert sein.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── Demo Patients ────────────────────────────────────────────────────────────
const DEMO_PATIENTS = [
  { first_name: "Anna",     last_name: "Müller",     email: "anna.mueller@demo.de",     phone_number: "0176 12345678", address_line_1: "Hauptstr. 12",     post_code: "10115", city: "Berlin"   },
  { first_name: "Markus",   last_name: "Schmidt",    email: "markus.schmidt@demo.de",   phone_number: "0171 98765432", address_line_1: "Lindenallee 5",    post_code: "80331", city: "München"  },
  { first_name: "Sophie",   last_name: "Weber",      email: "sophie.weber@demo.de",     phone_number: "0152 33445566", address_line_1: "Rosenweg 8",       post_code: "50667", city: "Köln"     },
  { first_name: "Thomas",   last_name: "Fischer",    email: "thomas.fischer@demo.de",   phone_number: "0163 77889900", address_line_1: "Bachstraße 22",    post_code: "60311", city: "Frankfurt"},
  { first_name: "Laura",    last_name: "Wagner",     email: "laura.wagner@demo.de",     phone_number: "0157 11223344", address_line_1: "Parkring 3",       post_code: "70173", city: "Stuttgart"},
  { first_name: "Michael",  last_name: "Becker",     email: "michael.becker@demo.de",   phone_number: "0172 55667788", address_line_1: "Am Markt 15",      post_code: "20095", city: "Hamburg"  },
  { first_name: "Elena",    last_name: "Hofmann",    email: "elena.hofmann@demo.de",    phone_number: "0160 44556677", address_line_1: "Kirchgasse 7",     post_code: "90402", city: "Nürnberg"},
  { first_name: "Jan",      last_name: "Richter",    email: "jan.richter@demo.de",      phone_number: "0178 22334455", address_line_1: "Schulstraße 19",   post_code: "01067", city: "Dresden" },
  { first_name: "Sabine",   last_name: "Klein",      email: "sabine.klein@demo.de",     phone_number: "0151 66778899", address_line_1: "Gartenweg 4",      post_code: "30159", city: "Hannover"},
  { first_name: "Felix",    last_name: "Zimmermann", email: "felix.zimmermann@demo.de", phone_number: "0176 99001122", address_line_1: "Friedrichstr. 31", post_code: "04109", city: "Leipzig" },
  { first_name: "Claudia",  last_name: "Braun",      email: "claudia.braun@demo.de",    phone_number: "0162 11009988", address_line_1: "Bahnhofstr. 10",   post_code: "40210", city: "Düsseldorf" },
  { first_name: "Stefan",   last_name: "Krause",     email: "stefan.krause@demo.de",    phone_number: "0155 44332211", address_line_1: "Schillerplatz 2",  post_code: "76131", city: "Karlsruhe" },
];

// ── Helper: Date/Time Utilities ──────────────────────────────────────────────
function dateStr(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function toISO(dateString, hours, minutes) {
  const d = new Date(`${dateString}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`);
  return d.toISOString();
}

function endTimeISO(dateString, hours, minutes, durationMinutes) {
  const start = new Date(`${dateString}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`);
  return new Date(start.getTime() + durationMinutes * 60 * 1000).toISOString();
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function isWeekend(d) {
  const day = d.getDay();
  return day === 0 || day === 6;
}

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomMinutesAgo(minMinutes, maxMinutes) {
  const minutes = minMinutes + Math.floor(Math.random() * (maxMinutes - minMinutes));
  return new Date(Date.now() - minutes * 60 * 1000).toISOString();
}

// ── Time Slots (realistic dental appointment times) ──────────────────────────
const TIME_SLOTS = [
  { h: 8,  m: 0  },
  { h: 8,  m: 30 },
  { h: 9,  m: 0  },
  { h: 9,  m: 30 },
  { h: 10, m: 0  },
  { h: 10, m: 30 },
  { h: 11, m: 0  },
  { h: 11, m: 30 },
  { h: 13, m: 0  },  // after lunch break
  { h: 13, m: 30 },
  { h: 14, m: 0  },
  { h: 14, m: 30 },
  { h: 15, m: 0  },
  { h: 15, m: 30 },
  { h: 16, m: 0  },
  { h: 16, m: 30 },
];

// ══════════════════════════════════════════════════════════════════════════════
//  MAIN
// ══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log("\n🦷 Dentist Prototyp — Demo Data Seeder\n");
  console.log("━".repeat(50));

  // ── 1. Get or ensure session types exist ─────────────────────────────────
  console.log("\n📋 Session Types laden...");
  let { data: sessionTypes, error: stError } = await supabase
    .from("session_types")
    .select("*")
    .order("name");

  if (stError) {
    console.error("❌ Fehler beim Laden der Session Types:", stError.message);
    process.exit(1);
  }

  if (!sessionTypes || sessionTypes.length === 0) {
    console.log("   → Keine Session Types gefunden. Erstelle Standard-Typen...");
    const defaultTypes = [
      { name: "Kontrolluntersuchung",          description: "Regelmäßige zahnärztliche Kontrolle",  default_duration_minutes: 30, base_price: 80   },
      { name: "Professionelle Zahnreinigung",  description: "PZR – Prophylaxe",                     default_duration_minutes: 60, base_price: 120  },
      { name: "Füllungstherapie",              description: "Behandlung von Karies",                default_duration_minutes: 45, base_price: 150  },
      { name: "Wurzelbehandlung",              description: "Endodontische Behandlung",             default_duration_minutes: 90, base_price: 350  },
      { name: "Beratungsgespräch",             description: "Erstberatung / Zweitmeinung",          default_duration_minutes: 20, base_price: 0    },
    ];

    const { data: created, error: createErr } = await supabase
      .from("session_types")
      .insert(defaultTypes)
      .select();

    if (createErr) {
      console.error("❌ Fehler beim Erstellen der Session Types:", createErr.message);
      process.exit(1);
    }
    sessionTypes = created;
  }

  console.log(`   ✅ ${sessionTypes.length} Session Types verfügbar:`);
  for (const st of sessionTypes) {
    console.log(`      • ${st.name} (${st.default_duration_minutes} min)`);
  }

  // ── 2. Create demo patients ──────────────────────────────────────────────
  console.log("\n👥 Demo-Patienten anlegen...");
  const patientIds = [];

  for (const patient of DEMO_PATIENTS) {
    // Check if already exists
    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("email", patient.email)
      .maybeSingle();

    if (existing) {
      console.log(`   ⏭  ${patient.first_name} ${patient.last_name} existiert bereits`);
      patientIds.push(existing.id);
      continue;
    }

    const { data: newPatient, error: pErr } = await supabase
      .from("users")
      .insert({ ...patient, role: "patient" })
      .select("id")
      .single();

    if (pErr) {
      console.error(`   ❌ ${patient.first_name}: ${pErr.message}`);
      continue;
    }

    console.log(`   ✅ ${patient.first_name} ${patient.last_name} angelegt`);
    patientIds.push(newPatient.id);
  }

  if (patientIds.length === 0) {
    console.error("❌ Keine Patienten verfügbar. Abbruch.");
    process.exit(1);
  }

  // ── 3. Find admin user for actor_id ──────────────────────────────────────
  const { data: adminUser } = await supabase
    .from("users")
    .select("id")
    .eq("role", "admin")
    .limit(1)
    .maybeSingle();

  const adminId = adminUser?.id || null;
  if (adminId) console.log(`\n👨‍⚕️ Admin-User gefunden: ${adminId}`);
  else console.log("\n⚠️  Kein Admin-User gefunden. Activities werden ohne actor_id erstellt.");

  // ── 4. Create sessions & bookings ────────────────────────────────────────
  console.log("\n📅 Termine erstellen...\n");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Generate appointments for: 5 days ago → 7 days from now
  const dayRange = [];
  for (let offset = -5; offset <= 7; offset++) {
    const d = addDays(today, offset);
    if (!isWeekend(d)) dayRange.push(d);
  }

  const bookingStatuses = ["confirmed", "attended", "no_show"];
  let totalCreated = 0;
  const allBookingIds = [];

  for (const day of dayRange) {
    const ds = dateStr(day);
    const isPast = day < today;
    const isToday = ds === dateStr(today);

    // 3-6 appointments per day for a lively dashboard
    const numAppointments = 3 + Math.floor(Math.random() * 4);
    
    // Shuffle and pick unique time slots for this day
    const shuffledSlots = [...TIME_SLOTS].sort(() => Math.random() - 0.5).slice(0, numAppointments);
    shuffledSlots.sort((a, b) => a.h * 60 + a.m - (b.h * 60 + b.m));

    for (let i = 0; i < shuffledSlots.length; i++) {
      const slot = shuffledSlots[i];
      const sessionType = randomPick(sessionTypes);
      const patientId = randomPick(patientIds);
      const duration = sessionType.default_duration_minutes || 30;

      const startTime = toISO(ds, slot.h, slot.m);
      const endTime = endTimeISO(ds, slot.h, slot.m, duration);

      // Create session
      const { data: session, error: sessErr } = await supabase
        .from("sessions")
        .insert({
          session_type_id: sessionType.id,
          start_time: startTime,
          end_time: endTime,
          max_slots: 1,
          status: "open",
        })
        .select("id")
        .single();

      if (sessErr) {
        console.error(`   ❌ Session ${ds} ${slot.h}:${slot.m}: ${sessErr.message}`);
        continue;
      }

      // Determine booking status
      let status;
      if (isPast) {
        // Past: mostly attended, some no_show
        status = Math.random() < 0.85 ? "attended" : "no_show";
      } else if (isToday) {
        // Today: mix of confirmed (upcoming) and attended (earlier today)
        const now = new Date();
        const appointmentTime = new Date(startTime);
        if (appointmentTime < now) {
          status = Math.random() < 0.8 ? "attended" : "confirmed";
        } else {
          status = "confirmed";
        }
      } else {
        // Future: all confirmed
        status = "confirmed";
      }

      // Create booking
      const notesOptions = [
        "Manuelle Einplanung (Admin)",
        "Online-Buchung",
        "Telefonische Vereinbarung",
        null,
        null,
      ];

      const { data: booking, error: bookErr } = await supabase
        .from("bookings")
        .insert({
          session_id: session.id,
          user_id: patientId,
          status,
          notes: isPast && status === "attended" ? randomPick([
            "Behandlung verlief ohne Komplikationen.",
            "Patient zufrieden. Nächster Termin in 6 Monaten empfohlen.",
            "Leichte Karies an Zahn 36 festgestellt. Folgetermin geplant.",
            "PZR durchgeführt. Mundhygiene insgesamt gut.",
            "Röntgenbilder angefertigt. Befund unauffällig.",
            "Füllung an Zahn 15 erneuert. Lokale Betäubung.",
          ]) : randomPick(notesOptions),
        })
        .select("id")
        .single();

      if (bookErr) {
        console.error(`   ❌ Booking: ${bookErr.message}`);
        continue;
      }

      allBookingIds.push(booking.id);
      totalCreated++;

      const timeStr = `${String(slot.h).padStart(2, "0")}:${String(slot.m).padStart(2, "0")}`;
      const statusEmoji = status === "attended" ? "✅" : status === "no_show" ? "⚠️" : "📋";
      console.log(`   ${statusEmoji} ${ds} ${timeStr} — ${sessionType.name} — ${status}`);
    }
  }

  console.log(`\n   📊 ${totalCreated} Termine insgesamt erstellt`);

  // ── 5. Create activities for the feed ────────────────────────────────────
  console.log("\n📝 Aktivitäten-Feed befüllen...");

  const activityActions = [
    "created", "created", "created",     // more frequent
    "confirmed", "confirmed",
    "attended",
    "canceled_by_user",
    "treatment_recorded",
  ];

  // Create ~15 realistic activities spread over recent hours/days
  const numActivities = Math.min(15, allBookingIds.length);
  const usedBookingIds = new Set();

  for (let i = 0; i < numActivities; i++) {
    // Pick a unique booking ID
    let bookingId;
    do {
      bookingId = randomPick(allBookingIds);
    } while (usedBookingIds.has(bookingId) && usedBookingIds.size < allBookingIds.length);
    usedBookingIds.add(bookingId);

    const action = randomPick(activityActions);
    const isAdmin = action === "created" || action === "treatment_recorded" || Math.random() < 0.3;

    const { error: actErr } = await supabase.from("activities").insert({
      action,
      entity_id: bookingId,
      actor_id: isAdmin ? adminId : randomPick(patientIds),
      created_at: randomMinutesAgo(i * 30, (i + 1) * 120),  // spread across time
    });

    if (actErr) {
      console.error(`   ❌ Activity: ${actErr.message}`);
    } else {
      console.log(`   ✅ ${action} (${isAdmin ? "Admin" : "Patient"})`);
    }
  }

  // Also add a few patient_created activities
  const recentPatients = patientIds.slice(0, 3);
  for (const pid of recentPatients) {
    // Get patient name
    const { data: p } = await supabase.from("users").select("first_name, last_name").eq("id", pid).single();
    
    const { error } = await supabase.from("activities").insert({
      action: "patient_created",
      entity_id: pid,
      actor_id: adminId,
      details: { first_name: p?.first_name, last_name: p?.last_name, patient_id: pid },
      created_at: randomMinutesAgo(200, 2000),
    });

    if (!error) console.log(`   ✅ patient_created — ${p?.first_name} ${p?.last_name}`);
  }

  // ── Done ─────────────────────────────────────────────────────────────────
  console.log("\n" + "━".repeat(50));
  console.log("🎉 Demo-Daten erfolgreich eingepflegt!");
  console.log(`   • ${patientIds.length} Patienten`);
  console.log(`   • ${totalCreated} Termine (Sessions + Bookings)`);
  console.log(`   • ${numActivities + recentPatients.length} Aktivitäten`);
  console.log("\n   Starte die App mit 'npm run dev' und öffne das Admin-Dashboard.\n");
}

main().catch((err) => {
  console.error("❌ Unerwarteter Fehler:", err);
  process.exit(1);
});
