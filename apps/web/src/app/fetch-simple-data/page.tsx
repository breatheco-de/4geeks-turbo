import { hello, goodbye } from '@4geeks/actions';

export default function X() {
  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mt-4">
        <a href="/" className="text-blue-500 hover:underline">
          Back to Home
        </a>
      </div>
      <h1 className="text-2xl font-bold mb-4">X</h1>
      <p className="mb-2">{hello()}</p>
      <p className="mb-2">{goodbye()}</p>
    </div>
  );
}
