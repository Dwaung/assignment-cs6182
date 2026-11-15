

FROM node:20 AS build

ARG VITE_BACKEND_URL=https://sturdy-disco-g474rpxrp7jx299w9-5173.app.github.dev/api/v1
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

WORKDIR /build

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:20 AS production

WORKDIR /app

COPY --from=build /build/package.json .
COPY --from=build /build/package-lock.json .
COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/dist ./dist
COPY --from=build /build/server.js ./server.js

EXPOSE 3000

CMD ["npm", "start"]
