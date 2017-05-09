import React, { PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import '../styles/UniversityCard.css';

function UniverityCard(props, context) {
  const { univ } = props;

  function onTitleClick() {
    context.router.push(`site/university/${univ.id}`);
  }

  return (
    <div className="card">
      <Paper zDepth={2}>
        <div className="card__header">
          <div className="card__title" onClick={onTitleClick}>{univ.title}</div>
        </div>
        <div className="card__body">
          <div className="row">
            <div className="col">
              <div className="value">{univ.finance_type}</div>
              <div className="label">Tipo</div>
            </div>
            <div className="col">
              <div className="value">{univ.initials}</div>
              <div className="label">Sigla</div>
            </div>
            <div className="col">
              <div className="value">{univ.degrees}</div>
              <div className="label">Grados</div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="value">{univ.freeness ? 'Sí' : 'No'}</div>
              <div className="label">Gratuidad</div>
            </div>
            <div className="col">
              <div className="value">{univ.students}</div>
              <div className="label">Alumnos</div>
            </div>
            <div className="col">
              <div className="value">{univ.postgraduates}</div>
              <div className="label">Postgrados</div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="value">{univ.foundation}</div>
              <div className="label">Fundación</div>
            </div>
            <div className="col">
              <div className="value">{univ.teachers}</div>
              <div className="label">Profesores</div>
            </div>
            <div className="col">
              <div className="value">{univ.doctorates}</div>
              <div className="label">Doctorados</div>
            </div>
          </div>
        </div>
        <div className="card__description card__description_hide">
          <div className="row">
            <div className="col">{univ.description}</div>
          </div>
        </div>
      </Paper>
    </div>
  );
}

UniverityCard.contextTypes = {
  router: PropTypes.object,
};

export default UniverityCard;

