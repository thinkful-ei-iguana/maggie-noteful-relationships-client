import React, { Component } from 'react';
import Context from '../Context';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class FolderView extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = Context;

  renderNotes = () => {
    const currentFolderId = this.props.match.params.folderId;
    const folderNotes = this.context.notes;

    const filteredNotes = folderNotes.filter((note) => {
      return note.folder_id === Number(currentFolderId);
    })
    let noteArr = [];
    for (let i = 0; i < filteredNotes.length; i++) {
      noteArr.push(
        <section className="individual-note-by-folder">
          <Link to={{
            pathname: `/notes/${folderNotes[i].id}`,
            state: {
              key: filteredNotes[i].id,
              id: filteredNotes[i].id,
              note_name: filteredNotes[i].note_name,
              content: filteredNotes[i].content,
              folder_id: filteredNotes[i].folder,
              date_modified: filteredNotes[i].date_modified
            }
          }}>
            <h2>Title: {filteredNotes[i].note_name}</h2>
          </Link>
        </section>
      )
    }
    return noteArr;
  }

  render() {
    return (
      <div id="folder-container">
        <section className="notes-in-folder">
          {this.renderNotes()}
          <div className="folderview-button-container">
            <Link
              tag={Link}
              to="/notes/addnote"
              type="button"
              className="add-note-link"
            >
              Add New Note
          </Link>
            <br />
            <button
              id="folderview-back-button"
              onClick={() => this.props.history.goBack()}>Back</button>

          </div>
        </section >
      </div>
    );
  }
}

FolderView.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
};
