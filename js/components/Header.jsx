// Cabeçalho da aplicação

function Header({ onRetrain, isModelLoaded }) {
    return (
        <header className="text-center mb-4 pt-4">
            <h1 className="display-5 fw-bold">
                Football Position Predictor
            </h1>
            <p className="lead text-muted">
                Selecione um esquema tático e as características do jogador para descobrir
                qual a melhor posição para ele em campo.
            </p>
            <p className="small text-muted">
                <i className="bi bi-cpu me-1"></i>
                Modelo de rede neural treinado com TensorFlow.js diretamente no navegador
            </p>
            {isModelLoaded && (
                <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={onRetrain}
                    title="Retreinar o modelo do zero"
                >
                    <i className="bi bi-arrow-clockwise me-1"></i>
                    Retreinar Modelo
                </button>
            )}
        </header>
    );
}
