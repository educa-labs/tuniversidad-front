import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import is from 'is_js';
import TextField from 'material-ui/TextField';
import { addEssay, getEssays } from '../../actions/essays';
import { getGoals } from '../../actions/goals';
import { checkScore, validateDate } from '../../helpers/numeral';
import NavigationBar from '../../components/NavigationBar';
import SelectInput from '../inputs/SelectInput';
import DatePicker from '../inputs/DatePicker';
import Loading from '../../components/Loading';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      score: '',
      subject_id: this.props.active,
      date: '',
      error: {},
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    if (is.null(this.props.subjects)) {
      this.context.router.push('site/profile');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.shouldFetch !== nextProps.shouldFetch) {
      if (is.not.null(nextProps.shouldFetch)) {
        this.props.getGoals(nextProps.token);
        this.props.getEssays(nextProps.token, nextProps.shouldFetch);
      }
    }
    if (this.props.essays !== nextProps.essays){
      if (is.not.null(this.props.shouldFetch) && is.null(nextProps.shouldFetch)) {
        this.context.router.goBack();
      }
    }
  }

  onSubmit() {
    const { title, score, subject_id, date } = this.state;
    const error = {};
    if (!checkScore(score)) error.score = 'Puntaje Inválido';
    if (!validateDate(date)) error.date = 'Esta fecha no existe';
    if (is.not.empty(error)) {
      this.setState({ error });
      return;
    }
    if (!this.props.requesting) {
      this.props.addEssay(this.props.token, title, subject_id, score, date);
    }
  }

  disabled() {
    const { title, score, subject_id, date } = this.state;
    if (!date) return true;
      for (const s of date.split('-')) {
        if (s === 'null') return true;
      }
    return title === '' || score === '' || subject_id === '';
  }

  render() {
    if (is.null(this.props.subjects)) return <Loading />;
    return (
      <div className="filters-mobile">
        <NavigationBar location="filters" title="Nuevo ensayo" />
        <div className="fields">
          <div className="form__field">
            <TextField
              floatingLabelText="Título"
              hintText="Ej: Primer ensayo"
              floatingLabelFixed
              fullWidth
              onChange={(e, val) => this.setState({ title: val })}
            />
          </div>
          <div className="form__field">
            <SelectInput
              title="Asignatura"
              items={this.props.subjects}
              value={this.state.subject_id}
              handleChange={subject_id => this.setState({ subject_id })}
            />
          </div>
          <div className="form__field">
            <TextField
              onChange={(e, val) => this.setState({
                score: Number(val),
                error: Object.assign({}, this.state.error, {
                  score: '',
                }),
              })}
              floatingLabelText="Puntaje"
              type="number"
              fullWidth
              errorText={this.state.error ? this.state.error.score : ''}
            />
          </div>
          <div className="form__field">
            <DatePicker
              handleChange={val => this.setState({ date: val })}
              date={this.state.date}
              errorText={this.state.error ? this.state.error.date : ''}
              year={2017}
              mobile={this.props.mobile}
            />
          </div>
        </div>
        <div className="dialog-footer-mobile">
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
    token: state.user.currentUser.auth_token,
    subjects: state.fetch.subjects,
    essays: {
      1: state.essays[1],
      2: state.essays[2],
      3: state.essays[3],
      4: state.essays[4],
    },
    shouldFetch: state.essays.shouldFetch,
    requesting: state.essays.requesting,
    active: state.profileNavigation.essay,
  };
}

export default connect(mapStateToProps, {
  addEssay,
  getEssays,
  getGoals,
})(Form);
