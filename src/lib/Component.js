import { v4 as uuid } from "uuid";

export default class Component {
  constructor(type, attributes) {
    this.type = type;
    this.attributes = attributes;
    this.items = [];
    this.id = uuid();
  }

  static getDashedAttribute(key) {
    return key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
  }
}
