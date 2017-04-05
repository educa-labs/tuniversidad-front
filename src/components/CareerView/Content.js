import React, { PropTypes, Component, cloneElement } from 'react';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';

class Content extends Component {
  componentWillMount() {
    this.toggleNewQuestion = this.toggleNewQuestion.bind(this);
    this.setState({ newQuestion: false });
  }

  toggleNewQuestion() {
    this.setState({ newQuestion: !this.state.newQuestion });
  }

  render() {
    const { active, onTabClick } = this.props;
    const { newQuestion } = this.state;
    return (
      <div className="content">
        <div className="tabs">
          <div
            className={`tab ${active === 0 ? 'active' : ''}`}
            onClick={() => onTabClick(0)}
          >
            Información General
          </div>
          <div
            onClick={() => onTabClick(1)}
            className={`tab ${active === 1 ? 'active' : ''}`}
          >
            Malla Curricular
          </div>
          <div
            onClick={() => onTabClick(2)}
            className={`tab ${active === 2 ? 'active' : ''}`}
          >
            Preguntas y Respuestas
          </div>
          <div className={`new-question ${active !== 2 ? 'hide' : ''}`}>
            <div className="button" onClick={this.toggleNewQuestion}>
              {newQuestion ? 'Enviar pregunta' : 'Nueva pregunta'}
            </div>
          </div>
          <Close
            className="close"
            color={newQuestion && active === 2 ? '#C9C9C9' : '#424242'}
          />
        </div>
        {cloneElement(this.props.children[active], {
          newQuestion,
        })}
      </div>
    );
  }
}

Content.propTypes = {
  active: PropTypes.number.isRequired,
  onTabClick: PropTypes.func.isRequired,
};

export default Content;
