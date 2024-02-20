import { v4 as uuid } from "uuid";

export default class Item {
  constructor(components, attributes) {
    this.components = components;
    this.attributes = attributes;
    this.id = uuid();
  }
}
