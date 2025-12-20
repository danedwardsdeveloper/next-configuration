import { NextResponse } from 'next/server'

/** Allow uptime robot to monitor the site without hitting the database
- Avoids a $10/month bill */
export async function GET() {
	return NextResponse.json({ status: 200 })
}
