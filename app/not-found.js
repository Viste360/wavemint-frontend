export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="opacity-70 mb-8">The page you are looking for does not exist.</p>
      <a
        href="/dashboard"
        className="px-6 py-3 bg-white text-black rounded-lg font-semibold"
      >
        Go to Dashboard
      </a>
    </main>
  );
}
