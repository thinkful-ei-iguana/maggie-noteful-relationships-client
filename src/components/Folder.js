import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Context from '../Context';

export default class Folder extends Component {
  static contextType = Context;

  static defaultProps = {
    key: '',
    id: '',
    folder_name: '',
    history: '',
    match: {
      params: {}
    }
  }
  render() {
    return (
      <div className="individual-folder">
        <Link to={{
          pathname: `/folders/${this.props.id}`,
          state: {
            id: this.props.id,
            folder_name: this.props.folder_name
          }
        }}>
          <div className="Folder" id={this.props.id}>
            <h3> {this.props.folder_name}</h3>
          </div>
          <button
            id={this.props.match.params.noteId}
            onClick={(event) => {
              event.preventDefault();
              this.context.deleteFolder(this.props.id);
              this.props.history.push("/");
            }}
          >
            Delete
            </button>
        </Link >
      </div>
    );
  }
}

Folder.propTypes = {
  id: PropTypes.number.isRequired,
  folder_name: PropTypes.string.isRequired,
  history: PropTypes.object,
  match: PropTypes.object
};