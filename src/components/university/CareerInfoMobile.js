import React from 'react';
import { numeral } from '../../helpers/numeral';

function CareerInfoMobile({ career, links }) {
  function getType() {
    if (career.weighing.science !== 0 && career.weighing.history) return 'Historia o Ciencias';
    return career.weighing.science !== 0 ? 'Ciencias' : 'Historia';
  }
  const special = [33, 36].includes(career.university_id);
  return (
    <div>
      <div className="career-section-header">Ponderación</div>
      <div className="career-section-body">
        <div className="row">
          <div className="expandible-label">Lenguaje</div>
          <div className="expandible-value">{career.weighing ? career.weighing.language : null}%</div>
        </div>
        <div className="row">
          <div className="expandible-label">Matemáticas</div>
          <div className="expandible-value">{career.weighing ? career.weighing.math : null}%</div>
        </div>
        <div className="row">
          <div className="expandible-label">{getType()}</div>
          <div className="expandible-value">{career.weighing ? career.weighing.science || career.weighing.history : null}%</div>
        </div>
        <div className="row">
          <div className="expandible-label">NEM</div>
          <div className="expandible-value">{career.weighing ? career.weighing.NEM : null}%</div>
        </div>
        <div className="row">
          <div className="expandible-label">Ranking</div>
          <div className="expandible-value">{career.weighing ? career.weighing.ranking : null}%</div>
        </div>
        <div className="row">
          <div className="expandible-label">Corte 2016</div>
          <div className="expandible-value">{career.last_cut}</div>
        </div>
      </div>
      <div className="career-section-header">Información</div>
      <div className="career-section-body">
        <div className="row">
          <div className="expandible-label">Área</div>
          <div className="expandible-value">{career.area_title ? career.area_title : 'No disponible'}</div>
        </div>
        <div className="row">
          <div className="expandible-label">Vacantes</div>
          <div className="expandible-value">{career.openings ? career.openings : 'No disponible'}</div>
        </div>
        <div className="row">
          <div className="expandible-label">Duración</div>
          <div className="expandible-value">{career.semesters ? career.semesters : 'No disponible'}</div>
        </div>
        <div className="row">
          <div className="expandible-label">Arancel</div>
          <div className="expandible-value">{career.price ? `$${numeral(career.price)}` : 'No disponible'}</div>
        </div>
        <div className="row">
          <div className="expandible-label">Sueldo promedio</div>
          <div className="expandible-value">{career.income ? `$${numeral(career.income)}` : 'No disponible'}</div>
        </div>
        <div className="row">
          <div className="expandible-label">Empleabilidad</div>
          <div className="expandible-value">{career.employability ? `${career.employability}%` : 'No disponible'}</div>
        </div>
        {special ? (
          <div className="row">
            <div className="expandible-label">Sitio web</div>
            <div className="expandible-value"><a href={links[career.id]}>{career.university_name}</a></div>
          </div>
        ) : null}
      </div>
      <div className="career-section-header">Descripción</div>
      <div className="career-section-body career-description">
        {career.description}
      </div>
    </div>
  );
}

export default CareerInfoMobile;
