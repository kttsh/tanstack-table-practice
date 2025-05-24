import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#282c34] to-[#1a1d23]">
			<header className="flex flex-col items-center">
				<h1 className="text-4xl font-bold mb-2 tracking-wide">Welcome!</h1>
				<p className="mb-8 text-lg text-gray-300">
					下記からリストを選択してください
				</p>
				<div className="flex gap-8">
					<Link
						to="/users"
						className="w-56 h-32 flex flex-col items-center justify-center rounded-xl bg-white/10 border border-white/20 shadow-lg hover:bg-[#61dafb]/20 hover:scale-105 transition-all duration-200"
					>
						<span className="text-2xl font-semibold text-[#61dafb] mb-2">
							ユーザーリスト
						</span>
						<span className="text-sm text-gray-200">
							登録ユーザーの一覧を見る
						</span>
					</Link>
					<Link
						to="/orders"
						className="w-56 h-32 flex flex-col items-center justify-center rounded-xl bg-white/10 border border-white/20 shadow-lg hover:bg-[#fbbf24]/20 hover:scale-105 transition-all duration-200"
					>
						<span className="text-2xl font-semibold text-[#fbbf24] mb-2">
							発注リスト
						</span>
						<span className="text-sm text-gray-200">発注情報の一覧を見る</span>
					</Link>
				</div>
			</header>
		</div>
	);
}
