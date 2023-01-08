import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import "./viewUser.css";
import DialogBox from "../../components/DialogBox";
import useGetUserDetail from "../../hooks/useGetUserDetail";
import axios from "axios";

interface userIdSelector {
  idState: {
    id: number;
  };
}

function ViewUser() {
  const userId = useSelector<userIdSelector>((state) => state.idState.id);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userPosts, setUserPosts] = useState([]);
  const { userDetail } = useGetUserDetail(
    `https://gorest.co.in/public/v2/users/${userId}`
  );

  async function deletePosts(id: number) {
    const config = {
      headers: {
        Authorization:
          "Bearer f9b7b4b270855085710020ab025f155fc18cbc7f3901576ae940d96624b7db16",
      },
    };
    await axios
      .delete(`https://gorest.co.in/public/v2/posts/${id}`, config)
      .then(() => {
        setLoading(true);
      });
  }
  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "body", headerName: "Body", width: 400 },
    {
      field: "col5",
      headerName: "Tools",
      width: 250,
      renderCell: (cellValues) => {
        return (
          <div className="table-button-container">
            <Button
              variant="contained"
              className="user-delete-button"
              onClick={() => deletePosts(cellValues.row.id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    async function getUserPosts() {
      const config = {
        headers: {
          Authorization:
            "Bearer f9b7b4b270855085710020ab025f155fc18cbc7f3901576ae940d96624b7db16",
        },
      };
      await axios
        .get(`https://gorest.co.in/public/v2/users/${userId}/posts`, config)
        .then((res) => {
          setUserPosts(res.data);
          setLoading(false);
        });
    }
    getUserPosts();
  }, [userId, loading === true]);

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
              <p className="user-information">{userDetail?.name}</p>
              <p className="user-information">{userDetail?.gender}</p>
              <p className="user-information">{userDetail?.email}</p>
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
                rows={userPosts}
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
        userId={userId}
        setLoading={setLoading}
      />
    </div>
  );
}

export default ViewUser;
