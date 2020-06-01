export default function formatTime(timeNum: number): string {
  return ('00' + timeNum).slice(-2) + ':00';
}
