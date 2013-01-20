Transform this HTML template into a simple TODO app in 10 minutes using Olives
==============================================================================

The HTML to edit is the index.html, and the JavaScript file is app/todo.js.
Starting with these two, the goal is to develop a simple todo application in 10 minutes.

See the demo app here: http://podefr.github.com/olives-demo-10-mins/

Here are the minutes:

0:00 - 1:00
-----------

DOM Event handlers for adding/removing a task

```html
<input class="input-xxlarge" id="appendedInputButton" type="text" style="height: 30px" placeholder="What's to be done?" data-event="listen: keydown, addTask">
```

```html
<a href="#" data-event="listen: click, removeTask"><i class="icon-remove"></i></a>
```

1:00 - 2:00
-----------

Data binding between the HTML and the JS

```html
<tbody data-bind="foreach">
	<tr>
		<td data-bind="bind: getId">id</td>
		<td data-bind="bind: innerHTML">Name</td>
		<td><a href="#" data-event="listen: click, removeTask"><i class="icon-remove"></i></a></td>
	</tr>
</tbody>
```

2:00 - 2:30:
------------

Requiring the needed stuff in todo.js:

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

function ( Store, OObject, Event, Bind ) {
```


2:30 - 4:30
-----------

Initializing it:

A container for the widget (new OObject)

```js
var widget = new OObject();
```

A model for the list

```js
var list = new Store( [] );
```

A plugin for capturing DOM events

```js
var event = new Event();
```

A plugin for binding the data with the dom

```js
var bind = new Bind();
```

4:30 - 5:30
-----------

Adding a task

```js
var event = new Event({
	addTask: function ( event, node ) {
		if ( event.keyCode == 13 ) {
			list.alter( 'push', node.value );
			node.value = '';
		}
	}
});
```

5:30 - 6:30
-----------

Removing a task

```js
removeTask: function ( event, node ) {
	list.del( node.getAttribute( 'data-bind_id' ) );
}
```

6:30 - 7:30
------------

The Data binder comes with built-in features, like foreach.
You can also define your own handlers

```js
var bind = new Bind(list, {
	getId: function ( item ) {
		this.innerHTML = list.alter( 'indexOf', item);
	}
});
```

7:30 - 8:00
-----------

Adding the plugins to the widget:

```js
widget.plugins.addAll({
	'event': event,
	'bind': bind
});
```

8:00 - 8:30
-----------

Applying the plugins to the dom:

```js
widget.alive( dom );
```

8:30 - Oops, we have 1:30 left!
--------------------------------

We would like to persist the todo list. Let's use Olives LocalStore

Replace Store by LocalStore

```js
	'LocalStore'
```
And sync it with localStorage

```js
list.sync( 'todo-demo' );
```

8:30 - 10:00
------------

As we still have some time left, let's write our own plugin

```html
<td data-bind="bind: innerHTML" data-custom="color: lightblue">Name</td>
```

```js
widget.plugins.addAll({
	'event': event,
	'bind': bind,
	'custom': {
		color: function ( node, color ) {
			node.style.backgroundColor = color;
		}
	}
});
```






