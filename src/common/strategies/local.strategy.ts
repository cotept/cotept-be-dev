// import { Inject, Injectable, UnauthorizedException } from "@nestjs/common"
// import { ClientProxy } from "@nestjs/microservices"
// import { PassportStrategy } from "@nestjs/passport"
// import { Strategy } from "passport-local"

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy, "local") {
//   constructor() {
//     super({
//       usernameField: "email",
//     })
//   }

//   async validate(email: string, password: string) {
//     try {
//       const signinUserDto = { email, password }
//       return await this.usersService.send("verfify-user", { signinUserDto })
//     } catch (error) {
//       throw new UnauthorizedException(error)
//     }
//   }
// }
