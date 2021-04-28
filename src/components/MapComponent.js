import React, { useEffect } from 'react';
import { 
        StyleSheet,
        View,
     } from 'react-native';
import MapboxGL from "@react-native-mapbox-gl/maps";

MapboxGL.setAccessToken("pk.eyJ1IjoiY2FsaW5jb3RldCIsImEiOiJja28xY253OHYwNXo4MndzMjhmZ2VobjIzIn0.Q786EwrNU5uyAnAzjwCSWg");

const MapComponent = (props) => {

    const { navigation } = props;

    const SF_OFFICE_LOCATION = [-122.400021, 37.789085];

    useEffect(() => {
        MapboxGL.setTelemetryEnabled(false);
    }, []); 

    return (
        <View style={styles.map}>
            <MapboxGL.MapView
                style={styles.mapContainer} 
                logoEnabled={false}
            >
                <MapboxGL.Camera
                    zoomLevel={6}
                    animationMode={'flyTo'}
                    animationDuration={6000}
                    centerCoordinate={[23.6236, 46.7712]}
                />
                <MapboxGL.UserLocation ref={(location) => {console.log({location})}} followUserLocation={true} />
                <MapboxGL.PointAnnotation id='Cluj-Napoca' coordinate={[23.6236, 46.7712]} title='Cluj-Napoca'/>
                <MapboxGL.PointAnnotation id='Alba Iulia' coordinate={[23.5805, 46.0733]} title='Alba Iulia'/>
                {/* <MapboxGL.MarkerView anchor={{x: 0.5, y: 0.5}}/> */}
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