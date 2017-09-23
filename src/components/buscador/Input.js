import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';


const formClassName = (focused, guest) => (
  `search-input-form ${focused ? 'form-focused' : ''} ${guest ? 'search-input-form-guest' : ''}`
);

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFocused: false,
    };
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  handleOnFocus() {
    this.setState({ inputFocused: true });
  }

  handleOnBlur() {
    this.setState({ inputFocused: false });
  }

  render() {
    const { props } = this;
    const { inputFocused } = this.state;
    return (
      <div className={`search-input ${props.guest ? 'search-input-guest' : ''}`}>
        {props.guest ? (
          <div className="search-input-empty">
            <div className="navigation-bar-logo">
              <div className="logo-tuni logo-tuni-blue" />
            </div>
          </div>
        ) : null}
        <form
          onSubmit={props.handleSubmit}
          className={formClassName(inputFocused, props.guest)}
        >
          <IconButton type="submit"><Search color="#424242" /></IconButton>
          <input
            type="text"
            className={inputFocused ? 'input-focused' : ''}
            value={props.value}
            onChange={e => props.handleOnChange(e.target.value)}
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
            placeholder={props.placeholder}
          />
          <FlatButton
            label="Buscar"
            type="submit"
            labelStyle={{
              color: '#0091EA',
            }}
          />
        </form>
        <div className="search-input-empty">
          <FlatButton
            label="Regístrate"
            labelStyle={{ color: '#0091EA' }}
            style={{ marginRight: '5px' }}
            onTouchTap={() => this.context.router.push('/signup')}
          />
          <RaisedButton
            label="Inicia Sesión"
            backgroundColor="#0091EA"
            labelColor="#FFFFFF"
            style={{ marginRight: '5px' }}
            onTouchTap={() => this.context.router.push('/login')}
          />
        </div>
      </div>
    );
  }
}

SearchInput.contextTypes = {
  router: PropTypes.object,
};

export default SearchInput;
