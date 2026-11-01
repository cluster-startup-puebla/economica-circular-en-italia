import type { Locale } from "@/modules/cores/i18n/src/interfaces/i18n.interface";

export type LocalizedText = Record<Locale, string>;

export type CompanyIndustry = "edtech" | "hrtech" | "software" | "recycling";

export const COMPANY_INDUSTRIES: Record<CompanyIndustry, LocalizedText> = {
  edtech: { es: "Edtech", en: "Edtech", it: "Edtech" },
  hrtech: { es: "HR Tech", en: "HR Tech", it: "HR Tech" },
  software: { es: "Software", en: "Software", it: "Software" },
  recycling: { es: "Reciclaje", en: "Recycling", it: "Riciclo" },
};

/** Clúster del que sale la empresa. El sello va chiquito en la ficha. */
export type CompanyCluster = {
  id: string;
  name: LocalizedText;
  logo: string;
};

export const STARTUPS_CLUSTER: CompanyCluster = {
  id: "startups",
  name: {
    es: "Clúster de Startups e Innovación",
    en: "Startups and Innovation Cluster",
    it: "Cluster di startup e innovazione",
  },
  logo: "/clusters/cluster-startups.webp",
};

export const PLASTICS_CLUSTER: CompanyCluster = {
  id: "plasticos",
  name: {
    es: "Clúster de Plásticos y Economía Circular",
    en: "Plastics and Circular Economy Cluster",
    it: "Cluster di plastiche ed economia circolare",
  },
  logo: "/clusters/cluster-18-plasticos.png",
};

export type Company = {
  slug: string;
  name: string;
  logo: string;
  /** Logo claro: en tema claro se pasa a tinta para que se lea. */
  logoDark?: boolean;
  cluster: CompanyCluster;
  region: LocalizedText;
  summary: LocalizedText;
  industries: readonly CompanyIndustry[];
  problem: LocalizedText;
  solution: LocalizedText;
  contact: {
    person?: string;
    role?: string;
    website?: string;
    email?: string;
    phone?: string;
  };
};

