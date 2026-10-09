import React from 'react';
import { TYPE_COLORS, TYPE_NAMES_PT, formatPokemonId, capitalizeName } from '../utils/pokemonTypes';
import { Heart, Shield, Zap } from 'lucide-react';

// Componente filho responsável por exibir as informações individuais de cada Pokémon
export function PokemonCard({ pokemon, onSelectPokemon }) {
  // Extrai o tipo principal para aplicar tema de cores no card
  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const cardColor = TYPE_COLORS[primaryType] || '#A8A77A';

  // Obtém a imagem em alta resolução (official-artwork) ou a sprite padrão como fallback
  const imageUrl = 
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default ||
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';

  // Extrai o valor de HP dos stats do Pokémon
  const hpStat = pokemon.stats?.find(s => s.stat.name === 'hp')?.base_stat || '--';
  const attackStat = pokemon.stats?.find(s => s.stat.name === 'attack')?.base_stat || '--';

  return (
    <div 
      className="pokemon-card"
      onClick={() => onSelectPokemon(pokemon)}
      style={{
        '--type-theme-color': cardColor
      }}
    >
      {/* Cabeçalho do Card com Número ID e Distintivo de Tipo Principal */}
      <div className="card-header">
        <span className="pokemon-id">{formatPokemonId(pokemon.id)}</span>
        <div className="card-stats-preview">
          <span className="stat-badge hp" title="Pontos de Vida">
            <Heart size={12} /> {hpStat}
          </span>
        </div>
      </div>

      {/* Ilustração / Arte do Pokémon */}
      <div className="card-image-container">
        <div className="image-bg-circle"></div>
        <img 
          src={imageUrl} 
          alt={pokemon.name} 
          className="pokemon-sprite" 
          loading="lazy"
        />
      </div>

      {/* Informações de Nome e Tipos */}
      <div className="card-content">
        <h3 className="pokemon-name">{capitalizeName(pokemon.name)}</h3>
        
        {/* Badge(s) com os tipos do Pokémon */}
        <div className="pokemon-types">
          {pokemon.types.map((t) => {
            const typeName = t.type.name;
            const bg = TYPE_COLORS[typeName] || '#718096';
            const labelPt = TYPE_NAMES_PT[typeName] || typeName;

            return (
              <span 
                key={typeName} 
                className="type-badge"
                style={{ backgroundColor: bg }}
              >
                {labelPt}
              </span>
            );
          })}
        </div>

        {/* Resumo de atributos básicos */}
        <div className="card-quick-stats">
          <div className="quick-stat-item">
            <Zap size={14} />
            <span>Ataque: <strong>{attackStat}</strong></span>
          </div>
          <div className="quick-stat-item">
            <Shield size={14} />
            <span>Peso: <strong>{(pokemon.weight / 10).toFixed(1)} kg</strong></span>
          </div>
        </div>
      </div>

      {/* Indicador de interação ao passar o mouse */}
      <div className="card-footer-action">
        <span>Clique para ver detalhes</span>
      </div>
    </div>
  );
}
