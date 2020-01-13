import React, { Component } from "react";
import Context from "../Context";
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import PropTypes from "prop-types";
import Note from './Note';
import CircleButton from './CircleButton';
import config from '../config';

// export default class FolderView extends React.Component {
//   static contextType = Context;

//   componentDidMount() {
//     const url = `${config.API_ENDPOINT}/api/notes/${this.props.match.params.noteId}`;

//     fetch(url, {
//       method: "GET",
//       headers: {
//         "content-type": "application/json",
//       }
//     })
//       .then(res => res.json())
//       .then(note => this.renderNote(note))
//       .catch(e => console.log(e.message));
//   };

//   renderFolder = (note) => {
//     return (<div>
//       <h2>{this.props.location.state.folder_name}</h2>
//       <p>{this.props.location.state.content}</p>
//       {/* <p>{this.props.location.state.date_last_modified}</p> */}
//     </div>)
//   }


//   render() {
//     console.log('this.props.location.state is', this.props.id);
//     return (
//       <div id="wrapper">
//         <section>
//           <button onClick={() => this.props.history.goBack()}>Back</button>
//         </section>
//         <main>
//           {this.renderFolder()}
//           <button
//             id={this.props.match.params.noteId}
//             onClick={event => {
//               event.preventDefault();
//               event.stopPropagation();
//               this.context.delete(event.target.id);
//               this.props.history.push("/");
//             }}
//           >
//             Delete
//             </button>
//         </main>
//       </div>
//     );
//   }

// }

export default class FolderView extends Component {

  state = {
    notes: []
  }
  static contextType = Context;
  static defaultProps = {
    match: {
      params: {}
    }
  };

  // componentDidMount() {
  //   const url = `${config.API_ENDPOINT}/api/notes`;

  //   fetch(url, {
  //     method: "GET",
  //     headers: {
  //       "content-type": "application/json",
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(notes => {
  //       this.setState({ notes: notes });
  //       this.renderNotes(notes);
  //       console.log('oooooo');
  //     })
  //     .catch(e => console.log(e.message));
  // }

  renderNotes = () => {
    const folderNotes = this.context.notes;
    console.log('foldernotes is', folderNotes);
    let noteArr = [];
    for (let i = 0; i < folderNotes.length; i++) {
      noteArr.push(
        // <section className="individual-note-by-folder">
        //   <p>{folderNotes[i].note_name}</p>
        //   <p>{folderNotes[i].content}</p>
        //   <p>{format(folderNotes[i].date_modified, "MM/dd/yyyy")}</p>
        // </section>
        <section className="individual-note-by-folder">
          <Link to={{
            pathname: `/notes/${folderNotes[i].id}`,
            state: {
              key: folderNotes[i].id,
              id: folderNotes[i].id,
              note_name: folderNotes[i].note_name,
              content: folderNotes[i].content,
              date_modified: folderNotes[i].date_modified
            }
          }}>
            <h2>Title: {folderNotes[i].note_name}</h2>
          </Link>
        </section>
      )
    }
    return noteArr;
  }

  render() {
    // const folderId = this.props.match.params.folderId;
    // const { notes, getNotes } = this.context;
    // const folderNotes = getNotes(notes, folderId);
    // console.log('foldernotes', folderNotes);

    return (
      <div>
        <section className="notes-in-folder">
          {this.renderNotes()}
        </section>
        <button
          type="button"
          onClick={() => this.props.history.goBack()}>
          Back
        </button>
      </div>
      // <section className="NoteListMain">
      //   <ul>
      //     {folderNotes.map(note => (
      //       <li key={note.id}>
      //         <Note id={note.id} name={note.name} modified={note.modified} />
      //       </li>
      //     ))}
      //   </ul>
      //   <div className="NoteListMain__button-container">
      //     <CircleButton
      //       tag={Link}
      //       to="/add-note"
      //       type="button"
      //       className="NoteListMain__add-note-button"
      //     >
      //       +
      //       <br />
      //       Note
      //     </CircleButton>
      //   </div>
      // </section>
    );
  }
}

FolderView.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
};
