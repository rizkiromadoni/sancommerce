"use client";

import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { CategoryColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface CategoryClientProps {
    data: CategoryColumn[];
}

const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Categories (${data.length})`} description="Manage Categories for your store" />
                <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name"/>


            <Heading title="API" description="List of API endpoints"/>
            <Separator />
            <ApiList entityName="categories" entityIdName="categoryId"/>
        </>
    )
}

export default CategoryClient