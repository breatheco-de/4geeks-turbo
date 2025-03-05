export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Navigation</h1>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <a href="/item" className="text-blue-500 hover:underline">
            React Server Action CRUD
          </a>
        </li>
        <li className="mb-2">
          <a
            href="/fetch-simple-data"
            className="text-blue-500 hover:underline"
          >
            React Server Action Fetch Simple Data
          </a>
        </li>
        <li className="mb-2">
          <a href="/ws" className="text-blue-500 hover:underline">
            Hono WebSocket Demo
          </a>
        </li>
        <li className="mb-2">
          <a href="/stuff" className="text-blue-500 hover:underline">
            Hono API Wrapper
          </a>
        </li>
        <li className="mb-2">
          <a
            href="http://localhost:4000"
            className="text-blue-500 hover:underline"
            target="_blank"
          >
            Hono React Server Side Rendering
          </a>
        </li>
      </ul>
    </div>
  );
}
