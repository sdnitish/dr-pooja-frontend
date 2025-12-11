// app/admin/dashboard/page.js
export default function DashboardPage() {
  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">Quick overview of site metrics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Total posts</p>
          <p className="text-2xl font-semibold">128</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Users</p>
          <p className="text-2xl font-semibold">482</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Comments</p>
          <p className="text-2xl font-semibold">1,023</p>
        </div>
      </div>
    </section>
  );
}
