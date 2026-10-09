# 🔴 Pokédex & Arena de Batalha em React ⚡

Uma aplicação web moderna e interativa que consome a [PokeAPI](https://pokeapi.co/) para exibir uma Pokédex com 40 Pokémons e simular batalhas em um console retro inspirado no Game Boy / Pokédex física.

🔗 **Link da Aplicação no GitHub Pages**:  
👉 **[https://thiagorobade.github.io/battle-arena-pokedex/](https://thiagorobade.github.io/battle-arena-pokedex/)**

---

## 🎓 Informações Acadêmicas

- **Aluno / Desenvolvedor**: Thiago Robade
- **Curso**: Engenharia de Software
- **Instituição**: Faculdade Estácio
- **Disciplina**: Desenvolvimento de Front-end

---

## 📌 Sobre o Trabalho

Este projeto foi desenvolvido como atividade prática para a disciplina de **Desenvolvimento de Front-end** do curso de **Engenharia de Software da Faculdade Estácio**. O objetivo principal é demonstrar o domínio de conceitos fundamentais da biblioteca **React**, além do consumo de APIs REST assíncronas e estilização CSS responsiva.

### 🎯 Principais Funcionalidades

1. **Coleção Pokédex (40 Pokémons)**:
   - Carregamento inicial assíncrono via `useEffect` e `fetch`.
   - Busca de dados detalhados (sprites em alta definição, tipos, estatísticas de vida, ataque, defesa e habilidades).
   - Campo de busca em tempo real por nome do Pokémon (`useState`).
   - Filtros rápidos por tipos de Pokémons (Fogo, Água, Planta, Elétrico, etc.).
   - Card individual para cada Pokémon com badges coloridas e atalho rápido para duelo.

2. **Modal Interativo de Detalhes**:
   - Exibição de estatísticas físicas (altura, peso, experiência base).
   - Barras de atributos com progresso.
   - Alternância de visualização de sprites: Arte Oficial, Frente, Costas e **Versão Shiny ✨**.

3. **Arena de Batalha (Duelo contra CPU)**:
   - Moldura inspirada no console físico da Pokédex clássica.
   - **Visor LCD Verde estilo Game Boy** com texto em fonte pixelada (`Press Start 2P`) exibindo relatos de cada turno.
   - **Botões Físicos**: D-Pad direcional, botão vermelho (X) para trocar oponente e botão verde (✓) para atacar.
   - Seleção do Pokémon do jogador e sorteio aleatório de oponente pela máquina.
   - Sistema de cálculo de dano baseado em estatísticas de ataque/defesa e **vantagem de tipos** (ex: Fogo vence Planta, Água vence Fogo).
   - Animações de ataque e impacto de dano.

---

## 🛠️ Tecnologias Utilizadas

- **React 19** (Componentes Funcionais, Hooks: `useState`, `useEffect`)
- **Vite** (Build Tool e Dev Server ultrarrápido)
- **PokeAPI** (API REST pública para dados de Pokémon)
- **Vanilla CSS3** (Design responsivo, variáveis CSS, animações keyframes)
- **Lucide React** (Ícones vetoriais modernos)
- **GitHub Pages & GitHub Actions** (Deploy contínuo e hospedagem estática)

---

## 📁 Estrutura de Componentes

```text
src/
 ├── components/
 │    ├── Pokedex.jsx          # Componente principal (Gerencia lista de 40 Pokémons e abas)
 │    ├── PokemonCard.jsx      # Componente filho reutilizável para cada card
 │    ├── BattleArena.jsx      # Arena de Batalha no formato de Pokédex física
 │    ├── PokemonModal.jsx      # Modal com detalhes completos e trocador de sprites
 │    ├── SearchBar.jsx        # Campo de busca por nome com contador
 │    ├── TypeFilter.jsx       # Filtro por tipo de Pokémon
 │    ├── Header.jsx           # Cabeçalho no estilo Pokédex com LED animado
 │    └── LoadingSkeleton.jsx  # Tela de carregamento animada
 ├── utils/
 │    └── pokemonTypes.js      # Mapeamento de cores, traduções PT-BR e utilitários
 ├── App.jsx                   # Renderização raiz do aplicativo
 ├── App.css                   # Estilização completa e temas da Pokédex
 └── index.css                 # Configurações globais e fontes do Google
```

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **npm** (gerenciador de pacotes)

### Passos para execução:

1. **Clonar o repositório**:
   ```bash
   git clone https://github.com/ThiagoRobade/battle-arena-pokedex.git
   ```

2. **Acessar a pasta do projeto**:
   ```bash
   cd battle-arena-pokedex
   ```

3. **Instalar as dependências**:
   ```bash
   npm install
   ```

4. **Executar o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

5. **Acessar no navegador**:
   Abra o endereço [http://localhost:5173/](http://localhost:5173/) no seu navegador.

---

## 📦 Como Fazer o Deploy no GitHub Pages

Para publicar atualizações no GitHub Pages:

```bash
npm run deploy
```

O comando irá automaticamente compilar o projeto (`npm run build`) e enviar os arquivos para a branch `gh-pages` no GitHub.

---

## 📝 Licença

Projeto desenvolvido para fins educacionais como parte do curso de Engenharia de Software da Faculdade Estácio.
