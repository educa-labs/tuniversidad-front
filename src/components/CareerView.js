import React, { PropTypes, Component } from 'react';
import NavigationBar from './NavigationBar';
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

export default CareerView;
