// Esquemas táticos reais do futebol mundial
// Cada formação define as posições disponíveis e suas coordenadas no campo

const POSITIONS = {
    goleiro:       { label: 'Goleiro', abbreviation: 'GOL', color: '#ffc107' },
    zagueiro:      { label: 'Zagueiro', abbreviation: 'ZAG', color: '#dc3545' },
    lateral:       { label: 'Lateral', abbreviation: 'LAT', color: '#fd7e14' },
    volante:       { label: 'Volante', abbreviation: 'VOL', color: '#6f42c1' },
    meia:          { label: 'Meia', abbreviation: 'MEI', color: '#0d6efd' },
    ponta:         { label: 'Ponta', abbreviation: 'PTA', color: '#20c997' },
    centroavante:  { label: 'Centroavante', abbreviation: 'CA', color: '#e91e63' },
};

const POSITION_KEYS = Object.keys(POSITIONS);

const FORMATIONS = {
    '4-4-2': {
        label: '4-4-2',
        description: 'Formação clássica equilibrada. Usada por times como o Atlético de Madrid de Simeone.',
        positionCounts: { goleiro: 1, zagueiro: 2, lateral: 2, volante: 2, meia: 2, ponta: 0, centroavante: 2 },
        // Coordenadas para visualização no campo (x%, y% do campo)
        playerPositions: [
            { position: 'goleiro', x: 50, y: 92 },
            { position: 'zagueiro', x: 35, y: 75 },
            { position: 'zagueiro', x: 65, y: 75 },
            { position: 'lateral', x: 10, y: 70 },
            { position: 'lateral', x: 90, y: 70 },
            { position: 'volante', x: 30, y: 52 },
            { position: 'volante', x: 70, y: 52 },
            { position: 'meia', x: 10, y: 45 },
            { position: 'meia', x: 90, y: 45 },
            { position: 'centroavante', x: 35, y: 20 },
            { position: 'centroavante', x: 65, y: 20 },
        ]
    },
    '4-3-3': {
        label: '4-3-3',
        description: 'Formação ofensiva com 3 atacantes. Marca do Barcelona de Guardiola e do Brasil de 1970.',
        positionCounts: { goleiro: 1, zagueiro: 2, lateral: 2, volante: 1, meia: 2, ponta: 2, centroavante: 1 },
        playerPositions: [
            { position: 'goleiro', x: 50, y: 92 },
            { position: 'zagueiro', x: 35, y: 75 },
            { position: 'zagueiro', x: 65, y: 75 },
            { position: 'lateral', x: 10, y: 70 },
            { position: 'lateral', x: 90, y: 70 },
            { position: 'volante', x: 50, y: 55 },
            { position: 'meia', x: 30, y: 45 },
            { position: 'meia', x: 70, y: 45 },
            { position: 'ponta', x: 15, y: 22 },
            { position: 'ponta', x: 85, y: 22 },
            { position: 'centroavante', x: 50, y: 15 },
        ]
    },
    '4-2-3-1': {
        label: '4-2-3-1',
        description: 'Formação moderna versátil. Usada pelo Real Madrid de Ancelotti e Alemanha campeã em 2014.',
        positionCounts: { goleiro: 1, zagueiro: 2, lateral: 2, volante: 2, meia: 3, ponta: 0, centroavante: 1 },
        playerPositions: [
            { position: 'goleiro', x: 50, y: 92 },
            { position: 'zagueiro', x: 35, y: 75 },
            { position: 'zagueiro', x: 65, y: 75 },
            { position: 'lateral', x: 10, y: 70 },
            { position: 'lateral', x: 90, y: 70 },
            { position: 'volante', x: 35, y: 55 },
            { position: 'volante', x: 65, y: 55 },
            { position: 'meia', x: 15, y: 38 },
            { position: 'meia', x: 50, y: 35 },
            { position: 'meia', x: 85, y: 38 },
            { position: 'centroavante', x: 50, y: 15 },
        ]
    },
    '3-5-2': {
        label: '3-5-2',
        description: 'Formação com 3 zagueiros e alas. Usada pela Itália campeã em 2006 e Inter de Conte.',
        positionCounts: { goleiro: 1, zagueiro: 3, lateral: 0, volante: 2, meia: 3, ponta: 0, centroavante: 2 },
        playerPositions: [
            { position: 'goleiro', x: 50, y: 92 },
            { position: 'zagueiro', x: 25, y: 75 },
            { position: 'zagueiro', x: 50, y: 78 },
            { position: 'zagueiro', x: 75, y: 75 },
            { position: 'meia', x: 8, y: 50 },
            { position: 'volante', x: 35, y: 55 },
            { position: 'volante', x: 65, y: 55 },
            { position: 'meia', x: 92, y: 50 },
            { position: 'meia', x: 50, y: 40 },
            { position: 'centroavante', x: 35, y: 18 },
            { position: 'centroavante', x: 65, y: 18 },
        ]
    },
    '4-1-4-1': {
        label: '4-1-4-1',
        description: 'Formação defensiva sólida com um volante. Usada pelo Chelsea de Mourinho.',
        positionCounts: { goleiro: 1, zagueiro: 2, lateral: 2, volante: 1, meia: 4, ponta: 0, centroavante: 1 },
        playerPositions: [
            { position: 'goleiro', x: 50, y: 92 },
            { position: 'zagueiro', x: 35, y: 75 },
            { position: 'zagueiro', x: 65, y: 75 },
            { position: 'lateral', x: 10, y: 70 },
            { position: 'lateral', x: 90, y: 70 },
            { position: 'volante', x: 50, y: 58 },
            { position: 'meia', x: 15, y: 42 },
            { position: 'meia', x: 40, y: 42 },
            { position: 'meia', x: 60, y: 42 },
            { position: 'meia', x: 85, y: 42 },
            { position: 'centroavante', x: 50, y: 15 },
        ]
    },
    '5-3-2': {
        label: '5-3-2 (3-1-4-2)',
        description: 'Formação ultra-defensiva com 5 na defesa. Variante usada por times que buscam solidez.',
        positionCounts: { goleiro: 1, zagueiro: 3, lateral: 2, volante: 1, meia: 2, ponta: 0, centroavante: 2 },
        playerPositions: [
            { position: 'goleiro', x: 50, y: 92 },
            { position: 'zagueiro', x: 25, y: 78 },
            { position: 'zagueiro', x: 50, y: 80 },
            { position: 'zagueiro', x: 75, y: 78 },
            { position: 'lateral', x: 8, y: 65 },
            { position: 'lateral', x: 92, y: 65 },
            { position: 'volante', x: 50, y: 55 },
            { position: 'meia', x: 30, y: 42 },
            { position: 'meia', x: 70, y: 42 },
            { position: 'centroavante', x: 35, y: 18 },
            { position: 'centroavante', x: 65, y: 18 },
        ]
    },
};

const FORMATION_KEYS = Object.keys(FORMATIONS);
