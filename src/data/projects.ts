// Sample content for Phase 1 so the layout can be pressure-tested with real
// shapes. Phase 2 replaces this with an MDX content collection (one file per
// project) carrying the same fields — see ROADMAP.md §4.
export interface Project {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  tags: string[];
  status: 'complete' | 'in-progress';
  summary: string;
}

export const projects: Project[] = [
  {
    slug: 'animatronic-skull-v2',
    title: 'Animatronic Skull v2',
    date: '2026-06-20',
    tags: ['robotics', 'halloween', '3d-printing'],
    status: 'in-progress',
    summary: 'Servo-driven jaw and eye mechanism with audio-reactive motion, printed in PETG.',
  },
  {
    slug: 'fog-chiller-controller',
    title: 'Fog Chiller Controller',
    date: '2026-05-02',
    tags: ['code', 'halloween'],
    status: 'complete',
    summary: 'An ESP32 controller that triggers low-lying fog on a schedule, with a small web UI.',
  },
  {
    slug: 'corexy-printer-mods',
    title: 'CoreXY Printer Mods',
    date: '2026-03-15',
    tags: ['3d-printing'],
    status: 'complete',
    summary: 'Klipper input shaping, a custom toolhead mount, and a quieter hotend fan duct.',
  },
  {
    slug: 'led-matrix-portrait',
    title: 'LED Matrix Portrait',
    date: '2026-02-10',
    tags: ['code', 'robotics'],
    status: 'complete',
    summary: 'A 64×64 HUB75 matrix driven by a Pi, cycling scrolling build-log art.',
  },
  {
    slug: 'tombstone-projection',
    title: 'Tombstone Projection Rig',
    date: '2025-10-01',
    tags: ['halloween', 'code'],
    status: 'complete',
    summary: "Pepper's-ghost style projection onto foam tombstones for the yard haunt.",
  },
  {
    slug: 'pir-trigger-board',
    title: 'PIR Sensor Trigger Board',
    date: '2025-09-12',
    tags: ['robotics', 'code'],
    status: 'complete',
    summary: 'A reusable PCB that fires props from motion, with hardware debounce and cooldown.',
  },
];
