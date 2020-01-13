import React from "react";

const Context = React.createContext({
  folders: [],
  notes: [],
  delete: function () { },
  deleteFolder: function () { },
  getFolders: function () { },
  getNotes: function () { },
  changeAppFolders: function () { },
  changeAppNotes: function () { }
});

export default Context;
