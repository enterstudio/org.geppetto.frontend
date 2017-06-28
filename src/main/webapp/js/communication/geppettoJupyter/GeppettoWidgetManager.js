define(function (require, exports, module) {

    var widgets = require('jupyter-js-widgets');
    var ManagerBase = widgets.ManagerBase;
    console.info('jupyter-js-widgets loaded successfully');

    function GeppettoWidgetManager(el) {
        ManagerBase.prototype.constructor.call(this);
        this.el = el;
    }

    GeppettoWidgetManager.prototype = Object.create(ManagerBase.prototype);
    GeppettoWidgetManager.prototype.constructor = GeppettoWidgetManager;

    GeppettoWidgetManager.prototype.display_view = function(msg, view, options) {
        var that = this;
        return Promise.resolve(view).then(function(view) {
            var container = G.addWidget(1);
            
            container.$el.append(view.el);

            view.on('remove', function() {
                console.log('View removed', view);
            });
            return view;
        });
    };

    GeppettoWidgetManager.prototype._get_comm_info = function() {
        return Promise.resolve({});
    };

    GeppettoWidgetManager.prototype._create_comm = function() {
        return Promise.resolve({
            on_close: () => {},
            on_msg: () => {},
            close: () => {},
            send: () => {}
        });
    };
    return GeppettoWidgetManager;
});