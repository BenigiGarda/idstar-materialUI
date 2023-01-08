import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import useGetAll from "../../hooks/useGetAll";
import { Button } from "@mui/material";
import "./viewUser.css";
import DialogBox from "../../components/DialogBox";

function ViewUser() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { data } = useGetAll(`https://gorest.co.in/public/v2/users/269/posts`);

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "body", headerName: "Body", width: 400 },
    {
      field: "col5",
      headerName: "Tools",
      width: 250,
      renderCell: () => {
        return (
          <div className="table-button-container">
            <Button variant="contained" className="user-delete-button">
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="container">
      <div className="user-card-container">
        <div className="user-card">
          <div>
            <h1>Lihat Pengguna</h1>
          </div>
          <div className="user-information-container">
            <div>
              <div className="information-head">
                <p>Nama</p>
                <p>:</p>
              </div>
              <div className="information-head">
                <p>Gender</p>
                <p>:</p>
              </div>
              <div className="information-head">
                <p>Email</p>
                <p>:</p>
              </div>
            </div>
            <div>
              <p className="user-information">Nama</p>
              <p className="user-information">Gender</p>
              <p className="user-information">Email</p>
            </div>
          </div>
          <div className="user-post-container">
            <div className="user-post-header">
              <h3 className="post-list-title">Daftar Post</h3>
              <Button
                variant="contained"
                className="create-post"
                onClick={() => setOpenDialog(true)}
              >
                Buat Post
              </Button>
            </div>
            <div className="user-post-table">
              <DataGrid
                rows={data}
                columns={columns}
                hideFooterPagination={true}
              />
            </div>
          </div>
        </div>
      </div>
      <DialogBox
        openDialog={openDialog}
        onClose={() => setOpenDialog(false)}
        dialogType={"Create Post"}
      />
    </div>
  );
}

export default ViewUser;
