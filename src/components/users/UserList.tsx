import {
	createColumnHelper,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import userData from "./userData.json";

type User = {
	id: number;
	firstName: string;
	lastName: string;
	age: number;
	visits: number;
	progress: number;
	status: string;
};

const columnHelper = createColumnHelper<User>();
const columns = [
	columnHelper.accessor("firstName", {
		header: "First Name",
		cell: (info) => info.getValue(), // cellレンダリングを明示的に指定
	}),
	columnHelper.accessor("lastName", {
		header: "Last Name",
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor("age", {
		header: "Age",
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor("visits", {
		header: "Visits",
		cell: (info) => info.getValue(),
	}),
];

export const UserList = () => {
	const [data, setData] = useState<User[]>(() => [...userData]);

	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		getRowId: (row) => String(row.id),
	});
	return (
		<div className="overflow-x-auto p-4">
			<table className="w-full border-collapse shadow-md rounded-lg">
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id} className="border p-2 bg-gray-100">
									{header.column.columnDef.header?.toString()}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id} className="border p-2">
									{String(cell.getValue() ?? "")}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
