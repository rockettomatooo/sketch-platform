import React from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  }

  static getDerivedStateFromError(e) {
    return { hasError: true }
  }
  render() {
    const { hasError } = this.state;
    const { fallback, error,children } = this.props;

    if(hasError || error) {
      return fallback;
    }

    return <>{children}</>
  }


  static propTypes = {
    fallback: PropTypes.node.isRequired,
    error: PropTypes.bool
  }
  static defaultProps= {
    error:false
  }
}