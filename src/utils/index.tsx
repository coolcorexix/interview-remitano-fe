function formatTimeAgo(timestamp: number): string {
  const currentTimestamp = new Date();
  const timeDifference =
    currentTimestamp.getTime() - new Date(timestamp).getTime();

  const timeUnits = [
    { unit: "year", milliseconds: 31536000000 },
    { unit: "month", milliseconds: 2592000000 },
    { unit: "day", milliseconds: 86400000 },
    { unit: "hour", milliseconds: 3600000 },
    { unit: "minute", milliseconds: 60000 },
  ];

  for (const unit of timeUnits) {
    const timeValue = Math.floor(timeDifference / unit.milliseconds);
    if (timeValue >= 1) {
      return `${timeValue} ${unit.unit}${timeValue > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
}

function getRandomColor(): string {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}

function getLinkYoutube(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}

export { formatTimeAgo, getRandomColor, getLinkYoutube };
