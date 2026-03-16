// Dados de treinamento baseados em conhecimento real de futebol
// Cada amostra mapeia características + formação → posição ideal
//
// Os perfis são inspirados em jogadores reais e suas posições:
// - Goleiro: Neuer, Alisson, Courtois
// - Zagueiro: Sergio Ramos, Van Dijk, Thiago Silva
// - Lateral: Daniel Alves, Marcelo, TAA, Robertson
// - Volante: Casemiro, Kanté, Busquets
// - Meia: Modric, De Bruyne, Iniesta, Zidane
// - Ponta: Mbappé, Salah, Neymar, Vinicius Jr
// - Centroavante: Lewandowski, Haaland, Benzema, Suárez

// Templates base para cada posição com variações realistas
const POSITION_TEMPLATES = {
    goleiro: [
        ['reflexo', 'altura', 'concentracao', 'defesa_com_pes', 'saida_de_gol'],
        ['reflexo', 'altura', 'lideranca', 'posicionamento_def', 'concentracao'],
        ['reflexo', 'defesa_com_pes', 'saida_de_gol', 'passe_curto', 'frieza'],
        ['reflexo', 'altura', 'forca', 'concentracao', 'saida_de_gol', 'lideranca'],
        ['reflexo', 'agilidade', 'defesa_com_pes', 'posicionamento_def', 'frieza'],
        ['reflexo', 'altura', 'forca', 'saida_de_gol', 'passe_longo', 'concentracao'],
        ['reflexo', 'concentracao', 'lideranca', 'defesa_com_pes', 'frieza', 'altura'],
        ['reflexo', 'agilidade', 'explosao', 'defesa_com_pes', 'saida_de_gol'],
    ],
    zagueiro: [
        ['forca', 'altura', 'cabeceio', 'marcacao', 'posicionamento_def'],
        ['forca', 'marcacao', 'posicionamento_def', 'lideranca', 'cabeceio'],
        ['altura', 'cabeceio', 'marcacao', 'cobertura', 'passe_curto'],
        ['forca', 'altura', 'marcacao', 'posicionamento_def', 'concentracao'],
        ['velocidade', 'marcacao', 'posicionamento_def', 'cobertura', 'passe_longo'],
        ['forca', 'cabeceio', 'lideranca', 'marcacao', 'posicionamento_def', 'frieza'],
        ['altura', 'forca', 'marcacao', 'cobertura', 'raciocinio_rapido'],
        ['forca', 'posicionamento_def', 'passe_curto', 'marcacao', 'lideranca', 'cabeceio'],
        ['velocidade', 'forca', 'marcacao', 'posicionamento_def', 'cobertura'],
        ['altura', 'cabeceio', 'forca', 'concentracao', 'posicionamento_def', 'marcacao'],
    ],
    lateral: [
        ['velocidade', 'resistencia', 'cruzamento', 'marcacao', 'agilidade'],
        ['velocidade', 'cruzamento', 'drible', 'resistencia', 'passe_curto'],
        ['velocidade', 'resistencia', 'marcacao', 'cobertura', 'cruzamento'],
        ['explosao', 'cruzamento', 'drible', 'velocidade', 'resistencia'],
        ['velocidade', 'resistencia', 'cruzamento', 'posicionamento_def', 'passe_curto'],
        ['agilidade', 'velocidade', 'cruzamento', 'marcacao', 'resistencia', 'conducao'],
        ['velocidade', 'drible', 'cruzamento', 'resistencia', 'posicionamento_ofe'],
        ['velocidade', 'resistencia', 'cobertura', 'cruzamento', 'marcacao', 'passe_curto'],
    ],
    volante: [
        ['forca', 'marcacao', 'posicionamento_def', 'passe_curto', 'raciocinio_rapido'],
        ['marcacao', 'resistencia', 'cobertura', 'passe_curto', 'forca'],
        ['forca', 'marcacao', 'raciocinio_rapido', 'posicionamento_def', 'lideranca'],
        ['resistencia', 'marcacao', 'passe_curto', 'cobertura', 'concentracao'],
        ['forca', 'marcacao', 'passe_longo', 'posicionamento_def', 'raciocinio_rapido'],
        ['marcacao', 'posicionamento_def', 'cobertura', 'resistencia', 'forca', 'lideranca'],
        ['forca', 'resistencia', 'marcacao', 'passe_curto', 'posicionamento_def', 'cabeceio'],
        ['marcacao', 'raciocinio_rapido', 'cobertura', 'passe_curto', 'forca', 'concentracao'],
        ['forca', 'explosao', 'marcacao', 'posicionamento_def', 'resistencia'],
    ],
    meia: [
        ['visao_de_jogo', 'passe_curto', 'raciocinio_rapido', 'primeiro_toque', 'drible'],
        ['visao_de_jogo', 'passe_longo', 'raciocinio_rapido', 'finalizacao', 'passe_curto'],
        ['passe_curto', 'visao_de_jogo', 'conducao', 'raciocinio_rapido', 'primeiro_toque'],
        ['visao_de_jogo', 'passe_curto', 'passe_longo', 'lideranca', 'raciocinio_rapido'],
        ['drible', 'passe_curto', 'visao_de_jogo', 'finalizacao', 'raciocinio_rapido'],
        ['visao_de_jogo', 'raciocinio_rapido', 'passe_curto', 'primeiro_toque', 'resistencia'],
        ['passe_longo', 'visao_de_jogo', 'raciocinio_rapido', 'passe_curto', 'lideranca', 'frieza'],
        ['visao_de_jogo', 'drible', 'passe_curto', 'primeiro_toque', 'posicionamento_ofe'],
        ['raciocinio_rapido', 'visao_de_jogo', 'passe_curto', 'conducao', 'finalizacao'],
        ['visao_de_jogo', 'passe_curto', 'raciocinio_rapido', 'concentracao', 'primeiro_toque', 'drible'],
    ],
    ponta: [
        ['velocidade', 'drible', 'finalizacao', 'agilidade', 'explosao'],
        ['velocidade', 'drible', 'cruzamento', 'agilidade', 'conducao'],
        ['velocidade', 'finalizacao', 'drible', 'posicionamento_ofe', 'agilidade'],
        ['drible', 'velocidade', 'agilidade', 'primeiro_toque', 'finalizacao'],
        ['velocidade', 'explosao', 'drible', 'cruzamento', 'conducao'],
        ['agilidade', 'drible', 'velocidade', 'finalizacao', 'raciocinio_rapido'],
        ['velocidade', 'drible', 'conducao', 'agilidade', 'posicionamento_ofe', 'finalizacao'],
        ['explosao', 'velocidade', 'drible', 'primeiro_toque', 'agilidade'],
        ['velocidade', 'drible', 'finalizacao', 'frieza', 'agilidade', 'explosao'],
    ],
    centroavante: [
        ['finalizacao', 'posicionamento_ofe', 'cabeceio', 'forca', 'frieza'],
        ['finalizacao', 'forca', 'cabeceio', 'primeiro_toque', 'posicionamento_ofe'],
        ['finalizacao', 'posicionamento_ofe', 'frieza', 'raciocinio_rapido', 'primeiro_toque'],
        ['forca', 'cabeceio', 'finalizacao', 'altura', 'posicionamento_ofe'],
        ['finalizacao', 'velocidade', 'posicionamento_ofe', 'frieza', 'explosao'],
        ['finalizacao', 'cabeceio', 'forca', 'posicionamento_ofe', 'lideranca', 'frieza'],
        ['finalizacao', 'primeiro_toque', 'posicionamento_ofe', 'raciocinio_rapido', 'frieza'],
        ['forca', 'altura', 'cabeceio', 'finalizacao', 'posicionamento_ofe', 'concentracao'],
        ['finalizacao', 'velocidade', 'agilidade', 'posicionamento_ofe', 'drible'],
        ['finalizacao', 'frieza', 'posicionamento_ofe', 'primeiro_toque', 'forca', 'cabeceio'],
    ],
};

