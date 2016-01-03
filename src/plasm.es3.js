'use strict'

require( 'es6-collections' )

var give    = require( 'xet' )
var DeepMap = require( 'deepmap' )

// A component is added to the trail when it's invoked,
// thus any component can see where it is nested.
var breadcrumbs = new Set()
// Structure for identifying instances based on multiple complex keys
var instances   = new DeepMap()

// Pass in:
// * The component factory
// * The input you want to pass to it
// * A key (none for unique, index for lists)
//   identifies the instance within the calling context
module.exports = function invoke( component, input, key ){
	// Retrieve it if it exists, set it if not
	var instance = give.call(
		instances,
		// These elements allow us to store and retrieve
		// individual component instances
		breadcrumbs.concat( component, key ),
		function initialise(){
			return new component( input, key )
		}
	)

	// Add to the breadcumb trail for nesting context
	breadcrumbs.add( instance )

	// Any nested components will add to it
	const output = instance.call( instance, input, key )

	// Remove from the trail after view execution
	breadcrumbs.delete( instance )

	return output
}
