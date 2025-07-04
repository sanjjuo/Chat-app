export default function useWait({ ms }: { ms: number }) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
