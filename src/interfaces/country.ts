export interface Country {
  name: string;
  code: string;
}

export interface CountryData {
  data: Country[];
  error?: string;
}
