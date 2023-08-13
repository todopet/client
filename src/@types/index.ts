import { user } from "@/@types/user";

interface res<D> {
  error: string | null;
  data: D;
}

export type { res, user };
