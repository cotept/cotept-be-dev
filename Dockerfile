## development
FROM node:20-alpine AS development

WORKDIR /usr/src/app

# Copy necessary files
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json
COPY prisma prisma

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies using pnpm and generate pnpm-lock.yaml
RUN pnpm install

COPY src src

RUN pnpm run build

## production
FROM node:20-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copy only necessary files from development stage
COPY package.json ./
COPY --from=development /usr/src/app/pnpm-lock.yaml ./
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY --from=development /usr/src/app/dist ./dist

# Install pnpm globally
RUN npm install -g pnpm

# Install only production dependencies using pnpm
RUN pnpm fetch
RUN pnpm install --prod

CMD ["pnpm", "run", "start:prod"]