export interface NavItem {
  path: string;
  labelHe: string;
  emoji: string;
  primary?: boolean; // shown in the compact mobile bar
}

export const NAV_ITEMS: NavItem[] = [
  { path: "/home", labelHe: "בית", emoji: "🏠", primary: true },
  { path: "/tutor", labelHe: "מורה AI", emoji: "🤖", primary: true },
  { path: "/conversations", labelHe: "שיחות", emoji: "💬", primary: true },
  { path: "/speaking", labelHe: "דיבור", emoji: "🎤" },
  { path: "/vocabulary", labelHe: "אוצר מילים", emoji: "📚", primary: true },
  { path: "/reading", labelHe: "קריאה", emoji: "📖" },
  { path: "/grammar", labelHe: "דקדוק", emoji: "✏️" },
  { path: "/writing", labelHe: "כתיבה", emoji: "📝" },
  { path: "/achievements", labelHe: "הישגים", emoji: "🏆", primary: true },
];

export const PARENT_NAV_ITEM: NavItem = { path: "/parents", labelHe: "הורים", emoji: "👨‍👩‍👧‍👦" };
