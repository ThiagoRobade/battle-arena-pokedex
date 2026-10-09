import React, { useState, useEffect } from 'react';
import { TYPE_COLORS, TYPE_NAMES_PT, capitalizeName, formatPokemonId } from '../utils/pokemonTypes';
import { Swords, RefreshCw, Trophy, ShieldAlert, Zap, Heart, Sparkles, Check, X } from 'lucide-react';

// Tabela simples de vantagens de tipo para o cálculo de dano na batalha
const TYPE_ADVANTAGES = {
  fire: ['grass', 'ice', 'bug', 'steel'],
  water: ['fire', 'ground', 'rock'],
  grass: ['water', 'ground', 'rock'],
  electric: ['water', 'flying'],
  ice: ['grass', 'ground', 'flying', 'dragon'],
  fighting: ['normal', 'ice', 'rock', 'dark', 'steel'],
  poison: ['grass', 'fairy'],
  ground: ['fire', 'electric', 'poison', 'rock', 'steel'],
  flying: ['grass', 'fighting', 'bug'],
  psychic: ['fighting', 'poison'],
  bug: ['grass', 'psychic', 'dark'],
  rock: ['fire', 'ice', 'flying', 'bug'],
  ghost: ['psychic', 'ghost'],
  dragon: ['dragon'],
  steel: ['ice', 'rock', 'fairy'],
  fairy: ['fighting', 'dragon', 'dark']
};

