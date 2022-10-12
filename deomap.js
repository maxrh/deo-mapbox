addEventListener('DOMContentLoaded', (event) => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWF4LW1vbnN1biIsImEiOiJja3Q4bW5keDIweGNiMnhwaDVjbHFyeHprIn0.OdNo8WY_wMDlQ2qmsdLPaQ';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/max-monsun/cl2yt14r1001y14m2ssejgfz5',
        center: [11.554, 55.669],
        zoom: 6
    });

    document.getElementById('reset').addEventListener('click', () => {
        map.flyTo({
            center: [11.554, 55.669],
            zoom: 6,
            pitch: 0,
            bearing: 0,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
    });

    map.on('load', () => {
        map.addSource('places', places);
        map.addSource('placesBlue', placesBlue);

        // Add a layer showing the places.
        map.addLayer({
            'id': 'places',
            'type': 'circle',
            'source': 'places',
            'paint': {
                'circle-color': '#f3004b',
                'circle-radius': 8,
                'circle-stroke-color': 'white',
                'circle-stroke-width': 1,
                'circle-opacity': 0.4
            }
        });
        
        map.addLayer({
            'id': 'placesBlue',
            'type': 'circle',
            'source': 'placesBlue',
            'paint': {
                'circle-color': '#0008FF',
                'circle-radius': 8,
                'circle-stroke-color': 'white',
                'circle-stroke-width': 1,
                'circle-opacity': 0.4
            }
        });

        // Create a popup, but don't add it to the map yet.
        const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });
        
        map.on('click',  ['places', 'placesBlue'], (e) => {
        
            // Copy coordinates array.
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.description;
            
            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            
            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(coordinates).setHTML(description).addTo(map);
        });

        map.on('mouseenter',  ['places', 'placesBlue'], (e) => {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave',  ['places', 'placesBlue'], (e) => {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = '';
        });
        
        document.querySelector('.mapboxgl-canvas').addEventListener('click', () => {
            popup.remove();
        });
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());
});