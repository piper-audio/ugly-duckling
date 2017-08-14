export abstract class UrlResourceLifetimeManager {
  abstract createUrlToResource(resource: File | Blob): string;
  abstract revokeUrlToResource(url: string): void;
}
