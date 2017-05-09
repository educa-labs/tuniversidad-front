import React, { Component, PropTypes } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import UniversityCard from '../UniversityCard';
import CareerList from './CareerList';
import Questions from './Questions';



const style = {
  height: '3rem',
};

class Content extends Component {
  componentWillMount() {
    this.setState({ slideIndex: 0 });
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ slideIndex: value });
  }

  render() {
    return (
      <div className="main-content">
        <div className="banner">
          <Tabs
            onChange={this.handleChange}
            value={this.state.slideIndex}
            tabItemContainerStyle={style}
            className="tabs"
          >
            <Tab label="Información general" value={0} />
            <Tab label="Carreras" value={1} />
            <Tab label="Preguntas y respuestas" value={2} />
          </Tabs >
        </div>
        <div className="views">
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
          >
            <UniversityCard {...this.props} />
            <CareerList />
            <Questions />
          </SwipeableViews>
        </div>
      </div>
    );
  }
}



export default Content;
