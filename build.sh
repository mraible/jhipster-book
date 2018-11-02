#!/usr/bin/env bash
export KINDLEGEN="`pwd`/build/kindlegen/kindlegen"
./gradlew all
./generate-pdf.sh
./generate-pdf.sh screen
