import { dataStore } from "@/lib/data-store"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const sensorType = searchParams.get("type") || undefined

    const readings = dataStore.getRecentReadings(limit, sensorType)

    return NextResponse.json({
      success: true,
      count: readings.length,
      readings,
    })
  } catch (error) {
    console.error("[v0] Error fetching readings:", error)
    return NextResponse.json({ error: "Failed to fetch readings" }, { status: 500 })
  }
}
