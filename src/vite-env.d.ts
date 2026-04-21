/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FEED_BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
