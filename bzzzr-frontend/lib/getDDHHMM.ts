
export function formatTimeRemaining(endTime: Date): string {
    const now = new Date().getTime()
    const distance = endTime.getTime() - now
  
    if (distance < 0) {
      return "00:00:00"
    }
  
    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  
    const formattedDays = days.toString().padStart(2, "0")
    const formattedHours = hours.toString().padStart(2, "0")
    const formattedMinutes = minutes.toString().padStart(2, "0")
  
    return `${formattedDays}:${formattedHours}:${formattedMinutes}`
  }
  