import { Type } from '@angular/core';

export function hasTypeAsProto(protoType: Type<any>, type: Type<any>): boolean {
  const proto = Object.getPrototypeOf(type);

  if (proto === protoType) {
    return true;
  }

  if (proto) {
    return hasTypeAsProto(protoType, proto);
  }

  return false;
}
