import DeepMap from 'deepmap'

const breadcrumbs = new Set()
const instances   = new DeepMap()

const plasm = ( component, input, ...keys ) => {
	const signature = [ breadcrumbs, component, ...keys ]

	let instance

	if( instances.has( ...signature ) )
		instance = instance.get( ...signature )

	else {
		instance = component( input, ...keys )

		instances.set( ...signature, instance )
	}

	breadcrumbs.add( instance )

	const output    = instance( input, ...keys )

	breadcrumbs.delete( instance )

	return instance
}
