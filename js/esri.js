const runCode = (id) => alert(id);

require([
  "esri/config",
  "esri/Map",
  "esri/layers/FeatureLayer",
  "esri/views/MapView",
  "dojo/on",
  "dojo/dom",
  "dojo/dom-style",
  "esri/views/ui/DefaultUI",
  "esri/widgets/Expand",
  "esri/widgets/Legend",
  "esri/widgets/LayerList",
  "esri/widgets/Bookmarks",
  "esri/widgets/BasemapGallery"
], function (esriConfig, Map, FeatureLayer, MapView, on, dom, domStyle, DefaultUI, Expand, Legend, LayerList, Bookmarks, BasemapGallery) {
  esriConfig.apiKey = "AAPK2588c434b37a400db192f3539f91643fZTG4LK79CxAmPGezuppyETKTjEcFeK6ORqJonklBfnB2z6HkiJiyvoawzag7v9rW";

  const url = "https://gis9.mhpgeospace.co.za/arcgisserver/rest/services/Izinga/Izinga_3D_Imagery/MapServer";
  
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
  
  const pannellumLayer = new FeatureLayer({url:"https://gis9.mhpgeospace.co.za/arcgisserver/rest/services/Izinga/Izinga_3D_Imagery/MapServer/0",id:"pannellum",opacity: 0.8,popupTemplate:popupTemplate});
  const sewerLayer = new FeatureLayer({url:"https://gis9.mhpgeospace.co.za/arcgisserver/rest/services/Izinga/Izinga_3D_Imagery/MapServer/1",id:"sewer",opacity: 0.8});
  const stormwaterLayer = new FeatureLayer({url:"https://gis9.mhpgeospace.co.za/arcgisserver/rest/services/Izinga/Izinga_3D_Imagery/MapServer/2",id:"stormwater",opacity: 0.8});
  

  

  const map = new Map({
    basemap: "arcgis-imagery",
    layers: [pannellumLayer,sewerLayer,stormwaterLayer]
  });

  const view = new MapView({
    container: "viewDiv",
    center: [31.08184222222222, -29.70377],
    zoom: 19,
    map
  });

  
  const legendExpand = new Expand({
    view: view,
    content: new Legend({
      view: view
    }),
    group: "top-right",
    expanded: false
  });

  const layerListExpand = new Expand({
    view: view,
    content: new LayerList({
      view: view
    }),
    group: "top-right",
    expanded: false
  });

  const baseMapExpand = new Expand({
    view: view,
    content: new BasemapGallery({
      view: view,
      container: document.createElement("div")
    }),
    group: "top-right",
    expanded: false
  });

  view.ui.add([legendExpand, layerListExpand, baseMapExpand], {
    position: "top-trailing"
  });


  on(dom.byId("layer0"), "click", function (event) {
    console.log("layer zero");
    pannellumLayer.visible = !pannellumLayer.visible;
    if (pannellumLayer.visible) {
      domStyle.set(dom.byId("layer0"), "color", "black");
    } else {
      domStyle.set(dom.byId("layer0"), "color", "darkgray");
    }
  });

  on(dom.byId("layer1"), "click", function (event) {
    console.log("layer one");
    sewerLayer.visible = !sewerLayer.visible;
    if (sewerLayer.visible) {
      domStyle.set(dom.byId("layer1"), "color", "black");
    } else {
      domStyle.set(dom.byId("layer1"), "color", "darkgray");
    }
  });

  on(dom.byId("layer2"), "click", function (event) {
    console.log("layer two");
    stormwaterLayer.visible = !stormwaterLayer.visible;
    if (stormwaterLayer.visible) {
      domStyle.set(dom.byId("layer2"), "color", "black");
    } else {
      domStyle.set(dom.byId("layer2"), "color", "darkgray");
    }
  });
  
});
