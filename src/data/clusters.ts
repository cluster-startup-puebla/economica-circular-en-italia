import clustersData from "@/data/clusters.json";

export type ClusterContact = {
  role: string;
  name: string;
  phone: string;
  email: string;
};

export type Cluster = {
  id: number;
  name: string;
  legalName: string;
  logo: string;
  website: string;
  status: string;
  address: string;
  socials: string[];
  contacts: ClusterContact[];
};

export type ClusterGroup = "turismo" | "transformacion" | "servicios";

export const CLUSTER_GROUP_ORDER: ClusterGroup[] = ["transformacion", "servicios", "turismo"];

/** Mesa de cada clúster. El id es el del directorio de intercluster. */
const GROUP_BY_ID: Record<number, ClusterGroup> = {
  1: "turismo",
  8: "turismo",
  12: "turismo",
  13: "turismo",
  14: "turismo",
  20: "turismo",
  21: "turismo",
  2: "transformacion",
  5: "transformacion",
  6: "transformacion",
  7: "transformacion",
  9: "transformacion",
  10: "transformacion",
  11: "transformacion",
  15: "transformacion",
  16: "transformacion",
  17: "transformacion",
  18: "transformacion",
  3: "servicios",
  4: "servicios",
  19: "servicios",
  22: "servicios",
};

export type ClusterWithSlug = Cluster & { slug: string; group: ClusterGroup };

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Plásticos abre transformación y startups abre servicios. El resto conserva el orden del directorio. */
const LEAD_IN_GROUP: Partial<Record<number, number>> = { 18: -1, 22: -1 };

export function getClusters(): ClusterWithSlug[] {
  const clusters = (clustersData as Cluster[]).map((cluster, index) => ({
    ...cluster,
    slug: slugify(cluster.name),
    group: GROUP_BY_ID[cluster.id] ?? "servicios",
    rank: LEAD_IN_GROUP[cluster.id] ?? index,
  }));

  return clusters.sort((a, b) => a.rank - b.rank).map(({ rank: _rank, ...cluster }) => cluster);
}

export function getClusterBySlug(slug: string): ClusterWithSlug | null {
  return getClusters().find((cluster) => cluster.slug === slug) ?? null;
}

export function toHref(value: string): string {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
}

export function socialNetwork(url: string): string {
  const value = url.toLowerCase();
  if (value.includes("facebook.com")) return "Facebook";
  if (value.includes("instagram.com")) return "Instagram";
  if (value.includes("linkedin.com")) return "LinkedIn";
  if (value.includes("twitter.com") || value.includes("x.com")) return "X";
  return "Web";
}

export function socialLabel(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/i, "").replace(/\/$/, "");
}
