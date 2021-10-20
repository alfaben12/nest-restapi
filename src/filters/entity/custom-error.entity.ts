export class MetaCustomError {
  time: number;
  user?: number | null;
}

export class LinkCustomError {
  about: string;
}

export class CustomError {
  id?: number | 0;
  links: LinkCustomError;
  code?: string | "DEFAULT";
  statusCode: number;
  title: string | "INTERNAL_SERVER_ERROR";
  detail: string[];
  meta?: MetaCustomError;
}
