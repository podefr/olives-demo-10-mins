Transform this HTML template into a simple TODO app in 10 minutes using Olives
==============================================================================

0:00 - 0:30:
------------

Requiring the needed stuff:

	* A store
	* An OObject
	* The Event Plugin
	* The Bind Plugin


0:30 - 1:30
-----------

Initializing it:

	* A container for the widget (new OObject)
	* A model for the list (new Store([]))
	* A plugin for capturing DOM events
	* A plugin for binding the data with the dom

1:30 - 2:30
-----------

Adding a handler for key events on the input field that would add a task

```js
var event = new Event({
	addTask: function (event, node) {
		if (event.keyCode == 13) {
			list.alter("push", node.value);
			node.value = '';
		}
	}
});
```

2:30 - 3:30
-----------

Adding a handler for key events on the remove icon

```js
removeTask: function (event, node) {
	list.del( node.getAttribute('data-demo_id') );
}
```

3:30 - 5:00
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

5:00 - 7:00
-----------

Binding the event handlers with the dom

```html
<input class="input-xxlarge" id="appendedInputButton" type="text" style="height: 30px" placeholder="What's to be done?" data-event="listen: keydown, addTask">
```

```html
<a href="#" data-event="listen: click, removeTask"><i class="icon-remove"></i></a>
```

7:00 - 7:30
-----------

Applying the plugins to the dom:

```js
widget.alive(dom);
```

7:30 - Oops, we have 2:30 left!
------------------------

We would like to persist the todo list. Let's use Olives LocalStore

```js
list.sync("todo-demo");
```

8:00 - 10:00
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




