// Exibe as probabilidades de predição para cada posição

function PredictionResults({ predictions, formation }) {
    if (!predictions) return null;

    const formationData = FORMATIONS[formation];

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-dark text-white">
                <h5 className="mb-0">
                    <i className="bi bi-bar-chart me-2"></i>
                    Predição de Posição ({formationData.label})
                </h5>
            </div>
            <div className="card-body">
                {predictions.map((pred, idx) => {
                    const percentage = (pred.probability * 100).toFixed(1);
                    const isTop = idx === 0;
                    const isAvailable = formationData.positionCounts[pred.position] > 0;

                    if (!isAvailable) return null;

                    return (
                        <div key={pred.position} className={`mb-3 ${isTop ? 'prediction-top' : ''}`}>
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <div>
                                    <span
                                        className="badge me-2"
                                        style={{ backgroundColor: pred.color }}
                                    >
                                        {pred.abbreviation}
                                    </span>
                                    <strong>{pred.label}</strong>
                                    {isTop && (
                                        <span className="badge bg-warning text-dark ms-2">
                                            <i className="bi bi-star-fill me-1"></i>
                                            Melhor posição
                                        </span>
                                    )}
                                </div>
                                <span className={`fw-bold ${isTop ? 'text-success fs-5' : ''}`}>
                                    {percentage}%
                                </span>
                            </div>
                            <div className="progress" style={{ height: isTop ? '28px' : '20px' }}>
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{
                                        width: `${percentage}%`,
                                        backgroundColor: pred.color,
                                        transition: 'width 0.5s ease-in-out',
                                    }}
                                >
                                    {percentage > 10 ? `${percentage}%` : ''}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
