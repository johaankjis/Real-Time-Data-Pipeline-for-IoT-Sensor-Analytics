import { dataGenerator } from "@/lib/data-generator"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action } = body

    if (action === "start") {
      dataGenerator.start()
      return NextResponse.json({
        success: true,
        message: "Data generator started",
        status: dataGenerator.getStatus(),
      })
    } else if (action === "stop") {
      dataGenerator.stop()
      return NextResponse.json({
        success: true,
        message: "Data generator stopped",
        status: dataGenerator.getStatus(),
      })
    } else {
      return NextResponse.json({ error: 'Invalid action. Use "start" or "stop"' }, { status: 400 })
    }
  } catch (error) {
    console.error("[v0] Error controlling generator:", error)
    return NextResponse.json({ error: "Failed to control generator" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    status: dataGenerator.getStatus(),
  })
}
