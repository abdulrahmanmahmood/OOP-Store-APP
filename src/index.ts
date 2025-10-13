class calculator {
  sum(a: number, b: number): number;
  sum(a: number, b: number, c: number): number;
  sum(a: string, b: string, c: string): string;
  sum(a: any, b: any, c?: any): any {
    if (typeof a === "number" && typeof b === "number") return a + b;
    if (typeof a === "string" && typeof b === "string") return a + b;
  }
}
