import axios from "axios";
import { useState, useEffect } from "react";

type FetchResponse = {
  data: UserData[];
  headers: any;
};
type UserData = {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
};
const useGetAll = (url: string) => {
  const [data, setData] = useState<UserData[]>([]);
  const [paginationPage, setPaginationPage] = useState<any>(0);

  useEffect(() => {
    const getAll = async (isActive: boolean) => {
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
            setData(res.data);
          }
        });
      } catch (error) {}
    };

    let isActive = true;
    getAll(isActive);
    return () => {
      isActive = false;
    };
  }, [url]);

  return { data, setData, paginationPage, setPaginationPage };
};

export default useGetAll;
