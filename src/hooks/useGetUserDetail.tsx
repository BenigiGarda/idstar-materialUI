import axios from "axios";
import { useState, useEffect } from "react";

type FetchResponse = {
  data: UserData;
  headers: any;
};
type UserData = {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
};
const useGetUserDetail = (url: string) => {
  const [userDetail, setUserDetail] = useState<UserData | null>();

  useEffect(() => {
    const getDetail = async (isActive: boolean) => {
      const config = {
        headers: {
          Authorization:
            "Bearer f9b7b4b270855085710020ab025f155fc18cbc7f3901576ae940d96624b7db16",
        },
      };
      try {
        await axios.get(url, config).then((res: FetchResponse) => {
          if (isActive) {
            setUserDetail(res.data);
          }
        });
      } catch (error) {}
    };

    let isActive = true;
    getDetail(isActive);
    return () => {
      isActive = false;
    };
  }, [url]);

  return { userDetail, setUserDetail };
};

export default useGetUserDetail;
