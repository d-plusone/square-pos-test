/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SQUARE_CLIENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
