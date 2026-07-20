import { useState } from "react";

// ─── SEED DATA ────────────────────────────────────────────────────────────────

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const initSchools = [
  { id: 1, name: "Westfield High",   color: "#f97316" },
  { id: 2, name: "Lincoln Academy",  color: "#3b82f6" },
  { id: 3, name: "Northview Prep",   color: "#a855f7" },
];

const initTeams = [
  { id: 1, schoolId: 1, name: "Sophomores", level: "sophomore" },
  { id: 2, schoolId: 1, name: "Juniors",    level: "junior"    },
  { id: 3, schoolId: 1, name: "Seniors",    level: "senior"    },
  { id: 4, schoolId: 2, name: "Juniors",    level: "junior"    },
  { id: 5, schoolId: 2, name: "Seniors",    level: "senior"    },
   { id: 6, schoolId: 3, name: "Sophomores", level: "sophomore" },
];

const initPractices = [
  { id: 1,  teamId: 1, day: "Mon", startTime: "15:00", endTime: "17:00", location: "Main Gym",       type: "practice",   notes: "Footwork & serve receive drills" },
  { id: 2,  teamId: 1, day: "Tue", startTime: "15:00", endTime: "17:00", location: "Main Gym",       type: "practice",   notes: "Blocking rotations" },
  { id: 3,  teamId: 3, day: "Wed", startTime: "17:00", endTime: "19:00", location: "Away – Lincoln", type: "game",       notes: "Travel by 5:30 PM — bus leaves front lot" },
  { id: 4,  teamId: 2, day: "Thu", startTime: "15:00", endTime: "17:00", location: "Main Gym",       type: "practice",   notes: "Setter & hitter combos" },
  { id: 5,  teamId: 2, day: "Fri", startTime: "15:00", endTime: "17:00", location: "Main Gym",       type: "practice",   notes: "Serve pressure + film review" },
  { id: 6,  teamId: 3, day: "Sat", startTime: "08:00", endTime: "14:00", location: "North Campus",   type: "tournament", notes: "Arrive 30 min early, full uniform required" },
  { id: 7,  teamId: 2, day: "Mon", startTime: "17:00", endTime: "19:00", location: "Aux Gym",        type: "practice",   notes: "Transition & defense" },
  { id: 8,  teamId: 2, day: "Tue", startTime: "17:00", endTime: "19:00", location: "Aux Gym",        type: "practice",   notes: "Scrimmage – internal" },
  { id: 9,  teamId: 2, day: "Thu", startTime: "17:00", endTime: "19:00", location: "Aux Gym",        type: "practice",   notes: "Conditioning + cooldown" },
  { id: 10, teamId: 4, day: "Mon", startTime: "16:00", endTime: "18:00", location: "Field House",    type: "practice",   notes: "Passing patterns & communication" },
  { id: 11, teamId: 4, day: "Wed", startTime: "16:00", endTime: "18:00", location: "Field House",    type: "practice",   notes: "Game-like reps, 6v6" },
  { id: 12, teamId: 6, day: "Tue", startTime: "15:30", endTime: "17:30", location: "Gym A",          type: "practice",   notes: "Intro to system rotations" },
];

const initHours = [
  { id: 1,  schoolId: 1, day: "Mon", schoolOpen: "07:30", schoolClose: "15:00", gymOpen: "15:00", gymClose: "21:00" },
  { id: 2,  schoolId: 1, day: "Tue", schoolOpen: "07:30", schoolClose: "15:00", gymOpen: "15:00", gymClose: "21:00" },
  { id: 3,  schoolId: 1, day: "Wed", schoolOpen: "07:30", schoolClose: "15:00", gymOpen: "15:00", gymClose: "21:00" },
  { id: 4,  schoolId: 1, day: "Thu", schoolOpen: "07:30", schoolClose: "15:00", gymOpen: "15:00", gymClose: "21:00" },
  { id: 5,  schoolId: 1, day: "Fri", schoolOpen: "07:30", schoolClose: "14:30", gymOpen: "15:00", gymClose: "21:00" },
  { id: 6,  schoolId: 1, day: "Sat", schoolOpen: "—",     schoolClose: "—",     gymOpen: "08:00", gymClose: "15:00" },
  { id: 7,  schoolId: 1, day: "Sun", schoolOpen: "—",     schoolClose: "—",     gymOpen: "—",     gymClose: "—"     },
  { id: 8,  schoolId: 2, day: "Mon", schoolOpen: "07:45", schoolClose: "15:00", gymOpen: "15:00", gymClose: "21:00" },
  { id: 9,  schoolId: 2, day: "Tue", schoolOpen: "07:45", schoolClose: "15:00", gymOpen: "15:00", gymClose: "21:00" },
  { id: 10, schoolId: 2, day: "Wed", schoolOpen: "07:45", schoolClose: "15:00", gymOpen: "15:00", gymClose: "21:00" },
  { id: 11, schoolId: 2, day: "Thu", schoolOpen: "07:45", schoolClose: "15:00", gymOpen: "15:00", gymClose: "21:00" },
  { id: 12, schoolId: 2, day: "Fri", schoolOpen: "07:45", schoolClose: "14:30", gymOpen: "15:00", gymClose: "21:00" },
  { id: 13, schoolId: 2, day: "Sat", schoolOpen: "—",     schoolClose: "—",     gymOpen: "—",     gymClose: "—"     },
  { id: 14, schoolId: 2, day: "Sun", schoolOpen: "—",     schoolClose: "—",     gymOpen: "—",     gymClose: "—"     },
  { id: 15, schoolId: 3, day: "Mon", schoolOpen: "08:00", schoolClose: "15:00", gymOpen: "15:00", gymClose: "21:00" },
  { id: 16, schoolId: 3, day: "Tue", schoolOpen: "08:00", schoolClose: "15:00", gymOpen: "15:00", gymClose: "21:00" },
  { id: 17, schoolId: 3, day: "Wed", schoolOpen: "08:00", schoolClose: "15:00", gymOpen: "15:00", gymClose: "21:00" },
  { id: 18, schoolId: 3, day: "Thu", schoolOpen: "08:00", schoolClose: "15:00", gymOpen: "15:00", gymClose: "21:00" },
  { id: 19, schoolId: 3, day: "Fri", schoolOpen: "08:00", schoolClose: "15:00", gymOpen: "15:00", gymClose: "21:00" },
  { id: 20, schoolId: 3, day: "Sat", schoolOpen: "—",     schoolClose: "—",     gymOpen: "—",     gymClose: "—"     },
  { id: 21, schoolId: 3, day: "Sun", schoolOpen: "—",     schoolClose: "—",     gymOpen: "—",     gymClose: "—"     },
];

const initPlayers = [
  { id: 1, teamId: 1, name: "Alex Lee",    number: 7,  position: "Setter",         role: "captain", email: "alex@westfield.edu"   },
  { id: 2, teamId: 1, name: "Maya Kim",    number: 12, position: "Outside Hitter", role: "player",  email: "maya@westfield.edu"   },
  { id: 3, teamId: 1, name: "Jordan Park", number: 3,  position: "Libero",         role: "player",  email: "jordan@westfield.edu" },
  { id: 4, teamId: 2, name: "Taylor Singh",number: 9,  position: "Middle Blocker", role: "player",  email: "taylor@westfield.edu" },
  { id: 5, teamId: 2, name: "Sam Torres",  number: 5,  position: "Setter",         role: "captain", email: "sam@westfield.edu"    },
  { id: 6, teamId: 3, name: "Riley Chen",  number: 11, position: "Right Side",     role: "captain", email: "riley@westfield.edu"  },
  { id: 7, teamId: 4, name: "Jamie Walsh", number: 1,  position: "Libero",         role: "captain", email: "jamie@lincoln.edu"    },
  { id: 8, teamId: 6, name: "Drew Patel",  number: 14, position: "Setter",         role: "captain", email: "drew@northview.edu"   },
];

const initCoaches = [
  { id: 1, schoolId: 1, name: "Jamie Mitchell", role: "Head Coach",      email: "j.mitchell@westfield.edu", phone: "555-0101" },
  { id: 2, schoolId: 1, name: "Sam Rivera",     role: "Assistant Coach", email: "s.rivera@westfield.edu",   phone: "555-0102" },
  { id: 3, schoolId: 2, name: "Casey Morgan",   role: "Head Coach",      email: "c.morgan@lincoln.edu",     phone: "555-0201" },
  { id: 4, schoolId: 3, name: "Pat Nguyen",     role: "Head Coach",      email: "p.nguyen@northview.edu",   phone: "555-0301" },
];

