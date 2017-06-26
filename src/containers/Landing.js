import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import MediaQuery from 'react-responsive';
import { connect } from 'react-redux';
import { Element } from 'react-scroll';
import is from 'is_js';
import Cover from '../components/landing/Cover';
import Body from '../components/landing/Body';
import NewtonSection from '../components/landing/NewtonSection';
import CoverBottom from '../components/landing/CoverBottom';
import Footer from '../components/landing/Footer';
import NavigationBar from '../components/NavigationBar';
import '../styles/Landing.css';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solid: false,
      dirty: false,
      active: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.getActive = this.getActive.bind(this);
  }

  componentWillMount() {
    console.log('Will');
    // if (is.not.null(this.props.user)) this.context.router.replace('/site/profile');
  }

  componentDidMount() {
    console.log('Did');
    window.addEventListener('scroll', this.handleScroll);
    const offsets = [
      findDOMNode(this.login).offsetTop,
      findDOMNode(this.body).offsetTop,
      findDOMNode(this.newton).offsetTop,
      findDOMNode(this.coverBottom).offsetTop,
    ];
    this.setState({ offsets });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => console.log('Nos fuimos'));
  }

  getActive(pos) {
    const { offsets } = this.state;
    for (let i = 0; i < 4; i += 1) {
      if (i === 3) return i;
      if (offsets[i] <= pos && pos < offsets[i + 1]) return i;
    }
    return 0;
  }

  handleScroll() {
    const pos = document.body.scrollTop + 48;
    const newActive = this.getActive(pos);
    if (newActive !== this.state.active) {
      this.setState({ active: newActive });
    }

    if (pos > this.state.offsets[1] - 1 && !this.state.solid) {
      if (!this.state.dirty) {
        this.setState({
          solid: true,
          dirty: true,
        });
      } else {
        this.setState({
          solid: true,
        });
      }
    }
    if (pos <= this.state.offsets[1] - 1 && this.state.solid) {
      this.setState({ solid: false });
    }
  }
  
  render() {
    return (
      <div>
        <MediaQuery maxDeviceWidth={720}>
          <NavigationBar
            location="landing"
            solid={this.state.solid}
            dirty={this.state.dirty}
            active={this.state.active}
            mobile
          />
          <Element name="login" ref={e => this.login = e}><Cover mobile /></Element>
          <Element name="body" ref={e => this.body = e} ><Body mobile /></Element>
          <Element name="newton" ref={e => this.newton = e} ><NewtonSection mobile /></Element>
          <Element name="cover-bottom" ref={e => this.coverBottom = e}><CoverBottom mobile /></Element>
          <Element name="footer" ref={e => this.footer = e}><Footer mobile /></Element>
        </MediaQuery>
        <MediaQuery minDeviceWidth={721}>
          <NavigationBar
            location="landing"
            solid={this.state.solid}
            dirty={this.state.dirty}
            active={this.state.active}
          />
          <Element name="login" ref={e => this.login = e}><Cover /></Element>
          <Element name="body" ref={e => this.body = e} ><Body /></Element>
          <Element name="newton" ref={e => this.newton = e} ><NewtonSection /></Element>
          <Element name="cover-bottom" ref={e => this.coverBottom = e}><CoverBottom /></Element>
          <Element name="footer" ref={e => this.footer = e}><Footer /></Element>
        </MediaQuery>
      </div>
    );
  }
}

Landing.contextTypes = {
  router: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    user: state.user.currentUser,
  };
}

export default connect(mapStateToProps)(Landing);
