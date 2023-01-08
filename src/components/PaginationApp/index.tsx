import { Pagination } from "@mui/material";

export default function PaginationApp({
  totalPage,
  changePage,
}: {
  totalPage: number;
  changePage: (page: number) => void;
}) {
  const handleChange = (event: unknown, value: number) => {
    changePage(value);
  };
  return (
    <Pagination
      count={totalPage}
      showFirstButton
      showLastButton
      onChange={handleChange}
    />
  );
}
