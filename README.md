# Calcpucp

Una aplicación web moderna construida con Next.js 15, React 19, TypeScript y Tailwind CSS.

## Estructura del Proyecto

```
calcpucp/
├── src/
│   ├── app/                    # App Router (Next.js 13+)
│   │   ├── layout.tsx         # Layout principal
│   │   ├── page.tsx           # Página principal
│   │   ├── manifest.ts        # Web app manifest
│   │   └── favicon.ico        # Favicon
│   ├── components/            # Componentes reutilizables
│   │   ├── ui/               # Componentes de UI básicos
│   │   ├── forms/            # Componentes de formularios
│   │   └── layout/           # Componentes de layout
│   ├── lib/                  # Utilidades y configuraciones
│   │   ├── utils.ts          # Funciones utilitarias
│   │   ├── constants.ts      # Constantes de la aplicación
│   │   └── types.ts          # Definiciones de tipos TypeScript
│   ├── services/             # Servicios y APIs
│   │   ├── api.ts            # Cliente HTTP
│   │   └── auth.ts           # Servicios de autenticación
│   ├── hooks/                # Custom React hooks
│   ├── stores/               # Estado global (Zustand)
│   └── styles/               # Estilos globales
│       └── globals.css       # Estilos CSS globales
├── public/                   # Archivos estáticos
│   ├── images/              # Imágenes
│   ├── icons/               # Iconos
│   └── fonts/               # Fuentes
├── docs/                    # Documentación
└── config files...          # Archivos de configuración
```

## Tecnologías

- **Framework**: Next.js 15.3.3
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Language**: TypeScript
- **Package Manager**: npm

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo con Turbopack
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## Características

- ✅ App Router de Next.js 13+
- ✅ TypeScript para type safety
- ✅ Tailwind CSS para estilos
- ✅ Zustand para manejo de estado
- ✅ Estructura modular y escalable
- ✅ Configuración optimizada para desarrollo

## Desarrollo

1. Clona el repositorio
2. Instala las dependencias: `npm install`
3. Inicia el servidor de desarrollo: `npm run dev`
4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
