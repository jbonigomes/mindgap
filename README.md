# Mind'Gap
## The app that allows you to track re-occuring tasks

### Ensure you have Meteor installed:

    $ curl https://install.meteor.com/ | sh   

### Run the following to start the server:

    $ meteor

### Providing you have XCode and/or the Android SDK's configured correctly:

    $ meteor run ios
    $ meteor run android

### This project uses git-flow

http://nvie.com/posts/a-successful-git-branching-model/

### Todo

- Gestures for sliding list items to the left and right
  - Sliding to the right should mark the item as done
  - Sliding to the left should delete the item
- Integrate (and style) the slider
  - https://github.com/rcy/meteor-nouislider/blob/master/example/example.js
- Push notifications
  - http://stackoverflow.com/questions/33557343/local-notifications-for-meteor-cordova
  - https://github.com/katzer/cordova-plugin-local-notifications
- Publish (Android and iOS)
- Remove autopublish and insecure packages
- Tests

### Version 2

- Animations, animations, animations
- See what happens with the bug about reactivity, could save two lines of code :D
- Templates and proper routing?
- Do a login system and persist data on the web?
- More tests