const initMessages = [
  { id: 1, teamId: 1, sender: "Coach Mitchell", text: "Practice moved to Gym B today — east doors!",    time: "2:15 PM", mine: false },
  { id: 2, teamId: 3, sender: "Coach Mitchell", text: "Everyone confirm for Saturday's tournament",       time: "2:17 PM", mine: false },
  { id: 3, teamId: 3, sender: "You",            text: "Confirmed! I'll be there",                        time: "2:20 PM", mine: true  },
  { id: 4, teamId: 3, sender: "Alex Lee",       text: "Same here, bringing water bottles",               time: "2:22 PM", mine: false },
  { id: 5, teamId: 2, sender: "Coach Rivera",   text: "Juniors scrimmage Thursday is confirmed",         time: "1:05 PM", mine: false },
  { id: 6, teamId: 2, sender: "Sam Torres",     text: "Ready! What time should we arrive?",              time: "1:08 PM", mine: false },
];

// color swatches coaches/admins can pick when adding or editing a school
const SCHOOL_SWATCHES = ["#f97316", "#3b82f6", "#a855f7", "#10b981", "#e11d48", "#f59e0b"];

// ─── UTILS ────────────────────────────────────────────────────────────────────

// converts "15:00" → "3:00 PM"
function fmt12(t) {
  if (!t || t === "—") return "—";
  const parts = String(t).split(":");
  const h = Number(parts[0]);
  const m = Number(parts[1]);
  if (Number.isNaN(h) || Number.isNaN(m)) return "—";
  const ampm = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${ampm}`;
}

// check if something is a real HH:MM time vs a placeholder "—"
function isValidTime(v) {
  return v && v !== "—" && /^\d{1,2}:\d{2}$/.test(String(v));
}

// short grade label like "10th"
function gradeShort(level) {
  const map = { sophomore: "10th", junior: "11th", senior: "12th" };
  return map[level] || level;
}

// full grade word
function gradeWord(level) {
  const map = { sophomore: "Sophomore", junior: "Junior", senior: "Senior" };
  return map[level] || level;
}

// localStorage helpers for keeping the user signed in between refreshes
const SESSION_KEY = "vb_scheduler_session";

function readSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const j = JSON.parse(raw);
    if (!j?.name?.trim()) return null;
    if (j.kind !== "student" && j.kind !== "coach") return null;
    if (j.kind === "student" && !["sophomore", "junior", "senior"].includes(j.gradeLevel)) return null;
    return { name: j.name.trim(), kind: j.kind, gradeLevel: j.kind === "student" ? j.gradeLevel : undefined };
  } catch {
    return null;
  }
}

function writeSession(session) {
  if (typeof window === "undefined") return;
  if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  else localStorage.removeItem(SESSION_KEY);
}

// ─── THEME TOKENS ─────────────────────────────────────────────────────────────
// All the colors/shadows we reuse so they're easy to tweak in one place
const T = {
  // page background — dark court-blue/navy
  pageBg:     "#0b1120",
  pageAccent: "rgba(249,115,22,0.07)",  // faint orange glow on the bg

  // card & surface colors
  cardBg:     "#ffffff",
  surfaceBg:  "#f8fafc",
  headerBg:   "#0f1729",

  // brand accent: orange (volleyball) + blue secondary
  orange:     "#f97316",
  orangeHi:   "#fb923c",
  orangeDark: "#c2410c",
  blue:       "#3b82f6",
  mint:       "#10b981",

  // text
  ink:        "#0f172a",
  muted:      "#64748b",
  faint:      "#94a3b8",

  // borders
  border:     "rgba(15,23,42,0.12)",
  borderAccent: "rgba(249,115,22,0.3)",

  // shadows
  shadow:     "0 4px 20px rgba(0,0,0,0.10)",
  shadowLg:   "0 12px 40px rgba(0,0,0,0.16)",
  shadowModal:"0 24px 60px rgba(0,0,0,0.40)",
};

// colors for each event type badge
function typeColors(type) {
  if (type === "game")       return { bg: "#fef9c3", text: "#713f12", border: "#fde047" };
  if (type === "tournament") return { bg: "#fee2e2", text: "#7f1d1d", border: "#fca5a5" };
  return                            { bg: "#dcfce7", text: "#14532d", border: "#86efac" };
}

// pick a consistent avatar color from someone's name
function avatarColor(name) {
  const palette = [
    { bg: "#fff7ed", text: "#9a3412" },
    { bg: "#eff6ff", text: "#1e40af" },
    { bg: "#f0fdf4", text: "#14532d" },
    { bg: "#fdf4ff", text: "#581c87" },
    { bg: "#fff1f2", text: "#881337" },
    { bg: "#f0fdfa", text: "#134e4a" },
  ];
  return palette[name.charCodeAt(0) % palette.length];
}

function initials(name) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

// ─── SMALL REUSABLE COMPONENTS ────────────────────────────────────────────────

function Avatar({ name, size = 32 }) {
  const { bg, text } = avatarColor(name);
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: bg, color: text,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.36, fontWeight: 700, flexShrink: 0,
      border: `1.5px solid ${T.border}`,
    }}>
      {initials(name)}
    </div>
  );
}

// small colored pill label
function Badge({ label, type = "green" }) {
  const colors = {
    green:  { bg: "#dcfce7", text: "#14532d" },
    blue:   { bg: "#dbeafe", text: "#1e3a8a" },
    amber:  { bg: "#fef3c7", text: "#78350f" },
    orange: { bg: "#ffedd5", text: "#7c2d12" },
    red:    { bg: "#fee2e2", text: "#7f1d1d" },
    purple: { bg: "#f3e8ff", text: "#4c1d95" },
  };
  const c = colors[type] || colors.green;
  return (
    <span style={{
      background: c.bg, color: c.text,
      fontSize: 11, fontWeight: 700,
      padding: "2px 9px", borderRadius: 99,
      whiteSpace: "nowrap", letterSpacing: "0.02em",
    }}>
      {label}
    </span>
  );
}

// the volleyball logo mark used in the nav
function VolleyballMark({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <circle cx="16" cy="16" r="14" fill="#fff7ed" stroke={T.orange} strokeWidth="1.5" />
      <path
        d="M16 2 C10 10 10 22 16 30 M16 2 C22 10 22 22 16 30 M2 16 C10 10 22 10 30 16 M2 16 C10 22 22 22 30 16"
        fill="none" stroke={T.orange} strokeWidth="1.4" strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="3" fill={T.orange} />
    </svg>
  );
}

// centered modal with a dark backdrop
function Modal({ title, onClose, children, wide }) {
  return (
    <div
      role="presentation"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(11,17,32,0.80)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: T.cardBg,
          border: `1px solid ${T.border}`,
          borderRadius: 18,
          boxShadow: T.shadowModal,
          width: wide ? 500 : 440,
          maxWidth: "94vw",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "22px 26px 26px",
        }}
      >
        {/* header row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <span style={{ fontWeight: 700, fontSize: 17, color: T.ink }}>{title}</span>
          <button
            type="button" onClick={onClose}
            style={{ background: T.surfaceBg, border: `1px solid ${T.border}`, cursor: "pointer", fontSize: 18, color: T.muted, width: 34, height: 34, borderRadius: 9, lineHeight: 1 }}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// label + input wrapper used inside modals
function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ fontSize: 12, color: T.muted, fontWeight: 700, display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.04em" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

// shared input/select styles — high contrast on a white modal bg
const INPUT = {
  width: "100%", padding: "9px 11px",
  border: `1.5px solid #cbd5e1`, borderRadius: 9,
  fontSize: 14, background: "#fff", color: T.ink,
  boxSizing: "border-box", outline: "none",
};
const SELECT = { ...INPUT, cursor: "pointer" };

// main button component — variant: "default" | "primary" | "danger"
function Btn({ onClick, children, variant = "default", small, disabled, style: extra }) {
  const base = {
    borderRadius: 9, fontWeight: 700,
    fontSize: small ? 12 : 13,
    padding: small ? "5px 11px" : "8px 16px",
    border: "1.5px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    transition: "opacity 0.15s",
  };
  const variants = {
    default: { background: T.surfaceBg,   color: T.ink,       border: `1.5px solid ${T.border}` },
    primary: { background: T.orange,      color: "#fff",      border: `1.5px solid ${T.orangeDark}`, boxShadow: "0 2px 10px rgba(249,115,22,0.30)" },
    danger:  { background: "#fee2e2",     color: "#7f1d1d",   border: "1.5px solid #fca5a5" },
  };
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      style={{ ...base, ...variants[variant], ...extra }}
    >
      {children}
    </button>
  );
}

