Items = new Mongo.Collection('items');

if(Meteor.isClient) {
  Template.body.helpers({
    items: function () {
      return Items.find({});
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
