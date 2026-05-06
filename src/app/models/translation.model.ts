export type TranslationModel = {
  nav: {
    brand: string;
    links: Array<{ label: string; href: string }>;
    quote: string;
    languageLabel: string;
    themeLabel: string;
    languageButton: string;
    themeButton: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
    quote: string;
    contact: string;
    imageAlt: string;
  };
  about: {
    tag: string;
    title: string;
    p1: string;
    p2: string;
    stats: Array<{ value: string; label: string }>;
  };
  services: {
    tag: string;
    title: string;
    items: Array<{ icon: string; title: string; description: string }>;
  };
  team: {
    tag: string;
    title: string;
    socialLinkedIn: string;
    socialEmail: string;
    profileAlt: string;
    members: Array<{ name: string; role: string; bio: string; image: string }>;
  };
  gallery: {
    tag: string;
    title: string;
    imageAlt: string;
  };
  whyChooseUs: {
    tag: string;
    title: string;
    pillars: Array<{ icon: string; title: string; stat: string; detail: string }>;
  };
  contact: {
    tag: string;
    title: string;
    name: string;
    email: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    send: string;
    details: string;
    phone: string;
    emailText: string;
    address: string;
    whatsapp: string;
    mapTitle: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    social: string;
    copyright: string;
  };
  seo: {
    title: string;
    description: string;
  };
};

export const EMPTY_TRANSLATION: TranslationModel = {
  nav: {
    brand: '',
    links: [],
    quote: '',
    languageLabel: '',
    themeLabel: '',
    languageButton: '',
    themeButton: ''
  },
  hero: { badge: '', title: '', description: '', quote: '', contact: '', imageAlt: '' },
  about: { tag: '', title: '', p1: '', p2: '', stats: [] },
  services: { tag: '', title: '', items: [] },
  team: { tag: '', title: '', socialLinkedIn: '', socialEmail: '', profileAlt: '', members: [] },
  gallery: { tag: '', title: '', imageAlt: '' },
  whyChooseUs: { tag: '', title: '', pillars: [] },
  contact: {
    tag: '',
    title: '',
    name: '',
    email: '',
    message: '',
    namePlaceholder: '',
    emailPlaceholder: '',
    messagePlaceholder: '',
    send: '',
    details: '',
    phone: '',
    emailText: '',
    address: '',
    whatsapp: '',
    mapTitle: ''
  },
  footer: { description: '', quickLinks: '', social: '', copyright: '' },
  seo: { title: '', description: '' }
};
