import React from 'react';
import { numeral } from '../../helpers/numeral';
import { getDate, getUrl } from '../../helpers/strings';

function UniversityInfoMobile({ university }) {
  return (
    <div>
      <div className="career-section-header">Información</div>
      <div className="career-section-body">
        <div className="row">
          <div className="expandible-label">Tipo</div>
          <div className="expandible-value">{university.u_type}</div>
        </div>
        <div className="row">
          <div className="expandible-label">Sigla</div>
          <div className="expandible-value">{university.initials}</div>
        </div>
        <div className="row">
          <div className="expandible-label">Gratuidad</div>
          <div className="expandible-value">{university.freeness ? 'Sí' : 'No'}</div>
        </div>
        <div className="row">
          <div className="expandible-label">Fundación</div>
          <div className="expandible-value">{getDate(university.foundation)}</div>
        </div>
        <div className="row">
          <div className="expandible-label">Sitio web</div>
          <a className="expandible-value" href={!!window.cordova ? '#' : getUrl(university.website)}>{university.website || 'No disponible'}</a>
        </div>
        <div className="row">
          <div className="expandible-label">Alumnos</div>
          <div className="expandible-value">{university.students ? numeral(university.students) : 'No disponible'}</div>
        </div>
        <div className="row">
          <div className="expandible-label">Profesores</div>
          <div className="expandible-value">{university.teachers ? numeral(university.teachers) : 'No disponible'}</div>
        </div>
        <div className="row">
          <div className="expandible-label">Grados</div>
          <div className="expandible-value">{university.degrees ? numeral(university.degrees) : 'No disponible'}</div>
        </div>
        <div className="row">
          <div className="expandible-label">Postgrados</div>
          <div className="expandible-value">{university.postgraduates ? numeral(university.postgraduates) : 'No disponible'}</div>
        </div>
        <div className="row">
          <div className="expandible-label">Doctorados</div>
          <div className="expandible-value">{university.doctorates ? numeral(university.doctorates) : 'No disponible'}</div>
        </div>
      </div>
      <div className="career-section-header">Descripción</div>
      <div className="career-section-body career-description">
        {university.description}
      </div>
    </div>
  );
}

export default UniversityInfoMobile;
