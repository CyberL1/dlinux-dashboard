FROM openresty/openresty:alpine

RUN wget -O /usr/local/openresty/lualib/resty/http.lua https://github.com/ledgetech/lua-resty-http/raw/refs/heads/master/lib/resty/http.lua
RUN wget -O /usr/local/openresty/lualib/resty/http_connect.lua https://github.com/ledgetech/lua-resty-http/raw/refs/heads/master/lib/resty/http_connect.lua
RUN wget -O /usr/local/openresty/lualib/resty/http_headers.lua https://github.com/ledgetech/lua-resty-http/raw/refs/heads/master/lib/resty/http_headers.lua

COPY proxy.conf etc/nginx/conf.d/proxy.conf
ENTRYPOINT ["/bin/sh", "-c", "sed -i \"s/{PROXY_DOMAIN}/$PROXY_DOMAIN/\" etc/nginx/conf.d/proxy.conf && nginx -g 'daemon off;'"]
