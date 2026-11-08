vue-router.d.ts គឺជា Type Declaration File
ប្រើសម្រាប់ប្រាប់ TypeScript ឱ្យស្គាល់ប្រភេទទិន្នន័យ (Types) មួយចំនួន

ចំណាំ៖
    .ts ប្រើសម្រាប់សរសេរ TypeScript ដែលមាន Logic។
    .d.ts ប្រើសម្រាប់ប្រកាស Type ឱ្យ TypeScript ស្គាល់។
    .d.ts មិនមែនជា File ដែលយើងសរសេរ Function ដើម្បីដំណើរការកម្មវិធីទេ។

declare module
    - យើងចង់ប្រកាស ឬពង្រីក Type របស់ Module ដែលមានស្រាប់។
interface RouteMeta
    - Vue Router មាន Interface ឈ្មោះ RouteMeta ស្រាប់។

តើ RouteLocationNormalized ជាអ្វី?
Property	អត្ថន័យ
to.path	    URL Path
to.name	    Route Name
to.meta	    Route Metadata
to.params	Route Parameters
to.query	Query Parameters
to.fullPath	URL ពេញលេញ

Partial<ButtonProps>
    មានន័យថា properties ទាំងអស់ក្នុង ButtonProps ក្លាយជា optional (?)។