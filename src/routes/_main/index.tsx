import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/")({
  component: Home,
});

function Home() {
  return <h1>Welcome to Home page</h1>;
}
