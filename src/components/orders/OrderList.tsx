import {
	type ColumnDef,
	type ColumnFiltersState,
	type ExpandedState,
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	getFilteredRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	ChevronDown,
	ChevronRight,
	Download,
	FileText,
	Home,
	MoreHorizontal,
	Package,
	Plus,
	Search,
	Settings,
	ShoppingCart,
	Upload,
	Users,
} from "lucide-react";
import React, { useState } from "react";

// 型定義
interface Product {
	name: string;
	sku: string;
	bin: string;
	vendor: string;
	status: string;
	quantity: number;
}

interface Order {
	id: string;
	date: string;
	customer: string;
	customerAvatar?: string;
	salesChannel: "amazon" | "shopify" | "etsy";
	destination: string;
	items: number;
	status: "Pending" | "Fulfilled" | "Unfulfilled";
	products?: Product[];
}

// サンプルデータ
const data: Order[] = [
	{
		id: "#6709",
		date: "08/11/2021",
		customer: "Olivia Cooper",
		salesChannel: "amazon",
		destination: "International",
		items: 3,
		status: "Pending",
		products: [
			{
				name: "Della Gao Laptop Backpack 15.6 Inch",
				sku: "PN-756760",
				bin: "C011-034",
				vendor: "LEVENTA",
				status: "On Hand",
				quantity: 53,
			},
			{
				name: "Emsa Travel Mug Light Thermo",
				sku: "AS-765776",
				bin: "C003-017",
				vendor: "RUDIP",
				status: "On Hand",
				quantity: 210,
			},
			{
				name: "Dogaus Bluetooth Over Ear Headphones",
				sku: "DC-787588",
				bin: "C026-005",
				vendor: "MIOIO",
				status: "On Hand",
				quantity: 19,
			},
		],
	},
	{
		id: "#6708",
		date: "08/11/2021",
		customer: "Kevin Parsons",
		salesChannel: "etsy",
		destination: "Domestic",
		items: 5,
		status: "Fulfilled",
	},
	{
		id: "#6707",
		date: "08/11/2021",
		customer: "Frank Reid",
		salesChannel: "amazon",
		destination: "International",
		items: 1,
		status: "Pending",
	},
	{
		id: "#6706",
		date: "08/11/2021",
		customer: "Stephanie Berry",
		salesChannel: "shopify",
		destination: "International",
		items: 2,
		status: "Unfulfilled",
	},
	{
		id: "#6705",
		date: "08/11/2021",
		customer: "Sophie Miller",
		salesChannel: "shopify",
		destination: "Domestic",
		items: 7,
		status: "Fulfilled",
	},
	{
		id: "#6704",
		date: "08/11/2021",
		customer: "Joan Ross",
		salesChannel: "amazon",
		destination: "International",
		items: 4,
		status: "Fulfilled",
	},
];

// チャンネルアイコンコンポーネント
const ChannelIcon: React.FC<{ channel: string }> = ({ channel }) => {
	const iconClass =
		"w-8 h-8 rounded-full flex items-center justify-center text-white font-bold";

	switch (channel) {
		case "amazon":
			return <div className={`${iconClass} bg-gray-900`}>a</div>;
		case "etsy":
			return <div className={`${iconClass} bg-orange-500`}>Etsy</div>;
		case "shopify":
			return <div className={`${iconClass} bg-green-500`}>S</div>;
		default:
			return null;
	}
};

