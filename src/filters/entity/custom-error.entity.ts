export class MetaCustomError {
  time: number;
  user?: number | null;
  ref: string | null;
  log: string | null;
}

export class LinkCustomError {
  about: string;
}

export class CustomError {
  id?: number | 0;
  links: LinkCustomError;
  code?: string | "DEFAULT";
  status: number;
  title: string | "INTERNAL_SERVER_ERROR";
  detail: string[];
  meta?: MetaCustomError;
}
