"use client";

import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { BillBoardColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface BillboardClientProps {
    data: BillBoardColumn[];
}

const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Billboards (${data.length})`} description="Manage Billboards for your store" />
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="label"/>


            <Heading title="API" description="List of API endpoints"/>
            <Separator />
            <ApiList entityName="billboards" entityIdName="billboardId"/>
        </>
    )
}

export default BillboardClient