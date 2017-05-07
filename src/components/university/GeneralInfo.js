import React from 'react';
import '../../styles/GeneralInfo.css';

function GeneralInfo({ university }) {
  return (
    <div className="general-info">
      <div className="card">
        <div className="row">
          <div className="item">
            <div className="value">{university.type}</div>
            <div className="label">Tipo</div>
          </div>
          <div className="item">
            <div className="value">{university.sigla}</div>
            <div className="label">Sigla</div>
          </div>
          <div className="item">
            <div className="value">{university.grados}</div>
            <div className="label">Grados</div>
          </div>
        </div>
        <div className="row">
          <div className="item">
            <div className="value">{university.freeness ? 'Sí' : 'No'}</div>
            <div className="label">Gratuidad</div>
          </div>
          <div className="item">
            <div className="value">{university.alummnos}</div>
            <div className="label">Alummnos</div>
          </div>
          <div className="item">
            <div className="value">{university.postGrados}</div>
            <div className="label">Postgrados</div>
          </div>
        </div>
        <div className="row">
          <div className="item">
            <div className="value">{university.fundation}</div>
            <div className="label">Fundación</div>
          </div>
          <div className="item">
            <div className="value">{university.profesores}</div>
            <div className="label">Profesores</div>
          </div>
          <div className="item">
            <div className="value">{university.doctorados}</div>
            <div className="label">Doctorados</div>
          </div>
        </div>
        <div className="description">{university.description}</div>
      </div>
    </div>
  );
}

export default GeneralInfo;
