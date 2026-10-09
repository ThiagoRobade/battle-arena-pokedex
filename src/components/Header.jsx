import React from 'react';
import { Swords, BookOpen } from 'lucide-react';

// Componente de Cabeçalho estilo Pokédex com navegação entre Coleção e Batalha
export function Header({ activeTab, onTabChange }) {
  return (
    <header className="pokedex-header">
      <div className="header-container">
        {/* Elemento de iluminação LED característico da Pokédex */}
        <div className="pokedex-camera-container">
          <div className="pokedex-lens-outer">
            <div className="pokedex-lens-inner">
              <div className="lens-reflection"></div>
            </div>
          </div>
          <div className="pokedex-leds">
            <span className="led led-red" title="Energia"></span>
            <span className="led led-yellow" title="Conexão API"></span>
            <span className="led led-green" title="Pronto para Batalha"></span>
          </div>
        </div>

        {/* Título da Pokédex */}
        <div className="header-title-section">
          <div className="title-wrapper">
            <h1 className="pokedex-title">Pokédex</h1>
            <span className="version-badge">40 Pokémons</span>
          </div>
        </div>

        {/* Abas de Navegação: Coleção vs Arena de Batalha */}
        <div className="header-tabs">
          <button 
            className={`tab-btn ${activeTab === 'pokedex' ? 'active' : ''}`}
            onClick={() => onTabChange('pokedex')}
          >
            <BookOpen size={18} />
            <span>Coleção</span>
          </button>
          <button 
            className={`tab-btn battle-tab-btn ${activeTab === 'battle' ? 'active' : ''}`}
            onClick={() => onTabChange('battle')}
          >
            <Swords size={18} />
            <span>Arena de Batalha</span>
          </button>
        </div>
      </div>
    </header>
  );
}
