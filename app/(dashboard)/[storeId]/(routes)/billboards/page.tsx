import { format } from "date-fns";

import BillboardClient from './components/client'
import prismadb from '@/lib/prismadb';
import { BillBoardColumn } from './components/columns';

const BillboardsPage = async ({ params }: { params: { storeId: string }}) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedBillboards: BillBoardColumn[] = billboards.map((billboard) => ({
    id: billboard.id,
    label: billboard.label,
    createdAt: format(billboard.createdAt, "MMMM do, yyyy")
  }));

  return (
    <div className='flex-col'>
        <div className='flex-1 p-8 pt-4 space-y-4'>
            <BillboardClient data={formattedBillboards} />
        </div>
    </div>
  )
}

export default BillboardsPage