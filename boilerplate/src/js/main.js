/*
 * Dependencies
 */
import "core/polyfills";
import Events from "modules/core/events.js";
import SVG4Everybody from "svg4everybody";
import Vue from "vue";
import * as router from "core/router.js";
import * as sections from "vuejs/sections/sections.js";

document.addEventListener("DOMContentLoaded", function() {

  SVG4Everybody();
  new Vue({

    el: "#app",
    data: {
      currentSection: null,
      isLoading: true
    },
    mounted: function() {

      sections.init();

      Events.on("section:destroyed", () => {

        this.isLoading = true;
      });

      Events.on("section:loaded", () => {

        this.isLoading = false;
        SVG4Everybody();
      });

      Events.on("router:update", (route) => {

        this.currentSection = route.name;
        Events.emit("section:load", { route: route });
      });

      router.init();
    }
  });
});
