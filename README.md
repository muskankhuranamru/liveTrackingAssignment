# React Native Application with Maps Integration and Battery Optimization Status

This React Native application integrates Google Maps API and fetches the user's location every 10 minutes. It also includes a feature to display battery optimization status retrieved from the native Android code.

## Features

- **Google Maps Integration**: Displays a map centered at a specific location (latitude and longitude) using Google Maps API.
- **Continuous Location Updates**: Retrieves the user's location every 10 minutes.
- **Direction Arrows**: Displays arrows indicating moving directions instead of markers on the map.
- **Battery Optimization Status**: Fetches battery optimization status from native Android code to check if battery saver mode is enabled.
- **UI Display**: Shows battery optimization status on the user interface in a card.

## Dependencies

- `react-native-maps`: Used for integrating Google Maps API.
- `react-native-get-location`: Used for fetching the user's location.
- `react-native-bridge-module`: Utilized for accessing native Android code from React Native.
  
## Installation

1. Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2. Navigate to the project directory:

    ```bash
    cd <project_directory>
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Link native dependencies:

    ```bash
    react-native link
    ```

5. For Android, make sure to configure the Google Maps API key in `android/app/src/main/AndroidManifest.xml`:

    ```xml
    <application>
        <!-- Add your Google Maps API Key here -->
        <meta-data
            android:name="com.google.android.geo.API_KEY"
            android:value="YOUR_API_KEY_HERE" />
    </application>
    ```

6. Run the application:

    ```bash
    react-native run-android
    ```

## Usage

- Open the application on your device or emulator.
- The map will be displayed centered at the specified location with direction arrows indicating movement.
- Battery optimization status will be shown on the UI in a card.

## Note

- Ensure proper permissions are granted for location access on the device.
- Make sure the device is connected to the internet for Google Maps functionality.

## Contributor

Muskan Khurana 

For reference, here are some of the screenshots attached:

<p align="center">
  <img width="323" alt="Screenshot 2024-05-03 at 4 53 12 PM" src="https://github.com/muskankhuranamru/liveTrackingAssignment/assets/60090164/7fb38e57-2471-4d15-9ecc-f8f56db6bf7d">
</p>

<p align="center">
  <img width="318" alt="Screenshot 2024-05-03 at 4 53 49 PM" src="https://github.com/muskankhuranamru/liveTrackingAssignment/assets/60090164/6d1be555-0920-4c87-9d66-00c7811c1022">
</p>
