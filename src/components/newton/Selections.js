import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Recomendation from './Recomendation';
import '../../styles/Transitions.css';

const Selections = ({ recomendations, onDecline, onAcept, loading, mobile }) => (
  <section className={mobile ? 'newton-fullscreen-mobile' : 'newton-fullscreen'}>
    <div className={mobile ? 'order-2' : 'col col-3 padding-2'}>
      <div className="search-feedback">Te recomiendo</div>
      <ReactCSSTransitionGroup
        transitionName="exit"
        transitionEnterTimeout={400}
        transitionLeaveTimeout={400}
      >
        {recomendations.map(req => (
          <Recomendation
            key={req.id}
            career={req}
            onDecline={() => onDecline(req.id)}
            onAccept={() => onAcept(req.id)}
            loading={loading}
            mobile={mobile}
          />
        ))}
      </ReactCSSTransitionGroup>
    </div>
    <div className={mobile ? 'order-1 padding-1' : 'col padding-2'}>
      <div className="newton-header">¡Eureka!</div>
      <p style={{ textAlign: 'justify' }}>
      Ahora debes marcar si las carreras recomendadas son de tu interés o no. De esta forma aprenderé más de ti y te podré recomendar de forma más precisa en el futuro.
      </p>
    </div>
  </section>
);

export default Selections;
