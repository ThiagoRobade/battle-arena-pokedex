import React, { useState } from 'react';
import { TYPE_COLORS, TYPE_NAMES_PT, formatPokemonId, capitalizeName } from '../utils/pokemonTypes';
import { X, Heart, Shield, Zap, Sparkles, Scale, Ruler, Flame } from 'lucide-react';

// Mapeamento de nomes de atributos para Português
const STAT_NAMES_PT = {
  hp: 'HP (Vida)',
  attack: 'Ataque',
  defense: 'Defesa',
  'special-attack': 'Ataque Esp.',
  'special-defense': 'Defesa Esp.',
  speed: 'Velocidade'
};

// Componente de modal interativo para exibição detalhada de um Pokémon
export function PokemonModal({ pokemon, onClose }) {
  const [spriteVariant, setSpriteVariant] = useState('artwork'); // 'artwork', 'front', 'back', 'shiny'

  if (!pokemon) return null;

  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const themeColor = TYPE_COLORS[primaryType] || '#EF5350';

  // Seleciona a imagem com base no botão clicado
  const getDisplayImage = () => {
    switch (spriteVariant) {
      case 'shiny':
        return pokemon.sprites?.other?.['official-artwork']?.front_shiny || pokemon.sprites?.front_shiny || pokemon.sprites?.front_default;
      case 'front':
        return pokemon.sprites?.front_default;
      case 'back':
        return pokemon.sprites?.back_default || pokemon.sprites?.front_default;
      case 'artwork':
      default:
        return pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{ '--modal-theme-color': themeColor }}
      >
        {/* Botão de Fechar */}
        <button className="modal-close-btn" onClick={onClose} title="Fechar modal">
          <X size={20} />
        </button>

        {/* Topo do Modal com Cor Temática do Pokémon */}
        <div className="modal-header-bg">
          <div className="modal-id-badge">{formatPokemonId(pokemon.id)}</div>
          <h2 className="modal-title">{capitalizeName(pokemon.name)}</h2>
          
          <div className="modal-types">
            {pokemon.types.map((t) => (
              <span 
                key={t.type.name} 
                className="type-badge large"
                style={{ backgroundColor: TYPE_COLORS[t.type.name] || '#718096' }}
              >
                {TYPE_NAMES_PT[t.type.name] || t.type.name}
              </span>
            ))}
          </div>

          <div className="modal-image-wrapper">
            <img 
              src={getDisplayImage()} 
              alt={pokemon.name} 
              className="modal-pokemon-image"
            />
          </div>

          {/* Seleção de visualização da Sprite */}
          <div className="sprite-selector-tabs">
            <button 
              className={`sprite-btn ${spriteVariant === 'artwork' ? 'active' : ''}`}
              onClick={() => setSpriteVariant('artwork')}
            >
              Arte Oficial
            </button>
            <button 
              className={`sprite-btn ${spriteVariant === 'front' ? 'active' : ''}`}
              onClick={() => setSpriteVariant('front')}
            >
              Frente
            </button>
            {pokemon.sprites?.back_default && (
              <button 
                className={`sprite-btn ${spriteVariant === 'back' ? 'active' : ''}`}
                onClick={() => setSpriteVariant('back')}
              >
                Costas
              </button>
            )}
            <button 
              className={`sprite-btn shiny-btn ${spriteVariant === 'shiny' ? 'active' : ''}`}
              onClick={() => setSpriteVariant('shiny')}
            >
              <Sparkles size={14} /> Shiny
            </button>
          </div>
        </div>

        {/* Conteúdo com Atributos e Estatísticas */}
        <div className="modal-body">
          {/* Métricas Físicas */}
          <div className="physical-stats">
            <div className="metric-box">
              <Ruler size={18} className="metric-icon" />
              <div className="metric-info">
                <span className="metric-value">{(pokemon.height / 10).toFixed(1)} m</span>
                <span className="metric-label">Altura</span>
              </div>
            </div>
            <div className="metric-box">
              <Scale size={18} className="metric-icon" />
              <div className="metric-info">
                <span className="metric-value">{(pokemon.weight / 10).toFixed(1)} kg</span>
                <span className="metric-label">Peso</span>
              </div>
            </div>
            <div className="metric-box">
              <Flame size={18} className="metric-icon" />
              <div className="metric-info">
                <span className="metric-value">{pokemon.base_experience || '--'}</span>
                <span className="metric-label">Exp. Base</span>
              </div>
            </div>
          </div>

          {/* Habilidades */}
          <div className="abilities-section">
            <h4 className="section-title">Habilidades</h4>
            <div className="abilities-chips">
              {pokemon.abilities?.map((a) => (
                <span key={a.ability.name} className="ability-chip">
                  {capitalizeName(a.ability.name.replace('-', ' '))}
                  {a.is_hidden && <span className="hidden-tag">Oculta</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Barras de Estatísticas */}
          <div className="stats-section">
            <h4 className="section-title">Estatísticas Base</h4>
            <div className="stats-list">
              {pokemon.stats?.map((s) => {
                const label = STAT_NAMES_PT[s.stat.name] || s.stat.name;
                const value = s.base_stat;
                // Calculando porcentagem baseada em 200 como referência visual
                const percentage = Math.min(100, Math.round((value / 180) * 100));

                return (
                  <div key={s.stat.name} className="stat-row">
                    <span className="stat-label">{label}</span>
                    <span className="stat-number">{value}</span>
                    <div className="stat-bar-track">
                      <div 
                        className="stat-bar-fill"
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: themeColor 
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
