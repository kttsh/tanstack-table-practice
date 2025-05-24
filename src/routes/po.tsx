import { createFileRoute } from "@tanstack/react-router";
import { OrderList } from "../components/orders/OrderList";

export const Route = createFileRoute("/po")({
	component: UsersPage,
});

function UsersPage() {
	return (
		<div className="container mx-auto py-8">
			<h1 className="text-2xl font-bold mb-4">注文リスト</h1>
			<OrderList />
		</div>
	);
}
