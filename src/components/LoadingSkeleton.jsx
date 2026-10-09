import React from 'react';

// Componente para exibir estado de carregamento com esqueletos animados
export function LoadingSkeleton({ count = 12 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-header">
            <div className="skeleton-box skeleton-id"></div>
            <div className="skeleton-box skeleton-badge"></div>
          </div>
          <div className="skeleton-circle"></div>
          <div className="skeleton-content">
            <div className="skeleton-box skeleton-title"></div>
            <div className="skeleton-types">
              <div className="skeleton-box skeleton-type-chip"></div>
              <div className="skeleton-box skeleton-type-chip"></div>
            </div>
            <div className="skeleton-box skeleton-stats"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
