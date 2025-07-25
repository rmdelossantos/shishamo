import { ReactNode } from "react";

export type Column<T> = {
  key: keyof T;
  header: string;
  render?: (item: T) => ReactNode;
  className?: string;
};
