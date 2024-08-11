import { JwtPayload } from "@app/common"
import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>("JWT_SECRET"),
    })
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    console.log("jwt strategy", payload)
    return done(null, payload)
    // return this.authService.send(COMMON_AUTH_PATTERNS.TOKEN_VALIDATION, { payload }).pipe(
    //   map(user => {
    //     if (!user) {
    //       return done(new UnauthorizedException({ message: "user does not exist" }), false)
    //     }
    //     return done(null, user)
    //   }),
    // )
  }
}
