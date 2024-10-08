import { ExecutionContext } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { AuthGuard } from "@nestjs/passport"

export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride("isPublic", [context.getHandler(), context.getClass()])

    if (isPublic) return true

    return super.canActivate(context)
  }

  handleRequest(err, user, info, context) {
    console.log("JwtAuthGuard handleRequest", { err, user, info })
    return super.handleRequest(err, user, info, context)
  }
}
