
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loading) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search location... (e.g., London, Tokyo)"
        className="w-full pl-12 pr-32 py-4 bg-white/5 backdrop-blur-md text-white placeholder-blue-300 border border-white/20 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 shadow-lg"
        disabled={loading}
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
        disabled={loading}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
