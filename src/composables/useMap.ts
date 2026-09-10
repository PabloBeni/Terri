import { ref, shallowRef } from 'vue';
import type { Map } from 'maplibre-gl';

//* Los ref y shallowRef estan afuera de la funcion use... por ende son globales y el valos es compartido por todos los componentes
const mapInstance = shallowRef<Map | null>(null);//~ shallowRef no es profundamente reactivo, para datos grandes no genera lag o errores
const isMapLoaded = ref<boolean>(false);

export function useMap() {
    function setMap(map: Map){
        mapInstance.value = map;
    }
    function flyToLocation(cords: [number, number], zoom = 14){
        mapInstance.value?.flyTo({
            center: cords,
            zoom: zoom,
            essential: true //animacion
        })
    }
    function mapLoaded(loaded: boolean){
        isMapLoaded.value = loaded;
    }
    return{
        mapInstance: mapInstance,
        setMap, 
        flyToLocation,
        mapLoaded
    }
};