// ─── SCHOOL FORM (shared by add + edit modals) ────────────────────────────────

function SchoolForm({ school, onClose, onSave }) {
  const [name, setName] = useState(school.name || "");
  const [color, setColor] = useState(school.color || SCHOOL_SWATCHES[0]);

  function submit() {
    const n = name.trim();
    if (!n) return;
    onSave({ ...school, name: n, color });
    onClose();
  }

  return (
    <>
      <Field label="School name">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Westfield High"
          style={INPUT}
          autoFocus
        />
      </Field>
      <Field label="Team color">
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {SCHOOL_SWATCHES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              style={{
                width: 36, height: 36, borderRadius: "50%", background: c,
                border: color === c ? `3px solid ${T.ink}` : "2px solid rgba(15,23,42,0.15)",
                cursor: "pointer",
                boxShadow: color === c ? `0 0 0 2px #fff, 0 0 0 4px ${c}` : "none",
              }}
              aria-label={`Pick color ${c}`}
            />
          ))}
        </div>
      </Field>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
        <Btn onClick={onClose}>Cancel</Btn>
        <Btn variant="primary" onClick={submit} disabled={!name.trim()}>Save</Btn>
      </div>
    </>
  );
}

// ─── SIGN UP PAGE ──────────────────────────────────────────────────────────────

function SignupPage({ onComplete }) {
  const [name, setName] = useState("");
  const [kind, setKind] = useState("student");
  const [gradeLevel, setGradeLevel] = useState("sophomore");

  function submit() {
    const n = name.trim();
    if (!n) return;
    if (kind === "student") onComplete({ name: n, kind: "student", gradeLevel });
    else onComplete({ name: n, kind: "coach" });
  }

  // styles for the Student / Coach toggle buttons
  function roleBtn(active) {
    return {
      flex: 1, padding: "11px 14px", borderRadius: 10,
      fontSize: 14, fontWeight: 700, cursor: "pointer",
      background: active ? T.orange : "rgba(255,255,255,0.08)",
      color: active ? "#fff" : "#f1f5f9",
      border: active ? "none" : "1px solid rgba(255,255,255,0.15)",
    };
  }

  return (
    <div style={{ maxWidth: 420, margin: "52px auto 0", padding: "0 16px" }}>
      <div style={{ background: T.cardBg, border: `1px solid ${T.border}`, borderRadius: 18, padding: "28px 24px", boxShadow: T.shadowLg }}>
        {/* logo + title */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <VolleyballMark size={32} />
          <h1 style={{ margin: 0, fontSize: 21, fontWeight: 800, color: T.ink, letterSpacing: "-0.02em" }}>
            Volleyball Scheduler
          </h1>
        </div>
        <p style={{ margin: "0 0 22px", fontSize: 13, color: T.muted, lineHeight: 1.55 }}>
          Enter your info to get started. Coaches can manage schedules, hours, and rosters.
        </p>

        <Field label="Your name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Full name"
            style={INPUT}
            autoComplete="name"
            autoFocus
          />
        </Field>

        <Field label="I am a">
          <div style={{ display: "flex", gap: 10, background: "rgba(15,23,42,0.85)", borderRadius: 12, padding: 6 }}>
            <button type="button" onClick={() => setKind("student")} style={roleBtn(kind === "student")}>Student</button>
            <button type="button" onClick={() => setKind("coach")}   style={roleBtn(kind === "coach")}>Coach</button>
          </div>
        </Field>

        {kind === "student" && (
          <Field label="Grade">
            <select value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)} style={INPUT}>
              <option value="sophomore">Sophomore</option>
              <option value="junior">Junior</option>
              <option value="senior">Senior</option>
            </select>
          </Field>
        )}

        <Btn
          variant="primary"
          onClick={submit}
          disabled={!name.trim()}
          style={{ width: "100%", marginTop: 6, padding: "11px 14px", boxSizing: "border-box" }}
        >
          Continue →
        </Btn>
      </div>
    </div>
  );
}

// ─── 1. SCHEDULE PAGE ─────────────────────────────────────────────────────────

