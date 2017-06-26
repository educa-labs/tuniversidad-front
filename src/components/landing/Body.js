import React from 'react';

function Body(props) {
  if (props.mobile) {
    return (
      <div className="landing-body-mobile">
        <div className="landing-body-title-mobile">
          Prepara la PSU.
          <br />
          En la palma de tu mano.
        </div>
        <div className="section-mobile">
          <div className="section-header-mobile">Metas y objetivos</div>
          <div className="section-text">
            Con tuniversidad podrás fijarte metas y ver cómo te acercas a ella en tiempo real. A medida que progresas en tus ensayos, se actualizará la distancia con tus objetivos.
          </div>
        </div>
        <div className="section-mobile">
          <div className="section-header-mobile">Recomendaciones</div>
          <div className="section-text">
            A medida que alimentas la plataforma con datos y acciones, nos das más para trabajar. Tomando en cuenta una serie de variables y con la ayuda de Newton, te recomendaremos las mejores opciones de estudio para ti.
          </div>
        </div>
        <div className="section-mobile">
          <div className="section-header-mobile">Progreso</div>
          <div className="section-text">
            Lleva un registro constante de tus ensayos. No importa si los haces en el preu, en el colegio o en la casa. Nosotros los organizamos para facilitar el proceso y Newton te ayudará a predecir cómo evolucionarán tus puntajes.
          </div>
        </div>
        <div className="section-mobile">
          <div className="section-header-mobile">Búsquedas</div>
          <div className="section-text">
            Busca más de 1500 carreras entre las más de 50 Universidades disponibles a nivel nacional. Además, tenemos el mejor sistema de filtrado en la industria con parámetros como puntaje de corte, vacantes, empleabilidad, arancel y sueldo promedio.
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="landing-body">
      <div className="landing-body-title">
        Prepara la PSU. En la palma de tu mano.
      </div>
      <div className="row no-margin">
        <div className="col justify-end">
          <div className="section section-top">
            <div className="section-header">Metas y objetivos</div>
            <div className="section-text">
              Con tuniversidad podrás fijarte metas y ver cómo te acercas a ella en tiempo real. A medida que progresas en tus ensayos, se actualizará la distancia con tus objetivos.
            </div>
          </div>
          <div className="section">
            <div className="section-header">Recomendaciones</div>
            <div className="section-text">
              A medida que alimentas la plataforma con datos y acciones, nos das más para trabajar. Tomando en cuenta una serie de variables y con la ayuda de Newton, te recomendaremos las mejores opciones de estudio para ti.
            </div>
          </div>
        </div>
        <div className="landing-body-phone" />
        <div className="col">
          <div className="section section-top">
            <div className="section-header">Progreso</div>
            <div className="section-text">
             Lleva un registro constante de tus ensayos. No importa si los haces en el preu, en el colegio o en la casa. Nosotros los organizamos para facilitar el proceso y Newton te ayudará a predecir cómo evolucionarán tus puntajes.
            </div>
          </div>
          <div className="section">
            <div className="section-header">Búsquedas</div>
            <div className="section-text">
              Busca más de 1500 carreras entre las más de 50 Universidades disponibles a nivel nacional. Además, tenemos el mejor sistema de filtrado en la industria con parámetros como puntaje de corte, vacantes, empleabilidad, arancel y sueldo promedio.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Body;
