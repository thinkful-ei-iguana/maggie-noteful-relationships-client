import React from "react";
import Context from "../Context";
import { Link } from "react-router-dom";

export default class Notes extends React.Component {
  static contextType = Context;

  renderNotes = () => {
    const allNotes = this.context.notes;
    let noteArr = [];
    for (let i = 0; i < allNotes.length; i++) {
      noteArr.push(
        <div key={allNotes[i].id} className="each-note">
          <Link to={{
            pathname: `/notes/${allNotes[i].id}`,
            state: {
              id: allNotes[i].id,
              note_name: allNotes[i].note_name,
              content: allNotes[i].content,
              date_modified: allNotes[i].date_modified
            }
          }}>
            <h2>Title: {allNotes[i].note_name}</h2>
          </Link>
          <br />
          <button
            type="submit"
            onClick={event => {
              event.preventDefault();
              this.context.delete(allNotes[i].id);
            }}
          >
            Delete
          </button>
        </div>);
    }
    return noteArr;
  }

  render() {
    return (
      <div>
        <section list="true" className="notes-list">
          {this.renderNotes()}
        </section>
        <Link
          className="add-note-link"
          to={{
            pathname: "/notes/addnote",

          }}>
          Add new note
        </Link>
      </div >
    );
  }
}
