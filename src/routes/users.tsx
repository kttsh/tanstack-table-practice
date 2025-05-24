import { createFileRoute } from "@tanstack/react-router";
import { UserList } from "../components/users/userList";

export const Route = createFileRoute("/users")({
	component: UsersPage,
});

function UsersPage() {
	return (
		<div className="container mx-auto py-8">
			<h1 className="text-2xl font-bold mb-4">ユーザーリスト</h1>
			<UserList />
		</div>
	);
}
