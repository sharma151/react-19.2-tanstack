import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/services/seo")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/services/seo"!</div>;
}
