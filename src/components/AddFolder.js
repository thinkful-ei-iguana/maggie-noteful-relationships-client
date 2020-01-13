import React, { Component } from "react";
import nextId from "react-id-generator";
import Context from "../Context";
import PropTypes from "prop-types";
import config from '../config';

class AddFolder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: {
        value: "",
        touched: false
      },
      id: {
        value: "",
        touched: false
      },
      error: null,
      baseURL: `${config.API_ENDPOINT}/api/folders`
    };
  }

  static contextType = Context;

  settingStateFromFormInput = name => {
    this.setState({
      name: {
        value: name
      },
      id: {
        value: nextId()
      }
    });
  };

  readyInputForAPI = e => {
    e.preventDefault();
    const input = {
      folder_name: `${this.state.name.value}`,
      id: `${this.state.id.value}`
    };
    this.createNewFolderAPI(input);
  };

  createNewFolderAPI = input => {
    const url = `${config.API_ENDPOINT}/api/folders`;
    const inputValue = JSON.stringify(input);
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
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
        console.log('data is', data);
        console.log('this.context is', this.context);
        this.context.changeAppFolders(data)
        this.props.history.push('/');
      })
      .catch(err => console.error(err))
  };

  render() {
    return (
      <form
        className="add-folder"
        onSubmit={e => {
          this.readyInputForAPI(e);
        }}
      >
        <label htmlFor="new-folder">
          Folder Name:
          <input
            type="text"
            name="folder"
            id="new-folder"
            onChange={e => this.settingStateFromFormInput(e.target.value)}
          />
        </label>
        <div className="form-buttons">
          <button type="button" onClick={() => this.props.history.goBack()}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    );
  }
}
AddFolder.propTypes = {
  history: PropTypes.object
};

export default AddFolder;
