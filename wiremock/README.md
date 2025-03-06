# WireMock Cloud Setup for Weather App

This directory contains the WireMock mappings for the external APIs used by the Weather App. These mappings are used to create mock APIs in WireMock Cloud for development and testing purposes.

## Mock APIs

The application uses two external APIs:

1. **IP API** (http://ip-api.com)
   - WireMock Cloud URL: https://v7437.wiremockapi.cloud
   - Used to get the user's location based on their IP address

2. **Weather API** (https://api.weatherapi.com)
   - WireMock Cloud URL: https://2kd6l.wiremockapi.cloud
   - Used to get weather data for a specific location

## Development Mode

In development mode, the application automatically uses the WireMock Cloud mock APIs instead of the real APIs. This is configured in `src/app/lib/config.ts`.

## Updating Mock Stubs

If you need to update the mock stubs:

1. Modify the JSON files in the `mappings` directory
2. Use the `upload-to-wiremock-cloud.sh` script to upload the updated mappings to WireMock Cloud

```bash
# Set your WireMock Cloud API token
export WIREMOCK_CLOUD_API_TOKEN=your_api_token

# Run the upload script
./upload-to-wiremock-cloud.sh
```

## Manual Setup

If you need to set up the mock APIs manually:

1. Create a new mock API in WireMock Cloud for each external API
2. Import the mappings from the `mappings` directory
3. Update the URLs in `src/app/lib/config.ts` to point to your new mock APIs 