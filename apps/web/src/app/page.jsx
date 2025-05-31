import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import Button from "@/components/common/Button";

export default function Home() {
  let isAdmin = false;
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      isAdmin = parsed.role === "admin" || parsed.role === "staff";
    }
  }
  return (
    <MainLayout>
      <div className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">Welcome to MAGW</h1>
              <p className="text-xl mb-6">
                Discover art at the Municipal Art Gallery of Westfield.
              </p>
              <Button
                variant="outline"
                className="bg-white text-blue-700 hover:bg-blue-50"
              >
                Explore Exhibitions
              </Button>
              {isAdmin && (
                <div className="mt-4">
                  <Button variant="secondary" href="/admin/exhibitions">
                    Admin: Manage Exhibitions
                  </Button>
                </div>
              )}
            </div>
            <div className="mt-8 lg:mt-0">
              <img
                src="/gallary-exh.jpg"
                alt="Gallery exhibition"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add more homepage content */}
    </MainLayout>
  );
}
