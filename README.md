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

- Fix bug, need to refresh the list when marking task as done
- Refactor the gestures function
- Publish (Android and iOS)
- Remove autopublish
- Tests

### Version 2

- Tooltips for the slider
- Push notifications
  - http://stackoverflow.com/questions/33557343/local-notifications-for-meteor-cordova
  - https://github.com/katzer/cordova-plugin-local-notifications
- Pull to refresh or refresh the data every minute, or both
  - https://atmospherejs.com/yangyi/iscrolljs-refresh
- Animations, animations, animations
- Templates and proper routing?
- Do a login system and persist data on the web server?
- More tests
