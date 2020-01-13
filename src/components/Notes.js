import React from "react";
import Note from "./Note";
import Context from "../Context";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import NoteError from "./NoteError";
import config from '../config';

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
          id="add-note-link"
          to={{
            pathname: "/notes/addnote",

          }}>
          Add new note
        </Link>
      </div >
    );
  }
}


// render() {
//   let filteredNotes;
//   const selectedFolderId = this.props.match.params.folderId;
//   if (!selectedFolderId) {
//     filteredNotes = this.context.notes;
//   } else {
//     filteredNotes = this.context.notes.filter(
//       note => note.folderId === selectedFolderId
//     );
//   }
//   return (
//     <div>
//       {filteredNotes.map(note => {
//         return (
//           <div className="note" key={note.id}>
//             <NoteError>
//               <Note
//                 key={note.id}
//                 id={note.id}
//                 name={note.name}
//                 modified={note.modified}
//                 history={this.props.history}
//                 match={this.props.match}
//               />
//               <button
//                 id={note.id}
//                 onClick={event => {
//                   event.preventDefault();
//                   this.context.delete(event.target.id);
//                 }}
//               >
//                 Delete
//                 </button>
//             </NoteError>
//           </div>
//         );
//       })}
//       <Link to="/AddNote">
//         <button>Add new note</button>
//       </Link>
//     </div>
//   );
// }
// }

// Notes.propTypes = {
//   history: PropTypes.object,
//   match: PropTypes.object
// };
