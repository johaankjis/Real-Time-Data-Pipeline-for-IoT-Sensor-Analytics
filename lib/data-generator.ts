// Simulates Kafka producer - generates realistic sensor data
import { dataStore } from "./data-store"

export class DataGenerator {
  private intervals: NodeJS.Timeout[] = []
  private isRunning = false

  start() {
    if (this.isRunning) return

    this.isRunning = true

    // Generate temperature readings every 2 seconds
    this.intervals.push(
      setInterval(() => {
        dataStore.addReading({
          sensorId: "temp-01",
          sensorType: "temperature",
          value: 20 + Math.random() * 10,
          unit: "°C",
          metadata: {
            location: "Building A - Floor 2",
            deviceId: "TEMP-001",
            quality: Math.random() > 0.05 ? "good" : "warning",
          },
        })
      }, 2000),
    )

    // Generate humidity readings every 2.5 seconds
    this.intervals.push(
      setInterval(() => {
        dataStore.addReading({
          sensorId: "hum-01",
          sensorType: "humidity",
          value: 40 + Math.random() * 20,
          unit: "%",
          metadata: {
            location: "Building A - Floor 2",
            deviceId: "HUM-001",
            quality: Math.random() > 0.03 ? "good" : "warning",
          },
        })
      }, 2500),
    )

    // Generate pressure readings every 3 seconds
    this.intervals.push(
      setInterval(() => {
        dataStore.addReading({
          sensorId: "press-01",
          sensorType: "pressure",
          value: 1000 + Math.random() * 20,
          unit: "hPa",
          metadata: {
            location: "Building B - Basement",
            deviceId: "PRESS-001",
            quality: Math.random() > 0.02 ? "good" : "critical",
          },
        })
      }, 3000),
    )

    // Generate vibration readings every 1.5 seconds
    this.intervals.push(
      setInterval(() => {
        dataStore.addReading({
          sensorId: "vib-01",
          sensorType: "vibration",
          value: Math.random() * 100,
          unit: "Hz",
          metadata: {
            location: "Factory Floor - Machine 3",
            deviceId: "VIB-001",
            quality: Math.random() > 0.08 ? "good" : "warning",
          },
        })
      }, 1500),
    )

    console.log("[v0] Data generator started - simulating Kafka ingestion")
  }

  stop() {
    this.intervals.forEach((interval) => clearInterval(interval))
    this.intervals = []
    this.isRunning = false
    console.log("[v0] Data generator stopped")
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      activeStreams: this.intervals.length,
    }
  }
}

// Singleton instance
export const dataGenerator = new DataGenerator()
