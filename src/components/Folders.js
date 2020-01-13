import React from "react";
import Folder from "./Folder";
import Context from "../Context";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FolderError from "./FolderError";

export default class Folders extends React.Component {
  static contextType = Context;

  render() {

    return (
      <div className="Folders">
        {this.context.folders.map(folder => {
          return (
            <div key={folder.id}>
              <FolderError>
                <Folder
                  key={folder.id}
                  id={folder.id}
                  folder_name={folder.folder_name}
                  history={this.props.history}
                  match={this.props.match}
                />
              </FolderError>
            </div>
          );
        })}
        <Link to={{
          pathname: "/folders/addfolder",
        }}>
          <button className="add-folder">Add Folder</button>
        </Link>

      </div>
    );
  }
}

Folders.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
};
