interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_API_KEY_SECRET: string
  readonly VITE_ADMIN_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}