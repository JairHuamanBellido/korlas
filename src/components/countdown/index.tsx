import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { interval } from "rxjs";
interface Props {
  durationInSeconds: number;
  onFinish?: () => void;
  className?: string;
  isStopped: boolean;
}
export default function Countdown({
  durationInSeconds,
  className,
  onFinish,
  isStopped,
}: Props) {
  const [remainingTime, setRemainingTime] = useState(durationInSeconds);

  useEffect(() => {
    const subscription = interval(1000).subscribe(() => {
      
      setRemainingTime((prev) => prev - 1);
    });

    if (isStopped || remainingTime === 0) {
      subscription.unsubscribe();
    }
    if(remainingTime === 0){
      setRemainingTime(durationInSeconds)
    }

    return () => {
      subscription.unsubscribe();
    };
  }, [remainingTime, isStopped]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return (
      (hours > 0 ? `${hours}h ` : "") +
      (minutes > 0 ? `${minutes}min ` : "") +
      `${seconds}s`
    );
  };

  useEffect(() => {
    if (remainingTime === 0 && onFinish) {
      console.log("called")
      onFinish();
    }
  }, [remainingTime]);
  return (
    <div className={cn(className)}>
      {remainingTime > 0 && <p> {formatTime(remainingTime)}</p>}
    </div>
  );
}
