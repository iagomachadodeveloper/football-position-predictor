// Visualização do campo de futebol com posições da formação selecionada

function FieldVisualization({ formation, predictions }) {
    if (!formation) return null;

    const formationData = FORMATIONS[formation];
    if (!formationData) return null;

    // Mapa de probabilidades por posição
    const probMap = {};
    if (predictions) {
        predictions.forEach(p => {
            probMap[p.position] = p.probability;
        });
    }

    // Encontrar a posição com maior probabilidade
    const topPosition = predictions ? predictions[0]?.position : null;

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-success text-white">
                <h5 className="mb-0">
                    <i className="bi bi-grid-3x3 me-2"></i>
                    Campo - {formationData.label}
                </h5>
            </div>
            <div className="card-body p-2">
                <div className="football-field">
                    {/* Linhas do campo */}
                    <div className="field-center-line"></div>
                    <div className="field-center-circle"></div>
                    <div className="field-penalty-area field-penalty-top"></div>
                    <div className="field-penalty-area field-penalty-bottom"></div>
                    <div className="field-goal-area field-goal-top"></div>
                    <div className="field-goal-area field-goal-bottom"></div>

                    {/* Jogadores */}
                    {formationData.playerPositions.map((player, idx) => {
                        const prob = probMap[player.position] || 0;
                        const isTop = player.position === topPosition;
                        const posData = POSITIONS[player.position];
                        const opacity = predictions ? (0.3 + prob * 0.7) : 0.8;
                        const scale = predictions ? (0.8 + prob * 0.4) : 1;

                        return (
                            <div
                                key={idx}
                                className={`field-player ${isTop ? 'field-player-top' : ''}`}
                                style={{
                                    left: `${player.x}%`,
                                    top: `${player.y}%`,
                                    opacity: opacity,
                                    transform: `translate(-50%, -50%) scale(${scale})`,
                                    backgroundColor: posData.color,
                                }}
                                title={`${posData.label}: ${(prob * 100).toFixed(1)}%`}
                            >
                                <span className="field-player-label">{posData.abbreviation}</span>
                                {predictions && prob > 0 && (
                                    <span className="field-player-prob">
                                        {(prob * 100).toFixed(0)}%
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
