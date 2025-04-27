import MainLayout from '@/components/layout/MainLayout';
import { mockExhibitions } from '@/data/mockData';

export default function Exhibitions() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Exhibitions</h1>
        
        {/* Add your exhibition listing code here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockExhibitions.map(exhibition => (
            <div key={exhibition.id} className="border rounded-lg overflow-hidden">
              <img 
                src={exhibition.image} 
                alt={exhibition.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{exhibition.title}</h2>
                <p className="text-gray-600">{exhibition.dateRange}</p>
                <p className="mt-2">{exhibition.shortDescription}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}