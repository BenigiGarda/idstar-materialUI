import axios from "axios";
import { useState, useEffect } from "react";

type FetchResponse = {
  data: UserPosts[];
  headers: any;
};
type UserPosts = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};
const useGetUserPosts = (url: string) => {
  const [userPosts, setUserPosts] = useState<UserPosts[]>([]);
  const [paginationPage, setPaginationPage] = useState<number>(0);

  useEffect(() => {
    const getUserPosts = async (isActive: boolean) => {
      const config = {
        headers: {
          Authorization:
            "Bearer f9b7b4b270855085710020ab025f155fc18cbc7f3901576ae940d96624b7db16",
        },
      };
      try {
        await axios.get(url, config).then((res: FetchResponse) => {
          if (isActive) {
            console.log(res);
            setPaginationPage(res.headers["x-pagination-pages"]);
            setUserPosts(res.data);
          }
        });
      } catch (error) {}
    };

    let isActive = true;
    getUserPosts(isActive);
    return () => {
      isActive = false;
    };
  }, [url]);

  return { userPosts, setUserPosts, paginationPage, setPaginationPage };
};

export default useGetUserPosts;
