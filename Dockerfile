FROM alpine:3.12.0 AS deno_gui
RUN apk --no-cache add curl
RUN curl -fsSL https://deno.land/x/install/install.sh | sh
RUN cd /root/.deno/bin
RUN ls /root/
RUN /root/.deno/bin/deno --version
