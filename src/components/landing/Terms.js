import React from 'react';
import NavigationBar from '../../components/NavigationBar';

function Terms(props) {
  return (
    <div className="login-container">
      <NavigationBar location="filters" />
      <div className="terms-header">Términos y condiciones</div>
      <div className={`general-card general-card_no-hover ${props.mobile ? 'general-card-full-size' : ''}`}>
        <div className={`login-form ${props.mobile ? 'login-form-mobile is-marging-top' : ''}`}>
          <div className="general-card__title">Bienvenido a tuniversidad</div>
          <div className="terms-body">
            Te agradecemos que uses nuestros productos y sus servicios (en adelante, “servicios”).
            El uso de nuestros servicios implica la aceptación de las siguientes condiciones.
            El uso de nuestros servicios no te convierte en titular de ninguno de los derechos de propiedad intelectual de los mismos ni del contenido al que accedas. No se te otorga el derecho de usar marcas ni logotipos pertenecientes a nuestros servicios. No elimines ni alteres los avisos legales que se muestran en nuestros.
            Este contenido es responsabilidad exclusiva de la entidad que lo haya puesto a disposición.
            En relación con nuestros servicios, podemos enviarte avisos de servicio, mensajes administrativos y otros tipos de información.
          </div>
          <div className="general-card__title">Políticas de privacidad</div>
          <div className="terms-body">
            Las políticas de privacidad explican el tratamiento de los datos personales y la protección de la privacidad al usar nuestros servicios.
            Al ingresar contenido dentro de nuestros servicios, sigues siendo el titular de los derechos de propiedad intelectual que tengas sobre ese contenido. Al aceptar estos términos y condiciones, Educalabs puede utilizar de diversas maneras tanto la información personal que proporciones al crear tu cuenta como la información que ingreses una vez dentro de alguno de nuestros servicios. Es decir que nos concedes una licencia para usar, alojar, almacenar, reproducir, modificar o vender dicha información y contenidos. El uso de esta información será netamente con el fin de mejorar los servicios ya disponibles y hacer de ellos una mejor experiencia.
          </div>
          <div className="general-card__title">Acerca de estas condiciones</div>
          <div className="terms-body">
            Educalabs puede modifiar estas condiciones en cualquier momento, siempre que notifique a los usuarios de los servicios sobre dichos cambios.
            Todo lo anterior aplica únicamente en Chile y no a nivel global.
            Para mayor información contáctanos al <span>+56977170168</span> o a contacto@tuniversidad.cl.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terms;
