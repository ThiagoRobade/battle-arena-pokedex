import React, { useState, useEffect } from 'react';
import { PokemonCard } from './PokemonCard';
import { SearchBar } from './SearchBar';
import { TypeFilter } from './TypeFilter';
import { PokemonModal } from './PokemonModal';
import { LoadingSkeleton } from './LoadingSkeleton';
import { Header } from './Header';
import { BattleArena } from './BattleArena';
import { AlertCircle, RefreshCw, Frown, Swords } from 'lucide-react';

// Componente principal Pokedex que gerencia a lista de Pokémons e a navegação da aplicação
export function Pokedex() {
  // Estado para armazenar a lista completa de Pokémons (40 Pokémons)
  const [pokemons, setPokemons] = useState([]);
  
  // Estado para a aba ativa: 'pokedex' (coleção) ou 'battle' (arena de batalha)
  const [activeTab, setActiveTab] = useState('pokedex');

  // Estado para o termo de busca no filtro de nomes
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado para o tipo selecionado no filtro por categoria
  const [selectedType, setSelectedType] = useState('todos');

  // Estado para controlar o carregamento da API
  const [loading, setLoading] = useState(true);

  // Estado para controlar erros de conexão
  const [error, setError] = useState(null);

  // Estado para armazenar o Pokémon selecionado para o modal de detalhes
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Estado para o Pokémon selecionado para duelar na batalha
  const [battlePokemon, setBattlePokemon] = useState(null);

  // Função assíncrona responsável por carregar 40 Pokémons da PokeAPI
  const fetchPokemons = async () => {
    try {
      setLoading(true);
      setError(null);

      // Requisição à PokeAPI para obter os primeiros 40 Pokémons
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=40');
      
      if (!response.ok) {
        throw new Error('Falha ao conectar com a PokeAPI. Tente novamente.');
      }

      const data = await response.json();

      // Busca os detalhes individuais de cada um dos 40 Pokémons em paralelo
      const detailedPromises = data.results.map(async (item) => {
        const detailRes = await fetch(item.url);
        if (!detailRes.ok) {
          throw new Error(`Erro ao carregar detalhes de ${item.name}`);
        }
        return await detailRes.json();
      });

      const detailedPokemons = await Promise.all(detailedPromises);

      setPokemons(detailedPokemons);
      if (detailedPokemons.length > 0) {
        setBattlePokemon(detailedPokemons[0]);
      }
    } catch (err) {
      console.error('Erro ao consultar a PokeAPI:', err);
      setError(err.message || 'Erro ao carregar os Pokémons.');
    } finally {
      setLoading(false);
    }
  };

  // Carrega a lista de Pokémons na montagem do componente (useEffect)
  useEffect(() => {
    fetchPokemons();
  }, []);

  // Extrai lista única de tipos disponíveis entre os 40 Pokémons
  const availableTypes = Array.from(
    new Set(
      pokemons.flatMap((p) => p.types.map((t) => t.type.name))
    )
  );

  // Filtra os Pokémons pelo nome e pelo tipo selecionado
  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesName = pokemon.name
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    const matchesType =
      selectedType === 'todos' ||
      pokemon.types.some((t) => t.type.name === selectedType);

    return matchesName && matchesType;
  });

  // Inicia o duelo abrindo a arena de batalha com o Pokémon escolhido
  const handleStartBattle = (pokemon) => {
    setBattlePokemon(pokemon);
    setActiveTab('battle');
  };

  return (
    <div className="pokedex-app">
      {/* Cabeçalho com trocador de abas: Coleção vs Arena de Batalha */}
      <Header 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Conteúdo Principal */}
      <main className="pokedex-main">
        {/* Renderização da Aba de Batalha */}
        {activeTab === 'battle' ? (
          <BattleArena 
            pokemons={pokemons}
            initialPokemon={battlePokemon}
          />
        ) : (
          /* Renderização da Aba da Pokédex (Coleção de Pokémons) */
          <>
            <section className="controls-section">
              <SearchBar 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                totalCount={pokemons.length}
                filteredCount={filteredPokemons.length}
              />

              {!loading && !error && availableTypes.length > 0 && (
                <TypeFilter 
                  selectedType={selectedType}
                  onSelectType={setSelectedType}
                  availableTypes={availableTypes}
                />
              )}
            </section>

            {/* Estado de Carregamento */}
            {loading && (
              <div className="loading-container">
                <div className="loading-banner">
                  <div className="pokeball-spinner"></div>
                  <p>Carregando 40 Pokémons da PokeAPI...</p>
                </div>
                <LoadingSkeleton count={16} />
              </div>
            )}

            {/* Estado de Erro */}
            {!loading && error && (
              <div className="error-card">
                <AlertCircle size={48} className="error-icon" />
                <h3>Erro ao carregar a Pokédex</h3>
                <p>{error}</p>
                <button className="retry-btn" onClick={fetchPokemons}>
                  <RefreshCw size={18} /> Tentar Novamente
                </button>
              </div>
            )}

            {/* Grid com 40 Cards de Pokémons */}
            {!loading && !error && (
              <>
                {filteredPokemons.length > 0 ? (
                  <div className="pokemon-grid">
                    {filteredPokemons.map((pokemon) => (
                      <div key={pokemon.id} className="card-wrapper">
                        <PokemonCard 
                          pokemon={pokemon}
                          onSelectPokemon={setSelectedPokemon}
                        />
                        <button 
                          className="quick-battle-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartBattle(pokemon);
                          }}
                          title="Duelar com este Pokémon"
                        >
                          <Swords size={14} /> Duelar com Este
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-results">
                    <Frown size={48} />
                    <h3>Nenhum Pokémon encontrado</h3>
                    <p>Nenhum resultado para "<strong>{searchTerm}</strong>".</p>
                    <button 
                      className="reset-filters-btn"
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedType('todos');
                      }}
                    >
                      Limpar Filtros
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>

      {/* Modal de Detalhes do Pokémon */}
      {selectedPokemon && (
        <PokemonModal 
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}

      {/* Rodapé com o nome do desenvolvedor Thiago Robade */}
      <footer className="pokedex-footer">
        <p>
          Pokédex & Arena de Batalha — Desenvolvido por <strong>Thiago Robade</strong>
        </p>
        <span className="footer-tag">Dados fornecidos pela PokeAPI</span>
      </footer>
    </div>
  );
}
