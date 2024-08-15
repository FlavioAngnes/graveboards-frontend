export class TimeUtils {
    formatTime(seconds: number): string {
        const minutes: number = Math.floor(seconds / 60);
        const remainingSeconds: number = seconds % 60;

        // Format seconds to always be two digits
        const formattedSeconds: string = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds.toString();

        return `${minutes}:${formattedSeconds}`;
    }
}