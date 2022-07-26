FROM rust as builder

RUN apt update && apt install apt-utils libclang-dev -y

RUN rustup component add rustfmt

WORKDIR cv-daemon

COPY . .

RUN cargo build -j4 --release --bin cv-daemon

FROM rust:1.56-slim as runtime

RUN apt update && apt install apt-utils -y

WORKDIR cv-daemon

COPY --from=builder /cv-daemon/target/release/cv-daemon .

ENV RUST_LOG INFO

ENTRYPOINT ["./cv-daemon", "--config-dir", "."]

EXPOSE 9999
