import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import '../styles/UniversityCard.css';

function UniversityCard(props, context) {
  const { university, detail } = props;

  function onTitleClick() {
    context.router.push(`site/university/${university.id}`);
  }

  return (
    <div className="card">
      <Paper zDepth={2}>
        <div className={`card__header ${detail ? 'card__header_hide' : ''}`} >
          <div className="card__title" onClick={onTitleClick}>{university.title}</div>
        </div>
        <div className="card__body">
          <div className="row">
            <div className="col">
              <div className="value">{university.finance_type}</div>
              <div className="label">Tipo</div>
            </div>
            <div className="col">
              <div className="value">{university.initials}</div>
              <div className="label">Sigla</div>
            </div>
            <div className="col">
              <div className="value">{university.degrees}</div>
              <div className="label">Grados</div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="value">{university.freeness ? 'Sí' : 'No'}</div>
              <div className="label">Gratuidad</div>
            </div>
            <div className="col">
              <div className="value">{university.students}</div>
              <div className="label">Alumnos</div>
            </div>
            <div className="col">
              <div className="value">{university.postgraduates}</div>
              <div className="label">Postgrados</div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="value">{university.foundation}</div>
              <div className="label">Fundación</div>
            </div>
            <div className="col">
              <div className="value">{university.teachers}</div>
              <div className="label">Profesores</div>
            </div>
            <div className="col">
              <div className="value">{university.doctorates}</div>
              <div className="label">Doctorados</div>
            </div>
          </div>
        </div>
        <div className={`card__description ${detail ? '' : 'card__description_hide'}`} >
          <div className="row">
            <div className="col">{university.description}</div>
          </div>
        </div>
      </Paper>
    </div>
  );
}

UniversityCard.contextTypes = {
  router: PropTypes.object,
};

UniversityCard.propTypes = {
  university: PropTypes.shape({
    id: PropTypes.number.isRequired,
    foundation: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    freeness: PropTypes.bool.isRequired,
    motto: PropTypes.string,
    nick: PropTypes.string,
    description: PropTypes.string.isRequired,
    finance_type: PropTypes.string.isRequired,
    initials: PropTypes.string.isRequired,
    students: PropTypes.number.isRequired,
    teachers: PropTypes.number.isRequired,
    degees: PropTypes.number.isRequired,
    postgraduates: PropTypes.number.isRequired,
    doctorates: PropTypes.number.isRequired,
    institution_id: PropTypes.number,
  }).isRequired,
};


export default UniversityCard;

