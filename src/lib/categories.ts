// Top-level categories for the portfolio. Each gets a landing page at /<slug>
// (e.g. /flying) — shareable, SEO-friendly hubs for an audience.
export interface Category {
  slug: string;
  label: string;
  blurb: string;
}

export const categories: Category[] = [
  { slug: 'flying', label: 'Flying', blurb: 'Quadcopters, RC aircraft, transmitters — everything built to leave the ground.' },
  { slug: 'robotics', label: 'Robotics', blurb: 'Wireless robots, Arduino control, sensors, and motion.' },
  { slug: '3d-printing', label: '3D Printing', blurb: 'Printed parts, models, and physical build techniques.' },
  { slug: 'code', label: 'Code', blurb: 'Scripts, tools, Raspberry Pi, and software experiments.' },
  { slug: 'halloween', label: 'Halloween', blurb: 'Props, animatronics, and yard-haunt engineering.' },
  { slug: 'updates', label: 'Updates', blurb: 'Site news and notes from the workshop.' },
];

export const categorySlugs = categories.map((c) => c.slug);

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
