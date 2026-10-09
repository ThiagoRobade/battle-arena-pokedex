import React from 'react';
import { TYPE_COLORS, TYPE_NAMES_PT } from '../utils/pokemonTypes';

// Componente para filtragem por tipo de Pokémon
export function TypeFilter({ selectedType, onSelectType, availableTypes }) {
  return (
    <div className="type-filter-container">
      <span className="filter-label">Filtrar por tipo:</span>
      <div className="filter-chips">
        <button
          className={`type-chip ${selectedType === 'todos' ? 'active' : ''}`}
          onClick={() => onSelectType('todos')}
          style={{
            '--chip-color': '#4A5568'
          }}
        >
          Todos
        </button>
        {availableTypes.map((type) => {
          const isSelected = selectedType === type;
          const color = TYPE_COLORS[type] || '#718096';
          const namePt = TYPE_NAMES_PT[type] || type;

          return (
            <button
              key={type}
              className={`type-chip ${isSelected ? 'active' : ''}`}
              onClick={() => onSelectType(type)}
              style={{
                '--chip-color': color
              }}
            >
              {namePt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
