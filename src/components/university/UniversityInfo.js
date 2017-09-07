import React from 'react';
import PropTypes from 'prop-types';
import { getDate, getUrl } from '../../helpers/strings';
import { numeral } from '../../helpers/numeral';

function Info({ university, mobile }) {
  return (
    <div className="univ-card">
      <div className="univ-card-header">Información</div>
      <div className="general-card">
        <div className="univ-card-body">
          <div className="col">
            <div className="general-card__item">
              <div className="value">{university.u_type}</div>
              <div className="label">Tipo</div>
            </div>
            <div className="general-card__item">
              <div className="value">{university.freeness ? 'Sí' : 'No'}</div>
              <div className="label">Gratuidad</div>
            </div>
            <div className="general-card__item">
              <div className="value">{getDate(university.foundation)}</div>
              <div className="label">Fundación</div>
            </div>
            <div className="general-card__item">
              <div className="value">{university.initials}</div>
              <div className="label">Sigla</div>
            </div>
            <div className="general-card__item no-margin">
              <a className="value" href={!!window.cordova ? '#' : getUrl(university.website)}>{university.website || 'No disponible'}</a>
              <div className="label">Sitio web</div>
            </div>
          </div>
          <div className="col">
            <div className="general-card__item">
              <div className="value">{university.degrees}</div>
              <div className="label">Grados</div>
            </div>
            <div className="general-card__item">
              <div className="value">{university.postgraduates ? numeral(university.postgraduates) : 'No disponible'}</div>
              <div className="label">Postgrados</div>
            </div>
            <div className="general-card__item">
              <div className="value">{university.doctorates ? numeral(university.doctorates) : 'No disponible'}</div>
              <div className="label">Doctorados</div>
            </div>
            <div className="general-card__item">
              <div className="value">{university.students ? numeral(university.students) : 'No disponible'}</div>
              <div className="label">Alumnos</div>
            </div>
            <div className="general-card__item no-margin">
              <div className="value">{university.teachers ? numeral(university.teachers) : 'No disponible'}</div>
              <div className="label">Profesores</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Info.defaultProps = {
  mobile: false,
};

Info.propTypes = {
  mobile: PropTypes.bool,
};

export default Info;
