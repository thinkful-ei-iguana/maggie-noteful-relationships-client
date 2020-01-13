import React, { Component } from 'react';
import Context from '../Context';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import config from '../config';

class AddNote extends Component {
  static contextType = Context;

  constructor(props) {
    super(props);

    this.state = {
      name: {
        value: "",
        touched: false
      },
      content: {
        value: ""
      },
      folderId: {
        value: ""
      },
      modified: {
        value: ""
      },
      error: null,
      baseURL: `${config.API_ENDPOINT}/api/notes`
    };
  }

  setStateName = name => {
    this.setState({
      name: {
        value: name,
        touched: true
      },
      modified: {
        value: new Date()
      }
    });
  };

  setStateContent = content => {
    this.setState({
      content: {
        value: content
      }
    });
  };

  setStateFolderId = folderId => {
    this.setState({
      folderId: {
        value: folderId
      }
    });
  };

  validateName = () => {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "Name is required";
    }
  };

  readyInput = e => {
    e.preventDefault();
    const folderIdValue = (this.state.folderId.value === '') ? this.context.folders[0].id : this.state.folderId.value
    const input = {
      note_name: this.state.name.value,
      content: this.state.content.value,
      folder_id: folderIdValue
    };
    this.postNote(input);
  };

  postNote = input => {
    const inputValue = JSON.stringify(input);
    return fetch(`${config.API_ENDPOINT}/api/notes`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: inputValue
    })
      .then(response => {
        if (!response.ok) {
          console.log("An error occured");
          throw new Error("This is a problem");
        }
        return response;
      })
      .then(res => res.json())
      .then(data => {
        this.context.changeAppNotes(data);
        this.props.history.push('/');
      });
  };

  render() {
    return (
      <form
        className="add-note"
        onSubmit={e => {
          this.readyInput(e);
        }}
      >
        <div className="form-inputs">
          <label htmlFor="note-name">
            Name this note:
            <input
              type="text"
              name="name"
              id="note-name"
              required
              onChange={e => this.setStateName(e.target.value)}
            />
            {this.state.name.touched && <p>"Name field is required"</p>}
          </label>
          <label htmlFor="note-content">
            Note content:
            <input
              type="text"
              name="content"
              id="note-content"
              className="content"
              required
              onChange={e => this.setStateContent(e.target.value)}
            />
          </label>
          <select
            id="assign-to-folder"
            onChange={e => this.setStateFolderId(e.target.value)}>
            Folder
            {this.context.folders.map(folder => (
              <option
                key={folder.id}
                value={folder.id}
                name={folder.folder_name}>
                {folder.folder_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-buttons">
          <button
            type="button"
            onClick={() => this.props.history.push('/')}>
            Cancel
          </button>
          <button
            type="submit"
            className="submit-button"
            disabled={this.validateName()}>
            Submit
          </button>
        </div>
      </form>
    );
  }
}
AddNote.propTypes = {
  history: PropTypes.object
};

export default withRouter(AddNote);
