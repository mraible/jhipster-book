#!/usr/bin/env bash
./gradlew clean all
KINDLEGEN=/opt/tools/kindlegen/kindlegen ./gradlew mobi
