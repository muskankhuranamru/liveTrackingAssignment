import {NativeModules} from 'react-native';
const {BatteryOptimization} = NativeModules;
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Button,
} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import ArrowSvgComponent from './src/assets/svgs/ArrowSvgComponent';

interface Location {
  latitude: number;
  longitude: number;
}
const App = (): JSX.Element => {
  const [routeCoordinate, setRouteCoordinate] = useState<Location[]>([]);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [batteryOptimizationStatus, setBatteryOptimizationStatus] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    BatteryOptimization.getBatteryOptimizationStatus((status: boolean) => {
      console.log('STATUS', status);
      setBatteryOptimizationStatus(status);
    });
  }, []);

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const location = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
        });
        console.log('User location', location);

        setUserLocation(location);

        setRouteCoordinate(prevCoordinates => [
          ...prevCoordinates,
          {
            latitude: location.latitude,
            longitude: location.longitude,
          },
        ]);
      } catch (error: any) {
        console.warn(error.code, error.message);
      }
    };

    getUserLocation();
    const intervalId = setInterval(getUserLocation, 600000);

    return () => clearInterval(intervalId);
  }, []);

  const initialRegion = {
    latitude: routeCoordinate.length > 0 ? routeCoordinate[0].latitude : 0,
    longitude: routeCoordinate.length > 0 ? routeCoordinate[0].longitude : 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const calculateRotation = (coord1: Location, coord2: Location) => {
    const dx = coord2.longitude - coord1.longitude;
    const dy = coord2.latitude - coord1.latitude;

    // Calculate the angle between the two coordinates
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);

    // Convert negative angles to positive
    if (angle < 0) {
      angle += 360;
    }

    // Adjust the angle to ensure it ranges between 0 and 360 degrees
    angle = (angle + 360) % 360;

    // Adjust the angle based on the difference in latitude and longitude
    if (dx < 0 && dy < 0) {
      angle = 180 + Math.abs(angle);
    } else if (dx < 0 && dy > 0) {
      angle = 180 - Math.abs(angle);
    } else if (dx > 0 && dy < 0) {
      angle = 360 - Math.abs(angle);
    } else if (dx > 0 && dy > 0) {
      angle = Math.abs(angle);
    }

    // Handle special case for left turns (adjust angle by 90 degrees)
    if (dx < 0 && dy > 0) {
      // Left turn towards positive y-axis
      angle += 90;
    } else if (dx > 0 && dy < 0) {
      // Left turn towards negative y-axis
      angle -= 90;
    } else if (dy > 0) {
      // Adjust for dy > 0
      angle += 180;
    }

    return angle;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <MapView
          style={{height: '90%', width: '100%'}}
          showsUserLocation={true}
          region={initialRegion}
          initialRegion={initialRegion}>
          <Polyline
            coordinates={routeCoordinate.length > 0 ? routeCoordinate : []}
            strokeColor="red"
            strokeWidth={6}
          />

          {routeCoordinate.length > 0 &&
            routeCoordinate.map((coordinate, index) => {
              if (index === routeCoordinate.length - 1) return null;
              const nextCoordinate = routeCoordinate[index + 1];
              const rotation = calculateRotation(coordinate, nextCoordinate);
              return (
                <Marker
                  key={index}
                  coordinate={coordinate}
                  anchor={{x: 0.5, y: 0.5}}
                  title={`Marker ${index + 1}`}
                  rotation={rotation}>
                  <ArrowSvgComponent width={40} height={40} />
                </Marker>
              );
            })}
        </MapView>
        <View style={styles.batteryOptimizationCard}>
          <Text style={styles.batteryOptimizationText}>
            Battery Optimization Status :
            {batteryOptimizationStatus ? ' On' : ' Off'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {alignItems: 'center', height: '100%'},

  batteryOptimizationCard: {
    height: '10%',
    width: '100%',
    backgroundColor: '#3893fc',

    justifyContent: 'center',
    alignItems: 'center',
  },
  batteryOptimizationText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;
