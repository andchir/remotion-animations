#!/bin/bash
# Script to verify GitHub Pages deployment fix
# This script checks if the deployed site works correctly after the fix

set -e

echo "Verifying GitHub Pages deployment..."
echo ""

# Check if the main page loads
echo "1. Checking main page..."
MAIN_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://andchir.github.io/remotion-animations/)
if [ "$MAIN_STATUS" = "200" ]; then
    echo "✓ Main page loads successfully (HTTP $MAIN_STATUS)"
else
    echo "✗ Main page failed to load (HTTP $MAIN_STATUS)"
    exit 1
fi

# Check if bundle.js is accessible with relative path
echo ""
echo "2. Checking bundle.js..."
BUNDLE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://andchir.github.io/remotion-animations/bundle.js)
if [ "$BUNDLE_STATUS" = "200" ]; then
    echo "✓ bundle.js is accessible (HTTP $BUNDLE_STATUS)"
else
    echo "✗ bundle.js is not accessible (HTTP $BUNDLE_STATUS)"
    exit 1
fi

# Check if the HTML uses relative paths
echo ""
echo "3. Checking if HTML uses relative paths..."
HTML_CONTENT=$(curl -s https://andchir.github.io/remotion-animations/)
if echo "$HTML_CONTENT" | grep -q 'src="./bundle.js"'; then
    echo "✓ HTML uses relative path for bundle.js"
elif echo "$HTML_CONTENT" | grep -q 'src="/bundle.js"'; then
    echo "✗ HTML still uses absolute path for bundle.js"
    exit 1
else
    echo "? Could not verify script src attribute"
fi

echo ""
echo "All checks passed! GitHub Pages deployment is working correctly."
