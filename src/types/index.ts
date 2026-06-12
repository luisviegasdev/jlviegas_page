export type Locale = "en" | "pt";

export type LocalizedText = Record<Locale, string>;

export type NavItem = {
  label: LocalizedText;
  href: string;
};

export type Cta = {
  label: LocalizedText;
  href: string;
};
