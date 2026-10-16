import type { Locale } from "@/modules/cores/i18n/src/interfaces/i18n.interface";

/** Copy that must exist in every locale. Adding a language fails the build until these are translated. */
export type LocalizedText = Record<Locale, string>;

export type DirectoryEntry = {
  slug: string;
  /** Visible name. Example entries keep the word "Ejemplo" so they are not read as real organizations. */
  name: string;
  example: true;
  sector: LocalizedText;
  place: LocalizedText;
  summary: LocalizedText;
};

export const companies: DirectoryEntry[] = [
  {
    slug: "ejemplo-cacao",
    name: "Ejemplo · Cacao de sombra",
    example: true,
    sector: {
      es: "Alimentos",
      en: "Food",
      it: "Alimentare",
    },
    place: {
      es: "Chiapas, México",
      en: "Chiapas, Mexico",
      it: "Chiapas, Messico",
    },
    summary: {
      es: "Ficha de estructura. Aquí va el producto, el origen y la práctica sustentable que la empresa confirme.",
      en: "Structure profile. Product, origin, and the sustainable practice the company confirms go here.",
      it: "Scheda di struttura. Qui vanno prodotto, origine e la pratica sostenibile che l'impresa conferma.",
    },
  },
  {
    slug: "ejemplo-agave",
    name: "Ejemplo · Agave regenerativo",
    example: true,
    sector: {
      es: "Agave y destilados",
      en: "Agave and spirits",
      it: "Agave e distillati",
    },
    place: {
      es: "Jalisco, México",
      en: "Jalisco, Mexico",
      it: "Jalisco, Messico",
    },
    summary: {
      es: "Ficha de estructura. El nombre comercial se publica solo cuando la empresa lo autorice.",
      en: "Structure profile. The trade name is published only once the company authorizes it.",
      it: "Scheda di struttura. Il nome commerciale si pubblica solo quando l'impresa lo autorizza.",
    },
  },
  {
    slug: "ejemplo-textil",
    name: "Ejemplo · Fibra natural",
    example: true,
    sector: {
      es: "Textil",
      en: "Textile",
      it: "Tessile",
    },
    place: {
      es: "Oaxaca, México",
      en: "Oaxaca, Mexico",
      it: "Oaxaca, Messico",
    },
    summary: {
      es: "Ficha de estructura. Sirve para ver cómo se lee una empresa en los tres idiomas.",
      en: "Structure profile. It shows how a company reads in all three languages.",
      it: "Scheda di struttura. Serve a vedere come si legge un'impresa nelle tre lingue.",
    },
  },
];

export const providers: DirectoryEntry[] = [
  {
    slug: "ejemplo-legal",
    name: "Ejemplo · Asesoría de ingreso",
    example: true,
    sector: {
      es: "Legal y normativo",
      en: "Legal and regulatory",
      it: "Legale e normativo",
    },
    place: {
      es: "Italia",
      en: "Italy",
      it: "Italia",
    },
    summary: {
      es: "Ficha de estructura para quien acompaña trámites de ingreso al mercado italiano.",
      en: "Structure profile for whoever supports market-entry paperwork in Italy.",
      it: "Scheda di struttura per chi accompagna le pratiche di ingresso nel mercato italiano.",
    },
  },
  {
    slug: "ejemplo-logistica",
    name: "Ejemplo · Logística MX–IT",
    example: true,
    sector: {
      es: "Logística",
      en: "Logistics",
      it: "Logistica",
    },
    place: {
      es: "México e Italia",
      en: "Mexico and Italy",
      it: "Messico e Italia",
    },
    summary: {
      es: "Ficha de estructura para traslado, aduana y entrega entre los dos países.",
      en: "Structure profile for freight, customs, and delivery between the two countries.",
      it: "Scheda di struttura per trasporto, dogana e consegna tra i due paesi.",
    },
  },
  {
    slug: "ejemplo-idioma",
    name: "Ejemplo · Idioma y materiales",
    example: true,
    sector: {
      es: "Idioma",
      en: "Language",
      it: "Lingua",
    },
    place: {
      es: "Español, inglés e italiano",
      en: "Spanish, English, and Italian",
      it: "Spagnolo, inglese e italiano",
    },
    summary: {
      es: "Ficha de estructura para traducción de fichas, fichas técnicas y reuniones.",
      en: "Structure profile for translating profiles, spec sheets, and meetings.",
      it: "Scheda di struttura per tradurre schede, schede tecniche e riunioni.",
    },
  },
];
