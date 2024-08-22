interface Referer {
  id: number;
  name: string;
  telephone: string;
}

export interface Consumer {
  id: number | undefined;
  name: string;
  email: string;
  password: string;
  telephone: string;
  knowReact: boolean;
  referer: Referer[];
}
