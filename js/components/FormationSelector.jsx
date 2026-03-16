// Seletor de esquema tático

function FormationSelector({ selectedFormation, onSelect }) {
    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-success text-white">
                <h5 className="mb-0">
                    <i className="bi bi-diagram-3 me-2"></i>
                    Esquema Tático
                </h5>
            </div>
            <div className="card-body">
                <div className="d-flex flex-wrap gap-2 mb-3">
                    {FORMATION_KEYS.map(key => (
                        <button
                            key={key}
                            className={`btn ${selectedFormation === key ? 'btn-success' : 'btn-outline-success'} formation-btn`}
                            onClick={() => onSelect(key)}
                        >
                            {FORMATIONS[key].label}
                        </button>
                    ))}
                </div>
                {selectedFormation && (
                    <div className="alert alert-light mb-0 py-2">
                        <small>
                            <i className="bi bi-info-circle me-1"></i>
                            {FORMATIONS[selectedFormation].description}
                        </small>
                    </div>
                )}
            </div>
        </div>
    );
}
