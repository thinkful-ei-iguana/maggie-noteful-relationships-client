import React from "react";
import Context from "../Context";
import PropTypes from "prop-types";
import config from '../config';

export default class NoteView extends React.Component {
  static contextType = Context;

  componentDidMount() {
    const url = `${config.API_ENDPOINT}/api/notes/${this.props.match.params.noteId}`;

    fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      }
    })
      .then(res => res.json())
      .then(note => this.renderNote(note))
      .catch(e => console.log(e.message));
  };

  renderNote = (note) => {
    return (<div className="individ-note">
      <h2>{this.props.location.state.note_name}</h2>
      <p>{this.props.location.state.content}</p>
      <p>{this.props.location.state.date_modified}</p>
    </div>)
  }


  render() {

    return (
      <div id="wrapper">
        <section>
          {this.renderNote()}
          <button
            id={this.props.match.params.noteId}
            onClick={event => {
              event.preventDefault();
              event.stopPropagation();
              this.context.delete(event.target.id);
              this.props.history.push("/");
            }}
          >
            Delete
            </button>
          <br />
          <button onClick={() => this.props.history.goBack()}>Back</button>
        </section>
      </div>
    );
  }

}

NoteView.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
};
