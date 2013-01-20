Transform this HTML template into a simple TODO app in 10 minutes using Olives
==============================================================================

The HTML to edit is the index.html, and the JavaScript file is app/todo.js.
Starting with these two, the goal is to develop a simple todo application in 10 minutes.

Here are the minutes:

0:00 - 0:30:
------------

Requiring the needed stuff:

	* A store
	* An OObject
	* The Event Plugin
	* The Bind Plugin

```js
define(
[
	'Store',
	'OObject',
	'Event.plugin',
	'Bind.plugin'
],

function (Store, OObject, Event, Bind) {
```


0:30 - 2:30
-----------

Initializing it:

	* A container for the widget (new OObject)

```js
var widget = new OObject();
```

	* A model for the list (new Store([]))

```js
var list = new Store([]);
```

	* A plugin for capturing DOM events

```js
var event = new Event();
```

	* A plugin for binding the data with the dom

```js
var bind = new Bind();
```

2:30 - 3:30
-----------

Adding a handler for key events on the input field that would add a task

```js
var event = new Event({
	addTask: function (event, node) {
		if ( event.keyCode == 13 ) {
			list.alter( 'push', node.value );
			node.value = '';
		}
	}
});
```

3:30 - 4:30
-----------

Adding a handler for key events on the remove icon

```js
removeTask: function (event, node) {
	list.del( node.getAttribute('data-bind_id') );
}
```

4:30 - 6:30
------------

Binding the data with the dom

```html
<tbody data-bind="foreach">
	<tr>
		<td data-bind="bind: getId">id</td>
		<td data-bind="bind: innerHTML">Name</td>
		<td><a href="#"><i class="icon-remove"></i></a></td>
	</tr>
</tbody>
```

```js
var bind = new Bind(list, {
	getId: function (item) {
		this.innerHTML = list.alter("indexOf", item);
	}
});
```

6:30 - 8:00
-----------

Binding the event handlers with the dom

```html
<input class="input-xxlarge" id="appendedInputButton" type="text" style="height: 30px" placeholder="What's to be done?" data-event="listen: keydown, addTask">
```

```html
<a href="#" data-event="listen: click, removeTask"><i class="icon-remove"></i></a>
```

8:00 - 8:30
-----------

Applying the plugins to the dom:

```js
widget.alive(dom);
```

8:30 - Oops, we have 1:30 left!
--------------------------------

We would like to persist the todo list. Let's use Olives LocalStore

```js
list.sync("todo-demo");
```

8:30 - 9:00
------------

As we still have some time left, let's write our own plugin

```html
<td data-bind="bind: innerHTML" data-custom="prepend: hello">Name</td>
```

```js
widget.plugins.addAll({
	 		'event': event,
	 		'bind': bind,
	 		'custom': {
	 			prepend: function (node, text) {
	 				node.innerHTML = text + " " + node.innerHTML;
	 			}
	 		}
	 	});
```






