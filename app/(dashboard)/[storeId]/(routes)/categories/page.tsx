import { format } from "date-fns";

import CategoryClient from './components/client'
import prismadb from '@/lib/prismadb';
import { CategoryColumn } from './components/columns';

const CategoriesPage = async ({ params }: { params: { storeId: string }}) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      billboard: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedCategories: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: format(category.createdAt, "MMMM do, yyyy")
  }));

  return (
    <div className='flex-col'>
        <div className='flex-1 p-8 pt-4 space-y-4'>
            <CategoryClient data={formattedCategories} />
        </div>
    </div>
  )
}

export default CategoriesPage