# plasm
A declarative component instantiation &amp; retrieval system for virtual DOM libraries

```javascript
import plasm from 'plasm'
import virtualDomLib from 'wherever'

// Component closure
function dropdown(){
	// Per component private state
	var open = false

	// Component view function
	return function view( data ){
		return /* virtual DOM */
	}
}

function app(){
	// Initialisation data
	var lists = [ sexes, countries ]
	var user  = {
		sex     : 'Female',
		country : 'Kurdistan'
	}

	return function view(){
		return
			/* header furniture */
			lists.map( ( list, index ) => [
				plasm( dropdown, { list,
					get selection : () => user[ list.label ],
					set selection : x  => user[ list.label ] = x
					}, index )
			] )
			/* footer furniture */
	}
}

virtualDomLib.render( rootElement, plasm( app ) )
```

## Manifesto

The Javascript virtual DOM view paradigm has revolutionised front-end application development by providing dialects that combine the declarative simplicity of string-based HTML-like templates with the full expressive range of Javascript and a sensitivity to the stateful (and performance-intensive!) nature of DOM manipulation.

Existing libraries fine-tune their implementations and new ones crop up with new idioms, different philosophies and more performant diffing algorithms and DOM patching methods. It seems whenever a new iteration comes about, interested parties either have to learn the new implementation's own philosophies & APIs about how to work with state, or implement them from scratch.

Plasm is an attempt at providing a generic stateful component structure & mechanism that can be invoked in any virtual-DOM dialect's view. In so doing it aims to:

1. Provide a coherent, tersely expressible and unasuming generic component pattern
2. ...thus allowing library authors to focus on the differentiators that matter
3. ...and enabling potential adopters to try new tools while keeping the same application logic and core structures

***

### What's in a component?

A basic virtual DOM component should provide:

1. A view function which accepts input from the calling view and return the author's virtual DOM flavour of choice
2. An initialisation context (which also accepts input from the calling view) within which to store state and provide private methods
3. Allow subsequent invocations to be executed in the context they were initialised with, via an API which is sufficiently distinct from the virtual DOM API diff to allow broad interoperability

### Don't we already have this?

Not really. Some frameworks happen to use virtual DOM management under the hood, others do nothing but provide an interface for virtual DOM notation. Everybody either has their own idea of how to write, execute and retrieve a component, or washes their hands of the affair and leaves it to us. Some frameworks provide very lightweight component structures, others provide incredibly large APIs with all sorts of inter-dependent elements and occult execution logic.

#### So why don't we pick the best and roll with that?

1. Existing component implementations are often heavily coupled to their consuming framework's virtual-DOM parsing or string-munging engine, with expectations that hinge on external black-box logic.
2. Even if we used a subset of existing logic from a popular framework, the resemblance would be misleading in ways we can't account for as a generic solution.
3. Starting from scratch allows us to provide a simpler structures that don't rely on esoteric framework concerns while coming up with more focussed solutions to generic problems.

