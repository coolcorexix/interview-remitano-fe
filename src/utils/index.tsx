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

function numberToReadableString(views: string): string {
  const viewsNumber = parseInt(views, 10);

  if (!viewsNumber) {
    return "0";
  }

  if (viewsNumber >= 1_000_000_000) {
    const formattedViews = (viewsNumber / 1_000_000_000).toLocaleString(
      undefined,
      {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }
    );
    return `${formattedViews}B`;
  }

  if (viewsNumber >= 1_000_000) {
    const formattedViews = (viewsNumber / 1_000_000).toLocaleString(undefined, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return `${formattedViews}M`;
  }

  if (viewsNumber >= 1_000) {
    const formattedViews = (viewsNumber / 1_000).toLocaleString(undefined, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return `${formattedViews}K`;
  }

  return views.toLocaleString();
}

export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  if (color === "#FFFFFF") {
    color = "#000000";
  }

  return color;
}

export { formatTimeAgo, numberToReadableString };
