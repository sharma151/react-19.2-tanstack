import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/services/webdesign')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/services/webdesign"!</div>
}
