import { createFileRoute, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/origin-comic")({ component: () => <Outlet /> });