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

# Todos

1. Render the safari detail view
2. Heather: Be able to subscribe and unsubscribe to a safari in the detail view. if sub show a button 
3. Tasha: get the locations for the safari detail view - Going to get the safari view pulling and listing data from parse.
4. Tasha: write condition if you're on the safari detail route and no records are found for the id, trigger the logout route.

4. Get the discover view working
5. Setup route for location/:id
6. Get markers linkable
7. Setup route for capture/:id
8. Distinguish between subscribed and unsubscribed scavengerhunts in dashboard

separate branch - tasha
10. Add left and top padding to menu.
11. Install bourbon and clean up scss for browser prefix





