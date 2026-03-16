// Componente principal da aplicação

const { useState, useEffect, useCallback } = React;

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [progress, setProgress] = useState(null);
    const [selectedFormation, setSelectedFormation] = useState('4-3-3');
    const [selectedChars, setSelectedChars] = useState([]);
    const [predictions, setPredictions] = useState(null);

    // Inicializar modelo
    useEffect(() => {
        async function init() {
            try {
                await FootballModel.loadOrTrain((p) => setProgress(p));
                setIsModelLoaded(true);
            } catch (err) {
                console.error('Error loading model:', err);
                alert('Erro ao carregar o modelo. Recarregue a página.');
            } finally {
                setIsLoading(false);
            }
        }
        init();
    }, []);

    // Toggle característica
    const handleToggleChar = useCallback((key) => {
        setSelectedChars(prev =>
            prev.includes(key)
                ? prev.filter(k => k !== key)
                : [...prev, key]
        );
    }, []);

    // Limpar seleção
    const handleClearChars = useCallback(() => {
        setSelectedChars([]);
        setPredictions(null);
    }, []);

    // Fazer predição
    const handlePredict = useCallback(() => {
        if (selectedChars.length < 3) {
            alert('Selecione pelo menos 3 características.');
            return;
        }
        if (!selectedFormation) {
            alert('Selecione um esquema tático.');
            return;
        }

        try {
            const results = FootballModel.predict(selectedChars, selectedFormation);
            setPredictions(results);
        } catch (err) {
            console.error('Prediction error:', err);
            alert('Erro ao fazer predição.');
        }
    }, [selectedChars, selectedFormation]);

    // Retreinar modelo
    const handleRetrain = useCallback(async () => {
        if (!confirm('Deseja retreinar o modelo? Isso pode levar alguns segundos.')) return;
        setIsLoading(true);
        setPredictions(null);
        setProgress(null);
        try {
            await FootballModel.retrain((p) => setProgress(p));
            setIsModelLoaded(true);
        } catch (err) {
            console.error('Retrain error:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Refazer predição ao trocar formação
    useEffect(() => {
        if (isModelLoaded && selectedChars.length >= 3 && predictions) {
            try {
                const results = FootballModel.predict(selectedChars, selectedFormation);
                setPredictions(results);
            } catch (e) { /* ignore */ }
        }
    }, [selectedFormation]);

    return (
        <div className="container-fluid px-3 px-md-5">
            <LoadingOverlay isLoading={isLoading} progress={progress} />
            <Header onRetrain={handleRetrain} isModelLoaded={isModelLoaded} />

            <div className="row">
                {/* Coluna esquerda: inputs */}
                <div className="col-lg-6">
                    <FormationSelector
                        selectedFormation={selectedFormation}
                        onSelect={setSelectedFormation}
                    />
                    <CharacteristicsInput
                        selected={selectedChars}
                        onToggle={handleToggleChar}
                        onClear={handleClearChars}
                    />
                    <div className="d-grid mb-4">
                        <button
                            className="btn btn-success btn-lg"
                            onClick={handlePredict}
                            disabled={isLoading || selectedChars.length < 3}
                        >
                            <i className="bi bi-lightning-charge me-2"></i>
                            Prever Melhor Posição
                            {selectedChars.length > 0 && selectedChars.length < 3 && (
                                <small className="ms-2">
                                    (selecione mais {3 - selectedChars.length})
                                </small>
                            )}
                        </button>
                    </div>
                </div>

                {/* Coluna direita: resultados */}
                <div className="col-lg-6">
                    <FieldVisualization
                        formation={selectedFormation}
                        predictions={predictions}
                    />
                    <PredictionResults
                        predictions={predictions}
                        formation={selectedFormation}
                    />

                    {!predictions && isModelLoaded && (
                        <div className="card shadow-sm">
                            <div className="card-body text-center text-muted py-5">
                                <i className="bi bi-arrow-left-circle display-4 d-block mb-3"></i>
                                <p className="mb-0">
                                    Selecione características e clique em
                                    <strong> "Prever Melhor Posição"</strong>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <footer className="text-center text-muted py-4 mt-4 border-top">
                <small>
                    <i className="bi bi-mortarboard me-1"></i>
                    Projeto de estudo - Pós-Graduação | TensorFlow.js + React
                    <br />
                    Modelo treinado com {TRAINING_DATA.length} amostras |
                    {' '}{CHARACTERISTICS.length} características |
                    {' '}{FORMATION_KEYS.length} formações
                </small>
            </footer>
        </div>
    );
}

// Render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
