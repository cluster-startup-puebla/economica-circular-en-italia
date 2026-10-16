export const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "companies", href: "/empresas" },
  { key: "ecosystem", href: "/ecosistema" },
  { key: "providers", href: "/proveedores" },
] as const;

export type NavKey = (typeof NAV_ITEMS)[number]["key"];
