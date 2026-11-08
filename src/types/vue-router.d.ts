import 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    icon?: string
    short?: string
    showInNav?: boolean
    public?: boolean
    permission?: string
  }
}