// Função para gerar variações de um template de características
// Remove ou adiciona aleatoriamente 0-2 características para criar diversidade
function generateVariation(template, seed) {
    const variation = [...template];
    const allKeys = CHARACTERISTICS.map(c => c.key);

    // Usar seed para determinismo
    const rng = mulberry32(seed);

    // Remover 0-1 características aleatoriamente
    if (rng() > 0.5 && variation.length > 3) {
        const removeIdx = Math.floor(rng() * variation.length);
        variation.splice(removeIdx, 1);
    }

    // Adicionar 0-1 características aleatórias
    if (rng() > 0.4) {
        const available = allKeys.filter(k => !variation.includes(k));
        if (available.length > 0) {
            const addKey = available[Math.floor(rng() * available.length)];
            variation.push(addKey);
        }
    }

    return variation;
}

// PRNG simples para gerar variações determinísticas
function mulberry32(a) {
    return function() {
        a |= 0; a = a + 0x6D2B79F5 | 0;
        var t = Math.imul(a ^ a >>> 15, 1 | a);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

// Gerar dados de treinamento completos
function generateTrainingData() {
    const data = [];
    let sampleId = 0;

    const formationKeys = Object.keys(FORMATIONS);

    for (const position of Object.keys(POSITION_TEMPLATES)) {
        const templates = POSITION_TEMPLATES[position];

        for (const formation of formationKeys) {
            const formationData = FORMATIONS[formation];
            const posCount = formationData.positionCounts[position] || 0;

            // Gerar mais amostras para posições com mais vagas na formação
            // e menos para posições inexistentes na formação
            let samplesPerTemplate;
            if (posCount === 0) {
                // Posição não existe nessa formação - pular
                continue;
            } else if (posCount >= 3) {
                samplesPerTemplate = 2;
            } else if (posCount >= 2) {
                samplesPerTemplate = 2;
            } else {
                samplesPerTemplate = 1;
            }

            for (const template of templates) {
                for (let v = 0; v < samplesPerTemplate; v++) {
                    const chars = v === 0 ? [...template] : generateVariation(template, sampleId);
                    data.push({
                        characteristics: chars,
                        formation: formation,
                        position: position,
                    });
                    sampleId++;
                }
            }
        }
    }

    return data;
}

// Dados de treinamento gerados
const TRAINING_DATA = generateTrainingData();

console.log(`Training data: ${TRAINING_DATA.length} samples generated`);
