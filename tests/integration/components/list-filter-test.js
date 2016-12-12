import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import RSVP from 'rsvp';

moduleForComponent('list-filter', 'Integration | Component | list filter', {
  integration: true
});

const ITEMS = [{city: 'San Francisco'}, {city: 'Portland'}, {city: 'Seattle'}];
const FILTERED_ITEM = [{city: 'San Francisco'}];

test('should initially load all listings', function(assert) {
  this.on('filterbyCity', val => {
    if (val === '') {
      return RSVP.resolve(ITEMS);
    } else {
      return RSVP.resolve(FILTERED_ITEM);
    }
  });
  this.render(hbs`
    {{#list-filter filter=(action 'filterbyCity') as |results|}}
      <ul>
        {{#each results as |item|}}
          <li class='city'>
            {{item.city}}
          </li>
        {{/each}}
      </ul>
    {{/list-filter}}
  `);
  // the wait function willreturn a promise that will wait for all promises
  // add xhr request to resolve before runing the contents of the then block

  return wait().then(() => {
    assert.equal(this.$('.city').length, 3);
    assert.equal(this.$('.city').first().text().trim(), 'San Francisco');
  });
});

test('should update with matching listings', function (assert) {
  this.on('filterByCity', val => {
    if (val === '') {
      return RSVP.resolve(ITEMS);
    } else {
      return RSVP.resolve(FILTERED_ITEM);
    }
  });
  
  this.render(hbs`
    {{#list-filter filter=(action 'filterByCity') as |results|}}
      <ul>
        {{#each results as |items|}}
          <li class='city'>
            {{item.city}}
          </li>
        {{/each}}
      </ul>
    {{/list-filter}}
  `);
  // The keyup event here should invoke an action that will cause the list to be filtered
  this.$('.list-filter input').val('San').keyup();

  return wait().then(() => {
    assert.equal(this.$('.city').length, 1);
    assert.equal(this.$('.city').text().trim(), 'San Francisco');
  });
});