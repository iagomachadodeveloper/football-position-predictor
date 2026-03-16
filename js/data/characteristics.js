// Catálogo de características de jogadores de futebol
// Cada característica tem um key único, label em português e categoria

const CHARACTERISTICS = [
    // Físicas
    { key: 'velocidade', label: 'Velocidade', category: 'fisico', description: 'Capacidade de correr rápido' },
    { key: 'forca', label: 'Força Física', category: 'fisico', description: 'Potência muscular e resistência ao contato' },
    { key: 'resistencia', label: 'Resistência', category: 'fisico', description: 'Capacidade aeróbica para manter desempenho' },
    { key: 'altura', label: 'Altura', category: 'fisico', description: 'Estatura elevada, vantagem no jogo aéreo' },
    { key: 'agilidade', label: 'Agilidade', category: 'fisico', description: 'Mudança rápida de direção' },
    { key: 'reflexo', label: 'Reflexo', category: 'fisico', description: 'Tempo de reação rápido' },
    { key: 'explosao', label: 'Explosão Muscular', category: 'fisico', description: 'Aceleração e arranques curtos' },

    // Técnicas
    { key: 'passe_curto', label: 'Passe Curto', category: 'tecnico', description: 'Precisão em passes de curta distância' },
    { key: 'passe_longo', label: 'Passe Longo', category: 'tecnico', description: 'Precisão em lançamentos longos' },
    { key: 'finalizacao', label: 'Finalização', category: 'tecnico', description: 'Habilidade de chutar a gol com precisão' },
    { key: 'drible', label: 'Drible', category: 'tecnico', description: 'Capacidade de passar por adversários' },
    { key: 'cruzamento', label: 'Cruzamento', category: 'tecnico', description: 'Precisão ao cruzar bolas na área' },
    { key: 'cabeceio', label: 'Cabeceio', category: 'tecnico', description: 'Habilidade no jogo aéreo ofensivo e defensivo' },
    { key: 'primeiro_toque', label: 'Primeiro Toque', category: 'tecnico', description: 'Controle e domínio de bola' },
    { key: 'conducao', label: 'Condução de Bola', category: 'tecnico', description: 'Habilidade de conduzir em velocidade' },
    { key: 'defesa_com_pes', label: 'Defesa com os Pés', category: 'tecnico', description: 'Habilidade de defender usando os pés (goleiro)' },

    // Táticas
    { key: 'marcacao', label: 'Marcação', category: 'tatico', description: 'Capacidade de marcar e desarmar adversários' },
    { key: 'posicionamento_def', label: 'Posicionamento Defensivo', category: 'tatico', description: 'Leitura defensiva e cobertura' },
    { key: 'posicionamento_ofe', label: 'Posicionamento Ofensivo', category: 'tatico', description: 'Movimentação inteligente no ataque' },
    { key: 'saida_de_gol', label: 'Saída de Gol', category: 'tatico', description: 'Capacidade de sair do gol para interceptar' },
    { key: 'cobertura', label: 'Cobertura', category: 'tatico', description: 'Capacidade de cobrir espaços e companheiros' },

    // Mentais
    { key: 'visao_de_jogo', label: 'Visão de Jogo', category: 'mental', description: 'Capacidade de enxergar jogadas e espaços' },
    { key: 'raciocinio_rapido', label: 'Raciocínio Rápido', category: 'mental', description: 'Tomada de decisão veloz' },
    { key: 'lideranca', label: 'Liderança', category: 'mental', description: 'Capacidade de comandar e organizar o time' },
    { key: 'concentracao', label: 'Concentração', category: 'mental', description: 'Foco constante durante a partida' },
    { key: 'frieza', label: 'Frieza', category: 'mental', description: 'Calma sob pressão em momentos decisivos' },
];

const CHARACTERISTIC_CATEGORIES = {
    fisico: { label: 'Físicas', icon: 'bi-lightning-charge' },
    tecnico: { label: 'Técnicas', icon: 'bi-bullseye' },
    tatico: { label: 'Táticas', icon: 'bi-diagram-3' },
    mental: { label: 'Mentais', icon: 'bi-brain' },
};
