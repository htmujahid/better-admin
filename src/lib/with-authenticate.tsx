import pathsConfig from "@/config/paths.config";
import { authenticate } from "./authenticate";
import { Permissions, Role } from "./roles";
import { redirect } from "next/navigation";

type LayoutOrPageComponent<Params> = React.ComponentType<Params>

export function withAuthenticate<Params extends object>(
  Component: LayoutOrPageComponent<Params>,
  args?:
    | {
      permissions: Permissions
      role?: never
    }
    | {
      role: Role

      permissions?: never
    },
) {
  return async function AuthenticateServerComponentWrapper(params: Params) {
    try {
      const response = await authenticate(args);

      return <Component user={response.user} {...params} />;
    } catch (error) {
      console.error(error)
      redirect(pathsConfig.auth.signIn)
    }
  };
}