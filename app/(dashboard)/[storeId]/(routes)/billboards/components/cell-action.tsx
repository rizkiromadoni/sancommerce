"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BillBoardColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { CopyIcon, EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { toast } from "react-hot-toast";

interface CellActionProps {
  data: BillBoardColumn;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Billboard ID copied to clipboard");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-8 h-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontalIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          Actions
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onCopy(data.id)}>
          <CopyIcon className="w-4 h-4 mr-2" />
          Copy id
        </DropdownMenuItem>
        <DropdownMenuItem>
          <EditIcon className="w-4 h-4 mr-2" />
          Update
        </DropdownMenuItem>
        <DropdownMenuItem>
          <TrashIcon className="w-4 h-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CellAction