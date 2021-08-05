#!/usr/bin/env bash
npm run generate
firebase use $ENV
firebase deploy --only hosting
firebase use default
