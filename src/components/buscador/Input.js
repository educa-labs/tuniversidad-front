import React from 'react';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';
import FlatButton from 'material-ui/FlatButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';


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
    const empty = <div className="is-48x48" />;  
    return (
      <div className="search-input">
        <form
          onSubmit={props.handleSubmit}
          className={`search-input-form ${inputFocused ? 'form-focused' : ''}`}
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
          {props.afterSearch ? (
            <IconButton
              type="button"
              onClick={props.clearSearch}
              style={{ margin: '0 20px' }}
            >
              <CloseIcon color="#C9C9C9" />
            </IconButton>
            ) : (
              <FlatButton
                label="Buscar"
                type="submit"
                labelStyle={{
                  color: '#0091EA',
                }}
              />
          )}
        </form>
        <div className="search-input-empty" />
      </div>
    );
  }
}

export default SearchInput;
