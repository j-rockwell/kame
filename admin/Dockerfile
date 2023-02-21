FROM node:lts as dependencies
WORKDIR /admin
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

FROM node:lts as builder
WORKDIR /admin
COPY . .
COPY --from=dependencies /admin/node_modules ./node_modules
RUN npm run build

FROM node:lts as runner
WORKDIR /admin
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /admin/next.config.js ./
COPY --from=builder /admin/public ./public
COPY --from=builder /admin/.next ./.next
COPY --from=builder /admin/node_modules ./node_modules
COPY --from=builder /admin/package.json ./package.json

EXPOSE 3001
CMD ["npm", "start"]