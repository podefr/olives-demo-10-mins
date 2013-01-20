define(
[
	'Store',
	'OObject',
	'Event.plugin',
	'Bind.plugin'
],

function (Store, OObject, Event, Bind) {

	 return function Demo(dom) {

	 	var widget = new OObject();

	 	var list = new Store([]);

	 	var event = new Event({
	 		addTask: function (event, node) {
	 			if ( event.keyCode == 13 ) {
	 				list.alter( 'push', node.value );
	 				node.value = '';
	 			}
	 		},

	 		removeTask: function (event, node) {
	 			list.del( node.getAttribute('data-bind_id') );
	 		}
	 	});

	 	var bind = new Bind(list, {
	 		getId: function (item) {
	 			this.innerHTML = list.alter("indexOf", item);
	 		}
	 	});

	 	widget.plugins.addAll({
	 		'event': event,
	 		'bind': bind
	 	});

	 	widget.alive(dom);

	 };

});
