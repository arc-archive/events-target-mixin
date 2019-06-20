import { fixture, assert } from '@open-wc/testing';
import './test-element.js';
import './native-element.js';

describe('EventsTargetMixin', function() {
  async function basicFixture() {
    return (await fixture(`<eventable-element></eventable-element>`));
  }

  async function nativeFixture() {
    return (await fixture(`<eventable-native-element></eventable-native-element>`));
  }

  function fire(type, bubbles, node) {
    const event = new CustomEvent(type, {
      cancelable: true,
      bubbles: bubbles,
      composed: true
    });
    (node || document.body).dispatchEvent(event);
    return event;
  }

  describe('Listens on default', function() {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Receives an event from bubbling', function() {
      fire('test-event', true);
      assert.isTrue(element.calledOnce);
    });

    it('Do not receives an event from parent', function() {
      fire('test-event', false, document.body.parentElement);
      assert.isFalse(element.calledOnce);
    });
  });

  describe('Changes event listener', function() {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Receives on body', function() {
      element.eventsTarget = document.body;
      fire('test-event', false, document.body);
      assert.isTrue(element.calledOnce);
    });

    it('Do not receives on parent', function() {
      element.eventsTarget = window;
      fire('test-event', false, document.body);
      assert.isFalse(element.called);
    });

    it('Reseives on self', function() {
      element.eventsTarget = element;
      fire('test-event', false, element);
      assert.isTrue(element.calledOnce);
    });
  });

  describe('Native WC', function() {
    let element;
    beforeEach(async () => {
      element = await nativeFixture();
    });

    it('Receives on default target', function() {
      fire('test-event', true);
      assert.isTrue(element.calledOnce);
    });

    it('Receives on body', function() {
      element.eventsTarget = document.body;
      fire('test-event', false, document.body);
      assert.isTrue(element.calledOnce);
    });

    it('Removes event listener on detached', () => {
      element.parentNode.removeChild(element);
      fire('test-event', true);
      assert.isFalse(element.called);
    });
  });
});