// Componente da Arena de Batalha no formato de Pokédex Física Retro
export function BattleArena({ pokemons, initialPokemon, onSelectOtherPokemon }) {
  // Estado para o Pokémon do Jogador
  const [playerPokemon, setPlayerPokemon] = useState(null);
  
  // Estado para o Pokémon da Máquina (CPU)
  const [cpuPokemon, setCpuPokemon] = useState(null);

  // Estados de Vida (HP) na Batalha
  const [playerHp, setPlayerHp] = useState(100);
  const [maxPlayerHp, setMaxPlayerHp] = useState(100);
  const [cpuHp, setCpuHp] = useState(100);
  const [maxCpuHp, setMaxCpuHp] = useState(100);

  // Estado do turno e logs de mensagem no visor retro LCD
  const [battleLog, setBattleLog] = useState('Escolha seu Pokémon e inicie o duelo!');
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [battleState, setBattleState] = useState('selection'); // 'selection', 'fighting', 'victory', 'defeat'
  const [attackAnimation, setAttackAnimation] = useState(null); // 'player-attack', 'cpu-attack', null

  // Inicializa o duelo com o Pokémon selecionado ou escolhe aleatórios
  useEffect(() => {
    if (pokemons.length > 0) {
      const defaultPlayer = initialPokemon || pokemons[0];
      setupBattle(defaultPlayer);
    }
  }, [pokemons, initialPokemon]);

  // Configura um novo duelo sorteando um oponente para a máquina
  const setupBattle = (selectedPlayer) => {
    setPlayerPokemon(selectedPlayer);
    
    // Filtra para que a CPU não escolha o mesmo Pokémon do jogador
    const availableOpponents = pokemons.filter(p => p.id !== selectedPlayer.id);
    const randomCpu = availableOpponents[Math.floor(Math.random() * availableOpponents.length)] || pokemons[1];
    setCpuPokemon(randomCpu);

    // Calcula HP base com base nos atributos do Pokémon
    const playerBaseHp = selectedPlayer.stats?.find(s => s.stat.name === 'hp')?.base_stat || 80;
    const cpuBaseHp = randomCpu.stats?.find(s => s.stat.name === 'hp')?.base_stat || 80;

    const pMax = playerBaseHp * 2 + 50;
    const cMax = cpuBaseHp * 2 + 50;

    setPlayerHp(pMax);
    setMaxPlayerHp(pMax);
    setCpuHp(cMax);
    setMaxCpuHp(cMax);

    setBattleState('fighting');
    setIsPlayerTurn(true);
    setBattleLog(`Duelo iniciado! ${capitalizeName(selectedPlayer.name)} VS ${capitalizeName(randomCpu.name)}!`);
  };

  // Sortear outro oponente para a máquina
  const handleRerollCpu = () => {
    if (!playerPokemon) return;
    setupBattle(playerPokemon);
  };

  // Trocar o Pokémon do jogador
  const handleSelectPlayerPokemon = (e) => {
    const selectedId = Number(e.target.value);
    const found = pokemons.find(p => p.id === selectedId);
    if (found) {
      setupBattle(found);
    }
  };

  // Executa uma rodada de ataque do jogador
  const handleExecuteAttack = (moveType = 'normal') => {
    if (battleState !== 'fighting' || !isPlayerTurn || !playerPokemon || !cpuPokemon) return;

    // Desabilita comandos durante a animação
    setIsPlayerTurn(false);
    setAttackAnimation('player-attack');

    // Atributos de ataque e defesa
    const pAttack = playerPokemon.stats?.find(s => s.stat.name === 'attack')?.base_stat || 50;
    const cDefense = cpuPokemon.stats?.find(s => s.stat.name === 'defense')?.base_stat || 50;

    const pType = playerPokemon.types[0]?.type.name || 'normal';
    const cType = cpuPokemon.types[0]?.type.name || 'normal';

    // Verificação de vantagem de tipo
    let multiplier = 1.0;
    let effectMessage = '';

    if (TYPE_ADVANTAGES[pType]?.includes(cType)) {
      multiplier = 1.5;
      effectMessage = ' É SUPER EFETIVO!';
    }

    // Cálculo do dano
    const baseDamage = moveType === 'special' ? (pAttack * 1.3) : pAttack;
    const calculatedDamage = Math.max(8, Math.round(((baseDamage / (cDefense * 0.5)) * 12 * multiplier)));

    setTimeout(() => {
      setAttackAnimation(null);
      const newCpuHp = Math.max(0, cpuHp - calculatedDamage);
      setCpuHp(newCpuHp);

      const moveName = moveType === 'special' ? 'Ataque Especial!' : 'Ataque Rápido!';
      setBattleLog(`${capitalizeName(playerPokemon.name)} usou ${moveName} Causou ${calculatedDamage} de dano!${effectMessage}`);

      // Checa se a CPU foi derrotada
      if (newCpuHp <= 0) {
        setBattleState('victory');
        setBattleLog(`🎉 VITÓRIA! ${capitalizeName(cpuPokemon.name)} foi derrotado!`);
        return;
      }

      // Turno da CPU após 1.5 segundos
      setTimeout(() => {
        executeCpuTurn(newCpuHp);
      }, 1500);

    }, 600);
  };

  // Turno da máquina (CPU)
  const executeCpuTurn = (currentCpuHp) => {
    if (currentCpuHp <= 0) return;

    setAttackAnimation('cpu-attack');
    const cAttack = cpuPokemon.stats?.find(s => s.stat.name === 'attack')?.base_stat || 50;
    const pDefense = playerPokemon.stats?.find(s => s.stat.name === 'defense')?.base_stat || 50;

    const cType = cpuPokemon.types[0]?.type.name || 'normal';
    const pType = playerPokemon.types[0]?.type.name || 'normal';

    let multiplier = 1.0;
    let effectMessage = '';

    if (TYPE_ADVANTAGES[cType]?.includes(pType)) {
      multiplier = 1.5;
      effectMessage = ' Ataque super efetivo!';
    }

    const calculatedDamage = Math.max(8, Math.round(((cAttack / (pDefense * 0.5)) * 10 * multiplier)));

    setTimeout(() => {
      setAttackAnimation(null);
      setPlayerHp(prevHp => {
        const newHp = Math.max(0, prevHp - calculatedDamage);
        if (newHp <= 0) {
          setBattleState('defeat');
          setBattleLog(`💥 DERROTA! ${capitalizeName(playerPokemon.name)} faliu em combate!`);
        } else {
          setBattleLog(`${capitalizeName(cpuPokemon.name)} contra-atacou! Causou ${calculatedDamage} de dano!${effectMessage}`);
          setIsPlayerTurn(true);
        }
        return newHp;
      });
    }, 600);
  };

  if (!playerPokemon || !cpuPokemon) {
    return <div className="battle-loading">Carregando Arena de Batalha...</div>;
  }

  const pTypeColor = TYPE_COLORS[playerPokemon.types[0]?.type.name] || '#777';
  const cTypeColor = TYPE_COLORS[cpuPokemon.types[0]?.type.name] || '#777';

  return (
    <div className="battle-arena-wrapper">
      {/* Moldura de Pokédex Retro baseada na imagem enviada */}
      <div className="pokedex-retro-frame">
        {/* Topo com Lente de LED Cyan grande e Logo Pokébola */}
        <div className="retro-top-bar">
          <div className="retro-big-lens">
            <div className="lens-shiny-glint"></div>
          </div>
          <div className="retro-title-area">
            <span className="retro-brand-title">POKÉDEX ARENA</span>
            <div className="pokeball-emblem">
              <div className="pokeball-half-top"></div>
              <div className="pokeball-center-btn"></div>
            </div>
          </div>
        </div>

        {/* Visor / Tela Principal de Batalha */}
        <div className="retro-screen-bezel">
          <div className="battle-field-screen">
            {/* Oponente (CPU) - Canto Superior Direito */}
            <div className={`pokemon-fighter cpu-fighter ${attackAnimation === 'cpu-attack' ? 'attacking' : ''}`}>
              <div className="fighter-status-card">
                <div className="status-name-row">
                  <span className="fighter-name">{capitalizeName(cpuPokemon.name)}</span>
                  <span className="fighter-level">Nv. 50</span>
                </div>
                <div className="hp-bar-container">
                  <span className="hp-label">HP</span>
                  <div className="hp-bar-track">
                    <div 
                      className="hp-bar-fill"
                      style={{ 
                        width: `${Math.round((cpuHp / maxCpuHp) * 100)}%`,
                        backgroundColor: (cpuHp / maxCpuHp) > 0.5 ? '#4CAF50' : (cpuHp / maxCpuHp) > 0.2 ? '#FFC107' : '#F44336'
                      }}
                    ></div>
                  </div>
                </div>
                <span className="hp-numeric">{cpuHp}/{maxCpuHp} HP</span>
              </div>
              <div className="sprite-platform">
                <img 
                  src={cpuPokemon.sprites?.other?.['official-artwork']?.front_default || cpuPokemon.sprites?.front_default} 
                  alt={cpuPokemon.name} 
                  className={`fighter-sprite ${attackAnimation === 'player-attack' ? 'take-hit' : ''}`}
                />
              </div>
            </div>

            {/* Divisória central de duelo */}
            <div className="vs-badge-overlay">VS</div>

            {/* Jogador (Player) - Canto Inferior Esquerdo */}
            <div className={`pokemon-fighter player-fighter ${attackAnimation === 'player-attack' ? 'attacking' : ''}`}>
              <div className="sprite-platform">
                <img 
                  src={playerPokemon.sprites?.other?.['official-artwork']?.front_default || playerPokemon.sprites?.front_default} 
                  alt={playerPokemon.name} 
                  className={`fighter-sprite ${attackAnimation === 'cpu-attack' ? 'take-hit' : ''}`}
                />
              </div>
              <div className="fighter-status-card">
                <div className="status-name-row">
                  <span className="fighter-name">{capitalizeName(playerPokemon.name)}</span>
                  <span className="fighter-level">Nv. 50</span>
                </div>
                <div className="hp-bar-container">
                  <span className="hp-label">HP</span>
                  <div className="hp-bar-track">
                    <div 
                      className="hp-bar-fill"
                      style={{ 
                        width: `${Math.round((playerHp / maxPlayerHp) * 100)}%`,
                        backgroundColor: (playerHp / maxPlayerHp) > 0.5 ? '#4CAF50' : (playerHp / maxPlayerHp) > 0.2 ? '#FFC107' : '#F44336'
                      }}
                    ></div>
                  </div>
                </div>
                <span className="hp-numeric">{playerHp}/{maxPlayerHp} HP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Painel Inferior de Controles e Visor LCD Verde no estilo Game Boy */}
        <div className="retro-controls-panel">
          {/* Faixa Superior de Nomes e Tipos */}
          <div className="retro-info-strip">
            <div className="strip-item">
              <span className="strip-label">SEU POKÉMON:</span>
              <strong style={{ color: pTypeColor }}>{capitalizeName(playerPokemon.name)}</strong>
            </div>
            <div className="strip-item">
              <span className="strip-label">OPONENTE:</span>
              <strong style={{ color: cTypeColor }}>{capitalizeName(cpuPokemon.name)}</strong>
            </div>
          </div>

          {/* Área de Comandos com D-Pad, Visor LCD Verde e Botões X / Check */}
          <div className="retro-dashboard-row">
            {/* D-Pad Direcional */}
            <div className="d-pad-container">
              <div className="d-pad">
                <div className="d-pad-up"></div>
                <div className="d-pad-left"></div>
                <div className="d-pad-center"></div>
                <div className="d-pad-right"></div>
                <div className="d-pad-down"></div>
              </div>
            </div>

            {/* Visor Retro LCD Verde com Texto em Fonte Pixel de Game Boy */}
            <div className="retro-lcd-visor">
              <p className="lcd-text">{battleLog}</p>
            </div>

            {/* Botões Ação Vermelho (X) e Verde (Check) */}
            <div className="retro-action-buttons">
              <button 
                className="retro-btn btn-red"
                onClick={handleRerollCpu}
                title="Novo Oponente (Reiniciar)"
              >
                <X size={18} />
              </button>
              <button 
                className="retro-btn btn-green"
                onClick={() => handleExecuteAttack('normal')}
                disabled={!isPlayerTurn || battleState !== 'fighting'}
                title="Executar Ataque"
              >
                <Check size={18} />
              </button>
            </div>
          </div>

          {/* Menu de Seleção de Ataques e Troca de Pokémon */}
          <div className="battle-action-bar">
            <div className="select-pokemon-selector">
              <label>Escolher Pokémon:</label>
              <select 
                value={playerPokemon.id} 
                onChange={handleSelectPlayerPokemon}
                className="pokemon-dropdown"
              >
                {pokemons.map(p => (
                  <option key={p.id} value={p.id}>
                    {formatPokemonId(p.id)} - {capitalizeName(p.name)}
                  </option>
                ))}
              </select>
            </div>

            <div className="attack-buttons-group">
              <button 
                className="attack-btn btn-attack-normal"
                onClick={() => handleExecuteAttack('normal')}
                disabled={!isPlayerTurn || battleState !== 'fighting'}
              >
                <Zap size={16} /> Ataque Rápido
              </button>

              <button 
                className="attack-btn btn-attack-special"
                onClick={() => handleExecuteAttack('special')}
                disabled={!isPlayerTurn || battleState !== 'fighting'}
              >
                <Sparkles size={16} /> Ataque Especial
              </button>

              <button 
                className="attack-btn btn-rematch"
                onClick={() => setupBattle(playerPokemon)}
              >
                <RefreshCw size={16} /> Nova Batalha
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
