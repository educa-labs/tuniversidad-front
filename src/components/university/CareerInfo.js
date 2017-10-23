import React from 'react';
import is from 'is_js';
import { numeral } from '../../helpers/numeral';

function Info({ career, mobile, links }) {
  const science = career.weighing ? is.existy(career.weighing.science) : null;
  const special = [33, 36].includes(career.university_id);
  const noWeight = career.weighing ? is.null(career.weighing.NEM) : true;
  
  return (
    <div className="univ-card">
      <div className="univ-card-header">Información</div>
      <div className="general-card">
        <div className="univ-card-body">
          <div className="col">
            <div className="general-card__item">
              <div className="value">{career.area_title}</div>
              <div className="label">Área</div>
            </div>
            <div className="general-card__item">
              <div className="value">{career.semesters} Semestres</div>
              <div className="label">Duración</div>
            </div>
            <div className="general-card__item">
              <div className="value">{career.price ? `$${numeral(career.price)}` : 'No disponible'}</div>
              <div className="label">Arancel</div>
            </div>
            <div className="general-card__item">
              <div className="value">{career.income ? `$${numeral(career.income)}` : 'No disponible'}</div>
              <div className="label">Sueldo promedio (3er año)</div>
            </div>
            <div className="general-card__item no-margin">
              <div className="value">{career.employability ? `${career.employability}%` : 'No disponible'}</div>
              <div className="label">Empleabilidad</div>
            </div>
            {special ? (
              <div className="general-card__item">
                <div className="value">Sitio web</div>
                <div className="label"><a href={links[career.id]}>{career.title}</a></div>
              </div>
            ) : null}
          </div>
          {noWeight ? null : (
            <div className="col">
              <div className="general-card__item">
                <div className="value">{career.weighing ? career.weighing.NEM : 'No disponible'}%</div>
                <div className="label">NEM</div>
              </div>
              <div className="general-card__item no-margin">
                <div className="value">{career.weighing ? career.weighing.ranking : 'No disponible'}%</div>
                <div className="label">Ranking</div>
              </div>
              <div className="general-card__item">
                <div className="value">{career.weighing ? career.weighing.language : 'No disponible'}%</div>
                <div className="label">Lenguaje</div>
              </div>
              <div className="general-card__item">
                <div className="value">{career.weighing ? career.weighing.math : 'No disponible'}%</div>
                <div className="label">Matematica</div>
              </div>
              <div className="general-card__item">
                <div className="value">{career.weighing ? career.weighing.science || career.weighing.history : 'No disponible'}%</div>
                <div className="label">{science ? 'Ciencias' : 'Historia'}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Info;
