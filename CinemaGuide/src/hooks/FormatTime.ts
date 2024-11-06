export function FormatTime(minutes: number): string {
    const remainingHours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${remainingHours} час ${remainingMinutes} минут`
}