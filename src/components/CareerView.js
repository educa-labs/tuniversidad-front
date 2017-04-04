import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import NavigationBar from './NavigationBar';
import { toggleCompress } from '../actions/compress';
import '../styles/CareerView.css';

class CareerView extends Component {
  componentWillMount() {
    this.setState({
      career: {
        id: 1,
        title: 'Arte',
        universidad: 'Pontificia Universidad Católica de Chile',
        admision: {
          weights: {
            nem: 20,
            ranking: 20,
            lenguaje: 30,
            matematicas: 20,
            historia: 10,
          },
          system: {
            name: 'PSU',
            cut: 416,
          },
        },
        info: {
          year: 2016,
          area: 'Humanidades',
          duration: 12,
          slots: 150,
          tariff: 5200000,
          employability: 92,
          salary: 1200000,
        },
      },
    });
    if (this.props.compress) this.props.toggleCompress();
  }

  render() {
    const { career } = this.state;
    const path = [
      { value: 'careers', label: 'Carreras' },
      { value: 'universities', label: career.universidad },
      { value: `careers/${career.id}`, label: career.title },
    ];
    return (
      <div className="career-view">
        <NavigationBar path={path} />
        <div className="career-header">
          <span className="title">{career.title}</span><br />
          <span>{career.universidad}</span>
        </div>
      </div>
    );
  }
}

CareerView.propTypes = {
  compress: PropTypes.bool.isRequired,
  toggleCompress: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  return {
    compress: state.compress,
  };
}

export default connect(mapStateToProps, {
  toggleCompress,
})(CareerView);
