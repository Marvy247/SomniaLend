export default function NFTLoadingSpinner() {
  return (
    <div className="w-full max-w-sm mx-auto p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-lg bg-gray-300 dark:bg-gray-700 h-24 w-24"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
