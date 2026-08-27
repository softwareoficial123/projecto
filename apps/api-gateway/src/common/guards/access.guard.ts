import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RequestContext } from "../request-context.service";

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private ctx: RequestContext,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<string>(
      "role",
      context.getHandler(),
    );
    const requiredPlan = this.reflector.get<string>(
      "plan",
      context.getHandler(),
    );

    // 1. Validar ROL (Ejemplo simple)
    if (requiredRole && this.ctx.role !== requiredRole) {
      throw new ForbiddenException("Role insuficiente");
    }

    // 2. Validar PLAN (Bloquear funciones PRO si es FREE)
    if (requiredPlan === "PRO" && this.ctx.plan !== "PRO") {
      throw new ForbiddenException("Requiere Plan PRO");
    }

    return true;
  }
}
