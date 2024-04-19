# 기본 Node.js 이미지를 사용하여 베이스 이미지 설정
FROM krmp-d2hub-idock.9rum.cc/goorm/node:18 AS base

# 의존성 설치 단계
FROM base AS deps
WORKDIR /usr/src/app
COPY krampoline/package*.json ./
RUN npm ci

# 소스 코드 재구성
FROM base AS builder
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY krampoline/ .

# .env 파일 생성
RUN echo "NEXT_PUBLIC_KAKAO_API_KEY=27e18fb1f123f9fa8e5492566f736e97" > .env
RUN echo "NEXT_PUBLIC_BASE_URL=https://vipandrendezvous.site/" >> .env
RUN echo "NEXT_PUBLIC_WS_PROXY=wss://vipandrendezvous.site/" >> .env

RUN npm run build

# 최종 실행 이미지
FROM base AS runner
WORKDIR /usr/src/app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 캐시 폴더 및 권한 설정
RUN mkdir .next
RUN chown nextjs:nodejs .next

# 빌드된 파일 복사 및 소유권 설정
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static
COPY --from=builder /usr/src/app/.env ./.env  # .env 파일 복사

USER nextjs
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
