import { ExecutionContext } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"

export class RefreshAuthGuard extends AuthGuard("jwt-refresh") {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }

  handleRequest(err, user, info, context) {
    console.log("RefreshAuthGuard handleRequest", { err, user, info })
    return super.handleRequest(err, user, info, context)
  }
}
