import MainLayout from '@/components/layout/MainLayout';
import { mockExhibitions } from '@/data/mockData';
import Button from '@/components/common/Button';

export default function ExhibitionDetails({ params }) {
  const { id } = params;
  const exhibition = mockExhibitions.find(ex => ex.id === id) || mockExhibitions[0];
  
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <img
            src={exhibition.image}
            alt={exhibition.title}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>
        
        <h1 className="text-3xl font-bold">{exhibition.title}</h1>
        <p className="text-gray-600 mt-2">{exhibition.dateRange}</p>
        
        <div className="mt-6 md:grid md:grid-cols-3 md:gap-8">
          <div className="md:col-span-2">
            <p className="text-lg">{exhibition.shortDescription}</p>
            {/* Add more exhibition details */}
          </div>
          
          <div>
            <div className="bg-white p-4 border rounded-lg shadow">
              <Button variant="primary" className="w-full" href={`/exhibitions/${id}/tickets`}>
                Buy Tickets
              </Button>
              
              <div className="mt-4 pt-4 border-t">
                <h3 className="font-medium">Exhibition Details</h3>
                {/* Add exhibition details */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}