'use client'
import { trpc } from '../library/trpc/client'

export default function Home() {
	const hello = trpc.example.hello.useQuery({ name: 'tRPC' })
	const getAll = trpc.example.getAll.useQuery()

	return (
		<div className="flex h-screen w-full flex-col items-center justify-center gap-4">
			<h1>{`Dan's Next.js Configuration`}</h1>
			<div className="space-y-2 text-center">
				<p className="text-lg font-semibold">tRPC Examples:</p>
				<div className="space-y-1">
					<p>{hello.data?.greeting || 'Loading greeting...'}</p>
					<p>{getAll.data?.message || 'Loading message...'}</p>
					<p className="text-sm text-gray-600">
						{getAll.data?.timestamp ? `Last updated: ${getAll.data.timestamp.toLocaleString()}` : ''}
					</p>
				</div>
			</div>
		</div>
	)
}
