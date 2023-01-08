import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { TextField, Button } from "@mui/material";

import "./index.css";
import axios from "axios";
interface SimpleDialogProps {
  openDialog: boolean;
  dialogType: string;
  userId?: number | unknown;
  setLoading?: (value: boolean) => void;
  onClose: (value: string) => void;
}
export default function DialogBox(props: SimpleDialogProps) {
  const { onClose, openDialog, dialogType, userId } = props;

  const handleClose = () => {
    onClose("Close");
  };

  const [dataFormRegister, setDataFormRegister] = useState<{
    name: string;
    email: string;
    gender: string;
    status: string;
  }>({
    name: "",
    email: "",
    gender: "",
    status: "",
  });

  const [dataFormPost, setDataFormPost] = useState<{
    title: string;
    body: string;
  }>({
    title: "",
    body: "",
  });

  async function createUser() {
    const config = {
      headers: {
        Authorization:
          "Bearer f9b7b4b270855085710020ab025f155fc18cbc7f3901576ae940d96624b7db16",
      },
    };
    const body = {
      name: dataFormRegister.name,
      email: dataFormRegister.email,
      gender: dataFormRegister.gender,
      status: dataFormRegister.status,
    };
    await axios
      .post("https://gorest.co.in/public/v2/users", body, config)
      .then((res) => {
        handleClose();
        window.location.reload();
      });
  }

  async function updateUser() {
    const config = {
      headers: {
        Authorization:
          "Bearer f9b7b4b270855085710020ab025f155fc18cbc7f3901576ae940d96624b7db16",
      },
    };
    const body = {
      name: dataFormRegister.name,
      email: dataFormRegister.email,
      status: dataFormRegister.status,
    };
    await axios
      .patch(`https://gorest.co.in/public/v2/users/${userId}`, body, config)
      .then((res) => {
        handleClose();
        window.location.reload();
      });
  }

  async function createPost() {
    const config = {
      headers: {
        Authorization:
          "Bearer f9b7b4b270855085710020ab025f155fc18cbc7f3901576ae940d96624b7db16",
      },
    };
    const body = {
      title: dataFormPost.title,
      body: dataFormPost.body,
    };
    await axios
      .post(
        `https://gorest.co.in/public/v2/users/${userId}/posts`,
        body,
        config
      )
      .then((res) => {
        handleClose();
        props.setLoading?.(true);
      });
  }

  return (
    <Dialog open={openDialog} onClose={handleClose}>
      {dialogType === "Create Post" ? (
        <div className="dialog-container">
          <div className="create-post-header">
            <h3 className="post-create-title">Dialog Box - Buat Post</h3>
            <Button
              variant="contained"
              className="create-post"
              onClick={() => createPost()}
            >
              Simpan
            </Button>
          </div>
          <div className="create-post-main">
            <TextField
              multiline
              placeholder="Input Title"
              id="outlined-textarea"
              label="Title"
              onChange={(event) =>
                setDataFormPost({
                  ...dataFormPost,
                  title: event.target.value,
                })
              }
            />
            <TextField
              id="outlined-multiline-static"
              label="Body"
              multiline
              rows={4}
              defaultValue=""
              onChange={(event) =>
                setDataFormPost({
                  ...dataFormPost,
                  body: event.target.value,
                })
              }
            />
          </div>
        </div>
      ) : dialogType === "Create User" ? (
        <div className="dialog-container">
          <div className="create-post-header">
            <h3 className="post-create-title">Dialog Box - Buat User</h3>
            <Button
              variant="contained"
              className="create-post"
              onClick={() => createUser()}
            >
              Simpan
            </Button>
          </div>
          <div className="create-post-main">
            <TextField
              multiline
              placeholder="Name"
              id="outlined-textarea"
              label="Name"
              value={dataFormRegister.name}
              onChange={(event) =>
                setDataFormRegister({
                  ...dataFormRegister,
                  name: event.target.value,
                })
              }
            />
            <TextField
              id="outlined-textarea"
              label="Email"
              placeholder="example@example.com"
              value={dataFormRegister.email}
              onChange={(event) =>
                setDataFormRegister({
                  ...dataFormRegister,
                  email: event.target.value,
                })
              }
            />
            <TextField
              id="outlined-textarea"
              label="Gender"
              placeholder="Male/Female"
              value={dataFormRegister.gender}
              onChange={(event) =>
                setDataFormRegister({
                  ...dataFormRegister,
                  gender: event.target.value,
                })
              }
            />
            <TextField
              id="outlined-textarea"
              label="Status"
              placeholder="Active/Inactive"
              value={dataFormRegister.status}
              onChange={(event) =>
                setDataFormRegister({
                  ...dataFormRegister,
                  status: event.target.value,
                })
              }
            />
          </div>
        </div>
      ) : dialogType === "Update User" ? (
        <div className="dialog-container">
          <div className="create-post-header">
            <h3 className="post-create-title">Dialog Box - Update User</h3>
            <Button
              variant="contained"
              className="create-post"
              onClick={() => updateUser()}
            >
              Simpan
            </Button>
          </div>
          <div className="create-post-main">
            <TextField
              multiline
              placeholder="Name"
              id="outlined-textarea"
              label="Name"
              value={dataFormRegister.name}
              onChange={(event) =>
                setDataFormRegister({
                  ...dataFormRegister,
                  name: event.target.value,
                })
              }
            />
            <TextField
              id="outlined-textarea"
              label="Email"
              placeholder="example@example.com"
              value={dataFormRegister.email}
              onChange={(event) =>
                setDataFormRegister({
                  ...dataFormRegister,
                  email: event.target.value,
                })
              }
            />
            <TextField
              id="outlined-textarea"
              label="Status"
              placeholder="Active/Inactive"
              value={dataFormRegister.status}
              onChange={(event) =>
                setDataFormRegister({
                  ...dataFormRegister,
                  status: event.target.value,
                })
              }
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </Dialog>
  );
}
