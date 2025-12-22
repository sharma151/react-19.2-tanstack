import { createFileRoute, Outlet, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/services")({
  component: ServicesLayout,
});

function ServicesLayout() {
  return (
    <div>
      <nav className="bg-blue-900 text-white p-4 flex justify-between">
        <div className="font-bold">Services Portal</div>

        <div className="flex gap-4">
          <Link to="/services/webdesign">Web Design</Link>
          <Link to="/services/seo">SEO</Link>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}