// ステータスバッジコンポーネント
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
	const getStatusClass = () => {
		switch (status) {
			case "Pending":
				return "bg-yellow-100 text-yellow-800";
			case "Fulfilled":
				return "bg-green-100 text-green-800";
			case "Unfulfilled":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<span
			className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass()}`}
		>
			<span className="w-2 h-2 rounded-full bg-current mr-1.5" />
			{status}
		</span>
	);
};

export const OrderList = () => {
	const [expanded, setExpanded] = useState<ExpandedState>({});
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState("");

	const columns: ColumnDef<Order>[] = [
		{
			id: "expander",
			cell: ({ row }) => {
				return row.original.products ? (
					<button
						type="button"
						onClick={() => row.toggleExpanded()}
						className="p-1"
					>
						{row.getIsExpanded() ? (
							<ChevronDown size={16} />
						) : (
							<ChevronRight size={16} />
						)}
					</button>
				) : null;
			},
			header: () => null,
			size: 40,
		},
		{
			accessorKey: "id",
			header: "Order ID",
			cell: ({ getValue }) => (
				<span className="text-blue-600 font-medium">
					{getValue() as string}
				</span>
			),
		},
		{
			accessorKey: "date",
			header: "Date",
		},
		{
			accessorKey: "customer",
			header: "Customer",
		},
		{
			accessorKey: "salesChannel",
			header: "Sales Channel",
			cell: ({ getValue }) => <ChannelIcon channel={getValue() as string} />,
		},
		{
			accessorKey: "destination",
			header: "Destination",
		},
		{
			accessorKey: "items",
			header: "Items",
		},
		{
			accessorKey: "status",
			header: "Status",
			cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
		},
		{
			id: "actions",
			cell: () => (
				<button type="button" className="p-1 hover:bg-gray-100 rounded">
					<MoreHorizontal size={16} className="text-gray-500" />
				</button>
			),
			header: () => null,
			size: 40,
		},
	];

	const table = useReactTable({
		data,
		columns,
		state: {
			expanded,
			columnFilters,
			globalFilter,
		},
		onExpandedChange: setExpanded,
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	});

	return (
		<div className="flex h-screen bg-gray-100">
			{/* サイドバー */}
			<div
				className="w-20 bg-navy-900 flex flex-col items-center py-4 space-y-6"
				style={{ backgroundColor: "#1e2654" }}
			>
				<Package className="text-white" size={24} />
				<Home className="text-gray-400" size={24} />
				<ShoppingCart className="text-gray-400" size={24} />
				<FileText
					className="text-white bg-navy-700 p-2 rounded"
					size={24}
					style={{ backgroundColor: "#2a3158" }}
				/>
				<Users className="text-gray-400" size={24} />
				<div className="flex-1" />
				<Settings className="text-gray-400" size={24} />
				<Users className="text-gray-400" size={24} />
			</div>

			{/* メインコンテンツ */}
			<div className="flex-1 p-6">
				<div className="bg-white rounded-lg shadow-sm">
					{/* ヘッダー */}
					<div className="p-6 border-b">
						<div className="flex justify-between items-center mb-4">
							<h1 className="text-2xl font-semibold">Orders</h1>
							<div className="flex gap-2">
								<button
									type="button"
									className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 flex items-center gap-2"
								>
									<Download size={16} />
									Export to Excel
								</button>
								<button
									type="button"
									className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 flex items-center gap-2"
								>
									<Upload size={16} />
									Import Orders
								</button>
								<button
									type="button"
									className="px-4 py-2 bg-navy-900 text-white rounded-md text-sm font-medium hover:bg-navy-800 flex items-center gap-2"
									style={{ backgroundColor: "#1e2654" }}
								>
									<Plus size={16} />
									New Order
								</button>
							</div>
						</div>

						{/* フィルター */}
						<div className="flex gap-4">
							<div className="flex-1 relative">
								<Search
									className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
									size={20}
								/>
								<input
									type="text"
									placeholder="Search Order ID"
									className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									value={globalFilter}
									onChange={(e) => setGlobalFilter(e.target.value)}
								/>
							</div>
							<select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
								<option>Date</option>
							</select>
							<select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
								<option>Sales Channel</option>
							</select>
							<select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
								<option>Status</option>
							</select>
							<select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
								<option>More Filters</option>
							</select>
						</div>
					</div>

					{/* テーブル */}
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b">
									<th className="p-2 w-8">
										<input type="checkbox" className="rounded" />
									</th>
									{table.getFlatHeaders().map((header) => (
										<th
											key={header.id}
											className="text-left p-4 font-medium text-gray-700"
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{table.getRowModel().rows.map((row) => (
									<React.Fragment key={row.id}>
										<tr className="border-b hover:bg-gray-50">
											<td className="p-2">
												<input type="checkbox" className="rounded" />
											</td>
											{row.getVisibleCells().map((cell) => (
												<td key={cell.id} className="p-4">
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext(),
													)}
												</td>
											))}
										</tr>
										{row.getIsExpanded() && row.original.products && (
											<tr>
												<td colSpan={columns.length + 1} className="p-0">
													<div className="bg-gray-50 p-4">
														<table className="w-full">
															<tbody>
																{row.original.products.map((product, index) => (
																	<tr
																		key={product.sku}
																		className="border-b last:border-0"
																	>
																		<td className="py-3 w-12">
																			<div className="w-10 h-10 bg-gray-300 rounded" />
																		</td>
																		<td className="py-3">
																			<div className="text-sm font-medium">
																				{product.name}
																			</div>
																			<div className="text-xs text-gray-500">
																				{product.sku}
																			</div>
																		</td>
																		<td className="py-3 text-sm text-gray-600">
																			Pick
																		</td>
																		<td className="py-3 text-sm text-gray-600">
																			{product.quantity}
																		</td>
																		<td className="py-3">
																			<div className="text-sm text-gray-600">
																				Bin
																			</div>
																			<div className="text-sm font-medium">
																				{product.bin}
																			</div>
																		</td>
																		<td className="py-3">
																			<div className="text-sm text-gray-600">
																				Vendor
																			</div>
																			<div className="text-sm font-medium">
																				{product.vendor}
																			</div>
																		</td>
																		<td className="py-3">
																			<div className="text-sm text-gray-600">
																				On Hand
																			</div>
																			<div className="text-sm font-medium">
																				{product.quantity}
																			</div>
																		</td>
																	</tr>
																))}
															</tbody>
														</table>
													</div>
												</td>
											</tr>
										)}
									</React.Fragment>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};
