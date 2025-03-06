#!/bin/bash

# Check if WIREMOCK_CLOUD_API_TOKEN is set
if [ -z "$WIREMOCK_CLOUD_API_TOKEN" ]; then
  echo "Error: WIREMOCK_CLOUD_API_TOKEN environment variable is not set."
  echo "Please set it with your WireMock Cloud API token."
  exit 1
fi

# Upload mappings to WireMock Cloud
echo "Uploading mappings to WireMock Cloud..."

# Create a temporary directory for the upload
TEMP_DIR=$(mktemp -d)
cp -r mappings $TEMP_DIR/
cp wiremock-cloud-config.json $TEMP_DIR/

# Create a zip file
cd $TEMP_DIR
zip -r wiremock-mappings.zip .
cd -

# Upload to WireMock Cloud
curl -X POST \
  -H "Authorization: Bearer $WIREMOCK_CLOUD_API_TOKEN" \
  -F "file=@$TEMP_DIR/wiremock-mappings.zip" \
  https://api.wiremock.io/v1/projects

# Clean up
rm -rf $TEMP_DIR

echo "Mappings uploaded successfully!" 