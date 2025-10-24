import { dataStore } from "@/lib/data-store"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { sensorId, sensorType, value, unit, metadata } = body

    // Validate required fields
    if (!sensorId || !sensorType || value === undefined || !unit) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Add reading to data store
    const reading = dataStore.addReading({
      sensorId,
      sensorType,
      value,
      unit,
      metadata: metadata || { quality: "good" },
    })

    return NextResponse.json({
      success: true,
      reading,
    })
  } catch (error) {
    console.error("[v0] Error ingesting sensor data:", error)
    return NextResponse.json({ error: "Failed to ingest sensor data" }, { status: 500 })
  }
}
