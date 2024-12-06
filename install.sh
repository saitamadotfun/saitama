#!/usr/bin/env bash

LOCKFILE="/tmp/install.lock"

if [ -e "$LOCKFILE" ]; then 
  exit 1
fi

trap 'rm -f "$LOCKFILE"' Exit
touch $LOCKFILE

if command -v "bun" &>/dev/null; then
    MANAGER="bun"
else
    MANAGER="npm"
fi

cd packages/bunshi && $MANAGER install --ignore-scripts
cd ../sdk && $MANAGER install --ignore-scripts