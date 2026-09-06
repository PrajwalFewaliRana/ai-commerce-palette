import { createFileRoute } from "@tanstack/react-router";
import { CustomerLayout } from "@/layouts/customer-layout";

export const Route = createFileRoute("/customer")({
  component: CustomerLayout,
});
