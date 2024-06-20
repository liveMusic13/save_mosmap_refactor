import { AuthContext } from "@/providers/AuthProvider";
import { IIsAuth } from "@/types/provider.types";
import { useContext } from "react";

export const useAuth = ():IIsAuth => useContext(AuthContext);