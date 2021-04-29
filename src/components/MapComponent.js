import React, { useEffect } from 'react';
import { 
        StyleSheet,
        View,
     } from 'react-native';
import MapboxGL from "@react-native-mapbox-gl/maps";

import { MAP_TOKEN } from './common/constants';

MapboxGL.setAccessToken(MAP_TOKEN);

const MapComponent = (props) => {

    const LOCATION_CLUJ = [23.6236, 46.7712];
    const LOCATION_ALBA = [23.5805, 46.0733];

    useEffect(() => {
        MapboxGL.setTelemetryEnabled(false);
    }, []); 

    return (
        <View style={styles.map}>
            <MapboxGL.MapView
                style={styles.mapContainer} 
            >
                <MapboxGL.Camera
                    zoomLevel={6}
                    animationMode={'flyTo'}
                    animationDuration={3000}
                    centerCoordinate={LOCATION_CLUJ}
                />
                <MapboxGL.UserLocation ref={(location) => {console.log({location})}} followUserLocation={true} />
                <MapboxGL.PointAnnotation id='Cluj-Napoca' coordinate={LOCATION_CLUJ} title='Cluj-Napoca'/>
                <MapboxGL.PointAnnotation id='Alba Iulia' coordinate={LOCATION_ALBA} title='Alba Iulia'/>
            </MapboxGL.MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    mapContainer: {
        margin:20,
        height: 300,
        width: 300
    },
    map: {
        flex: 3,
    }
})

export default MapComponent;