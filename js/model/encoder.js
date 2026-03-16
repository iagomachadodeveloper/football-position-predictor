// Encoder: converte características + formação em vetores numéricos para o TensorFlow.js
// Input: vetor binário de características (26) + one-hot de formação (6) = 32 features
// Output: one-hot da posição (7 classes)

const Encoder = {
    // Tamanho do vetor de entrada
    getInputSize() {
        return CHARACTERISTICS.length + FORMATION_KEYS.length;
    },

    // Número de classes de saída (posições)
    getOutputSize() {
        return POSITION_KEYS.length;
    },

    // Codifica características + formação em vetor numérico
    encodeInput(characteristicKeys, formationKey) {
        // Vetor binário para características (1 = presente, 0 = ausente)
        const charVector = CHARACTERISTICS.map(c =>
            characteristicKeys.includes(c.key) ? 1 : 0
        );

        // One-hot para formação
        const formationVector = FORMATION_KEYS.map(f =>
            f === formationKey ? 1 : 0
        );

        return [...charVector, ...formationVector];
    },

    // Codifica posição como one-hot
    encodeOutput(positionKey) {
        return POSITION_KEYS.map(p => p === positionKey ? 1 : 0);
    },

    // Decodifica output do modelo em probabilidades por posição
    decodePrediction(probabilities) {
        return POSITION_KEYS.map((key, i) => ({
            position: key,
            label: POSITIONS[key].label,
            abbreviation: POSITIONS[key].abbreviation,
            color: POSITIONS[key].color,
            probability: probabilities[i],
        }));
    },

    // Codifica todo o dataset de treinamento em tensores
    encodeTrainingData(trainingData) {
        const inputs = [];
        const outputs = [];

        for (const sample of trainingData) {
            inputs.push(this.encodeInput(sample.characteristics, sample.formation));
            outputs.push(this.encodeOutput(sample.position));
        }

        return {
            inputs: tf.tensor2d(inputs),
            outputs: tf.tensor2d(outputs),
        };
    },
};
