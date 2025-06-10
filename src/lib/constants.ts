// Constantes globales de la aplicación

export const APP_CONFIG = {
  name: "Mi Web App",
  version: "1.0.0",
  description: "Una aplicación web moderna con Next.js y Zustand",
  author: "Tu Nombre",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
};

export const PAGINATION = {
  defaultPage: 1,
  defaultLimit: 10,
  maxLimit: 100,
};

export const THEME = {
  light: "light",
  dark: "dark",
  system: "system",
};

export const ROUTES = {
  home: "/",
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  },
  dashboard: "/dashboard",
  profile: "/profile",
  settings: "/settings",
};
