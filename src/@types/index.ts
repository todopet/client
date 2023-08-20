import { user } from "@/@types/user";
import { myPet } from "@/@types/myPet";

interface res<D> {
  error: string | null;
  data: D;
}

export type { res, user, myPet };
