import React from 'react';

class ErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    console.error('Auth Error:', error, info);
  }
  render() {
    return this.props.children;
  }
}

export default ErrorBoundary; 