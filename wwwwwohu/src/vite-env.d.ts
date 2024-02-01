/// <reference types="vite/client" />
declare module 'poker-hand' {
  export function play({
    shuffleCount = 3, handSize = 5
  }: {
    shuffleCount: number | null,
    handSize: number | null
  }): void;

  export function showHand(): void;
}