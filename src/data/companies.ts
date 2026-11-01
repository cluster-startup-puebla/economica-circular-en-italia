import type { Locale } from "@/modules/cores/i18n/src/interfaces/i18n.interface";

export type LocalizedText = Record<Locale, string>;

export type CompanyIndustry =
  | "edtech"
  | "hrtech"
  | "software"
  | "recycling"
  | "art"
  | "education"
  | "industry40"
  | "gametech"
  | "climatech";

export const COMPANY_INDUSTRIES: Record<CompanyIndustry, LocalizedText> = {
  edtech: { es: "Edtech", en: "Edtech", it: "Edtech" },
  hrtech: { es: "HR Tech", en: "HR Tech", it: "HR Tech" },
  software: { es: "Software", en: "Software", it: "Software" },
  recycling: { es: "Reciclaje", en: "Recycling", it: "Riciclo" },
  art: { es: "Arte", en: "Art", it: "Arte" },
  education: { es: "Educación", en: "Education", it: "Istruzione" },
  industry40: { es: "Industria 4.0", en: "Industry 4.0", it: "Industria 4.0" },
  gametech: { es: "Gametech", en: "Gametech", it: "Gametech" },
  climatech: { es: "Climatech", en: "Climatech", it: "Climatech" },
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

export type CompanyProduct = {
  slug: string;
  name: string;
  /** Foto de la pieza. */
  image?: string;
  /** Marca del plantel, cuando existe. */
  logo?: string;
  summary: LocalizedText;
  website?: string;
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
  products?: readonly CompanyProduct[];
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
  // REVISIÓN: el sitio no publica clúster. Queda en plásticos por indicación del 1 nov 2026. No publican persona. El form action de FormSubmit (ali.imagencorporativa@gmail.com) no se muestra como correo de la marca.
  {
    slug: "artista-chingon",
    name: "Artista Chingón",
    logo: "/empresas/artista-chingon.webp",
    cluster: PLASTICS_CLUSTER,
    region: { es: "Puebla, México", en: "Puebla, Mexico", it: "Puebla, Messico" },
    summary: {
      es: "Escultura monumental, pintura y obra por comisión desde Puebla para coleccionistas, constructores y espacios públicos.",
      en: "Monumental sculpture, painting and commissioned work from Puebla for collectors, builders and public spaces.",
      it: "Scultura monumentale, pittura e opere su commissione da Puebla per collezionisti, costruttori e spazi pubblici.",
    },
    industries: ["art"],
    problem: {
      es: "Un interior, un desarrollo o un espacio público necesita una obra hecha para esa escala y ese lugar. Coleccionistas, constructores y diseñadores encargan pintura o escultura y tienen que dejar definidos el formato, el material y la entrega antes de que la pieza exista.",
      en: "An interior, a development or a public space needs a work made for that scale and that place. Collectors, builders and designers commission painting or sculpture and have to settle the format, the material and the delivery before the piece exists.",
      it: "Un interno, uno sviluppo edilizio o uno spazio pubblico ha bisogno di un'opera fatta per quella scala e quel luogo. Collezionisti, costruttori e progettisti commissionano pittura o scultura e devono fissare formato, materiale e consegna prima che il pezzo esista.",
    },
    solution: {
      es: "Produce escultura en bronce, lámina, resina y concreto, de pieza residencial a escala monumental, y pintura o mural desde 50 × 50 cm hasta más de 3 m, para interior o exterior. La comisión recorre consultoría, concepto, creación y envío con instalación. También vende obra original y ediciones —escultura, pintura y litografía—, intervenciones sobre objetos y chamarras únicas para quien ya tiene una obra. El envío va asegurado y la pieza original incluye certificado de autenticidad firmado.",
      en: "Produces sculpture in bronze, sheet metal, resin and concrete, from a residential piece to monumental scale, and painting or murals from 50 × 50 cm to over 3 m, indoors or outdoors. A commission runs through consultation, concept, creation and delivery with installation. Also sells original work and editions — sculpture, painting and lithography — plus interventions on objects and one-off jackets for someone who already owns a piece. Shipping is insured and every original includes a signed certificate of authenticity.",
      it: "Produce scultura in bronzo, lamiera, resina e cemento, dal pezzo residenziale alla scala monumentale, e pittura o murali da 50 × 50 cm a oltre 3 m, per interni o esterni. La commissione passa da consulenza, concetto, creazione e consegna con installazione. Vende anche opera originale ed edizioni — scultura, pittura e litografia — oltre a interventi su oggetti e giacche uniche per chi possiede già un'opera. La spedizione è assicurata e ogni originale include un certificato di autenticità firmato.",
    },
    products: [
      {
        slug: "golfista-rojo",
        name: "Golfista Rojo",
        image: "/empresas/artista-chingon/golfista-rojo.webp",
        summary: {
          es: "Escultura en resina con pintura automotriz, 32 × 14 × 16 cm. Obra original, disponible.",
          en: "Resin sculpture with automotive paint, 32 × 14 × 16 cm. Original work, available.",
          it: "Scultura in resina con vernice automobilistica, 32 × 14 × 16 cm. Opera originale, disponibile.",
        },
        website: "https://artistachingon.com/?utm_source=mexico-italia#obra",
      },
      {
        slug: "virgen-verde",
        name: "Virgen Verde",
        image: "/empresas/artista-chingon/virgen-verde.webp",
        summary: {
          es: "Pintura en técnica mixta, 100 × 80 cm. Obra original, disponible.",
          en: "Mixed-media painting, 100 × 80 cm. Original work, available.",
          it: "Pittura a tecnica mista, 100 × 80 cm. Opera originale, disponibile.",
        },
        website: "https://artistachingon.com/?utm_source=mexico-italia#obra",
      },
      {
        slug: "virgen-azul-y-rosa",
        name: "Virgen Azul y Rosa",
        image: "/empresas/artista-chingon/virgen-azul-y-rosa.webp",
        summary: {
          es: "Litografía en vitografía, 41 × 35 cm. Reproducción que se entrega enmarcada. Disponible.",
          en: "Lithograph, 41 × 35 cm. A reproduction delivered already framed. Available.",
          it: "Litografia, 41 × 35 cm. Riproduzione consegnata già incorniciata. Disponibile.",
        },
        website: "https://artistachingon.com/?utm_source=mexico-italia#obra",
      },
    ],
    contact: {
      website: "https://artistachingon.com/?utm_source=mexico-italia",
      phone: "222 199 9029",
    },
  },
  /*
   * REVISIÓN — PET Performance de México, S.A. de C.V.
   * Hechos en la ficha:
   * - Razón social y giro de reciclaje de PET: boletín PROFEPA, 25 ago 2015.
   *   https://www.profepa.gob.mx/innovaportal/v/7494/1/mx.wap/clausura_profepa__dos_empresas_establecidas_en_la_cuenca_del_rio_lerma_por_incumplir_con_sus_obligaciones_ambientales.html
   * - Planta en Lerma, Parque Industrial Cerrillo II, Cto. Nemesio Diez R. 14, Mza. 1, Lt. 21, giro "procesamiento de plástico": Ayuntamiento de Lerma.
   *   https://lerma.gob.mx/lerma/negocios/directorio-de-empresas/
   *   El mismo predio (CP 52000) está en el conocimiento de embarque de Panjiva, con RFC PPM1004217R7.
   *   https://panjiva.com/Pet-Performance-De-Mexico-S-A-De-C-V/45052961
   *   y en Cosmos: https://www.cosmos.com.mx/empresa/pet-performance-de-mexico-gnxj.html
   * - Hojuela de PET para fibra, película y botellas: ficha de proveedor repetida en
   *   https://www.company-listing.org/pet_performance_de_mexico_s_a_de_c_v.html
   *   y https://www.listcompany.org/Pet_Performance_De_Mexico_S_A_De_C_V_Info.html
   *   Cosmos la lista en hojuela de PET: https://www.cosmos.com.mx/producto/hojuelas-de-pet-8148/
   *   No se copiaron volumen, humedad, ppm de PVC, "% de exportación" ni el eslogan.
   * - Contacto Alan Majzner, director: LinkedIn lo pone como director en Lerma desde 2011.
   *   https://www.linkedin.com/in/alan-majzner-zichlin-05a7b013
   *   Las fichas de company-listing y listcompany lo nombran contacto. Un BL de 2019 dice "CTC: Lic. Alan Majzner".
   *   https://www.importgenius.com/importers/pinaform-s-l
   * No confirmado, y por eso no entra:
   * - Sitio web. No apareció un sitio de la empresa. flake.mx no carga un sitio; directorios ponen www.flake.mx.com (error) y contabilidad@flake.mx. Sin web, correo ni teléfono.
   * - Ciudad única. Además de Lerma, directorios tipo DENUE dan Tenango del Valle, Parque Industrial, Privada del Venado, CP 52300:
   *   https://directorioempresarialmexico.com/empresa/0008305183/PET-PERFORMANCE-DE-MEXICO
   *   https://www.dunsguide.com/company/d71e306cc363b6a84292682cbf38ac25/pet-performance-mexico-sa-de-cv
   *   El BL de 2019 trae Carretera México-Puebla km 90.5, Huejotzingo, Puebla, CP 74160, pero el place of receipt de ese mismo embarque es Estado de México. No es la ciudad de Puebla.
   *   High Performance Recycling (Cholula, hojuela/pellet, Adolfo Escamilla) es otra empresa.
   * - Segundo apellido (Zichlin en LinkedIn, Zichli en company-listing) y si el cargo sigue vigente: en LinkedIn también figura director de Polymath 360 desde dic 2024.
   * - El boletín de PROFEPA describe además una clausura parcial temporal de 2015 por residuos peligrosos. No está en el texto público; hay que ver si sigue vigente.
   * - Alta en 2010 (fecha del RFC y Dunsguide) no se narró.
   */
  {
    slug: "pet-performance",
    name: "PET Performance",
    logo: "/empresas/pet-performance.webp",
    cluster: PLASTICS_CLUSTER,
    region: { es: "Lerma, México", en: "Lerma, Mexico", it: "Lerma, Messico" },
    summary: {
      es: "Recicla PET y procesa plástico para vender hojuela a quien fabrica fibra, película y botellas.",
      en: "Recycles PET and processes plastic to sell flake to makers of fiber, film and bottles.",
      it: "Ricicla il PET e lavora la plastica per vendere scaglie a chi produce fibra, film e bottiglie.",
    },
    industries: ["recycling"],
    problem: {
      es: "Quien fabrica fibra, película o botellas con PET reciclado necesita el material ya procesado. El envase usado no llega en esa forma.",
      en: "A manufacturer making fiber, film or bottles from recycled PET needs the material already processed. Used packaging does not arrive in that form.",
      it: "Chi produce fibra, film o bottiglie con PET riciclato ha bisogno del materiale già lavorato. L'imballaggio usato non arriva in quella forma.",
    },
    solution: {
      es: "Recicla el PET en Lerma y lo procesa hasta dejarlo en hojuela, el insumo con el que abastece a esos fabricantes.",
      en: "Recycles PET in Lerma and processes it into flake, the feedstock it supplies to those manufacturers.",
      it: "Ricicla il PET a Lerma e lo lavora fino a lasciarlo in scaglie, l'insumo con cui rifornisce quei produttori.",
    },
    contact: {
      person: "Alan Majzner",
      role: "Director",
    },
  },
  // REVISIÓN: rehime.com.mx no publica clúster. Queda en plásticos por indicación del 1 nov 2026. Sede en Tlalnepantla de Baz. La barra fija publica otros teléfonos ((55) 3727-6675 y (55) 62812180); aquí van los de Datos de contacto y el pie.
  {
    slug: "rehime",
    name: "Rehime",
    logo: "/empresas/rehime.webp",
    cluster: PLASTICS_CLUSTER,
    region: {
      es: "Tlalnepantla de Baz, México",
      en: "Tlalnepantla de Baz, Mexico",
      it: "Tlalnepantla de Baz, Messico",
    },
    summary: {
      es: "Compra, recolecta y clasifica metales y desperdicio industrial para mandarlos a fundidoras.",
      en: "Buys, collects and sorts metals and industrial waste to send them to foundries.",
      it: "Compra, raccoglie e classifica metalli e scarti industriali per mandarli alle fonderie.",
    },
    industries: ["recycling"],
    problem: {
      es: "El desperdicio industrial y las estructuras que se dan de baja dejan el metal mezclado: cobre, aluminio, fierro, bronce, chatarra, residuos electrónicos y baterías. Sin desmantelarlo, clasificarlo y sacarlo de la planta, ese material no llega a una fundidora que pueda reciclarlo.",
      en: "Industrial waste and structures taken out of service leave the metal mixed: copper, aluminum, iron, bronze, scrap, electronic waste and batteries. Without dismantling it, sorting it and hauling it off the plant, that material never reaches a foundry that can recycle it.",
      it: "Lo scarto industriale e le strutture fuori servizio lasciano il metallo mescolato: rame, alluminio, ferro, bronzo, rottame, rifiuti elettronici e batterie. Senza smontarlo, classificarlo e portarlo fuori dallo stabilimento, quel materiale non arriva a una fonderia che possa riciclarlo.",
    },
    solution: {
      es: "Desde 2003 compra metales y desperdicio industrial, desmantela estructuras y clasifica el material en bodega y patio: ferrosos, cobre, aluminio, fierro, bronce, antimonio, chatarra, residuos electrónicos, baterías, mobiliario y equipo de cómputo. Lo ya clasificado se envía a fundidoras en México, entre ellas Deacero y Fundametz, que cuentan con permiso para fundirlo o reciclarlo.",
      en: "Since 2003 it has bought metals and industrial waste, dismantled structures and sorted the material in a warehouse and yard: ferrous metals, copper, aluminum, iron, bronze, antimony, scrap, electronic waste, batteries, furniture and computer equipment. What is already sorted goes to foundries in Mexico, including Deacero and Fundametz, which are licensed to melt or recycle it.",
      it: "Dal 2003 compra metalli e scarti industriali, smonta strutture e classifica il materiale in magazzino e piazzale: ferrosi, rame, alluminio, ferro, bronzo, antimonio, rottame, rifiuti elettronici, batterie, mobilio e attrezzature informatiche. Quello già classificato va a fonderie in Messico, tra cui Deacero e Fundametz, autorizzate a fonderlo o riciclarlo.",
    },
    contact: {
      website: "https://www.rehime.com.mx/",
      email: "contacto@rehime.com.mx",
      phone: "(55) 3717-6675 · (55) 2125-7439",
    },
  },
  // REVISIÓN: membresía inferida. Ninguna página abierta dice que UEP esté en el clúster.
  // Escudo del usuario (1 nov 2026). El mismo escudo está en https://ueblatom.edu.mx/Escudo.jpg
  // y en la foto de perfil de https://www.facebook.com/uni.edu.OctavioPaz
  // Planteles abiertos ese día:
  // - Octavio Paz: https://www.facebook.com/uni.edu.OctavioPaz (calle 1D núm. 26, Bosques de San Sebastián; Escuela media)
  //   y https://escuelasmex.com/directorio/21EBH0407O/unidad-educativa-octavio-paz (bachillerato, Blvd. Puebla 26; web sin registro)
  // - Porfirio O. Morales: https://escuelasmex.com/directorio/21EBH0053D/unidad-educativa-profesor-porfirio-o-morales (web sin registro). vepom.edu.mx no resolvió.
  // - Blandina: https://ueblatom.edu.mx/ y https://escuelasmex.com/directorio/21EES0339K/unidad-educativa-blandina-torres-de-marin
  // - Frida Kahlo: https://www.facebook.com/UEFridaKahlo (Cuautlancingo) y https://escuelasmex.com/directorio/21EBH0891Z/unidad-educativa-frida-kahlo (web sin registro)
  // - Miguel Hidalgo: https://escuelasmex.com/directorio/21EBH0126F/unidad-educativa-miguel-hidalgo (sin sitio)
  // - Juan C. Bonilla: https://escuelasmex.com/directorio/21EBH0079L/unidad-educativa-general-juan-crisostomo-bonilla (web sin registro). https://juancbonilla.edu.mx/ rechazó la conexión.
  // Papelería: https://sep.puebla.gob.mx/ (título «Secretaría de Educación»). No es un sitio de UEP.
  // Clúster: plásticos por indicación del 1 nov 2026. El sitio no lo publica.
  // No se copiaron directivos del clúster. El pétalo «Centenario de la Revolución Mexicana» no es plantel.
  // Logos de plantel omitidos: Escudo.jpg y las fotos de Facebook son el escudo de la red o un collage, no una marca propia limpia.
  {
    slug: "uep",
    name: "Unidades Educativas por Puebla",
    logo: "/empresas/uep.webp",
    cluster: PLASTICS_CLUSTER,
    region: { es: "Puebla, México", en: "Puebla, Mexico", it: "Puebla, Messico" },
    summary: {
      es: "Red de planteles públicos en Puebla que comparten un escudo. No hay una página del sistema: cada plantel se encuentra por su cuenta.",
      en: "A network of public schools in Puebla that share one shield. There is no system-wide page: each campus is found on its own.",
      it: "Una rete di scuole pubbliche a Puebla che condividono uno scudo. Non c'è una pagina del sistema: ogni sede si trova per conto suo.",
    },
    industries: ["education"],
    problem: {
      es: "Quien busca a la red no llega a un sitio único. La papelería pasa por la Secretaría de Educación de Puebla, y el canal público, cuando existe, es el de cada plantel.",
      en: "Someone looking for the network does not land on a single site. Paperwork goes through Puebla's education secretariat, and the public channel, when there is one, belongs to each campus.",
      it: "Chi cerca la rete non arriva a un sito unico. La documentazione passa dalla segreteria all'istruzione di Puebla, e il canale pubblico, quando c'è, è quello di ogni sede.",
    },
    solution: {
      es: "Seis planteles públicos bajo el mismo escudo: Octavio Paz, Porfirio O. Morales, Blandina Torres de Marín, Frida Kahlo, Miguel Hidalgo y Juan C. Bonilla. Cada uno conserva su canal, Facebook o sitio propio, y la red no los sustituye con una página única.",
      en: "Six public campuses under the same shield: Octavio Paz, Porfirio O. Morales, Blandina Torres de Marín, Frida Kahlo, Miguel Hidalgo and Juan C. Bonilla. Each one keeps its own channel, Facebook or its own site, and the network does not replace them with a single page.",
      it: "Sei sedi pubbliche sotto lo stesso scudo: Octavio Paz, Porfirio O. Morales, Blandina Torres de Marín, Frida Kahlo, Miguel Hidalgo e Juan C. Bonilla. Ognuna tiene il proprio canale, Facebook o un sito proprio, e la rete non le sostituisce con una pagina unica.",
    },
    products: [
      {
        slug: "octavio-paz",
        name: "Unidad Educativa Octavio Paz",
        summary: {
          es: "Escuela media pública en la calle 1D núm. 26, colonia Bosques de San Sebastián, Puebla. El bachillerato general (CCT 21EBH0407O) está en Blvd. Puebla núm. 26 y el directorio no le registra sitio propio.",
          en: "Public middle school at Calle 1D No. 26, Bosques de San Sebastián, Puebla. The general high school (CCT 21EBH0407O) is at Blvd. Puebla No. 26, and the directory lists no site of its own.",
          it: "Scuola media pubblica in calle 1D n. 26, colonia Bosques de San Sebastián, Puebla. Il bachillerato generale (CCT 21EBH0407O) è in Blvd. Puebla n. 26 e l'elenco non registra un sito proprio.",
        },
        website: "https://www.facebook.com/uni.edu.OctavioPaz",
      },
      {
        slug: "porfirio-o-morales",
        name: "Unidad Educativa Porfirio O. Morales",
        summary: {
          es: "El directorio la lista como Unidad Educativa Profesor Porfirio O. Morales: bachillerato general público en la calle 5 de Mayo núm. 1208, colonia Aquiles Serdán, Tehuacán (CCT 21EBH0053D). Está activa, en turno vespertino, y sin sitio web.",
          en: "The directory lists it as Unidad Educativa Profesor Porfirio O. Morales: a public general high school at Calle 5 de Mayo No. 1208, colonia Aquiles Serdán, Tehuacán (CCT 21EBH0053D). It is active, on the afternoon shift, and has no website.",
          it: "L'elenco la registra come Unidad Educativa Profesor Porfirio O. Morales: bachillerato generale pubblico in calle 5 de Mayo n. 1208, colonia Aquiles Serdán, Tehuacán (CCT 21EBH0053D). È attiva, al turno pomeridiano, e senza sito.",
        },
      },
      {
        slug: "blandina-torres-de-marin",
        name: "Unidad Educativa Blandina Torres de Marín",
        summary: {
          es: "Secundaria general pública en Orión Sur 1597, San Andrés Cholula (CCT 21EES0339K). El plantel publica su sistema escolar en ueblatom.edu.mx, con domicilio en la colonia Villa Floresta, Reserva Territorial Atlixcáyotl.",
          en: "Public general secondary school at Orión Sur 1597, San Andrés Cholula (CCT 21EES0339K). The campus publishes its school system at ueblatom.edu.mx, with the address in colonia Villa Floresta, Reserva Territorial Atlixcáyotl.",
          it: "Scuola secondaria generale pubblica in Orión Sur 1597, San Andrés Cholula (CCT 21EES0339K). La sede pubblica il proprio sistema scolastico su ueblatom.edu.mx, con indirizzo in colonia Villa Floresta, Reserva Territorial Atlixcáyotl.",
        },
        website: "https://ueblatom.edu.mx/",
      },
      {
        slug: "frida-kahlo",
        name: "Unidad Educativa Frida Kahlo",
        summary: {
          es: "Bachillerato general público en calle Ameyal núm. 6, Sanctorum, San Juan Cuautlancingo (CCT 21EBH0891Z). Facebook @UEFridaKahlo la ubica en Cuautlancingo, Puebla, y el directorio no registra otro sitio.",
          en: "Public general high school at Calle Ameyal No. 6, Sanctorum, San Juan Cuautlancingo (CCT 21EBH0891Z). Facebook @UEFridaKahlo places it in Cuautlancingo, Puebla, and the directory lists no other site.",
          it: "Bachillerato generale pubblico in calle Ameyal n. 6, Sanctorum, San Juan Cuautlancingo (CCT 21EBH0891Z). Facebook @UEFridaKahlo la colloca a Cuautlancingo, Puebla, e l'elenco non registra un altro sito.",
        },
        website: "https://www.facebook.com/UEFridaKahlo",
      },
      {
        slug: "miguel-hidalgo",
        name: "Unidad Educativa Miguel Hidalgo",
        summary: {
          es: "Bachillerato general público en avenida Juan Herrera núm. 7, Guadalupe, Puebla (CCT 21EBH0126F). El directorio la marca activa, en turno matutino, y no publica un sitio web.",
          en: "Public general high school at Avenida Juan Herrera No. 7, Guadalupe, Puebla (CCT 21EBH0126F). The directory marks it active, on the morning shift, and lists no website.",
          it: "Bachillerato generale pubblico in avenida Juan Herrera n. 7, Guadalupe, Puebla (CCT 21EBH0126F). L'elenco la segna attiva, al turno mattutino, e non pubblica un sito.",
        },
      },
      {
        slug: "juan-c-bonilla",
        name: "Unidad Educativa Juan C. Bonilla",
        summary: {
          es: "El directorio la lista como Unidad Educativa General Juan Crisóstomo Bonilla: bachillerato general público en calle 18 Norte núm. 2404, colonia Xonaca, Puebla (CCT 21EBH0079L). Está activa, en turno vespertino, y sin sitio web.",
          en: "The directory lists it as Unidad Educativa General Juan Crisóstomo Bonilla: a public general high school at Calle 18 Norte No. 2404, colonia Xonaca, Puebla (CCT 21EBH0079L). It is active, on the afternoon shift, and has no website.",
          it: "L'elenco la registra come Unidad Educativa General Juan Crisóstomo Bonilla: bachillerato generale pubblico in calle 18 Norte n. 2404, colonia Xonaca, Puebla (CCT 21EBH0079L). È attiva, al turno pomeridiano, e senza sito.",
        },
      },
    ],
    contact: {
      website: "https://sep.puebla.gob.mx/",
    },
  },
  {
    slug: "kotemah",
    name: "Kotemah",
    logo: "/empresas/kotemah.webp",
    cluster: STARTUPS_CLUSTER,
    region: { es: "Puebla, México", en: "Puebla, Mexico", it: "Puebla, Messico" },
    summary: {
      es: "Equipos de manipulación de carga en gravedad cero y exoesqueletos para la industria.",
      en: "Zero-gravity load handling equipment and exoskeletons for industry.",
      it: "Attrezzature di movimentazione carichi a gravità zero ed esoscheletri per l'industria.",
    },
    industries: ["industry40"],
    problem: {
      es: "Levantar, empujar y transportar carga desgasta al operador, y a la planta le cuesta en incapacidades, rotación y ritmo perdido. Además es obligación normativa: la NOM-036-1-STPS-2018 exige identificar, analizar, prevenir y controlar el riesgo ergonómico en toda tarea que maneje cargas desde 3 kg, y sostenerlo con evidencia documentada. La mayoría de las plantas no tiene con qué demostrarlo.",
      en: "Lifting, pushing and carrying loads wears the operator down, and it costs the plant in sick leave, turnover and lost pace. It is also a legal obligation: Mexico’s NOM-036-1-STPS-2018 requires identifying, analyzing, preventing and controlling ergonomic risk in every task handling loads of 3 kg or more, backed by documented evidence. Most plants have no way to prove it.",
      it: "Sollevare, spingere e trasportare carichi logora l'operatore, e allo stabilimento costa in inabilità, turnover e ritmo perso. È anche un obbligo normativo: la NOM-036-1-STPS-2018 esige di identificare, analizzare, prevenire e controllare il rischio ergonomico in ogni compito che movimenta carichi da 3 kg, e di sostenerlo con evidenza documentata. La maggior parte degli stabilimenti non ha modo di dimostrarlo.",
    },
    solution: {
      es: "Un ecosistema que cuida el cuerpo del operador y sostiene el expediente. Equipos de manipulación de carga en gravedad cero y exoesqueletos que quitan el esfuerzo de la tarea sin rediseñar la línea, más ErgoSoft para levantar la evaluación ergonómica, documentar los controles y llevar el seguimiento que pide la norma.",
      en: "An ecosystem that protects the operator’s body and keeps the records straight. Zero-gravity load handling equipment and exoskeletons take the strain out of the task without redesigning the line, plus ErgoSoft to run the ergonomic assessment, document controls and keep the follow-up the standard requires.",
      it: "Un ecosistema che protegge il corpo dell'operatore e tiene in ordine il fascicolo. Attrezzature di movimentazione carichi a gravità zero ed esoscheletri che tolgono lo sforzo dal compito senza riprogettare la linea, più ErgoSoft per eseguire la valutazione ergonomica, documentare i controlli e tenere il seguito che richiede la norma.",
    },
    products: [
      {
        slug: "dronebox",
        name: "Dronebox",
        image: "/empresas/kotemah/dronebox.webp",
        summary: {
          es: "Asistente robótico de transporte de carga que identifica escalones, escaleras rectas y caracol para asistir en el traslado. Capacidad de hasta 500 kg.",
          en: "Robotic load transport assistant that identifies steps, straight and spiral staircases to assist in load carrying. Capacity up to 500 kg.",
          it: "Assistente robotico per il trasporto di carichi che identifica gradini, scale dritte e a chiocciola per assistere nel trasferimento. Capacità fino a 500 kg.",
        },
      },
      {
        slug: "lexa-ws-ubf",
        name: "LEXA WS UBF",
        image: "/empresas/kotemah/lexa-ws-ubf.webp",
        summary: {
          es: "Esqueleto artificial portátil que asiste al operador en tareas repetitivas de carga. Asistencia de 1.5 a 16 kg.",
          en: "Wearable artificial skeleton that assists the operator in repetitive load-bearing tasks. Load assistance of 1.5 to 16 kg.",
          it: "Scheletro artificiale indossabile che assiste l'operatore in compiti ripetitivi di carico. Assistenza da 1,5 a 16 kg.",
        },
      },
      {
        slug: "cobhan",
        name: "COBHAN",
        image: "/empresas/kotemah/cobhan.webp",
        summary: {
          es: "Equipo neumático o eléctrico que asiste en la carga de materiales pesados, eliminando el riesgo de lesiones lumbares. Capacidad de 20 a 250 kg.",
          en: "Pneumatic or electric equipment that assists in loading heavy materials, eliminating the risk of lower back injuries. Capacity from 20 to 250 kg.",
          it: "Attrezzatura pneumatica o elettrica che assiste nel carico di materiali pesanti, eliminando il rischio di lesioni lombari. Capacità da 20 a 250 kg.",
        },
      },
      {
        slug: "cori",
        name: "CORI",
        image: "/empresas/kotemah/cori.webp",
        summary: {
          es: "Equipo de asistencia de carga para tareas de transferencia en líneas de producción. Capacidad de 20 a 50 kg.",
          en: "Load assistance equipment for transfer tasks on production lines. Capacity from 20 to 50 kg.",
          it: "Attrezzatura di assistenza al carico per compiti di trasferimento sulle linee di produzione. Capacità da 20 a 50 kg.",
        },
      },
    ],
    contact: {
      person: "Rodrigo Ruiz",
      email: "ventas.koteos@gmail.com",
      phone: "+52 222 190 1740",
    },
  },
  {
    slug: "oxtron",
    name: "Oxtron",
    logo: "/empresas/oxtron.webp",
    logoDark: true,
    cluster: STARTUPS_CLUSTER,
    region: { es: "Puebla, México", en: "Puebla, Mexico", it: "Puebla, Messico" },
    summary: {
      es: "Plataforma de huella de carbono alimentaria e inventario de emisiones con captura de CO₂.",
      en: "Food carbon footprint platform and emissions inventory with CO₂ capture.",
      it: "Piattaforma di impronta di carbonio alimentare e inventario delle emissioni con cattura di CO₂.",
    },
    industries: ["climatech"],
    problem: {
      es: "Los compradores europeos y estadounidenses ya exigen trazabilidad ambiental para dejar entrar un producto, y el exportador mexicano no tiene con qué responder: medir la huella de cada producto pide análisis de ciclo de vida, y el reporte de emisiones se rearma a mano cada año. En polímeros y petroquímica hay además un desperdicio doble: el CO₂ de proceso se ventea como residuo mientras la planta sigue comprando insumos convencionales.",
      en: "European and US buyers already demand environmental traceability before letting a product in, and Mexican exporters have no way to answer: measuring each product’s footprint requires life-cycle assessment, and the emissions report is rebuilt by hand every year. In polymers and petrochemicals the waste is twofold: process CO₂ is vented while the plant keeps buying conventional feedstock.",
      it: "Gli acquirenti europei e statunitensi esigono già la tracciabilità ambientale per far entrare un prodotto, e l'esportatore messicano non ha modo di rispondere: misurare l'impronta di ogni prodotto richiede un'analisi del ciclo di vita, e il report delle emissioni si ricostruisce a mano ogni anno. Nei polimeri e nella petrolchimica c'è inoltre un doppio spreco: la CO₂ di processo viene sfiatata come residuo mentre lo stabilimento continua a comprare input convenzionali.",
    },
    solution: {
      es: "Dos frentes sobre el mismo dato. La plataforma de huella de carbono alimentaria calcula automáticamente las emisiones de productos e ingredientes contra una base de análisis de ciclo de vida con metodología IPCC y GHG Protocol, y emite etiquetas climáticas verificables; la de inventario de emisiones automatiza el reporte de Alcances 1, 2 y 3 conforme al GHG Protocol y al RETC. Para fuentes fijas, un sistema modular captura el CO₂ con pureza de hasta 90% y lo devuelve como materia prima de policarbonato, metanol y resinas: el residuo de proceso se vuelve flujo de valor.",
      en: "Two fronts on the same data. The food carbon footprint platform automatically calculates emissions for products and ingredients against a life-cycle assessment database built on IPCC methodology and the GHG Protocol, and issues verifiable climate labels; the emissions inventory platform automates Scope 1, 2 and 3 reporting under the GHG Protocol and Mexico’s RETC. For fixed sources, a modular system captures CO₂ at up to 90% purity and returns it as feedstock for polycarbonate, methanol and resins: a process waste becomes a value stream.",
      it: "Due fronti sullo stesso dato. La piattaforma di impronta di carbonio alimentare calcola in automatico le emissioni di prodotti e ingredienti contro una base di analisi del ciclo di vita con metodologia IPCC e GHG Protocol, ed emette etichette climatiche verificabili; quella di inventario delle emissioni automatizza il report di Scope 1, 2 e 3 secondo il GHG Protocol e il RETC. Per le fonti fisse, un sistema modulare cattura la CO₂ con purezza fino al 90% e la restituisce come materia prima di policarbonato, metanolo e resine: il residuo di processo diventa un flusso di valore.",
    },
    contact: {
      person: "Jazmín Salazar",
      role: "CEO",
      website: "https://www.oxtron.mx/es/",
      email: "info@oxtron.mx",
    },
  },
  {
    slug: "nemiki",
    name: "Nemiki",
    logo: "/empresas/nemiki.webp",
    cluster: STARTUPS_CLUSTER,
    region: { es: "Puebla, México", en: "Puebla, Mexico", it: "Puebla, Messico" },
    summary: {
      es: "Juego indie mexicano de pixel art donde jugar regenera el hábitat del axolote.",
      en: "Mexican indie pixel-art game where playing regenerates the axolotl habitat.",
      it: "Gioco indie messicano in pixel art in cui giocare rigenera l'habitat dell'axolotl.",
    },
    industries: ["gametech"],
    problem: {
      es: "La basura y la contaminación dañaron el hábitat del axolote y de muchas más especies. Acercar a más jóvenes a la naturaleza y financiar la conservación de ese bosque siguen siendo dos tareas distintas.",
      en: "Trash and pollution have damaged the habitat of the axolotl and of many other species. Bringing more young people closer to nature and funding the conservation of that forest are still two separate tasks.",
      it: "I rifiuti e l'inquinamento hanno danneggiato l'habitat dell'axolotl e di molte altre specie. Avvicinare più giovani alla natura e finanziare la conservazione di quel bosco restano due compiti distinti.",
    },
    solution: {
      es: "Nemiki es un juego indie mexicano de pixel art, todavía en desarrollo, donde jugar es regenerar. Exploras un mundo herido, devuelves la vida al agua y al bosque, y acompañas a los axolotes de vuelta a su hábitat. El bosque del juego es real: está en Puebla, y parte de los ingresos financia su restauración. Lo co-crean con Villa Atl, que gestiona ese bosque con jóvenes, y con Xolokali, el refugio donde los axolotes se reproducen y se estudian. La mayor parte de los ingresos va a ese trabajo.",
      en: "Nemiki is a Mexican indie pixel-art game, still in development, where playing is regenerating. You explore a wounded world, bring life back to the water and the forest, and accompany the axolotls back to their habitat. The forest in the game is real: it is in Puebla, and part of the revenue funds its restoration. They co-create it with Villa Atl, which manages that forest with young people, and with Xolokali, the refuge where axolotls reproduce and are studied. Most of the revenue goes to that work.",
      it: "Nemiki è un gioco indie messicano in pixel art, ancora in sviluppo, in cui giocare è rigenerare. Esplori un mondo ferito, restituisci la vita all'acqua e al bosco e accompagni gli axolotl di nuovo nel loro habitat. Il bosco del gioco è reale: sta a Puebla, e parte dei ricavi ne finanzia il ripristino. Lo co-creano con Villa Atl, che gestisce quel bosco con i giovani, e con Xolokali, il rifugio dove gli axolotl si riproducono e vengono studiati. La maggior parte dei ricavi va a quel lavoro.",
    },
    products: [
      {
        slug: "restaura-habitats-reales",
        name: "Restaura hábitats reales",
        summary: {
          es: "Limpias ecosistemas, recuperas suelo y plantas donde ya no había nada. Cada misión nace de una acción de restauración en el mundo real.",
          en: "You clean ecosystems, recover soil and plant where there was nothing. Each mission comes from a restoration action in the real world.",
          it: "Pulisci ecosistemi, recuperi suolo e pianti dove non c'era più niente. Ogni missione nasce da un'azione di ripristino nel mondo reale.",
        },
        website: "https://www.nemiki.com.mx/",
      },
      {
        slug: "axolote-del-altiplano",
        name: "Axolote del altiplano",
        summary: {
          es: "La especie que resiste en el altiplano mexicano: cómo vive, qué la amenaza y qué necesita para volver.",
          en: "The species that holds on in the Mexican plateau: how it lives, what threatens it and what it needs to return.",
          it: "La specie che resiste sull'altopiano messicano: come vive, cosa la minaccia e di cosa ha bisogno per tornare.",
        },
        website: "https://www.nemiki.com.mx/",
      },
      {
        slug: "co-creacion-scout",
        name: "Co-creación scout",
        summary: {
          es: "Los retos ambientales y las enseñanzas scout inspiran el juego. Los jugadores comparten sus experiencias.",
          en: "Environmental challenges and scout teachings inspire the game. Players share their experiences.",
          it: "Le sfide ambientali e gli insegnamenti scout ispirano il gioco. I giocatori condividono le loro esperienze.",
        },
        website: "https://www.nemiki.com.mx/",
      },
    ],
    contact: {
      website: "https://www.nemiki.com.mx/",
      email: "nemiki.game@gmail.com",
    },
  },
];

const NAME_COLLATOR = { sensitivity: "base" } as const;

/** Plásticos, luego startups, luego el resto agrupado por el nombre en español del clúster. */
function clusterPriority(company: Company): number {
  if (company.cluster.id === PLASTICS_CLUSTER.id) return 0;
  if (company.cluster.id === STARTUPS_CLUSTER.id) return 1;
  return 2;
}

function compareCompanies(a: Company, b: Company): number {
  const byPriority = clusterPriority(a) - clusterPriority(b);
  if (byPriority !== 0) return byPriority;

  if (clusterPriority(a) === 2) {
    const byClusterName = a.cluster.name.es.localeCompare(b.cluster.name.es, "es", NAME_COLLATOR);
    if (byClusterName !== 0) return byClusterName;
    const byClusterId = a.cluster.id.localeCompare(b.cluster.id, "es", NAME_COLLATOR);
    if (byClusterId !== 0) return byClusterId;
  }

  return a.name.localeCompare(b.name, "es", NAME_COLLATOR);
}

export const companies: readonly Company[] = [...COMPANY_LIST].sort(compareCompanies);

export function getCompany(slug: string): Company | null {
  return companies.find((company) => company.slug === slug) ?? null;
}
