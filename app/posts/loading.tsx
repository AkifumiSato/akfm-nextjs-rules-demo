export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="h-8 bg-gray-200 rounded-md w-48 mx-auto mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded-md w-32 mx-auto animate-pulse"></div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }, (_, index) => index).map((index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 animate-pulse"
            >
              <div className="h-6 bg-gray-200 rounded-md mb-3"></div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 rounded-md"></div>
                <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
              </div>
              <div className="flex gap-2 mb-4">
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                <div className="h-6 bg-gray-200 rounded-full w-12"></div>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <div className="h-4 bg-gray-200 rounded-md w-12"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-12"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded-md w-12"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
