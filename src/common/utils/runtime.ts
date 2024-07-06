import { Runtime } from "@/types/Common";

export function secondsToRuntime(totalSeconds: number = 0): Runtime {
  if (totalSeconds < 60) {
    return {
      seconds: totalSeconds,
      text: "1m",
    };
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  let text = "";
  if (hours > 0) text += `${hours}h `;
  if (minutes > 0 || hours > 0) text += `${minutes}m`;

  return {
    seconds: totalSeconds,
    text: text.trim(),
  };
}
