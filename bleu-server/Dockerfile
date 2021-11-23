FROM rust as builder

RUN apt-get update && apt-get install build-essential -y

WORKDIR bleu-server

COPY . .

RUN cargo build --release --bin bleu-server

FROM rust:1.56-slim as runtime

RUN apt-get update && apt-get install libpq-dev -y

WORKDIR bleu-server

COPY --from=builder /bleu-server/.env.docker ./.env

COPY --from=builder /bleu-server/target/release/bleu-server .

COPY --from=builder /bleu-server/swagger-ui ./swagger-ui

ENV RUST_LOG INFO

ENTRYPOINT ["./bleu-server"]

EXPOSE 8888