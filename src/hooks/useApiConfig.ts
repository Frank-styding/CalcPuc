import { useState, useEffect } from "react";

interface ApiConfig {
  baseUrl: string;
  timeout: number;
}

const DEFAULT_CONFIG: ApiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  timeout: 10000,
};

const CONFIG_STORAGE_KEY = "api_config";

export const useApiConfig = () => {
  const [config, setConfig] = useState<ApiConfig>(DEFAULT_CONFIG);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar configuración desde localStorage
  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig({ ...DEFAULT_CONFIG, ...parsedConfig });
      }
    } catch (error) {
      console.error("Error loading API config:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Guardar configuración en localStorage
  const saveConfig = (newConfig: Partial<ApiConfig>) => {
    try {
      const updatedConfig = { ...config, ...newConfig };
      setConfig(updatedConfig);
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(updatedConfig));
      return true;
    } catch (error) {
      console.error("Error saving API config:", error);
      return false;
    }
  };

  // Resetear a configuración por defecto
  const resetConfig = () => {
    setConfig(DEFAULT_CONFIG);
    localStorage.removeItem(CONFIG_STORAGE_KEY);
  };

  // Validar URL
  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return {
    config,
    isLoading,
    saveConfig,
    resetConfig,
    validateUrl,
  };
};
