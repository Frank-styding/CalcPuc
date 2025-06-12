"use client";
import { useState } from "react";

interface SearchHeaderProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export const SearchHeader = ({
  onSearch,
  placeholder = "Buscar...",
}: SearchHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <div className="w-screen h-[75px] relative flex items-center justify-center px-4">
      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={placeholder}
            className="w-full px-4 py-2 pl-10 pr-4 text-[var(--color-dark3)] bg-[var(--color-dark1)] border border-[var(--color-dark2)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-dark2)] focus:border-transparent placeholder-[var(--color-dark3)] placeholder-opacity-50"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-[var(--color-dark3)] opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </form>
    </div>
  );
};
