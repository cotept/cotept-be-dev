// import { JwtPayload } from "@libs/common"
// import { Inject, Injectable, UnauthorizedException } from "@nestjs/common"
// import { ConfigService } from "@nestjs/config"
// import { JwtService } from "@nestjs/jwt"
// import { ClientProxy } from "@nestjs/microservices"
// import { PassportStrategy } from "@nestjs/passport"
// import * as bcrypt from "bcryptjs"
// import { Request } from "express"
// import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt"
// import { firstValueFrom } from "rxjs"

// @Injectable()
// export class RefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
//   constructor(
//     private readonly jwtService: JwtService,
//     private readonly configService: ConfigService,
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromExtractors([
//         (request: any) =>
//           request?.cookies?.Authentication || request?.Authentication || request?.headers.Authentication,
//       ]),
//       secretOrKey: configService.get<string>("REFRESH_SECRET"),
//       passReqToCallback: true,
//     })
//   }

//   async validate(req: Request, payload: JwtPayload, done: VerifiedCallback) {
//     // const refreshToken = req.get("authorization").replace("Bearer", "").trim()
//     const refreshToken = req?.cookies?.refresh_token || req?.headers?.authorization
//     if (!refreshToken) throw new UnauthorizedException("Refresh token not found")

//     const user = await firstValueFrom(
//       this.authService.send(COMMON_AUTH_PATTERNS.AUTH_USER_INFO, {
//         userId: payload.sub,
//       }),
//     )

//     if (!user) throw new UnauthorizedException("User not found")

//     const isValidToken = await this.jwtService.verify(refreshToken, {
//       secret: this.configService.get<string>("REFRESH_SECRET"),
//     })
//     if (!isValidToken) throw new UnauthorizedException("Invalid refresh token")

//     const refreshMatches = await bcrypt.compare(refreshToken, user.refreshToken)
//     if (!refreshMatches) throw new UnauthorizedException("Invalid refresh token")

//     return done(null, {
//       ...payload,
//       refreshToken,
//     })
//   }
// }
