'use client'
import { trpc } from '../library/trpc/client'

export default function Home() {
	const hello = trpc.example.hello.useQuery({ name: 'tRPC' })
	const getAll = trpc.example.getAll.useQuery()
	
	return (
		<div className="flex h-screen w-full flex-col items-center justify-center gap-8 p-8">
			<h1 className="text-2xl font-bold">{`Dan's Next.js Configuration`}</h1>
			
			<div className="space-y-2 text-center">
				<p className="text-lg font-semibold">tRPC Examples</p>
				<div className="space-y-1">
					<p>{hello.data?.greeting || 'Loading greeting...'}</p>
					<p>{getAll.data?.message || 'Loading message...'}</p>
				</div>
			</div>
		</div>
	)
}
