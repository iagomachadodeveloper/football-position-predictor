// Input de características do jogador (toggle buttons agrupados por categoria)

function CharacteristicsInput({ selected, onToggle, onClear }) {
    const categories = Object.keys(CHARACTERISTIC_CATEGORIES);

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                    <i className="bi bi-person-lines-fill me-2"></i>
                    Características do Jogador
                </h5>
                {selected.length > 0 && (
                    <button className="btn btn-sm btn-outline-light" onClick={onClear}>
                        <i className="bi bi-x-circle me-1"></i>
                        Limpar ({selected.length})
                    </button>
                )}
            </div>
            <div className="card-body">
                {selected.length === 0 && (
                    <div className="alert alert-info py-2 mb-3">
                        <small>
                            <i className="bi bi-hand-index me-1"></i>
                            Selecione 3 ou mais características que descrevem o jogador
                        </small>
                    </div>
                )}
                {categories.map(cat => {
                    const catInfo = CHARACTERISTIC_CATEGORIES[cat];
                    const chars = CHARACTERISTICS.filter(c => c.category === cat);

                    return (
                        <div key={cat} className="mb-3">
                            <h6 className="text-muted mb-2">
                                <i className={`${catInfo.icon} me-1`}></i>
                                {catInfo.label}
                            </h6>
                            <div className="d-flex flex-wrap gap-2">
                                {chars.map(c => {
                                    const isSelected = selected.includes(c.key);
                                    return (
                                        <button
                                            key={c.key}
                                            className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-outline-secondary'} characteristic-btn`}
                                            onClick={() => onToggle(c.key)}
                                            title={c.description}
                                        >
                                            {isSelected && <i className="bi bi-check me-1"></i>}
                                            {c.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
