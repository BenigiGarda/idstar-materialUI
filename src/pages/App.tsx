import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import "./App.css";
import useGetAll from "../hooks/useGetAll";
import PaginationApp from "../components/PaginationApp";
import { Button } from "@mui/material";
import DialogBox from "../components/DialogBox";
function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogType, setDialogType] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { data, paginationPage } = useGetAll(
    `https://gorest.co.in/public/v2/users?page=${currentPage}`
  );

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 250 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "gender", headerName: "Gender", width: 250 },
    { field: "status", headerName: "Status", width: 250 },
    {
      field: "col5",
      headerName: "Tools",
      width: 250,
      renderCell: () => {
        return (
          <div className="table-button-container">
            <Button
              variant="contained"
              className="user-view-button"
              component={Link}
              to="/viewUser"
            >
              View
            </Button>
            <Button
              variant="contained"
              className="user-update-button"
              onClick={() => {
                setDialogType("Update User");
                setOpenDialog(true);
              }}
            >
              Update
            </Button>
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
      <div>
        <h1>Daftar Pengguna</h1>
      </div>
      <div className="create-user-button">
        <Button
          variant="contained"
          className="create"
          onClick={() => {
            setDialogType("Create User");
            setOpenDialog(true);
          }}
        >
          Buat Pengguna
        </Button>
      </div>
      <div className="table-container">
        <DataGrid rows={data} columns={columns} hideFooterPagination={true} />
        <div className="paginate-container">
          <PaginationApp
            totalPage={paginationPage}
            changePage={setCurrentPage}
          />
        </div>
      </div>
      <DialogBox
        openDialog={openDialog}
        onClose={() => setOpenDialog(false)}
        dialogType={dialogType}
      />
    </div>
  );
}

export default App;
