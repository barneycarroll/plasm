var plasm = ( function(){
  'use strict'
  
  if( require && require instanceof Function ){
    require( 'es6-collections' )

    var DeepMap = require( 'deepmap' )
  }
  
  // A component is added to the trail when it's invoked,
  // thus any component can see where it is nested.
  var breadcrumbs = []
  // Structure for identifying instances based on multiple complex keys
  var instances   = new DeepMap()
  
  // Pass in:
  // * The component factory
  // * The input you want to pass to it
  // * A key (none for unique, index for lists)
  //   identifies the instance within the calling context
  return function invoke( component, input, key ){
    // Construct a composite retrieval key to uniquely identify our instance
    var keys = new Array( breadcrumbs.length + 2 )

    // Based on 
    // 1. Breadrcumbs (instances it sits within)
    for( var i = 0; i < breadcrumbs.length; i++ )
      keys[ i ] = breadcrumbs[ i ]

    // The component reference
    keys[ ++i ] = component
    // Supplied key
    keys[ ++i ] = key

    var instance

    if( instances.has( keys ) )
      instance = instances.get( keys )

    else{
      instance = function initialise(){
        return new component( input, key )
      }

      instances.set( keys, instance )
    }
  
    // Add to the breadcumb trail for nesting context
    breadcrumbs.add( instance )
  
    // Any nested components will add to it
    var output = instance.call( instance, input, key )
  
    // Remove from the trail after view execution
    breadcrumbs.delete( instance )
  
    return output
  }
}() )

if( module && module.exports )
  module.exports = plasm;
