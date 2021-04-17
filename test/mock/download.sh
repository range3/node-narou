#!/bin/sh

SCRIPT_DIR=$(cd $(dirname $0) && pwd)

NCODE=n3930eh

if [ ! -f ${SCRIPT_DIR}/toc.html ]; then
  curl -o ${SCRIPT_DIR}/toc.html https://ncode.syosetu.com/${NCODE}/
fi
if [ ! -f ${SCRIPT_DIR}/${NCODE}.1.html ]; then
  curl -o ${SCRIPT_DIR}/${NCODE}.1.html https://ncode.syosetu.com/${NCODE}/1/
fi
