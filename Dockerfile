FROM alpine:latest

RUN echo "Test Dockerfile works"
RUN sleep 1

CMD ["echo", "Container running"]
