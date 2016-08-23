#!/bin/bash

source $HOME/.rvm/scripts/rvm

if [ ! -d asciidoctor-pdf ]; then
  git clone -b issue-383 https://github.com/mojavelinux/asciidoctor-pdf
  rvm use 2.3.0@jhipster-book --create
  gem install bundler coderay
  bundle
else
  rvm use 2.3.0@jhipster-book
fi

ASCIIDOCTOR_PDF=./asciidoctor-pdf/bin/asciidoctor-pdf
OPTIMIZE_PDF=./asciidoctor-pdf/bin/optimize-pdf

ROOT_DIR=$(realpath $(dirname $0))
BASE_DIR="$ROOT_DIR/src/docs/asciidoc"
OUT_DIR="$ROOT_DIR/build/asciidoc/print"
PRINT=print

$ASCIIDOCTOR_PDF --trace -v -B "$BASE_DIR" \
  -D "$OUT_DIR" \
  -S unsafe \
  -r "$ROOT_DIR/src/main/ruby/asciidoctor-pdf-extensions.rb" \
  -a media=$PRINT \
  -a pdfmarks \
  -a pdf-style=infoq-$PRINT \
  -a pdf-stylesdir="$BASE_DIR/styles/pdf" \
  -a pdf-fontsdir="$BASE_DIR/styles/pdf/fonts" \
  -a sourcedir=../../../main/webapp \
  -a source-highlighter=coderay \
  -a imagesdir=images \
  -a toc \
  -a icons=font \
  -a idprefix \
  -a idseparator=- \
  -a projectdir=../../.. \
  -a rootdir=../../.. \
  -a project-name=jhipster-book \
  -a project-version=1.0.1-SNAPSHOT \
  -a attribute-missing=warn \
  "$BASE_DIR/index.adoc"

$OPTIMIZE_PDF "$OUT_DIR/index.pdf"
mv -f "$OUT_DIR/index-optimized.pdf" "$OUT_DIR/index.pdf"
