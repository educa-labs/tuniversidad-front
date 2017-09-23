import React, { PropTypes } from 'react';
import { scroller } from 'react-scroll';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import '../styles/NavigationBar.css';


function NavigationBar(props, context) {
  const params = {
    duration: 500,
    smooth: true,
    offset: -48,
  };

  let className = 'navigation-bar';

  if (props.location === 'landing') {
    className = `${className} navigation-bar_landing${props.dirty ? '-dirty' : ''}`;
    if (props.solid && props.dirty) className = `${className} navigation-bar_landing-solid`;
    const tuniLogo = props.mobile ? null : (
      <div className="navigation-bar-logo">
        <div className={`logo-tuni ${props.solid ? 'logo-tuni-black' : ''}`} />
      </div>
    );

    return (
      <div className={className}>
        {tuniLogo}
        <div className={`navigation-bar-actions ${props.mobile ? 'navigation-bar-actions-mobile' : ''}`}>
          <button
            className={`action ${props.mobile ? 'action-mobile' : ''}  ${props.active === 0 ? 'action-active' : ''}`}
            onClick={() => scroller.scrollTo('login', params)}
          >
            Comenzar
          </button>
          <button
            className={`action ${props.mobile ? 'action-mobile' : ''} ${props.active === 1 ? 'action-active' : ''}`}
            onClick={() => scroller.scrollTo('body', params)}
          >
            ¿Qué hace?
          </button>
          <button
            className={`action ${props.mobile ? 'action-mobile' : ''} ${props.active === 2 ? 'action-active' : ''}`}
            onClick={() => scroller.scrollTo('newton', params)}
          >
            Newton
          </button>
          <button
            className={`action ${props.mobile ? 'action-mobile' : ''} ${props.active === 3 ? 'action-active' : ''}`}
            onClick={() => scroller.scrollTo('cover-bottom', params)}
          >
            Descargar
          </button>
        </div>
      </div>
    );
  }

  if (props.location === 'site' && !props.guest) className = `${className} navigation-bar_site`;
  const arrowColor = props.location === 'filters' ? '#000000' : '#FFFFFF';
  return (
    <div className={className}>
      <IconButton onTouchTap={() => context.router.goBack()}>
        <ArrowBack color={arrowColor} />
      </IconButton>
      <div className="navigation-bar-title">{props.title}</div>
    </div>
  );
}

NavigationBar.propTypes = {
  location: PropTypes.string.isRequired,
  title: PropTypes.string,
  solid: PropTypes.bool,
  dirty: PropTypes.bool,
  active: PropTypes.number,
};

NavigationBar.defaultProps = {
  user: null,
  title: null,
  solid: false,
  dirty: false,
  active: null,
  guest: false,
};

NavigationBar.contextTypes = {
  router: PropTypes.object,
};

export default NavigationBar;
