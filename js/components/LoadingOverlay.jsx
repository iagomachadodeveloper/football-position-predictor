// Overlay exibido durante o treinamento do modelo

function LoadingOverlay({ isLoading, progress }) {
    if (!isLoading) return null;

    return (
        <div className="loading-overlay">
            <div className="loading-content text-center">
                <div className="mb-4">
                    <div className="spinner-border text-success mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
                        <span className="visually-hidden">Treinando...</span>
                    </div>
                    <h4 className="text-white">Treinando o Modelo</h4>
                    <p className="text-white-50">
                        O modelo está aprendendo a associar características de jogadores
                        às suas posições ideais em cada esquema tático.
                    </p>
                </div>

                {progress && (
                    <div className="training-stats">
                        <div className="progress mb-3" style={{ height: '24px' }}>
                            <div
                                className="progress-bar bg-success progress-bar-striped progress-bar-animated"
                                role="progressbar"
                                style={{ width: `${progress.progress}%` }}
                            >
                                {progress.progress.toFixed(0)}%
                            </div>
                        </div>
                        <div className="row text-white-50 small">
                            <div className="col-6 col-md-3">
                                <strong>Época:</strong> {progress.epoch}/{progress.totalEpochs}
                            </div>
                            <div className="col-6 col-md-3">
                                <strong>Loss:</strong> {progress.loss}
                            </div>
                            <div className="col-6 col-md-3">
                                <strong>Acurácia:</strong> {progress.accuracy}%
                            </div>
                            <div className="col-6 col-md-3">
                                <strong>Val. Acc:</strong> {progress.valAccuracy}%
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
