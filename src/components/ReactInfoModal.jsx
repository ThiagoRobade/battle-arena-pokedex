import React from 'react';
import { X, Code2, Layers, Cpu, Globe, Sparkles } from 'lucide-react';

// Componente educativo que explica os conceitos de React empregados no projeto
export function ReactInfoModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-card react-info-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} title="Fechar modal">
          <X size={20} />
        </button>

        <div className="react-info-header">
          <Code2 size={32} className="react-info-icon" />
          <div>
            <h2>Guia Prático de React</h2>
            <p>Conceitos aplicados no desenvolvimento desta Pokédex</p>
          </div>
        </div>

        <div className="react-info-body">
          <div className="concept-card">
            <div className="concept-title">
              <Layers size={20} />
              <h3>1. Componentização</h3>
            </div>
            <p>
              A aplicação é dividida em partes reutilizáveis e independentes (<code>Pokedex</code>, <code>PokemonCard</code>, <code>SearchBar</code>, <code>PokemonModal</code>, etc.), facilitando a manutenção e o reaproveitamento de código.
            </p>
          </div>

          <div className="concept-card">
            <div className="concept-title">
              <Cpu size={20} />
              <h3>2. Props (Propriedades)</h3>
            </div>
            <p>
              Os dados de cada Pokémon são transmitidos do componente pai (<code>Pokedex</code>) para o componente filho (<code>PokemonCard</code>) através de props (ex: <code>pokemon</code> e <code>onSelectPokemon</code>).
            </p>
          </div>

          <div className="concept-card">
            <div className="concept-title">
              <Sparkles size={20} />
              <h3>3. useState (Gerenciamento de Estado)</h3>
            </div>
            <p>
              Utilizado para controlar estados dinâmicos como a lista de Pokémons (<code>pokemons</code>), o texto digitado na busca (<code>searchTerm</code>), o estado de carregamento (<code>loading</code>) e o Pokémon selecionado no modal.
            </p>
          </div>

          <div className="concept-card">
            <div className="concept-title">
              <Globe size={20} />
              <h3>4. useEffect & fetch (Efeitos e API)</h3>
            </div>
            <p>
              O Hook <code>useEffect</code> executa a requisição assíncrona com <code>fetch</code> ao carregar a página para buscar a lista de Pokémons no endpoint <code>https://pokeapi.co/api/v2/pokemon?limit=20</code> e detalhar cada Pokémon individualmente.
            </p>
          </div>
        </div>

        <div className="react-info-footer">
          <button className="confirm-btn" onClick={onClose}>
            Entendi! Voltar para a Pokédex
          </button>
        </div>
      </div>
    </div>
  );
}
