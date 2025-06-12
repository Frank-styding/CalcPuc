"use client";

import { useState } from "react";
import { useApiConfig } from "@/hooks/useApiConfig";

export const ApiConfigForm = () => {
  const { config, isLoading, saveConfig, resetConfig, validateUrl } =
    useApiConfig();
  const [formData, setFormData] = useState({
    baseUrl: config.baseUrl,
    timeout: config.timeout,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "timeout" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    // Validar URL
    if (!validateUrl(formData.baseUrl)) {
      setMessage({ type: "error", text: "La URL de la API no es válida" });
      setIsSaving(false);
      return;
    }

    // Validar timeout
    if (formData.timeout < 1000 || formData.timeout > 60000) {
      setMessage({
        type: "error",
        text: "El timeout debe estar entre 1 y 60 segundos",
      });
      setIsSaving(false);
      return;
    }

    // Guardar configuración
    const success = saveConfig(formData);

    if (success) {
      setMessage({
        type: "success",
        text: "Configuración guardada exitosamente",
      });
    } else {
      setMessage({ type: "error", text: "Error al guardar la configuración" });
    }

    setIsSaving(false);
  };

  const handleReset = () => {
    resetConfig();
    setFormData({
      baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
      timeout: 10000,
    });
    setMessage({
      type: "success",
      text: "Configuración restablecida a valores por defecto",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-dark3)]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-dark1)] rounded-lg border border-[var(--color-dark2)] p-6">
      <h2 className="text-xl font-bold text-[var(--color-dark3)] mb-6">
        Configuración de la API
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="baseUrl"
            className="block text-sm font-medium text-[var(--color-dark3)] mb-2"
          >
            URL Base de la API
          </label>
          <input
            type="url"
            id="baseUrl"
            name="baseUrl"
            value={formData.baseUrl}
            onChange={handleInputChange}
            placeholder="https://api.ejemplo.com"
            className="w-full px-3 py-2 bg-[var(--color-dark)] border border-[var(--color-dark2)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-dark3)] focus:border-transparent text-[var(--color-dark3)] placeholder-[var(--color-dark3)] placeholder-opacity-50"
            required
          />
          <p className="text-sm text-[var(--color-dark3)] opacity-70 mt-1">
            URL completa de la API (ej: https://api.ejemplo.com/api)
          </p>
        </div>

        <div>
          <label
            htmlFor="timeout"
            className="block text-sm font-medium text-[var(--color-dark3)] mb-2"
          >
            Timeout (milisegundos)
          </label>
          <input
            type="number"
            id="timeout"
            name="timeout"
            value={formData.timeout}
            onChange={handleInputChange}
            min="1000"
            max="60000"
            step="1000"
            className="w-full px-3 py-2 bg-[var(--color-dark)] border border-[var(--color-dark2)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-dark3)] focus:border-transparent text-[var(--color-dark3)]"
            required
          />
          <p className="text-sm text-[var(--color-dark3)] opacity-70 mt-1">
            Tiempo máximo de espera para las peticiones (1-60 segundos)
          </p>
        </div>

        {message && (
          <div
            className={`p-3 rounded-md border ${
              message.type === "success"
                ? "bg-green-900 bg-opacity-20 text-green-300 border-green-600"
                : "bg-red-900 bg-opacity-20 text-red-300 border-red-600"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSaving}
            className="flex-1 bg-[var(--color-dark3)] text-[var(--color-dark)] py-2 px-4 rounded-md hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isSaving ? "Guardando..." : "Guardar Configuración"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 border border-[var(--color-dark2)] text-[var(--color-dark3)] rounded-md hover:bg-[var(--color-dark2)] transition-colors"
          >
            Restablecer
          </button>
        </div>
      </form>

      <div className="mt-8 p-4 bg-[var(--color-dark)] rounded-md border border-[var(--color-dark2)]">
        <h3 className="text-lg font-semibold text-[var(--color-dark3)] mb-2">
          Configuración Actual
        </h3>
        <div className="space-y-2 text-sm text-[var(--color-dark3)] opacity-80">
          <div>
            <span className="font-medium">URL Base:</span> {config.baseUrl}
          </div>
          <div>
            <span className="font-medium">Timeout:</span> {config.timeout}ms
          </div>
        </div>
      </div>
    </div>
  );
};
