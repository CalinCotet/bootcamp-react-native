import React, { useEffect, useState } from 'react';
import { 
        StyleSheet,
        View,
     } from 'react-native';
import MapboxGL from "@react-native-mapbox-gl/maps";

import { colors, padding } from './base';
import { getLatAndLongForData } from './helpers/data-helpers';
import { MAP_TOKEN } from './common/constants';
import Loading from './common/Loading';

MapboxGL.setAccessToken(MAP_TOKEN);

const MapComponent = (props) => {

    const { libraries } = props;
    const [mapPoints, setMapPoints] = useState([]);
    const [flyToPoint, setFlyToPoint] = useState([]);

    useEffect(() => {
        MapboxGL.setTelemetryEnabled(false);
        getLatAndLongForData(libraries).then((data) => {
            const points = [];
            data.forEach((element, index) => {
                const newPoint =
                    <MapboxGL.PointAnnotation 
                        id={element.features[0].place_name}
                        key={element.features[0].place_name}
                        coordinate={element.features[0].geometry.coordinates}
                    />
                points.push(newPoint);
                if (index === 0) {
                    setFlyToPoint(element.features[0].geometry.coordinates);
                }
            })
            setMapPoints(points);
        })
    }, []); 

    if (!mapPoints.length) {
        return (
            <View style={styles.map}>
                <Loading/> 
            </View>
        )
    }

    return (
        <View style={styles.map}>
            
                <MapboxGL.MapView
                    style={styles.mapContainer} 
                >
                    <MapboxGL.Camera
                        zoomLevel={3}
                        animationMode='flyTo'
                        animationDuration={3000}
                        centerCoordinate={flyToPoint}
                    />
                    <MapboxGL.UserLocation ref={(location) => {console.log({location})}} followUserLocation={true} />
                    {mapPoints}
                </MapboxGL.MapView>
            
        </View>
    )
}

const styles = StyleSheet.create({
    mapContainer: {
        margin:padding.lg,
        height: 300,
        width: 300
    },
    map: {
        flex: 3,
        backgroundColor: colors.primary
    }
})

export default MapComponent;