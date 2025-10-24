// In-memory data store simulating MongoDB collections
export interface SensorReading {
  id: string
  sensorId: string
  sensorType: "temperature" | "humidity" | "pressure" | "vibration"
  value: number
  unit: string
  timestamp: Date
  metadata: {
    location?: string
    deviceId?: string
    quality: "good" | "warning" | "critical"
  }
}

export interface AggregatedMetrics {
  timestamp: Date
  avgTemperature: number
  avgHumidity: number
  avgPressure: number
  avgVibration: number
  totalReadings: number
  dataLossPercentage: number
  avgLatency: number
}

class DataStore {
  private readings: SensorReading[] = []
  private metrics: AggregatedMetrics[] = []
  private maxReadings = 1000 // Keep last 1000 readings
  private maxMetrics = 100 // Keep last 100 aggregated metrics

  // Add a new sensor reading
  addReading(reading: Omit<SensorReading, "id" | "timestamp">): SensorReading {
    const newReading: SensorReading = {
      ...reading,
      id: `reading_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    }

    this.readings.push(newReading)

    // Keep only the last maxReadings
    if (this.readings.length > this.maxReadings) {
      this.readings = this.readings.slice(-this.maxReadings)
    }

    return newReading
  }

  // Get recent readings
  getRecentReadings(limit = 50, sensorType?: string): SensorReading[] {
    let filtered = this.readings

    if (sensorType) {
      filtered = filtered.filter((r) => r.sensorType === sensorType)
    }

    return filtered.slice(-limit).reverse()
  }

  // Get readings by time range
  getReadingsByTimeRange(startTime: Date, endTime: Date): SensorReading[] {
    return this.readings.filter((r) => r.timestamp >= startTime && r.timestamp <= endTime)
  }

  // Add aggregated metrics
  addMetrics(metrics: Omit<AggregatedMetrics, "timestamp">): AggregatedMetrics {
    const newMetrics: AggregatedMetrics = {
      ...metrics,
      timestamp: new Date(),
    }

    this.metrics.push(newMetrics)

    // Keep only the last maxMetrics
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics)
    }

    return newMetrics
  }

  // Get recent metrics
  getRecentMetrics(limit = 20): AggregatedMetrics[] {
    return this.metrics.slice(-limit).reverse()
  }

  // Get statistics
  getStatistics() {
    const recentReadings = this.readings.slice(-100)

    if (recentReadings.length === 0) {
      return {
        totalReadings: 0,
        avgLatency: 0,
        dataQuality: 0,
        activeSensors: 0,
      }
    }

    const goodQuality = recentReadings.filter((r) => r.metadata.quality === "good").length
    const uniqueSensors = new Set(recentReadings.map((r) => r.sensorId)).size

    return {
      totalReadings: this.readings.length,
      avgLatency: 0.3 + Math.random() * 0.2, // Simulated latency
      dataQuality: (goodQuality / recentReadings.length) * 100,
      activeSensors: uniqueSensors,
    }
  }

  // Clear all data (for testing)
  clear() {
    this.readings = []
    this.metrics = []
  }
}

// Singleton instance
export const dataStore = new DataStore()
