#!/usr/bin/env bash
version_bump="$VERSION_BUMP"
case $version_bump in
*"major"*)
  echo "major"
  $version="major"
  ;;
*"minor"*)
  echo "minor"
  $version="minor"
  ;;
*"patch"*)
  echo "patch"
  $version="patch"
  ;;
esac
echo "$VERSION_BUMP" > version.txt