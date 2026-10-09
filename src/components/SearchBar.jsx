import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

// Componente para o campo de busca de Pokémons por nome
export function SearchBar({ 
  searchTerm, 
  onSearchChange, 
  totalCount, 
  filteredCount 
}) {
  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          className="search-input"
          placeholder="Buscar Pokémon por nome (ex: Bulbasaur, Pikachu, Charizard...)"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <button 
            className="clear-search-btn"
            onClick={() => onSearchChange('')}
            title="Limpar busca"
            type="button"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="search-stats">
        <SlidersHorizontal size={16} />
        <span>
          Exibindo <strong>{filteredCount}</strong> de <strong>{totalCount}</strong> Pokémons
        </span>
      </div>
    </div>
  );
}
