/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: {
    readonly VITE_API_BASE_URL?: string; // API base URL
    readonly [key: string]: string | undefined; // other environment variables
  };
}
