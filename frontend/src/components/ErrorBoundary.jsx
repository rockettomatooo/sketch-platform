import React from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { fallback, error, children } = this.props;

    if (hasError || error) {
      return fallback;
    }

    return <>{children}</>;
  }
}
ErrorBoundary.propTypes = {
  fallback: PropTypes.node.isRequired,
  error: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

ErrorBoundary.defaultProps = {
  error: false,
};
