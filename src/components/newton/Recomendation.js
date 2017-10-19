import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import Check from 'material-ui/svg-icons/navigation/check';
import ExpandibleCard from '../ExpandibleCard';
import MakeSwipeable from '../utility/MakeSwipeable';


class Recomentadion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
    };
    this.handleAccept = this.handleAccept.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
  }

  handleAccept() {
    setTimeout(() => this.setState({ index: 0 }), 200);
    setTimeout(this.props.onAccept);
  }

  handleDecline() {
    setTimeout(() => this.setState({ index: 2 }), 200);
    setTimeout(this.props.onDecline);
  }

  render() {
    const { career, onAccept, onDecline, loading, mobile } = this.props;
    const Card = mobile ? MakeSwipeable(ExpandibleCard, this.handleAccept, this.handleDecline, this.state.index) : ExpandibleCard;
    return (
      <div className="recomendation">
        <Card career={career} mobile={mobile} />
        {!mobile && (
          <IconButton onTouchTap={onAccept} disabled={loading}>
            <Check color="#424242" />
          </IconButton>
        )}
        {!mobile && (
          <IconButton onTouchTap={onDecline} disabled={loading}>
            <Close color="#424242" />
          </IconButton>
        )}
      </div>
    );
  }
}

Recomentadion.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
};

export default Recomentadion;
