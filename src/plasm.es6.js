import give    from 'xet'
import DeepMap from 'deepmap'

// A component is added to the trail when it's invoked,
// thus any component can see where it is nested.
const breadcrumbs = new Set()
// Structure for identifying instances based on multiple complex keys
const instances   = new DeepMap()

// Pass in:
// * The component factory
// * The input you want to pass to it
// * A key (none for unique, index for lists)
//   identifies the instance within the calling context
export default ( component, input, key ) => {
	// Retrieve it if it exists, set it if not
	const instance  = give.call(
		instances,
		// These elements allow us to store and retrieve
		// individual component instances
		[ ...breadcrumbs, component, key ],
		() => new component( input, key )
	)

	// Add to the breadcumb trail for nesting context
	breadcrumbs.add( instance )

	// Any nested components will add to it
	const output = instance.call( instance, input, key )

	// Remove from the trail after view execution
	breadcrumbs.delete( instance )

	return output
}
