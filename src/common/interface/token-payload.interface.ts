export interface TokenPayload {
  userId: string
}

export interface JwtPayload {
  sub: string
  email: string
  iat?: number
  exp?: number
  roles: string
}

export interface JwtPayloadWithRefreshToken extends JwtPayload {
  refreshToken: string
}

export interface Tokens {
  access_token: string
  refresh_token: string
}

export interface ResponseToken {
  access_token: string
}
