import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import "./App.css";
import { useDispatch } from "react-redux";
import { setUserIdState } from "../redux/slices/userIdSlice";
import useGetAll from "../hooks/useGetAll";
import PaginationApp from "../components/PaginationApp";
import { Button } from "@mui/material";
import DialogBox from "../components/DialogBox";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dialogType, setDialogType] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);

  const { data, paginationPage } = useGetAll(
    `https://gorest.co.in/public/v2/users?page=${currentPage}`
  );
  async function deleteUser(id: number) {
    const config = {
      headers: {
        Authorization:
          "Bearer f9b7b4b270855085710020ab025f155fc18cbc7f3901576ae940d96624b7db16",
      },
    };
    axios
      .delete(`https://gorest.co.in/public/v2/users/${id}`, config)
      .then((res) => {
        window.location.reload();
      });
  }
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 250 },
    { field: "email", headerName: "Email", width: 350 },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "status", headerName: "Status", width: 100 },
    {
      field: "col5",
      headerName: "Tools",
      width: 250,
      renderCell: (cellValues) => {
        return (
          <div className="table-button-container">
            <Button
              variant="contained"
              className="user-view-button"
              component={Link}
              to="/viewUser"
              onClick={() => dispatch(setUserIdState(cellValues.row.id))}
            >
              View
            </Button>
            <Button
              variant="contained"
              className="user-update-button"
              onClick={() => {
                setSelectedId(cellValues.row.id);
                setDialogType("Update User");
                setOpenDialog(true);
              }}
            >
              Update
            </Button>
            <Button
              variant="contained"
              className="user-delete-button"
              onClick={() => {
                deleteUser(cellValues.row.id);
              }}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <body>
      <div className="container">
        <div className="user-list-container">
          <div className="user-list">
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
              <DataGrid
                rows={data}
                columns={columns}
                hideFooterPagination={true}
              />
            </div>
            <div className="paginate-container">
              <PaginationApp
                totalPage={paginationPage}
                changePage={setCurrentPage}
              />
            </div>
            <DialogBox
              openDialog={openDialog}
              onClose={() => setOpenDialog(false)}
              dialogType={dialogType}
              userId={selectedId}
            />
          </div>
        </div>
      </div>
    </body>
  );
}

export default App;
