import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Arrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import '../styles/NavigationBar.css';


function NavigationBar(props, context) {
  const { path } = props;
  const buttons = [];
  for (let i = 0; i < path.length; i += 1) {
    buttons.push(
      <div className="navigation-bar-item" key={i}>
        <FlatButton
          label={path[i].label}
          onTouchTap={() => context.router.push(path[i].value)}
          labelStyle={i === path.length - 1 ? { color: '#C9C9C9' } : { color: '#0091EA' }}
          hoverColor="white"
        />
        {i === path.length - 1 ? null : <Arrow color="#C9C9C9" />}
      </div>,
    );
  }
  return (
    <div className="navigation-bar">
      {buttons}
    </div>
  );
}

NavigationBar.defaultProps = {
  path: [
    { value: 'careers', label: 'Carreras' },
  ],
};

NavigationBar.propTypes = {
  path: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
};

NavigationBar.contextTypes = {
  router: PropTypes.object,
};

export default NavigationBar;
