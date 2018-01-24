import { Type } from '@angular/core';

export const EMPTY_VAL = { __isEmpty: true };

export function isEmptyVal(val: any): val is typeof EMPTY_VAL {
  return !!val && !!val.__isEmpty;
}

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
