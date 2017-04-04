import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import NavigationBar from '../NavigationBar';
import CareerHeader from './CareerHeader';
import Content from './Content';
import General from './General';
import { toggleCompress } from '../../actions/compress';


class CareerView extends Component {
  componentWillMount() {
    this.handleTabClick = this.handleTabClick.bind(this);
    this.setState({
      active: 0,
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
  handleTabClick(active) {
    this.setState({ active });
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
        <CareerHeader title={career.title} subtitle={career.universidad} />
        <Content active={this.state.active} onTabClick={this.handleTabClick}>
          <General career={career} />
          <div>
            Chao
          </div>
          <div>
            Amigos
          </div>
        </Content>
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
