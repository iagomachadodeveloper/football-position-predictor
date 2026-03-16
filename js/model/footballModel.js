// Modelo TensorFlow.js para predição de posição de jogador de futebol
// Rede neural feedforward: Dense(64) → Dropout → Dense(32) → Dropout → Dense(7, softmax)

const MODEL_VERSION = 'football-pos-v3';
const MODEL_STORAGE_KEY = 'football-position-model';

const FootballModel = {
    model: null,

    // Constrói a arquitetura da rede neural
    buildModel() {
        const inputSize = Encoder.getInputSize();
        const outputSize = Encoder.getOutputSize();

        const model = tf.sequential();

        model.add(tf.layers.dense({
            units: 64,
            activation: 'relu',
            inputShape: [inputSize],
            kernelRegularizer: tf.regularizers.l2({ l2: 0.001 }),
        }));

        model.add(tf.layers.dropout({ rate: 0.3 }));

        model.add(tf.layers.dense({
            units: 32,
            activation: 'relu',
            kernelRegularizer: tf.regularizers.l2({ l2: 0.001 }),
        }));

        model.add(tf.layers.dropout({ rate: 0.2 }));

        model.add(tf.layers.dense({
            units: outputSize,
            activation: 'softmax',
        }));

        model.compile({
            optimizer: tf.train.adam(0.005),
            loss: 'categoricalCrossentropy',
            metrics: ['accuracy'],
        });

        return model;
    },

    // Treina o modelo com os dados de treinamento
    async trainModel(onProgress) {
        this.model = this.buildModel();

        const { inputs, outputs } = Encoder.encodeTrainingData(TRAINING_DATA);

        const totalEpochs = 80;

        await this.model.fit(inputs, outputs, {
            epochs: totalEpochs,
            batchSize: 16,
            validationSplit: 0.15,
            shuffle: true,
            callbacks: {
                onEpochEnd: (epoch, logs) => {
                    if (onProgress) {
                        const progress = ((epoch + 1) / totalEpochs) * 100;
                        onProgress({
                            epoch: epoch + 1,
                            totalEpochs,
                            progress,
                            loss: logs.loss.toFixed(4),
                            accuracy: (logs.acc * 100).toFixed(1),
                            valLoss: logs.val_loss ? logs.val_loss.toFixed(4) : '-',
                            valAccuracy: logs.val_acc ? (logs.val_acc * 100).toFixed(1) : '-',
                        });
                    }
                },
            },
        });

        // Limpar tensores
        inputs.dispose();
        outputs.dispose();

        // Salvar modelo no localStorage
        await this.saveModel();

        return this.model;
    },

    // Salva o modelo treinado no localStorage
    async saveModel() {
        try {
            await this.model.save('localstorage://' + MODEL_STORAGE_KEY);
            localStorage.setItem(MODEL_STORAGE_KEY + '-version', MODEL_VERSION);
            console.log('Model saved to localStorage');
        } catch (e) {
            console.warn('Could not save model to localStorage:', e);
        }
    },

    // Carrega modelo do localStorage se disponível e na versão correta
    async loadModel() {
        try {
            const savedVersion = localStorage.getItem(MODEL_STORAGE_KEY + '-version');
            if (savedVersion !== MODEL_VERSION) {
                console.log('Model version mismatch, retraining...');
                return false;
            }
            this.model = await tf.loadLayersModel('localstorage://' + MODEL_STORAGE_KEY);
            this.model.compile({
                optimizer: tf.train.adam(0.005),
                loss: 'categoricalCrossentropy',
                metrics: ['accuracy'],
            });
            console.log('Model loaded from localStorage');
            return true;
        } catch (e) {
            console.log('No saved model found, will train new one');
            return false;
        }
    },

    // Carrega modelo existente ou treina um novo
    async loadOrTrain(onProgress) {
        const loaded = await this.loadModel();
        if (!loaded) {
            await this.trainModel(onProgress);
        }
        return this.model;
    },

    // Faz predição para um conjunto de características e formação
    predict(characteristicKeys, formationKey) {
        if (!this.model) {
            throw new Error('Model not loaded');
        }

        const inputVector = Encoder.encodeInput(characteristicKeys, formationKey);
        const inputTensor = tf.tensor2d([inputVector]);

        const prediction = this.model.predict(inputTensor);
        const probabilities = Array.from(prediction.dataSync());

        // Limpar tensores
        inputTensor.dispose();
        prediction.dispose();

        // Decodificar predição
        let results = Encoder.decodePrediction(probabilities);

        // Pós-processamento: zerar posições que não existem na formação selecionada
        const formation = FORMATIONS[formationKey];
        if (formation) {
            results = results.map(r => ({
                ...r,
                probability: formation.positionCounts[r.position] > 0
                    ? r.probability
                    : 0,
            }));

            // Renormalizar probabilidades para somar 1
            const total = results.reduce((sum, r) => sum + r.probability, 0);
            if (total > 0) {
                results = results.map(r => ({
                    ...r,
                    probability: r.probability / total,
                }));
            }
        }

        // Ordenar por probabilidade decrescente
        results.sort((a, b) => b.probability - a.probability);

        return results;
    },

    // Força retreinamento (apaga modelo salvo)
    async retrain(onProgress) {
        try {
            localStorage.removeItem(MODEL_STORAGE_KEY + '-version');
            // Remover todas as chaves do modelo salvo
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('tensorflowjs_models/' + MODEL_STORAGE_KEY)) {
                    keysToRemove.push(key);
                }
            }
            keysToRemove.forEach(k => localStorage.removeItem(k));
        } catch (e) {
            // Ignorar erros ao limpar
        }
        await this.trainModel(onProgress);
    },
};
