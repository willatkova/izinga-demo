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
  "esri/widgets/BasemapGallery",
  "esri/widgets/Print",
  "esri/widgets/Measurement",
  "esri/widgets/Sketch"
], function (esriConfig, Map, FeatureLayer, MapView, on, dom, domStyle, DefaultUI, Expand, Legend, LayerList, Bookmarks, BasemapGallery, Print, Measurement, Sketch) {
  esriConfig.apiKey = "AAPK2588c434b37a400db192f3539f91643fZTG4LK79CxAmPGezuppyETKTjEcFeK6ORqJonklBfnB2z6HkiJiyvoawzag7v9rW";

  const url = "https://gis9.mhpgeospace.co.za/arcgisserver/rest/services/Izinga/Izinga_3D_Imagery/MapServer";
  
  const splitAction = {
    title: "Split",
    id: "date-action-split"
    // image:
    //   "https://developers.arcgis.com/javascript/latest/sample-code/popup-actions/live/Measure_Distance16.png"
  };

  const prevDateAction = {
    title: "Oct 2021",
    id: "date-action-prev"
    // image:
    //   "https://developers.arcgis.com/javascript/latest/sample-code/popup-actions/live/Measure_Distance16.png"
  };

  const currentDateAction = {
    title: "Feb 2022",
    id: "date-action-current"
    // image:
    //   "https://developers.arcgis.com/javascript/latest/sample-code/popup-actions/live/Measure_Distance16.png"
  };

  const popupTemplate = {
    outFields: ["*"],
    title: "{Name}",
    content: function (feature) {
      const { OBJECTID } = feature.graphic.attributes;
      const { imgURL } = feature.graphic.attributes;
      const { imgOld } = feature.graphic.attributes;
      const unsanitizedHTML = `<iframe id="panoFrameCurrent" allowfullscreen style="width:50%;border-style:none;" src="https://cdn.pannellum.org/2.5/pannellum.htm#panorama=${imgURL}&autoRotate=-2&autoLoad=true"></iframe><iframe id="panoFramePrev" allowfullscreen style="width:50%;border-style:none;" src="https://cdn.pannellum.org/2.5/pannellum.htm#panorama=${imgOld}&autoRotate=-2&autoLoad=true"></iframe>`;
      const div = document.createElement("div");
      div.innerHTML = unsanitizedHTML.concat(``);
      return div;
    },
    actions: [splitAction, prevDateAction, currentDateAction],
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

  const measureExpand = new Expand({
    view: view,
    content: new Measurement({
      view: view,
      activeTool: "distance"
    }),
    group: "top-right",
    expanded: false
  });

  const bookmarkExpand = new Expand({
    view: view,
    content: new Bookmarks({
      view: view,
      editingEnabled: true,
      defaultCreateOptions: {
        takeScreenshot: true,
        captureViewpoint: false,
        captureTimeExtent: false,
        screenshotSettings: {
          width: 100,
          height: 100
        }
      }
   }),
    group: "top-right",
    expanded: false
  });

  const drawExpand = new Expand({
    view: view,
    content: new Sketch({
      layer: pannellumLayer,
      view: view
    }),
    group: "top-right",
    expanded: false
  });

  const printExpand = new Expand({
    view: view,
    content: new Print({
      view: view,
      // specify your own print service
      printServiceUrl:
         "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
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



  view.ui.add([legendExpand, layerListExpand, measureExpand, drawExpand, bookmarkExpand, printExpand, baseMapExpand], {
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

  view.popup.on("trigger-action", (event) => {
    const attributes = view.popup.viewModel.selectedFeature.attributes;
    console.log(attributes);

    if (event.action.id === "date-action-split") {
      console.log("prev");
      var framePrev = dom.byId("panoFramePrev");
      var frameCurrent = dom.byId("panoFrameCurrent");
      domStyle.set(framePrev, "visibility", "visible");
      domStyle.set(framePrev, "width", "50%");
      domStyle.set(frameCurrent, "visibility", "visible");
      domStyle.set(frameCurrent, "width", "50%");
    }

    if (event.action.id === "date-action-prev") {
      console.log("prev");
      var framePrev = dom.byId("panoFramePrev");
      var frameCurrent = dom.byId("panoFrameCurrent");
      domStyle.set(framePrev, "visibility", "visible");
      domStyle.set(framePrev, "width", "100%");
      domStyle.set(frameCurrent, "visibility", "hidden");
      domStyle.set(frameCurrent, "width", "0%");
    }

    if (event.action.id === "date-action-current") {
      console.log("current");
      var framePrev = dom.byId("panoFramePrev");
      var frameCurrent = dom.byId("panoFrameCurrent");
      domStyle.set(frameCurrent, "visibility", "visible");
      domStyle.set(frameCurrent, "width", "100%");
      domStyle.set(framePrev, "visibility", "hidden");
      domStyle.set(framePrev, "width", "0%");
    }
  });
  
});
