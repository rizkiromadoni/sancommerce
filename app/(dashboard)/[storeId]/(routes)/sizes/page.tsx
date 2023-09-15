import { format } from "date-fns";
import prismadb from '@/lib/prismadb';

import SizeClient from './components/client'
import { SizeColumn } from './components/columns';

const SizesPage = async ({ params }: { params: { storeId: string }}) => {
  const billboards = await prismadb.size.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedSizes: SizeColumn[] = billboards.map((billboard) => ({
    id: billboard.id,
    name: billboard.name,
    value: billboard.value,
    createdAt: format(billboard.createdAt, "MMMM do, yyyy")
  }));

  return (
    <div className='flex-col'>
        <div className='flex-1 p-8 pt-4 space-y-4'>
            <SizeClient data={formattedSizes} />
        </div>
    </div>
  )
}

export default SizesPage