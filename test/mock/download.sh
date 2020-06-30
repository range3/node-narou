#!/bin/sh

SCRIPT_DIR=$(cd $(dirname $0) && pwd)

NCODE=n5519gi

curl -o ${SCRIPT_DIR}/toc.html https://ncode.syosetu.com/${NCODE}/
curl -o ${SCRIPT_DIR}/${NCODE}.1.html https://ncode.syosetu.com/${NCODE}/1/
