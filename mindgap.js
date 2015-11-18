if(Meteor.isClient) {

  var items = new Meteor.Collection(null);

  Template.body.helpers({
    items: function () {
      return Ground.Collection(items, 'items');
    }
    // items: [
    //   { title: 'Change bed sheets', recurring: 'week', number: 2, time: 555 },
    //   { title: 'Take medication', recurring: 'week', number: 2, time: 555 },
    //   { title: 'Change tooth brush', recurring: 'week', number: 2, time: 555 },
    //   { title: 'Change bed sheets', recurring: 'week', number: 2, time: 555 },
    //   { title: 'Take medication', recurring: 'week', number: 2, time: 555 },
    //   { title: 'Change tooth brush', recurring: 'week', number: 2, time: 555 },
    //   { title: 'Change bed sheets', recurring: 'week', number: 2, time: 555 },
    //   { title: 'Take medication', recurring: 'week', number: 2, time: 555 },
    //   { title: 'Change tooth brush', recurring: 'week', number: 2, time: 555 }
    // ]
  });
}
