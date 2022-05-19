const runCode = (id) => alert(id);

require([
  "esri/config",
  "esri/Map",
  "esri/layers/FeatureLayer",
  "esri/views/MapView",
  "esri/layers/TileLayer"
], function (esriConfig, Map, FeatureLayer, MapView, TileLayer) {
  /* HTML elements that are not sanitized
   * https://doc.arcgis.com/en/arcgis-online/reference/supported-html.htm
   */

  esriConfig.apiKey = "AAPK2588c434b37a400db192f3539f91643fZTG4LK79CxAmPGezuppyETKTjEcFeK6ORqJonklBfnB2z6HkiJiyvoawzag7v9rW";

  // const url = "https://gis9.mhpgeospace.co.za/arcgisserver/rest/services/Izinga/Izinga_3D/MapServer";
  const url = "https://gis9.mhpgeospace.co.za/arcgisserver/rest/services/Izinga/Izinga_3D_Imagery/MapServer";
  
  // const url = "https://services5.arcgis.com/pzri1WaMnTa8pQZb/arcgis/rest/services/Izinga_3D/FeatureServer/0";

  
  const sewerLayer = new TileLayer({
    url: "https://gis9.mhpgeospace.co.za/arcgisserver/rest/services/Izinga/Izinga_3D_Imagery/MapServer",
    id: "sewer",
    opacity: 0.7
  });
  

  const popupTemplate = {
    outFields: ["*"],
    title: "{Name}",
    content: function (feature) {
      const { OBJECTID } = feature.graphic.attributes;
      const { imgURL } = feature.graphic.attributes;
      console.log(imgURL);
      const unsanitizedHTML = `<iframe allowfullscreen style="width:100%;border-style:none;" src="https://cdn.pannellum.org/2.5/pannellum.htm#panorama=${imgURL}&autoRotate=-2&autoLoad=true"></iframe>`;
      const div = document.createElement("div");
      div.innerHTML = unsanitizedHTML.concat(``);
      return div;
    },
    // width: 80,
    dockOptions: {
      buttonEnabled: true,
      breakpoint: {
        width: 2000,
        height: 800
      }
    }
  };

  const map = new Map({
    basemap: "arcgis-imagery",
    layers: [new FeatureLayer({ url, popupTemplate })]
  });
  map.add(sewerLayer);

  const view = new MapView({
    container: "viewDiv",
    center: [31.08184222222222, -29.70377],
    zoom: 19,
    map
  });

  const sewerLayerToggle = document.getElementById("sewerLayer");
  sewerLayerToggle.addEventListener("change", () => {
    sewerLayer.visible = sewerLayerToggle.checked;
  });

  
});
