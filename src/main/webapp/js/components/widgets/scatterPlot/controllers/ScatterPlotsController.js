/**
 * Controller class for scatter plot widget. Use to make calls to widget from inside Geppetto.
 *
 * @author Giovanni Idili
 */
define(function(require) {

    var AWidgetController = require('../../AWidgetController');
    

    /**
     * @exports Widgets/Plotly/PlotlyController
     */
    return AWidgetController.View.extend({

        initialize: function() {
            this.widgets = [];
            var widgets = this.widgets;
        },

        /**
         * Creates plotting widget
         */
        addWidget: function (isStateless) {
            if(isStateless == undefined){
                isStateless = false;
            }
            var that=this;
            
            
            return new Promise(resolve => {
            	require.ensure([],function(require){
                	var ScatterPlot = require('../ScatterPlot');
                    
                    //look for a name and id for the new widget
                    var id = that.getAvailableWidgetId("ScatterPlot", that.widgets);
                    var name = id;

                    //create plotting widget
                    var p = window[name] = new ScatterPlot({
                        id: id, name: name, visible: true,
                        widgetType: GEPPETTO.Widgets.SCATTER,
                        stateless: isStateless
                    });
                    p.setController(that);

                    //create help command for plot
                    p.help = function() {
                        return GEPPETTO.CommandController.getObjectCommands(id);
                    };

                    //store in local stack
                    that.widgets.push(p);

                    GEPPETTO.WidgetsListener.subscribe(that, id);

                    //add commands to console autocomplete and help option
                    GEPPETTO.CommandController.updateHelpCommand(p, id, that.getFileComments("geppetto/js/components/widgets/scatterPlot/ScatterPlot.js"));
                    //update tags for autocompletion
                    GEPPETTO.CommandController.updateTags(p.getId(), p);

                    resolve(p);
                });	
            });
        },

        /**
         * Receives updates from widget listener class to update plotting widget(s)
         *
         * @param {WIDGET_EVENT_TYPE} event - Event that tells widgets what to do
         */
        update: function(event, parameters) {
            //delete plot widget(s)
            if (event == GEPPETTO.WidgetsListener.WIDGET_EVENT_TYPE.DELETE) {
                this.removeWidgets();
            }

            // TODO ?
        },

        /**
         * Retrieve commands for a specific variable node
         *
         * @param {Node} node - Geppetto Node used for extracting commands
         * @returns {Array} Set of commands associated with this node
         */
        getCommands: function(node) {
            var groups = [];

            // TODO ?
            
            return groups;
        }
    });
});