function SchedulePage({ schools, setSchools, teams, setTeams, practices, setPractices }) {
  const [selectedSchool, setSelectedSchool] = useState(schools[0]?.id);
  const [showSchoolForm, setShowSchoolForm] = useState(false);
  const [schoolFormMode, setSchoolFormMode] = useState("edit"); // "edit" or "add"
  const [showEventForm, setShowEventForm] = useState(false);
  const [editEventId, setEditEventId] = useState(null);
  const [eventForm, setEventForm] = useState({ teamId: "", day: "Mon", startTime: "15:00", endTime: "17:00", location: "", type: "practice", notes: "" });

  // what teams and events belong to the currently selected school
  const schoolTeams = teams.filter(t => t.schoolId === selectedSchool);
  const teamIds = schoolTeams.map(t => t.id);
  const schoolPractices = practices.filter(p => teamIds.includes(p.teamId));

  // open the "add event" form prefilled with a specific day
  function openAddForDay(day) {
    if (!schoolTeams.length) return;
    setEventForm({ teamId: schoolTeams[0].id, day, startTime: "15:00", endTime: "17:00", location: "", type: "practice", notes: "" });
    setEditEventId(null);
    setShowEventForm(true);
  }

  function openEditEvent(p) {
    setEventForm({ ...p });
    setEditEventId(p.id);
    setShowEventForm(true);
  }

  function saveEvent() {
    const teamId = Number(eventForm.teamId);
    if (editEventId) {
      setPractices(ps => ps.map(p => p.id === editEventId ? { ...eventForm, id: editEventId, teamId } : p));
    } else {
      setPractices(ps => [...ps, { ...eventForm, id: Date.now(), teamId }]);
    }
    setShowEventForm(false);
  }

  function deleteEvent(id) {
    setPractices(ps => ps.filter(p => p.id !== id));
  }

  function addSchool() {
    setSchoolFormMode("add");
    setShowSchoolForm(true);
  }

  function editSchool() {
    setSchoolFormMode("edit");
    setShowSchoolForm(true);
  }

  function handleSaveSchool(updated) {
    if (schoolFormMode === "add") {
      const newSchool = { ...updated, id: Date.now() };
      setSchools(ss => [...ss, newSchool]);
      setSelectedSchool(newSchool.id);
    } else {
      setSchools(ss => ss.map(s => s.id === updated.id ? updated : s));
    }
  }

  function deleteSchool(id) {
    // also clean up related teams + practices
    const tIds = teams.filter(t => t.schoolId === id).map(t => t.id);
    setTeams(ts => ts.filter(t => t.schoolId !== id));
    setPractices(ps => ps.filter(p => !tIds.includes(p.teamId)));
    const remaining = schools.filter(s => s.id !== id);
    setSchools(remaining);
    setSelectedSchool(remaining[0]?.id || null);
  }

  const currentSchool = schools.find(s => s.id === selectedSchool);

  return (
    <div>
      {/* page intro blurb */}
      <p style={{ margin: "0 0 16px", fontSize: 13, color: T.muted, lineHeight: 1.6 }}>
        Select a school below, then <strong style={{ color: T.ink }}>click any day</strong> to add a practice, game, or tournament.
        Click an existing event to edit it. Each event has a <em>notes</em> field so coaches can explain what to expect.
      </p>

      {/* school selector row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          {schools.map(s => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedSchool(s.id)}
              style={{
                padding: "7px 16px", borderRadius: 99, fontSize: 13, fontWeight: 700, cursor: "pointer",
                background: selectedSchool === s.id ? s.color : T.surfaceBg,
                color:      selectedSchool === s.id ? "#fff"   : T.ink,
                border:     selectedSchool === s.id ? "none"   : `1.5px solid ${T.border}`,
                boxShadow:  selectedSchool === s.id ? `0 4px 14px ${s.color}55` : "none",
                transition: "box-shadow 0.15s",
              }}
            >
              {s.name}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Btn small onClick={addSchool}>+ Add school</Btn>
          {currentSchool && <Btn small onClick={editSchool}>Edit school</Btn>}
          {currentSchool && schools.length > 1 && (
            <Btn small variant="danger" onClick={() => {
              if (window.confirm(`Remove "${currentSchool.name}" and all its data?`)) deleteSchool(selectedSchool);
            }}>
              Remove school
            </Btn>
          )}
          <Btn variant="primary" onClick={() => openAddForDay("Mon")} disabled={!schoolTeams.length}>
            + Add event
          </Btn>
        </div>
      </div>

      {schoolTeams.length === 0 && (
        <div style={{ padding: "12px 16px", borderRadius: 10, background: "#fff7ed", border: `1px solid #fed7aa`, color: "#7c2d12", fontSize: 13, marginBottom: 14 }}>
          This school has no teams yet. Go to the <strong>Hours</strong> tab to add teams first.
        </div>
      )}

      {/* 7-day calendar grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: 8, marginBottom: 22 }}>
        {DAYS.map(day => {
          const dayEvents = schoolPractices.filter(p => p.day === day);
          return (
            <div
              key={day}
              style={{ border: `1.5px solid ${T.border}`, borderRadius: 12, overflow: "hidden", background: T.cardBg, boxShadow: T.shadow }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.orange; e.currentTarget.style.boxShadow = `0 6px 24px rgba(249,115,22,0.14)`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = T.shadow; }}
            >
              {/* day header */}
              <div style={{
                background: `linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)`,
                padding: "7px 8px", fontSize: 11, fontWeight: 800,
                color: T.orangeDark, textAlign: "center",
                borderBottom: `1.5px solid #fed7aa`, letterSpacing: "0.06em",
              }}>
                {day.toUpperCase()}
              </div>

              {/* clickable body — click empty space to add */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => schoolTeams.length > 0 && openAddForDay(day)}
                onKeyDown={e => (e.key === "Enter" || e.key === " ") && openAddForDay(day)}
                style={{ minHeight: 90, padding: "6px 5px 8px", cursor: schoolTeams.length ? "pointer" : "default" }}
              >
                {dayEvents.length === 0 && (
                  <div style={{ padding: "14px 6px", fontSize: 11, color: T.faint, textAlign: "center", lineHeight: 1.4 }}>
                    {schoolTeams.length ? "Tap to add" : "—"}
                  </div>
                )}
                {dayEvents.map(p => {
                  const team = teams.find(t => t.id === p.teamId);
                  const tc = typeColors(p.type);
                  return (
                    <div
                      key={p.id}
                      role="button"
                      tabIndex={0}
                      onClick={e => { e.stopPropagation(); openEditEvent(p); }}
                      onKeyDown={e => (e.key === "Enter" || e.key === " ") && openEditEvent(p)}
                      style={{
                        margin: "0 0 6px", padding: "6px 7px", borderRadius: 8,
                        background: tc.bg, color: tc.text,
                        border: `1px solid ${tc.border}`,
                        fontSize: 10, cursor: "pointer",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.filter = "brightness(0.96)"; }}
                      onMouseLeave={e => { e.currentTarget.style.filter = "none"; }}
                    >
                      <div style={{ fontWeight: 800 }}>{team?.name}</div>
                      <div>{fmt12(p.startTime)} – {fmt12(p.endTime)}</div>
                      {/* show first ~28 chars of notes inline if they exist */}
                      {p.notes && <div style={{ marginTop: 2, opacity: 0.75, fontSize: 9, lineHeight: 1.3 }}>{p.notes.slice(0, 32)}{p.notes.length > 32 ? "…" : ""}</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* full event list below the grid */}
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10, color: T.ink }}>All events — {currentSchool?.name}</div>
      <div style={{ border: `1.5px solid ${T.border}`, borderRadius: 14, overflow: "hidden", background: T.cardBg, boxShadow: T.shadow }}>
        {schoolPractices.length === 0 && (
          <div style={{ padding: 16, fontSize: 13, color: T.muted }}>No events yet. Click a day above to get started.</div>
        )}
        {schoolPractices.map((p, i) => {
          const team = teams.find(t => t.id === p.teamId);
          const tc = typeColors(p.type);
          return (
            <div
              key={p.id}
              style={{ padding: "12px 16px", borderBottom: i < schoolPractices.length - 1 ? `1px solid ${T.border}` : "none", transition: "background 0.12s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#fff7ed"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
            >
              {/* top row: day, time, team, type badge, edit/delete */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13, flexWrap: "wrap" }}>
                <span style={{ minWidth: 30, fontWeight: 700, color: T.muted, fontSize: 12 }}>{p.day}</span>
                <span style={{ minWidth: 110, color: T.muted, fontSize: 12 }}>{fmt12(p.startTime)} – {fmt12(p.endTime)}</span>
                <span style={{ flex: 1, fontWeight: 700, color: T.ink }}>{team?.name} — {p.location || "—"}</span>
                <span style={{ background: tc.bg, color: tc.text, border: `1px solid ${tc.border}`, fontSize: 11, padding: "2px 9px", borderRadius: 99, fontWeight: 700, textTransform: "capitalize" }}>{p.type}</span>
                <Btn small onClick={() => openEditEvent(p)}>Edit</Btn>
                <Btn small variant="danger" onClick={() => deleteEvent(p.id)}>Delete</Btn>
              </div>
              {/* notes row — only show if there are notes */}
              {p.notes && (
                <div style={{ marginTop: 5, fontSize: 12, color: T.muted, paddingLeft: 42, lineHeight: 1.5 }}>
                  📋 {p.notes}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* school add/edit modal */}
      {showSchoolForm && (
        <Modal
          title={schoolFormMode === "add" ? "Add school" : `Edit — ${currentSchool?.name}`}
          onClose={() => setShowSchoolForm(false)}
        >
          <SchoolForm
            key={schoolFormMode === "add" ? "new" : selectedSchool}
            school={schoolFormMode === "add" ? { name: "", color: SCHOOL_SWATCHES[0] } : currentSchool}
            onClose={() => setShowSchoolForm(false)}
            onSave={handleSaveSchool}
          />
        </Modal>
      )}

      {/* add / edit event modal */}
      {showEventForm && (
        <Modal title={editEventId ? "Edit event" : "Add event"} onClose={() => setShowEventForm(false)} wide>
          <Field label="Team">
            <select value={eventForm.teamId} onChange={e => setEventForm({ ...eventForm, teamId: e.target.value })} style={SELECT}>
              {schoolTeams.map(t => <option key={t.id} value={t.id}>{t.name} ({gradeWord(t.level)})</option>)}
            </select>
          </Field>
          <Field label="Day">
            <select value={eventForm.day} onChange={e => setEventForm({ ...eventForm, day: e.target.value })} style={SELECT}>
              {DAYS.map(d => <option key={d}>{d}</option>)}
            </select>
          </Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Field label="Start time">
              <input type="time" value={eventForm.startTime} onChange={e => setEventForm({ ...eventForm, startTime: e.target.value })} style={INPUT} />
            </Field>
            <Field label="End time">
              <input type="time" value={eventForm.endTime} onChange={e => setEventForm({ ...eventForm, endTime: e.target.value })} style={INPUT} />
            </Field>
          </div>
          <Field label="Location">
            <input value={eventForm.location} onChange={e => setEventForm({ ...eventForm, location: e.target.value })} placeholder="e.g. Main Gym" style={INPUT} />
          </Field>
          <Field label="Type">
            <select value={eventForm.type} onChange={e => setEventForm({ ...eventForm, type: e.target.value })} style={SELECT}>
              <option value="practice">Practice</option>
              <option value="game">Game</option>
              <option value="tournament">Tournament</option>
            </select>
          </Field>
          {/* notes field — this is what shows on the event card and list */}
          <Field label="Session notes (what players should expect)">
            <textarea
              value={eventForm.notes}
              onChange={e => setEventForm({ ...eventForm, notes: e.target.value })}
              placeholder="e.g. Footwork drills + serve receive. Bring knee pads."
              rows={3}
              style={{ ...INPUT, resize: "vertical", lineHeight: 1.5 }}
            />
          </Field>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 16 }}>
            <Btn onClick={() => setShowEventForm(false)}>Cancel</Btn>
            <Btn variant="primary" onClick={saveEvent}>Save event</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── 2. HOURS PAGE ────────────────────────────────────────────────────────────

const DEFAULT_SCHOOL_HOURS = { open: "07:30", close: "15:00" };
const DEFAULT_GYM_HOURS    = { open: "15:00", close: "21:00" };

// helper: given a practice type, return what players are typically doing
function practiceDescription(type) {
  if (type === "game")       return "Competition day — arrive early, check your gear, and be ready to warm up as a unit.";
  if (type === "tournament") return "Full-day tournament — pack meals, extra water, and expect multiple matches.";
  return "Practice session — focus on drills, rotations, and team communication.";
}

function HoursPage({ schools, setSchools, hours, setHours, teams, setTeams, practices, setPractices, coaches, setCoaches }) {
  const [selectedSchool, setSelectedSchool] = useState(schools[0]?.id);
  const [showSchoolForm, setShowSchoolForm] = useState(false);
  const [schoolFormMode, setSchoolFormMode] = useState("edit");
  const [editDay, setEditDay] = useState(null);
  const [form, setForm] = useState({});
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [editTeamId, setEditTeamId] = useState(null);
  const [teamForm, setTeamForm] = useState({ name: "", level: "sophomore" });
  const [showCoachForm, setShowCoachForm] = useState(false);
  const [editCoachId, setEditCoachId] = useState(null);
  const [coachForm, setCoachForm] = useState({ name: "", role: "Head Coach", email: "", phone: "" });

  const schoolHours  = hours.filter(h => h.schoolId === selectedSchool);
  const schoolTeams  = teams.filter(t => t.schoolId === selectedSchool);
  const schoolCoaches = coaches.filter(c => c.schoolId === selectedSchool);

  const currentSchool = schools.find(s => s.id === selectedSchool);

  // get the hour row for a given day (or fall back to closed values)
  function getRow(day) {
    return schoolHours.find(h => h.day === day) || {
      day, schoolId: selectedSchool,
      schoolOpen: "—", schoolClose: "—",
      gymOpen: "—", gymClose: "—",
    };
  }

  function openEditDay(row) {
    setForm({ ...row, schoolId: selectedSchool });
    setEditDay(row.day);
  }

  function saveHours() {
    const next = {
      ...form,
      schoolId: selectedSchool,
      day: form.day || editDay,
      schoolOpen:  form.schoolOpen  || "—",
      schoolClose: form.schoolClose || "—",
      gymOpen:     form.gymOpen     || "—",
      gymClose:    form.gymClose    || "—",
    };
    setHours(hs => {
      const exists = hs.find(h => h.schoolId === selectedSchool && h.day === next.day);
      if (exists) return hs.map(h => (h.schoolId === selectedSchool && h.day === next.day ? { ...exists, ...next } : h));
      return [...hs, { ...next, id: Date.now() }];
    });
    setEditDay(null);
  }

  // whether the school / gym is marked closed in the current form
  const schoolClosed = !isValidTime(form.schoolOpen) || form.schoolOpen === "—";
  const gymClosed    = !isValidTime(form.gymOpen)    || form.gymOpen    === "—";

  // team crud
  function openAddTeam() { setTeamForm({ name: "", level: "sophomore" }); setEditTeamId(null); setShowTeamForm(true); }
  function openEditTeam(t) { setTeamForm({ name: t.name, level: t.level || "sophomore" }); setEditTeamId(t.id); setShowTeamForm(true); }
  function saveTeam() {
    if (!teamForm.name.trim()) return;
    if (editTeamId) {
      setTeams(ts => ts.map(t => t.id === editTeamId ? { ...t, name: teamForm.name.trim(), level: teamForm.level } : t));
    } else {
      setTeams(ts => [...ts, { id: Date.now(), schoolId: selectedSchool, name: teamForm.name.trim(), level: teamForm.level }]);
    }
    setShowTeamForm(false);
  }
  function deleteTeam(id) {
    setTeams(ts => ts.filter(t => t.id !== id));
    setPractices(ps => ps.filter(p => p.teamId !== id));
  }

  // coach crud
  function openAddCoach() { setCoachForm({ name: "", role: "Head Coach", email: "", phone: "" }); setEditCoachId(null); setShowCoachForm(true); }
  function openEditCoach(c) { setCoachForm({ ...c }); setEditCoachId(c.id); setShowCoachForm(true); }
  function saveCoach() {
    if (editCoachId) {
      setCoaches(cs => cs.map(c => c.id === editCoachId ? { ...coachForm, id: editCoachId, schoolId: selectedSchool } : c));
    } else {
      setCoaches(cs => [...cs, { ...coachForm, id: Date.now(), schoolId: selectedSchool }]);
    }
    setShowCoachForm(false);
  }
  function deleteCoach(id) { setCoaches(cs => cs.filter(c => c.id !== id)); }

  // school crud (same as schedule page)
  function addSchool() { setSchoolFormMode("add"); setShowSchoolForm(true); }
  function editSchool() { setSchoolFormMode("edit"); setShowSchoolForm(true); }
  function handleSaveSchool(updated) {
    if (schoolFormMode === "add") {
      const newSchool = { ...updated, id: Date.now() };
      setSchools(ss => [...ss, newSchool]);
      setSelectedSchool(newSchool.id);
    } else {
      setSchools(ss => ss.map(s => s.id === updated.id ? updated : s));
    }
  }
  function deleteSchool(id) {
    const tIds = teams.filter(t => t.schoolId === id).map(t => t.id);
    setTeams(ts => ts.filter(t => t.schoolId !== id));
    setPractices(ps => ps.filter(p => !tIds.includes(p.teamId)));
    const remaining = schools.filter(s => s.id !== id);
    setSchools(remaining);
    setSelectedSchool(remaining[0]?.id || null);
  }

  return (
    <div>
      {/* page intro */}
      <p style={{ margin: "0 0 16px", fontSize: 13, color: T.muted, lineHeight: 1.6 }}>
        This page covers <strong style={{ color: T.ink }}>when school is in session</strong> and <strong style={{ color: T.ink }}>when the gym is available</strong> for each day.
        Gym hours are the window coaches can book practices — players should only show up inside that window.
        Manage teams and coaching staff per school here too.
      </p>

      {/* school selector */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          {schools.map(s => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedSchool(s.id)}
              style={{
                padding: "7px 16px", borderRadius: 99, fontSize: 13, fontWeight: 700, cursor: "pointer",
                background: selectedSchool === s.id ? s.color : T.surfaceBg,
                color:      selectedSchool === s.id ? "#fff"   : T.ink,
                border:     selectedSchool === s.id ? "none"   : `1.5px solid ${T.border}`,
                boxShadow:  selectedSchool === s.id ? `0 4px 14px ${s.color}55` : "none",
              }}
            >
              {s.name}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Btn small onClick={addSchool}>+ Add school</Btn>
          {currentSchool && <Btn small onClick={editSchool}>Edit school</Btn>}
          {currentSchool && schools.length > 1 && (
            <Btn small variant="danger" onClick={() => {
              if (window.confirm(`Remove "${currentSchool.name}"?`)) deleteSchool(selectedSchool);
            }}>
              Remove school
            </Btn>
          )}
        </div>
      </div>

      {/* hours table */}
      <div style={{ border: `1.5px solid ${T.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 22, background: T.cardBg, boxShadow: T.shadow }}>
        {/* table header */}
        <div style={{ padding: "11px 16px", background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)", borderBottom: `1.5px solid #fed7aa` }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: T.orangeDark }}>Weekly hours — {currentSchool?.name}</div>
          <div style={{ fontSize: 12, color: T.muted, marginTop: 3 }}>
            School hours = when the building is open. Gym hours = when practices can run (typically after school lets out).
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "72px 1fr 1fr 90px", padding: "8px 16px", background: T.surfaceBg, fontSize: 11, fontWeight: 700, color: T.muted, borderBottom: `1px solid ${T.border}`, textTransform: "uppercase", letterSpacing: "0.04em" }}>
          <span>Day</span>
          <span>School</span>
          <span>Gym window</span>
          <span></span>
        </div>

        {DAYS.map((day, i) => {
          const row     = getRow(day);
          const isSchool = isValidTime(row.schoolOpen);
          const isGym    = isValidTime(row.gymOpen);
          return (
            <div
              key={day}
              style={{ display: "grid", gridTemplateColumns: "72px 1fr 1fr 90px", alignItems: "center", padding: "11px 16px", borderBottom: i < 6 ? `1px solid ${T.border}` : "none", fontSize: 13, transition: "background 0.12s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#fff7ed"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ fontWeight: 700 }}>{day}</span>

              {/* school hours cell */}
              <div>
                {isSchool ? (
                  <>
                    <span style={{ color: T.ink }}>{fmt12(row.schoolOpen)} – {fmt12(row.schoolClose)}</span>
                    <div style={{ fontSize: 11, color: T.faint, marginTop: 1 }}>Building open</div>
                  </>
                ) : (
                  <span style={{ color: T.faint, fontStyle: "italic" }}>No school</span>
                )}
              </div>

              {/* gym hours cell */}
              <div>
                {isGym ? (
                  <>
                    <span style={{ color: T.mint, fontWeight: 700 }}>{fmt12(row.gymOpen)} – {fmt12(row.gymClose)}</span>
                    <div style={{ fontSize: 11, color: T.faint, marginTop: 1 }}>Practice window</div>
                  </>
                ) : (
                  <span style={{ color: T.faint, fontStyle: "italic" }}>Gym closed</span>
                )}
              </div>

              <div style={{ textAlign: "right" }}>
                <Btn small onClick={() => openEditDay(row)}>Edit</Btn>
              </div>
            </div>
          );
        })}
      </div>

      {/* teams section */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 15, color: T.ink }}>Teams at this school</div>
          <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>Grade-level squads used for scheduling and the roster.</div>
        </div>
        <Btn variant="primary" onClick={openAddTeam}>+ Add team</Btn>
      </div>
      <div style={{ border: `1.5px solid ${T.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 22, background: T.cardBg, boxShadow: T.shadow }}>
        {schoolTeams.length === 0 && (
          <div style={{ padding: 16, fontSize: 13, color: T.muted }}>No teams yet. Add a team above to start scheduling practices.</div>
        )}
        {schoolTeams.map((t, i) => (
          <div
            key={t.id}
            style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", borderBottom: i < schoolTeams.length - 1 ? `1px solid ${T.border}` : "none", fontSize: 13, transition: "background 0.12s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#fff7ed"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          >
            <div style={{ flex: 1 }}>
              <span style={{ fontWeight: 700, color: T.ink }}>{t.name}</span>
              <span style={{ marginLeft: 8 }}><Badge label={gradeShort(t.level)} type="orange" /></span>
            </div>
            <span style={{ fontSize: 12, color: T.faint }}>{practices.filter(p => p.teamId === t.id).length} events</span>
            <Btn small onClick={() => openEditTeam(t)}>Edit</Btn>
            <Btn small variant="danger" onClick={() => deleteTeam(t.id)}>Remove</Btn>
          </div>
        ))}
      </div>

      {/* coaches section */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 15, color: T.ink }}>Coaching staff</div>
          <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>Coaches for {currentSchool?.name}.</div>
        </div>
        <Btn variant="primary" onClick={openAddCoach}>+ Add coach</Btn>
      </div>
      <div style={{ border: `1.5px solid ${T.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 14, background: T.cardBg, boxShadow: T.shadow }}>
        {schoolCoaches.length === 0 && <div style={{ padding: 14, fontSize: 13, color: T.muted }}>No coaches added yet.</div>}
        {schoolCoaches.map((c, i) => (
          <div
            key={c.id}
            style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", borderBottom: i < schoolCoaches.length - 1 ? `1px solid ${T.border}` : "none", fontSize: 13, transition: "background 0.12s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#fff7ed"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          >
            <Avatar name={c.name} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: T.ink }}>{c.name}</div>
              <div style={{ fontSize: 12, color: T.muted }}>{c.role} · {c.email}</div>
            </div>
            <Btn small onClick={() => openEditCoach(c)}>Edit</Btn>
            <Btn small variant="danger" onClick={() => deleteCoach(c.id)}>Remove</Btn>
          </div>
        ))}
      </div>

      {/* school modal */}
      {showSchoolForm && (
        <Modal title={schoolFormMode === "add" ? "Add school" : `Edit — ${currentSchool?.name}`} onClose={() => setShowSchoolForm(false)}>
          <SchoolForm
            key={schoolFormMode === "add" ? "new" : selectedSchool}
            school={schoolFormMode === "add" ? { name: "", color: SCHOOL_SWATCHES[0] } : currentSchool}
            onClose={() => setShowSchoolForm(false)}
            onSave={handleSaveSchool}
          />
        </Modal>
      )}

      {/* edit day modal */}
      {editDay && (
        <Modal title={`Hours — ${editDay}`} onClose={() => setEditDay(null)} wide>
          <p style={{ fontSize: 13, color: T.muted, margin: "0 0 16px", lineHeight: 1.6 }}>
            Set when the school building is open and when the gym is available for practice.
            Check the box to mark a day as closed. Players will see this on the schedule.
          </p>

          {/* school hours block */}
          <div style={{ marginBottom: 14, padding: "14px 16px", borderRadius: 12, background: T.surfaceBg, border: `1.5px solid ${T.border}` }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer", color: T.ink, fontWeight: 700, marginBottom: schoolClosed ? 0 : 12 }}>
              <input
                type="checkbox"
                checked={schoolClosed}
                onChange={e => {
                  if (e.target.checked) setForm({ ...form, schoolOpen: "—", schoolClose: "—" });
                  else setForm({ ...form, schoolOpen: DEFAULT_SCHOOL_HOURS.open, schoolClose: DEFAULT_SCHOOL_HOURS.close });
                }}
              />
              No school (building closed)
            </label>
            {!schoolClosed && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <Field label="School opens">
                  <input type="time" step={300} value={isValidTime(form.schoolOpen) ? form.schoolOpen : DEFAULT_SCHOOL_HOURS.open} onChange={e => setForm({ ...form, schoolOpen: e.target.value })} style={INPUT} />
                </Field>
                <Field label="School ends">
                  <input type="time" step={300} value={isValidTime(form.schoolClose) ? form.schoolClose : DEFAULT_SCHOOL_HOURS.close} onChange={e => setForm({ ...form, schoolClose: e.target.value })} style={INPUT} />
                </Field>
              </div>
            )}
          </div>

          {/* gym hours block */}
          <div style={{ padding: "14px 16px", borderRadius: 12, background: T.surfaceBg, border: `1.5px solid ${T.border}` }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer", color: T.ink, fontWeight: 700, marginBottom: gymClosed ? 0 : 12 }}>
              <input
                type="checkbox"
                checked={gymClosed}
                onChange={e => {
                  if (e.target.checked) setForm({ ...form, gymOpen: "—", gymClose: "—" });
                  else setForm({ ...form, gymOpen: DEFAULT_GYM_HOURS.open, gymClose: DEFAULT_GYM_HOURS.close });
                }}
              />
              Gym closed this day
            </label>
            {!gymClosed && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <Field label="Gym opens">
                  <input type="time" step={300} value={isValidTime(form.gymOpen) ? form.gymOpen : DEFAULT_GYM_HOURS.open} onChange={e => setForm({ ...form, gymOpen: e.target.value })} style={INPUT} />
                </Field>
                <Field label="Gym closes">
                  <input type="time" step={300} value={isValidTime(form.gymClose) ? form.gymClose : DEFAULT_GYM_HOURS.close} onChange={e => setForm({ ...form, gymClose: e.target.value })} style={INPUT} />
                </Field>
              </div>
            )}
            {!gymClosed && (
              <p style={{ margin: "10px 0 0", fontSize: 12, color: T.muted, lineHeight: 1.5 }}>
                Practices scheduled outside this window will appear as conflicts on the schedule.
              </p>
            )}
          </div>

          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 18 }}>
            <Btn onClick={() => setEditDay(null)}>Cancel</Btn>
            <Btn variant="primary" onClick={saveHours}>Save hours</Btn>
          </div>
        </Modal>
      )}

      {/* team modal */}
      {showTeamForm && (
        <Modal title={editTeamId ? "Edit team" : "Add team"} onClose={() => setShowTeamForm(false)}>
          <Field label="Team name">
            <input value={teamForm.name} onChange={e => setTeamForm({ ...teamForm, name: e.target.value })} placeholder="e.g. Juniors" style={INPUT} autoFocus />
          </Field>
          <Field label="Grade level">
            <select value={teamForm.level} onChange={e => setTeamForm({ ...teamForm, level: e.target.value })} style={SELECT}>
              <option value="sophomore">Sophomores (10th grade)</option>
              <option value="junior">Juniors (11th grade)</option>
              <option value="senior">Seniors (12th grade)</option>
            </select>
          </Field>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 16 }}>
            <Btn onClick={() => setShowTeamForm(false)}>Cancel</Btn>
            <Btn variant="primary" onClick={saveTeam} disabled={!teamForm.name.trim()}>Save team</Btn>
          </div>
        </Modal>
      )}

      {/* coach modal */}
      {showCoachForm && (
        <Modal title={editCoachId ? "Edit coach" : "Add coach"} onClose={() => setShowCoachForm(false)}>
          <Field label="Name"><input value={coachForm.name} onChange={e => setCoachForm({ ...coachForm, name: e.target.value })} placeholder="Full name" style={INPUT} autoFocus /></Field>
          <Field label="Role">
            <select value={coachForm.role} onChange={e => setCoachForm({ ...coachForm, role: e.target.value })} style={SELECT}>
              <option>Head Coach</option>
              <option>Assistant Coach</option>
              <option>Volunteer Coach</option>
            </select>
          </Field>
          <Field label="Email"><input value={coachForm.email} onChange={e => setCoachForm({ ...coachForm, email: e.target.value })} placeholder="coach@school.edu" style={INPUT} /></Field>
          <Field label="Phone"><input value={coachForm.phone} onChange={e => setCoachForm({ ...coachForm, phone: e.target.value })} placeholder="555-0100" style={INPUT} /></Field>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 16 }}>
            <Btn onClick={() => setShowCoachForm(false)}>Cancel</Btn>
            <Btn variant="primary" onClick={saveCoach}>Save coach</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── 3. ROSTER PAGE ───────────────────────────────────────────────────────────

function RosterPage({ schools, teams, players, setPlayers, coaches, setCoaches }) {
  const [selectedSchool, setSelectedSchool] = useState(schools[0]?.id);
  const [showPlayerForm, setShowPlayerForm] = useState(false);
  const [editPlayerId, setEditPlayerId] = useState(null);
  const [playerForm, setPlayerForm] = useState({ teamId: "", name: "", number: "", position: "", role: "player", email: "" });

  const schoolTeams  = teams.filter(t => t.schoolId === selectedSchool);
  const teamIds      = schoolTeams.map(t => t.id);
  const schoolPlayers = players.filter(p => teamIds.includes(p.teamId));

  function openAddPlayer() {
    setPlayerForm({ teamId: schoolTeams[0]?.id || "", name: "", number: "", position: "", role: "player", email: "" });
    setEditPlayerId(null);
    setShowPlayerForm(true);
  }
  function openEditPlayer(p) {
    setPlayerForm({ ...p });
    setEditPlayerId(p.id);
    setShowPlayerForm(true);
  }
  function savePlayer() {
    if (editPlayerId) {
      setPlayers(ps => ps.map(p => p.id === editPlayerId ? { ...playerForm, id: editPlayerId, teamId: Number(playerForm.teamId) } : p));
    } else {
      setPlayers(ps => [...ps, { ...playerForm, id: Date.now(), teamId: Number(playerForm.teamId), number: Number(playerForm.number) }]);
    }
    setShowPlayerForm(false);
  }
  function deletePlayer(id) {
    setPlayers(ps => ps.filter(p => p.id !== id));
  }

  return (
    <div>
      <p style={{ margin: "0 0 14px", fontSize: 13, color: T.muted, lineHeight: 1.6 }}>
        Manage players and coaches per school. Captains are highlighted so everyone knows who leads each team.
      </p>

      {/* school tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {schools.map(s => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSelectedSchool(s.id)}
            style={{
              padding: "7px 16px", borderRadius: 99, fontSize: 13, fontWeight: 700, cursor: "pointer",
              background: selectedSchool === s.id ? s.color : T.surfaceBg,
              color:      selectedSchool === s.id ? "#fff"   : T.ink,
              border:     selectedSchool === s.id ? "none"   : `1.5px solid ${T.border}`,
              boxShadow:  selectedSchool === s.id ? `0 4px 14px ${s.color}55` : "none",
            }}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* players section */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontWeight: 800, fontSize: 15, color: T.ink }}>Players</span>
        <Btn variant="primary" onClick={openAddPlayer} disabled={!schoolTeams.length}>+ Add player</Btn>
      </div>

      {schoolTeams.length === 0 && (
        <div style={{ padding: "12px 16px", borderRadius: 10, background: "#fff7ed", border: `1px solid #fed7aa`, color: "#7c2d12", fontSize: 13, marginBottom: 14 }}>
          No teams at this school yet. Go to <strong>Hours</strong> to add teams first.
        </div>
      )}

      {schoolTeams.map(team => {
        const teamPlayers = schoolPlayers.filter(p => p.teamId === team.id);
        return (
          <div key={team.id} style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.ink, marginBottom: 7, display: "flex", alignItems: "center", gap: 8 }}>
              <span>{team.name}</span>
              <Badge label={gradeShort(team.level)} type="orange" />
              <span style={{ fontSize: 12, color: T.faint, fontWeight: 400 }}>{teamPlayers.length} players</span>
            </div>
            <div style={{ border: `1.5px solid ${T.border}`, borderRadius: 14, overflow: "hidden", background: T.cardBg, boxShadow: T.shadow }}>
              {teamPlayers.length === 0 && <div style={{ padding: 14, fontSize: 13, color: T.muted }}>No players yet.</div>}
              {teamPlayers.map((p, i) => (
                <div
                  key={p.id}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", borderBottom: i < teamPlayers.length - 1 ? `1px solid ${T.border}` : "none", fontSize: 13, transition: "background 0.12s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#fff7ed"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  <Avatar name={p.name} size={30} />
                  <span style={{ fontWeight: 700, flex: 1, color: T.ink }}>
                    {p.name}
                    <span style={{ color: T.faint, fontWeight: 400, marginLeft: 6 }}>#{p.number}</span>
                  </span>
                  <span style={{ color: T.muted, fontSize: 12 }}>{p.position}</span>
                  {p.role === "captain" && <Badge label="Captain" type="orange" />}
                  <Btn small onClick={() => openEditPlayer(p)}>Edit</Btn>
                  <Btn small variant="danger" onClick={() => deletePlayer(p.id)}>Remove</Btn>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {showPlayerForm && (
        <Modal title={editPlayerId ? "Edit player" : "Add player"} onClose={() => setShowPlayerForm(false)} wide>
          <Field label="Team">
            <select value={playerForm.teamId} onChange={e => setPlayerForm({ ...playerForm, teamId: e.target.value })} style={SELECT}>
              {schoolTeams.map(t => <option key={t.id} value={t.id}>{t.name} ({gradeWord(t.level)})</option>)}
            </select>
          </Field>
          <Field label="Full name">
            <input value={playerForm.name} onChange={e => setPlayerForm({ ...playerForm, name: e.target.value })} placeholder="Full name" style={INPUT} autoFocus />
          </Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Field label="Jersey number">
              <input value={playerForm.number} onChange={e => setPlayerForm({ ...playerForm, number: e.target.value })} placeholder="7" style={INPUT} />
            </Field>
            <Field label="Role">
              <select value={playerForm.role} onChange={e => setPlayerForm({ ...playerForm, role: e.target.value })} style={SELECT}>
                <option value="player">Player</option>
                <option value="captain">Captain</option>
              </select>
            </Field>
          </div>
          <Field label="Position">
            <input value={playerForm.position} onChange={e => setPlayerForm({ ...playerForm, position: e.target.value })} placeholder="e.g. Setter, Libero" style={INPUT} />
          </Field>
          <Field label="Email">
            <input value={playerForm.email} onChange={e => setPlayerForm({ ...playerForm, email: e.target.value })} placeholder="player@school.edu" style={INPUT} />
          </Field>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 16 }}>
            <Btn onClick={() => setShowPlayerForm(false)}>Cancel</Btn>
            <Btn variant="primary" onClick={savePlayer}>Save player</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── 4. CHAT PAGE ─────────────────────────────────────────────────────────────

function ChatPage({ schools, teams, messages, setMessages, session }) {
  const [selectedTeam, setSelectedTeam] = useState(teams[0]?.id);
  const [draft, setDraft] = useState("");

  // default the sender name to whoever is signed in
  const [senderName, setSenderName] = useState(() => session?.name?.trim() || "You");

  const teamMessages = messages.filter(m => m.teamId === selectedTeam);
  const team         = teams.find(t => t.id === selectedTeam);
  const school       = schools.find(s => s.id === team?.schoolId);

  function send() {
    if (!draft.trim()) return;
    setMessages(ms => [
      ...ms,
      {
        id: Date.now(),
        teamId: selectedTeam,
        sender: senderName,
        text: draft,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        mine: true,
      },
    ]);
    setDraft("");
  }

  return (
    <div>
      {/* team channel tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {teams.map(t => {
          const sc     = schools.find(s => s.id === t.schoolId);
          const active = t.id === selectedTeam;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedTeam(t.id)}
              style={{
                padding: "6px 14px", borderRadius: 99, fontSize: 13, fontWeight: 700, cursor: "pointer",
                background: active ? (sc?.color || T.orange) : T.surfaceBg,
                color:      active ? "#fff"                  : T.ink,
                border:     active ? "none"                  : `1.5px solid ${T.border}`,
                boxShadow:  active ? `0 4px 14px ${sc?.color || T.orange}55` : "none",
              }}
            >
              {sc?.name} — {t.name} ({gradeShort(t.level)})
            </button>
          );
        })}
      </div>

      {/* chat box */}
      <div style={{ border: `1.5px solid ${T.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 18, boxShadow: T.shadow, background: T.cardBg }}>
        {/* chat header */}
        <div style={{
          background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
          padding: "10px 16px", fontSize: 13, fontWeight: 700,
          borderBottom: `1.5px solid #fed7aa`,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: T.mint }} />
          <span style={{ color: T.orangeDark }}>{school?.name} — {team?.name}</span>
          <span style={{ marginLeft: "auto", fontSize: 11, color: T.faint, fontWeight: 400 }}>{teamMessages.length} messages</span>
        </div>

        {/* messages list */}
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10, minHeight: 240, maxHeight: 340, overflowY: "auto", background: "#fafafa" }}>
          {teamMessages.length === 0 && (
            <div style={{ color: T.faint, fontSize: 13, textAlign: "center", paddingTop: 70 }}>
              No messages yet — start the conversation.
            </div>
          )}
          {teamMessages.map(msg => (
            <div
              key={msg.id}
              style={{ display: "flex", flexDirection: "column", maxWidth: "76%", alignSelf: msg.mine ? "flex-end" : "flex-start" }}
            >
              <div style={{
                padding: "9px 13px", borderRadius: 13,
                borderBottomRightRadius: msg.mine ? 3 : 13,
                borderBottomLeftRadius:  msg.mine ? 13 : 3,
                background: msg.mine ? T.orange : "#fff",
                color:      msg.mine ? "#fff"   : T.ink,
                fontSize: 13, lineHeight: 1.5,
                border: msg.mine ? "none" : `1px solid ${T.border}`,
                boxShadow: T.shadow,
              }}>
                {msg.text}
              </div>
              <div style={{ fontSize: 11, color: T.faint, marginTop: 3, textAlign: msg.mine ? "right" : "left" }}>
                {msg.sender} · {msg.time}
              </div>
            </div>
          ))}
        </div>

        {/* input row */}
        <div style={{ display: "flex", gap: 8, padding: "10px 14px", borderTop: `1.5px solid ${T.border}`, alignItems: "center", background: T.cardBg }}>
          {/* editable sender name in case multiple people share a device */}
          <input
            value={senderName}
            onChange={e => setSenderName(e.target.value)}
            style={{ ...INPUT, width: 110, flexShrink: 0 }}
            placeholder="Your name"
          />
          <input
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            style={{ ...INPUT, flex: 1 }}
            placeholder="Type a message…"
          />
          <button
            type="button"
            onClick={send}
            style={{ width: 36, height: 36, borderRadius: "50%", background: T.orange, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* pinned announcements */}
      <div style={{ fontWeight: 800, fontSize: 15, color: T.ink, marginBottom: 10 }}>Announcements</div>
      <div style={{ border: `1.5px solid ${T.border}`, borderRadius: 14, overflow: "hidden", background: T.cardBg, boxShadow: T.shadow }}>
        {[
          { title: "Uniform pickup",     body: "Team uniforms available in the athletic office — Tue 3–5 PM.", type: "amber"  },
          { title: "Physicals reminder", body: "All players need updated physical forms on file before next game.", type: "orange" },
          { title: "Team photo day",     body: "Saturday after practice. Wear full uniform, arrive by 1:30 PM.", type: "blue"   },
        ].map((a, i, arr) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "13px 16px", borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : "none", transition: "background 0.12s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#fff7ed"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.type === "amber" ? "#f59e0b" : a.type === "blue" ? T.blue : T.orange, marginTop: 5, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: T.ink }}>{a.title}</div>
              <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{a.body}</div>
            </div>
            <Badge label="New" type={a.type} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────

export default function App() {
  // read from localStorage so the user stays logged in on refresh
  const [session, setSession] = useState(() => readSession());
  const [tab, setTab] = useState("schedule");

  // all main data lives here and gets passed down to each page
  const [schools,   setSchools]   = useState(initSchools);
  const [teams,     setTeams]     = useState(initTeams);
  const [practices, setPractices] = useState(initPractices);
  const [hours,     setHours]     = useState(initHours);
  const [players,   setPlayers]   = useState(initPlayers);
  const [coaches,   setCoaches]   = useState(initCoaches);
  const [messages,  setMessages]  = useState(initMessages);

  const tabs = [
    { id: "schedule", label: "Schedule"  },
    { id: "hours",    label: "Hours"     },
    { id: "roster",   label: "Roster"    },
    { id: "chat",     label: "Team Chat" },
  ];

  function completeSignup(profile) {
    writeSession(profile);
    setSession(profile);
  }

  function signOut() {
    writeSession(null);
    setSession(null);
  }

  // show the dark page background everywhere
  const pageStyle = {
    fontFamily: "'Inter', system-ui, sans-serif",
    color: T.ink,
    minHeight: "100vh",
    background: T.pageBg,
  };

  // if not logged in, show the sign up screen
  if (!session) {
    return (
      <div style={pageStyle}>
        {/* minimal nav bar */}
        <div style={{ background: T.headerBg, borderBottom: `1px solid rgba(255,255,255,0.07)`, padding: "0 24px", display: "flex", alignItems: "center", height: 52 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <VolleyballMark size={26} />
            <span style={{ fontWeight: 800, fontSize: 15, color: "#f8fafc", letterSpacing: "-0.01em" }}>Volleyball Scheduler</span>
          </div>
        </div>
        <SignupPage onComplete={completeSignup} />
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      {/* main nav bar */}
      <div style={{
        background: T.headerBg,
        borderBottom: `1px solid rgba(255,255,255,0.07)`,
        padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        minHeight: 54, flexWrap: "wrap", gap: 10, paddingTop: 8, paddingBottom: 8,
      }}>
        {/* logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <VolleyballMark size={26} />
          <span style={{ fontWeight: 800, fontSize: 15, color: "#f8fafc", letterSpacing: "-0.01em" }}>Volleyball Scheduler</span>
        </div>

        {/* nav links + user info */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          {/* signed-in user pill */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#94a3b8" }}>
            <span>Hi, <strong style={{ color: "#f8fafc", fontWeight: 700 }}>{session.name}</strong></span>
            {session.kind === "student"
              ? <Badge label={gradeWord(session.gradeLevel)} type="blue" />
              : <Badge label="Coach" type="orange" />
            }
            <button type="button" onClick={signOut} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#64748b", textDecoration: "underline" }}>
              Sign out
            </button>
          </div>

          {/* page tabs */}
          <div style={{ display: "flex", gap: 2 }}>
            {tabs.map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                style={{
                  padding: "6px 14px", borderRadius: 8, fontSize: 13, cursor: "pointer",
                  fontWeight: tab === t.id ? 700 : 400,
                  background: tab === t.id ? T.orange : "transparent",
                  color:      tab === t.id ? "#fff"   : "#94a3b8",
                  border: "none",
                  boxShadow: tab === t.id ? `0 2px 10px rgba(249,115,22,0.35)` : "none",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* page content — white card area on the dark background */}
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "28px 20px" }}>
        {/* section heading */}
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#f8fafc", letterSpacing: "-0.02em" }}>
            {tabs.find(t => t.id === tab)?.label}
          </h2>
        </div>

        {/* render the right page */}
        {tab === "schedule" && (
          <SchedulePage
            schools={schools}     setSchools={setSchools}
            teams={teams}         setTeams={setTeams}
            practices={practices} setPractices={setPractices}
          />
        )}
        {tab === "hours" && (
          <HoursPage
            schools={schools}     setSchools={setSchools}
            hours={hours}         setHours={setHours}
            teams={teams}         setTeams={setTeams}
            practices={practices} setPractices={setPractices}
            coaches={coaches}     setCoaches={setCoaches}
          />
        )}
        {tab === "roster" && (
          <RosterPage
            schools={schools}
            teams={teams}
            players={players} setPlayers={setPlayers}
            coaches={coaches} setCoaches={setCoaches}
          />
        )}
        {tab === "chat" && (
          <ChatPage
            schools={schools}
            teams={teams}
            messages={messages} setMessages={setMessages}
            session={session}
          />
        )}
      </div>
    </div>
  );
}
