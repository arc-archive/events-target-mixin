declare function EventsTargetMixin<T extends new (...args: any[]) => {}>(base: T): T & EventsTargetMixinConstructor;
interface EventsTargetMixinConstructor {
  new(...args: any[]): EventsTargetMixin;
}

interface EventsTargetMixin {
  /**
   * By default the element listens on the `window` object. If this value is set,
   * then all events listeners will be attached to this object instead of `window`.
   */
  eventsTarget: HTMLElement|Window;

  /**
   * Removes old handlers (if any) and attaches listeners on new event
   * event target.
   *
   * @param eventsTarget Event target to set handlers on. If not set it
   * will set handlers on the `window` object.
   */
  _eventsTargetChanged(eventsTarget?: HTMLElement|Window): void;

  /**
   * To be implement by the element to set event listeners from the target.
   * @param node A node to which attach event listeners to
   */
  _attachListeners(eventsTarget: HTMLElement|Window): void;
  /**
   * To be implement by the element to remove event listeners from the target.
   * @param node A node to which remove event listeners to
   */
  _detachListeners(eventsTarget: HTMLElement|Window): void;
}

export {EventsTargetMixinConstructor};
export {EventsTargetMixin};