const COMPANY_LIST: readonly Company[] = [
  {
    slug: "concora",
    name: "Concora",
    logo: "/empresas/concora.webp",
    cluster: STARTUPS_CLUSTER,
    region: { es: "Puebla, México", en: "Puebla, Mexico", it: "Puebla, Messico" },
    summary: {
      es: "Plataforma que conecta juventudes con oportunidades y empresas con talento junior mediante retos.",
      en: "Platform connecting young people with opportunities and companies with junior talent through challenges.",
      it: "Piattaforma che collega i giovani alle opportunità e le imprese al talento junior attraverso sfide.",
    },
    industries: ["edtech", "hrtech"],
    problem: {
      es: "Contratar talento junior con un currículum no dice si la persona puede hacer el trabajo. Del otro lado, becas, empleos y convocatorias están regados: hay que enterarse de cada una por separado y postularse sin saber si el perfil encaja.",
      en: "Hiring junior talent from a résumé does not show whether the person can do the work. On the other side, scholarships, jobs and open calls are scattered: each one has to be found separately, with no way to tell whether the profile fits.",
      it: "Assumere talento junior da un curriculum non dice se la persona sa fare il lavoro. Dall'altra parte, borse, impieghi e bandi sono sparsi: ognuno va scoperto a parte, senza sapere se il profilo coincide.",
    },
    solution: {
      es: "Una plataforma que junta educación, tecnología y experiencia laboral. La Ruta Brújula evalúa competencias e intereses, detecta brechas de empleabilidad y forma en las habilidades que pide el mercado. Los retos de reclutamiento ponen a resolver un problema real de la empresa y dejan experiencia validada, con acceso a becas, trabajo o capital semilla.",
      en: "A platform that brings education, technology and work experience together. The Brújula path assesses skills and interests, finds employability gaps and trains the skills the market asks for. Recruitment challenges have people solve a real company problem and leave validated experience, with access to scholarships, jobs or seed capital.",
      it: "Una piattaforma che unisce educazione, tecnologia ed esperienza di lavoro. Il percorso Brújula valuta competenze e interessi, trova i gap di impiegabilità e forma le abilità che chiede il mercato. Le sfide di selezione fanno risolvere un problema reale dell'impresa e lasciano esperienza validata, con accesso a borse, lavoro o capitale seme.",
    },
    contact: {
      person: "Fátima Gaytán",
      role: "CEO",
      website: "https://www.concora.mx/",
      email: "hola@concora.mx",
    },
  },
  {
    slug: "radek",
    name: "Radek",
    logo: "/empresas/radek.webp",
    logoDark: true,
    cluster: STARTUPS_CLUSTER,
    region: { es: "Puebla, México", en: "Puebla, Mexico", it: "Puebla, Messico" },
    summary: {
      es: "Convierte el desarrollo interno de empresas consolidadas en un negocio digital aparte.",
      en: "Turns in-house development at established companies into a separate digital business.",
      it: "Trasforma lo sviluppo interno delle imprese consolidate in un business digitale a parte.",
    },
    industries: ["software"],
    problem: {
      es: "La inversión en tecnología es necesaria, pero el ROI se justifica solo desde el ahorro interno y ese ahorro casi nunca alcanza para pagar el proyecto. El software que la empresa manda a construir queda encerrado en su propia operación: cuesta, se amortiza lento y nunca genera un peso de ingreso.",
      en: "Investing in technology is necessary, but the ROI case rests on internal savings alone, and those savings rarely cover the project. The software a company commissions stays locked inside its own operation: it costs money, pays back slowly and never earns a peso.",
      it: "Investire in tecnologia è necessario, ma il ritorno si giustifica solo col risparmio interno e quel risparmio quasi mai copre il progetto. Il software che l'impresa fa costruire resta chiuso nella sua operazione: costa, si ripaga piano e non genera un peso di entrata.",
    },
    solution: {
      es: "Convierte el desarrollo interno en un negocio aparte, para que la misma inversión se pague dos veces: primero al digitalizar los procesos de la empresa, después al lanzar esa solución al mercado y generar ingresos nuevos.",
      en: "Turns in-house development into a business of its own, so the same investment pays for itself twice: first by digitizing the company’s processes, then by taking that solution to market as a new revenue line.",
      it: "Trasforma lo sviluppo interno in un business a parte, così lo stesso investimento si paga due volte: prima digitalizzando i processi dell'impresa, poi portando quella soluzione sul mercato come nuova linea di entrate.",
    },
    contact: {
      person: "Yamil Álvarez",
      role: "CEO",
      email: "yamil@radek.mx",
    },
  },
  {
    slug: "sabia",
    name: "Sabia",
    logo: "/empresas/sabia.webp",
    logoDark: true,
    cluster: STARTUPS_CLUSTER,
    region: { es: "Puebla, México", en: "Puebla, Mexico", it: "Puebla, Messico" },
    summary: {
      es: "Integración de sistemas e implementación de IA que estandarizan y automatizan procesos.",
      en: "Systems integration and AI implementation that standardizes and automates processes.",
      it: "Integrazione di sistemi e implementazione di IA che standardizzano e automatizzano i processi.",
    },
    industries: ["software"],
    problem: {
      es: "La operación vive en hojas de cálculo y en sistemas que no se hablan entre sí. Cada área captura lo mismo con otro nombre, la versión buena del archivo la tiene una persona y nadie puede decir cuánto tarda de verdad un proceso.",
      en: "The operation lives in spreadsheets and in systems that do not talk to each other. Each area records the same thing under a different name, the good version of the file sits with one person, and nobody can say how long a process actually takes.",
      it: "L'operazione vive in fogli di calcolo e in sistemi che non si parlano. Ogni area registra la stessa cosa con un altro nome, la versione buona del file sta con una persona e nessuno può dire quanto dura davvero un processo.",
    },
    solution: {
      es: "Hace que los sistemas se hablen entre sí e implementa soluciones de IA que estandarizan, ordenan y miden el proceso antes de automatizarlo. Cualquier Excel que hoy sostenga la operación se convierte en plataforma en ocho semanas.",
      en: "Gets systems talking to each other and deploys AI that standardizes, orders and measures a process before automating it. Any spreadsheet currently holding the operation together becomes a platform in eight weeks.",
      it: "Fa parlare i sistemi tra loro e mette in opera IA che standardizza, ordina e misura il processo prima di automatizzarlo. Qualsiasi foglio che oggi regge l'operazione diventa piattaforma in otto settimane.",
    },
    contact: {
      person: "Álvaro Castillo",
      email: "hola@alvarocastillo.dev",
      phone: "221 240 1587",
    },
  },
  {
    slug: "comere",
    name: "COMERE",
    logo: "/empresas/comere.webp",
    cluster: PLASTICS_CLUSTER,
    region: {
      es: "Puebla y Guadalajara, México",
      en: "Puebla and Guadalajara, Mexico",
      it: "Puebla e Guadalajara, Messico",
    },
    summary: {
      es: "Compra, recicla y vende plásticos, embalaje y metales no ferrosos como materia prima para la industria.",
      en: "Buys, recycles and sells plastics, packaging and non-ferrous metals as feedstock for industry.",
      it: "Compra, ricicla e vende plastiche, imballaggi e metalli non ferrosi come materia prima per l'industria.",
    },
    industries: ["recycling"],
    problem: {
      es: "Quien fabrica con material reciclado necesita abasto parejo. El plástico postconsumo, el embalaje y el scrap de aluminio, cobre o bronce llegan mezclados, y sin una selección estricta esa materia no vuelve a servir para producir.",
      en: "A manufacturer using recycled material needs a steady supply. Post-consumer plastic, packaging and scrap aluminum, copper or bronze arrive mixed, and without strict sorting that material cannot go back into production.",
      it: "Chi produce con materiale riciclato ha bisogno di un approvvigionamento costante. La plastica post consumo, gli imballaggi e lo scrap di alluminio, rame o bronzo arrivano mescolati, e senza una selezione rigorosa quella materia non torna utile per produrre.",
    },
    solution: {
      es: "Selecciona y comercializa resinas PCR, plástico postconsumo y postindustrial, residuos de embalaje y metales no ferrosos. El material sale clasificado para que la industria lo use otra vez como materia prima, y capacita a empresas que quieren armar una estrategia de sustentabilidad.",
      en: "Sorts and sells PCR resins, post-consumer and post-industrial plastic, packaging waste and non-ferrous metals. The material leaves classified so industry can use it again as raw material, and they train companies that want to build a sustainability strategy.",
      it: "Seleziona e commercializza resine PCR, plastica post consumo e post industriale, rifiuti di imballaggio e metalli non ferrosi. Il materiale esce classificato perché l'industria lo riusi come materia prima, e forma le imprese che vogliono costruire una strategia di sostenibilità.",
    },
    contact: {
      website: "https://comere.com.mx/",
      email: "contacto@comere.com.mx",
      phone: "221 408 3253",
    },
  },
];

/** Plásticos abre el directorio. Dentro de cada grupo, el nombre va en orden alfabético. */
function compareCompanies(a: Company, b: Company): number {
  const group = (company: Company) => (company.cluster.id === PLASTICS_CLUSTER.id ? 0 : 1);
  const byCluster = group(a) - group(b);
  if (byCluster !== 0) return byCluster;
  return a.name.localeCompare(b.name, "es", { sensitivity: "base" });
}

export const companies: readonly Company[] = [...COMPANY_LIST].sort(compareCompanies);

export function getCompany(slug: string): Company | null {
  return companies.find((company) => company.slug === slug) ?? null;
}
