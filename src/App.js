import React, { Component } from "react";
import HomePage from "./components/HomePage";
import NotFound from "./components/NotFound";
import NoteView from "./components/NoteView";
import FolderView from "./components/FolderView";
import { Route, Switch, Link, withRouter } from "react-router-dom";
import Context from "./Context";
import AddFolder from "./components/AddFolder";
import AddNote from "./components/AddNote";
import PropTypes from "prop-types";
import config from './config';
import "./App.css";

export class App extends Component {
  static contextType = Context;

  state = {
    notes: [],
    folders: []
  };

  getFolders = () => {
    const url = `${config.API_ENDPOINT}/api/folders`;

    return fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(folders => {
        console.log('folders is', folders);
        this.setState({ folders: folders })
      })
      .catch(e => console.log(e.message));
  };

  getNotes = () => {
    const url = `${config.API_ENDPOINT}/api/notes`;

    fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      }
    })
      .then(res => res.json())
      .then(notes => {
        this.setState({ notes: notes })
      })
      .catch(e => console.log(e.message));
  };

  deleteNote = noteId => {
    console.log('noteid is', noteId);
    const url = `${config.API_ENDPOINT}/api/notes/${noteId}`
    fetch(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      }
    })
      .then(res => {
        this.getNotes();
      })
      .catch(err => console.log(err.message));
  };

  deleteFolder = folderId => {
    console.log('folderid is', folderId);
    const url = `${config.API_ENDPOINT}/api/folders/${folderId}`
    fetch(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      }
    })
      .then(res => {
        this.getFolders();
      })
      .catch(err => console.log(err.message));
  };

  addFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    });
  };

  addNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    });
  };

  componentDidMount() {
    this.getFolders();
    this.getNotes();
    console.log('state folders', this.state.folders);
    console.log('state notes', this.state.notes);
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      delete: this.deleteNote,
      deleteFolder: this.deleteFolder,
      getFolders: this.getFolders,
      getNotes: this.getNotes,
      changeAppFolders: this.addFolder,
      changeAppNotes: this.addNote
    };

    return (
      <Context.Provider value={contextValue}>
        <div>
          <header>
            <Link to="/">
              <h2>Noteful</h2>
            </Link>
          </header>
          <Switch>
            <Route
              exact
              path="/"
              component={HomePage} />

            <Route
              path="/folders/addfolder"
              component={AddFolder} />

            <Route
              path="/notes/addnote"
              component={AddNote} />

            <Route
              path="/folders/:folderId"
              component={FolderView} />

            <Route
              path="/notes/:noteId"
              component={NoteView} />

            <Route
              component={NotFound} />
          </Switch>
        </div>
      </Context.Provider>
    );
  }
}

App.propTypes = {
  history: PropTypes.object
};

export default withRouter(App);
