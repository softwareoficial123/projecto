import { Injectable, Scope, Inject } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";

@Injectable({ scope: Scope.REQUEST })
export class RequestContext {
  constructor(
    @Inject(REQUEST)
    private readonly request: {
      user?: { tenantId?: string; plan?: string; role?: string };
    },
  ) {}

  get user() {
    return this.request.user;
  }
  get tenantId() {
    return this.request.user?.tenantId;
  }
  get plan() {
    return this.request.user?.plan || "FREE";
  } // 'FREE' | 'PRO'
  get role() {
    return this.request.user?.role || "USER";
  }
}
