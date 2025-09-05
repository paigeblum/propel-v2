export default function Footer(){
  return (
    <footer className="mt-12 border-t bg-white/80">
      <div className="container-narrow py-8 text-sm text-gray-600 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div>© {new Date().getFullYear()} Propel.</div>
        <a href="#" className="hover:underline">Privacy Policy</a>
        <a href="#" className="hover:underline">Terms of Use</a>
        <a href="#" className="hover:underline">FAQ & Contact</a>
      </div>
    </footer>
  );
}