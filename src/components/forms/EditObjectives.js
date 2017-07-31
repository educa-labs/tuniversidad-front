import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import is from 'is_js';
import TextField from 'material-ui/TextField';
import { updateUserObjectives } from '../../actions/objectives';
import { updateUserInfo } from '../../actions/user';
import { checkScore } from '../../helpers/numeral';
import NavigationBar from '../../components/NavigationBar';
import Loading from '../../components/Loading';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: '',
      math: '',
      science: '',
      history: '',
      nem: '',
      ranking: '',
      error: {},
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    if (is.null(this.props.objectives)) {
      this.context.router.push('site/profile');
      return;
    }
    this.setState({
      language: this.props.objectives.language,
      math: this.props.objectives.math,
      science: this.props.objectives.science,
      history: this.props.objectives.history,
      nem: this.props.user.nem,
      ranking: this.props.user.ranking,
      error: {},
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.context.router.replace('/site/profile');
    }
  }

  onSubmit() {
    const { language, math, science, history, nem, ranking } = this.state;
    const fields = [
      'language',
      'math',
      'science',
      'history',
      'nem',
      'ranking',
    ];
    const error = {};
    const errMsg = 'Puntaje Inválido';
    fields.forEach((fld) => {
      if (!checkScore(this.state[fld] && this.state[fld])) {
        error[fld] = errMsg;
      }
    });
    if (is.not.empty(error)) this.setState({ error });
    else {
      this.props.updateUserObjectives(this.props.token, language, math, history, science);
      this.props.updateUserInfo(this.props.user.id, this.props.token, {
        nem,
        ranking,
      });
    }
  }

  getError(field) {
    return this.state.error[field] ? this.state.error[field] : '';
  }


  logChage(field, val) {
    this.setState({
      [field]: val ? Number(val) : '',
      error: Object.assign({}, this.state.error, {
        [field]: '',
      }),
    });
  }

  disabled() {
    const { language, math, nem, ranking } = this.state;
    return language === '' || math === '' || nem === '' || ranking === '';
  }

  render() {
    return (
      <div className="edit-form-container">
        <NavigationBar location="filters" />
        <div className="filters__header">Mi Objetivo</div>
        <div className="fields">
          <div className="row">
            <div className="form__field">
              <TextField
                onChange={(e, val) => this.logChage('language', val)}
                value={this.state.language}
                floatingLabelText="Lenguaje"
                fullWidth
                type="number"
                errorText={this.getError('language')}
              />
            </div>
            <div className="form__field">
              <TextField
                onChange={(e, val) => this.logChage('math', val)}
                value={this.state.math}
                floatingLabelText="Matemáticas"
                fullWidth
                type="number"
                errorText={this.getError('math')}
              />
            </div>
          </div>
          <div className="row">
            <div className="form__field">
              <TextField
                onChange={(e, val) => this.logChage('history', val)}
                value={this.state.history}
                floatingLabelText="Historia"
                fullWidth
                type="number"
                errorText={this.getError('history')}
              />
            </div>
            <div className="form__field">
              <TextField
                onChange={(e, val) => this.logChage('science', val)}
                value={this.state.science}
                floatingLabelText="Ciencias"
                fullWidth
                type="number"
                errorText={this.getError('science')}
              />
            </div>
          </div>
          <div className="row">
            <div className="form__field">
              <TextField
                onChange={(e, val) => this.logChage('nem', val)}
                floatingLabelText="Nem"
                fullWidth
                type="number"
                value={this.state.nem}
                errorText={this.getError('nem')}
              />
            </div>
            <div className="form__field">
              <TextField
                onChange={(e, val) => this.logChage('ranking', val)}
                floatingLabelText="Ranking"
                fullWidth
                type="number"
                value={this.state.ranking}
                errorText={this.getError('ranking')}
              />
            </div>
          </div>
        </div>
        <div className="dialog-footer">
          <FlatButton
            label="Cancelar"
            onTouchTap={this.context.router.goBack}
            secondary
          />
          <FlatButton
            label="OK"
            onTouchTap={this.onSubmit}
            secondary
            disabled={this.disabled()}
          />
        </div>
      </div>
    );
  }
}

Form.contextTypes = {
  router: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    objectives: state.objectives.objectives,
    user: state.user.currentUser,
    token: state.user.currentUser.auth_token,
  };
}

export default connect(mapStateToProps, {
  updateUserObjectives,
  updateUserInfo,
})(Form);
