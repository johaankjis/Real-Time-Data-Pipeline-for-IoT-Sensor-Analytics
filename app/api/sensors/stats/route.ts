import { dataStore } from "@/lib/data-store"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const stats = dataStore.getStatistics()

    return NextResponse.json({
      success: true,
      stats,
    })
  } catch (error) {
    console.error("[v0] Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 })
  }
}
