# Initial Project Setup

1. Run yo webapp

## Project Setup after cloning repo

1. Run npm install.
2. Run bower install.
3. Change directory into 'test' and run bower install again.

# Run local site
1. Run grunt serve

# Resources for Parse
* https://parse.com/docs/js/symbols/Parse.Query.html#withinMiles
* relation.query().find({
  success: function(list) {
    // list contains the posts that the current user likes.
  }
});

# Resources for jshint

* http://www.jshint.com/docs/
* http://blog.teamtreehouse.com/improving-code-quality-jshint

# Resources for Backbone

* http://backbonetutorials.com/what-is-a-view/
* https://www.youtube.com/watch?v=FZSjvWtUxYk&app=desktop
* http://www.sitepoint.com/jquery-custom-events/

### Resources for CSS
* http://www.dwuser.com/education/content/creating-responsive-tiled-layout-with-pure-css/
* http://www.getskeleton.com/

# Todos
 
1. Tasha: location detail view showing a grid listing X number of photos captured at this location.
2. Tasha: write condition if you're on the safari detail route and no records are found for the id, trigger the logout route.
3. Add description field to location data, then add description everywhere location is listed.
4. Zoom to fit all markers needs to be added.

* get grunt to build 'dist' folder (build for production)
* get up on server (so you can demo and test on an iPhone)
* get menu to animate sliding in/out smoothly
* Setup route for capture/:id
* Distinguish between subscribed and unsubscribed scavengerhunts in dashboard
* Add left and top padding to menu.
* Install bourbon and clean up scss for browser prefix

Extra Credit: 
* Get markers linkable
* discover: for each location listed, show the distance from the user
* discover: for each location listed, show an arrow pointing toward the location (only on iOS)




