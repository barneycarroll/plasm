// A deepmap is a structure similar to a map 
// that stores and retrieves objects 
// by associating them with a sequence
// of keys of any type
import DeepMap from 'deepmap'

// Whenever a component is invoked, 
// it is added to the breadcrumb trail.
// This way any component being invoked
// can look to the trail to see where it is nested.
const breadcrumbs = new Set()
// A structure for storing and retrieving 
// all component instances 
const instances   = new DeepMap()

// Pass in:
// * The component factory,
// * The input you want to pass to it
// * One or more keys (blank for unique,
// numeric index for lists)
// identifying the instance within
// the calling context
export default ( component, input, ...keys ) => {
	// These elements allow us to store and retrieve
	// individual component instances
	const signature = [ breadcrumbs, component, ...keys ]

	let instance

	// Retrieve it if it exists 
	if( instances.has( ...signature ) )
		instance = instance.get( ...signature )

	// Set it if not 
	else {
		instance = component( input, ...keys )

		instances.set( ...signature, instance )
	}

	// Before executing the view,
	// add the instance to the trail
	breadcrumbs.add( instance )

	// Nested components invoked
	// in the view will add to it
	const output    = instance( input, ...keys )

	// Remove from the trail after view execution
	breadcrumbs.delete( instance )

	return output
}
