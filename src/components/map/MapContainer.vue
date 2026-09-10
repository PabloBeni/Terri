<script setup lang="ts"> 
import {ref, onMounted, onUnmounted} from 'vue';
import {Map, setWorkerUrl} from 'maplibre-gl';
import { useMap } from '@/composables/useMap';
import 'maplibre-gl/dist/maplibre-gl.css';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

setWorkerUrl(workerUrl); // Establecemos la URL del worker para maplibre-gl
const { setMap, mapInstance } = useMap();
const mapContainer = ref<HTMLDivElement | null>(null);

onMounted(()=>{ //una vez se monta el componente, se ejecuta la función
    if(!mapContainer.value) return; 

    //*Inicializamos el mapa, luego lo pasamos al composable para que otros componentes puedan modificarlo
    const mapInit = new Map({
        container: mapContainer.value, //contenedor del mapa
        style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json', 
        center: [-58.5959075, -34.7477628], //donde empieza el mapa 
        zoom: 15 //zoom inicial del mapa
    });
    
    mapInit.on('load', ()=>{
        setMap(mapInit);
        if (mapInit.getLayer('background')) {
            mapInit.setPaintProperty('background', 'background-opacity', 0)
        }
    })

});

onUnmounted(() => {
    if(mapContainer.value){
        setMap(null as unknown as Map);
        mapInstance.value?.remove();    
    }
})
</script>
<template>
    <div class="MapWrapper">
        <div ref="mapContainer" class="map-view" />
    </div>
</template>
<style scoped lang="scss">
    .MapWrapper{
        background: radial-gradient(circle at center, #ff007a, #7928ca, #0f172a);
    }
    .map-view{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 1;
        background-color: none;
    }
</style>
