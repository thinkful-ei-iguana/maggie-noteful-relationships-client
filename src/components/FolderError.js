import React, { Component } from "react";

class FolderError extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Could not display this Folder.</h2>
          <button>Go Home</button>
        </div>
      );
    }
    return this.props.children;
  }
}
export default FolderError;
