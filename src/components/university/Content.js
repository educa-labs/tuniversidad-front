import React, { Component } from 'react';
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
