function formatTimeAgo(timestamp: number): string {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const timeDifference = currentTimestamp - timestamp;

  const timeUnits = [
    { unit: "year", seconds: 31536000 },
    { unit: "month", seconds: 2592000 },
    { unit: "day", seconds: 86400 },
    { unit: "hour", seconds: 3600 },
    { unit: "minute", seconds: 60 },
  ];

  for (const unit of timeUnits) {
    const timeValue = Math.floor(timeDifference / unit.seconds);
    if (timeValue >= 1) {
      return `${timeValue} ${unit.unit}${timeValue > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
}

function getRandomColor(): string {
  const r = Math.floor(Math.random() * 256); // Random value between 0 and 255 for red component
  const g = Math.floor(Math.random() * 256); // Random value between 0 and 255 for green component
  const b = Math.floor(Math.random() * 256); // Random value between 0 and 255 for blue component

  const color = `rgb(${r}, ${g}, ${b})`; // Combine the RGB components into an "rgb(r, g, b)" string

  return color;
}

export { formatTimeAgo, getRandomColor };
