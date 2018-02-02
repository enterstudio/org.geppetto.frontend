
/**
 * Plot Widget class using plotly javascript library
 *
 * @module Widgets/Plot
 * @author Jesus R. Martinez (jesus@metacell.us)
 * @author Adrian Quintana (adrian.perez@ucl.ac.uk)
 */
define(function (require) {

	var Widget = require('../Widget');
	var $ = require('jquery');
	var Plotly = require('plotly.js/lib/core');

	require("./ScatterPlot.less");

	return Widget.View.extend({
		plotly: null,
		plotDiv : null,
		plotOptions : null,

		/**
		 * Default options for plotly widget, used if none specified when plot
		 * is created.
		 */
		defaultOptions : function() {
			return {};
		},

		/**
		 * Initializes the plotly widget given a set of options
		 *
		 * @param {Object} options - Object with options for the plot widget
		 */
		initialize: function (options) {
        	Widget.View.prototype.initialize.call(this, options);
			this.id = options.id;
			this.name = options.name;
			this.plotOptions = this.defaultOptions();
			this.render();
			this.dialog.append("<div id='" + this.id + "'></div>");
			this.plotDiv = document.getElementById(this.id);
			this.plotElement = $("#"+this.id);
		},

		plotScatter3dData: function(x_data, y_data, z_data, name){
			var trace = {
			  x:x_data,  y: y_data, z: z_data, 
			  mode: 'markers',
			  marker: {
			    size: 12,
			    line: {
			      color: 'rgba(217, 217, 217, 0.14)',
			      width: 0.5
			    },
			    opacity: 0.8
			  },
			  type: 'scatter3d'		  
			};
			var data = [trace];
			var layout = {margin: {
			    l: 0,
			    r: 0,
			    b: 0,
			    t: 0
			  }};

			Plotly.newPlot(this.plotDiv, data, layout);

			return this;
		}

	});
});
