import clsx from "clsx";

import { BsSortAlphaDown, BsSortAlphaUp } from "react-icons/bs";
import { useFileStore } from "@/store/use-file-store";
import { useSortFiles } from "@/hook/use-sort-files";

export default function SortButton({ isOpen }: { isOpen: boolean }) {
  const sortType = useFileStore((state) => state.sortType);
  const { handleSort, handleSortDesc } = useSortFiles();

  const className = clsx(
    "btn btn-close btn-outline-red dark:shadow-blank/50 fixed top-32 rounded-full p-1.5 shadow-lg delay-75",
    isOpen ? "right-[336px]" : "right-4",
  );

  if (sortType === "asc") {
    return (
      <button className={className} onClick={handleSort}>
        <BsSortAlphaDown className="text-xl" />
      </button>
    );
  }

  return (
    <button className={className} onClick={handleSortDesc}>
      <BsSortAlphaUp className="text-xl" />
    </button>
  );
}
