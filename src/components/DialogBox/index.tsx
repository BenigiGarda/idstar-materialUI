import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { TextField, Button } from "@mui/material";

import "./index.css";
interface SimpleDialogProps {
  openDialog: boolean;
  dialogType: string;
  //   selectedValue: string;
  onClose: (value: string) => void;
}
export default function DialogBox(props: SimpleDialogProps) {
  const { onClose, openDialog, dialogType } = props;

  const handleClose = () => {
    onClose("Close");
  };

  // const handleListItemClick = (value: string) => {
  //   onClose(value);
  // };

  return (
    <Dialog open={openDialog} onClose={handleClose}>
      {dialogType === "Create Post" ? (
        <div className="dialog-container">
          <div className="create-post-header">
            <h3 className="post-create-title">Dialog Box - Buat Post</h3>
            <Button variant="contained" className="create-post">
              Simpan
            </Button>
          </div>
          <div className="create-post-main">
            <TextField
              multiline
              placeholder="Input Title"
              id="outlined-textarea"
              label="Title"
            />
            <TextField
              id="outlined-multiline-static"
              label="Body"
              multiline
              rows={4}
              defaultValue=""
            />
          </div>
        </div>
      ) : dialogType === "Create User" ? (
        <div className="dialog-container">
          <div className="create-post-header">
            <h3 className="post-create-title">Dialog Box - Buat User</h3>
            <Button variant="contained" className="create-post">
              Simpan
            </Button>
          </div>
          <div className="create-post-main">
            <TextField
              multiline
              placeholder="Input Title"
              id="outlined-textarea"
              label="Title"
            />
            <TextField
              id="outlined-multiline-static"
              label="Body"
              multiline
              rows={4}
              defaultValue=""
            />
          </div>
        </div>
      ) : dialogType === "Update User" ? (
        <div className="dialog-container">
          <div className="create-post-header">
            <h3 className="post-create-title">Dialog Box - Update User</h3>
            <Button variant="contained" className="create-post">
              Simpan
            </Button>
          </div>
          <div className="create-post-main">
            <TextField
              multiline
              placeholder="Input Title"
              id="outlined-textarea"
              label="Title"
            />
            <TextField
              id="outlined-multiline-static"
              label="Body"
              multiline
              rows={4}
              defaultValue=""
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </Dialog>
  );
}
