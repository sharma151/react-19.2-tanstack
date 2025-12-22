import { createFileRoute, Outlet, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_main")({
  component: MainLayout,
});

function MainLayout() {
  return (
    <div>
      <nav className="bg-white border-b p-4 flex gap-4">
        <span className="font-bold text-xl">pp</span>
        <div className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/services">Go to Services</Link>
        </div>
      </nav>

      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
