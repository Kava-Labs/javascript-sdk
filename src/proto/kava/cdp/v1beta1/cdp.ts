/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Coin } from '../../../cosmos/base/v1beta1/coin';
import { Timestamp } from '../../../google/protobuf/timestamp';

export const protobufPackage = 'kava.cdp.v1beta1';

/** CDP defines the state of a single collateralized debt position. */
export interface CDP {
  id: Long;
  owner: Uint8Array;
  type: string;
  collateral?: Coin;
  principal?: Coin;
  accumulatedFees?: Coin;
  feesUpdated?: Date;
  interestFactor: string;
}

/** Deposit defines an amount of coins deposited by an account to a cdp */
export interface Deposit {
  cdpId: Long;
  depositor: string;
  amount?: Coin;
}

/** TotalPrincipal defines the total principal of a given collateral type */
export interface TotalPrincipal {
  collateralType: string;
  amount?: Coin;
}

/** TotalCollateral defines the total collateral of a given collateral type */
export interface TotalCollateral {
  collateralType: string;
  amount?: Coin;
}

/** OwnerCDPIndex defines the cdp ids for a single cdp owner */
export interface OwnerCDPIndex {
  cdpIds: Long[];
}

function createBaseCDP(): CDP {
  return {
    id: Long.UZERO,
    owner: new Uint8Array(),
    type: '',
    collateral: undefined,
    principal: undefined,
    accumulatedFees: undefined,
    feesUpdated: undefined,
    interestFactor: '',
  };
}

export const CDP = {
  encode(message: CDP, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.owner.length !== 0) {
      writer.uint32(18).bytes(message.owner);
    }
    if (message.type !== '') {
      writer.uint32(26).string(message.type);
    }
    if (message.collateral !== undefined) {
      Coin.encode(message.collateral, writer.uint32(34).fork()).ldelim();
    }
    if (message.principal !== undefined) {
      Coin.encode(message.principal, writer.uint32(42).fork()).ldelim();
    }
    if (message.accumulatedFees !== undefined) {
      Coin.encode(message.accumulatedFees, writer.uint32(50).fork()).ldelim();
    }
    if (message.feesUpdated !== undefined) {
      Timestamp.encode(
        toTimestamp(message.feesUpdated),
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.interestFactor !== '') {
      writer.uint32(66).string(message.interestFactor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CDP {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCDP();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64() as Long;
          break;
        case 2:
          message.owner = reader.bytes();
          break;
        case 3:
          message.type = reader.string();
          break;
        case 4:
          message.collateral = Coin.decode(reader, reader.uint32());
          break;
        case 5:
          message.principal = Coin.decode(reader, reader.uint32());
          break;
        case 6:
          message.accumulatedFees = Coin.decode(reader, reader.uint32());
          break;
        case 7:
          message.feesUpdated = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 8:
          message.interestFactor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CDP {
    return {
      id: isSet(object.id) ? Long.fromString(object.id) : Long.UZERO,
      owner: isSet(object.owner)
        ? bytesFromBase64(object.owner)
        : new Uint8Array(),
      type: isSet(object.type) ? String(object.type) : '',
      collateral: isSet(object.collateral)
        ? Coin.fromJSON(object.collateral)
        : undefined,
      principal: isSet(object.principal)
        ? Coin.fromJSON(object.principal)
        : undefined,
      accumulatedFees: isSet(object.accumulatedFees)
        ? Coin.fromJSON(object.accumulatedFees)
        : undefined,
      feesUpdated: isSet(object.feesUpdated)
        ? fromJsonTimestamp(object.feesUpdated)
        : undefined,
      interestFactor: isSet(object.interestFactor)
        ? String(object.interestFactor)
        : '',
    };
  },

  toJSON(message: CDP): unknown {
    const obj: any = {};
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    message.owner !== undefined &&
      (obj.owner = base64FromBytes(
        message.owner !== undefined ? message.owner : new Uint8Array()
      ));
    message.type !== undefined && (obj.type = message.type);
    message.collateral !== undefined &&
      (obj.collateral = message.collateral
        ? Coin.toJSON(message.collateral)
        : undefined);
    message.principal !== undefined &&
      (obj.principal = message.principal
        ? Coin.toJSON(message.principal)
        : undefined);
    message.accumulatedFees !== undefined &&
      (obj.accumulatedFees = message.accumulatedFees
        ? Coin.toJSON(message.accumulatedFees)
        : undefined);
    message.feesUpdated !== undefined &&
      (obj.feesUpdated = message.feesUpdated.toISOString());
    message.interestFactor !== undefined &&
      (obj.interestFactor = message.interestFactor);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CDP>, I>>(object: I): CDP {
    const message = createBaseCDP();
    message.id =
      object.id !== undefined && object.id !== null
        ? Long.fromValue(object.id)
        : Long.UZERO;
    message.owner = object.owner ?? new Uint8Array();
    message.type = object.type ?? '';
    message.collateral =
      object.collateral !== undefined && object.collateral !== null
        ? Coin.fromPartial(object.collateral)
        : undefined;
    message.principal =
      object.principal !== undefined && object.principal !== null
        ? Coin.fromPartial(object.principal)
        : undefined;
    message.accumulatedFees =
      object.accumulatedFees !== undefined && object.accumulatedFees !== null
        ? Coin.fromPartial(object.accumulatedFees)
        : undefined;
    message.feesUpdated = object.feesUpdated ?? undefined;
    message.interestFactor = object.interestFactor ?? '';
    return message;
  },
};

function createBaseDeposit(): Deposit {
  return { cdpId: Long.UZERO, depositor: '', amount: undefined };
}

export const Deposit = {
  encode(
    message: Deposit,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.cdpId.isZero()) {
      writer.uint32(8).uint64(message.cdpId);
    }
    if (message.depositor !== '') {
      writer.uint32(18).string(message.depositor);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Deposit {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeposit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cdpId = reader.uint64() as Long;
          break;
        case 2:
          message.depositor = reader.string();
          break;
        case 3:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Deposit {
    return {
      cdpId: isSet(object.cdpId) ? Long.fromString(object.cdpId) : Long.UZERO,
      depositor: isSet(object.depositor) ? String(object.depositor) : '',
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined,
    };
  },

  toJSON(message: Deposit): unknown {
    const obj: any = {};
    message.cdpId !== undefined &&
      (obj.cdpId = (message.cdpId || Long.UZERO).toString());
    message.depositor !== undefined && (obj.depositor = message.depositor);
    message.amount !== undefined &&
      (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Deposit>, I>>(object: I): Deposit {
    const message = createBaseDeposit();
    message.cdpId =
      object.cdpId !== undefined && object.cdpId !== null
        ? Long.fromValue(object.cdpId)
        : Long.UZERO;
    message.depositor = object.depositor ?? '';
    message.amount =
      object.amount !== undefined && object.amount !== null
        ? Coin.fromPartial(object.amount)
        : undefined;
    return message;
  },
};

function createBaseTotalPrincipal(): TotalPrincipal {
  return { collateralType: '', amount: undefined };
}

export const TotalPrincipal = {
  encode(
    message: TotalPrincipal,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.collateralType !== '') {
      writer.uint32(10).string(message.collateralType);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TotalPrincipal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTotalPrincipal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collateralType = reader.string();
          break;
        case 2:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TotalPrincipal {
    return {
      collateralType: isSet(object.collateralType)
        ? String(object.collateralType)
        : '',
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined,
    };
  },

  toJSON(message: TotalPrincipal): unknown {
    const obj: any = {};
    message.collateralType !== undefined &&
      (obj.collateralType = message.collateralType);
    message.amount !== undefined &&
      (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TotalPrincipal>, I>>(
    object: I
  ): TotalPrincipal {
    const message = createBaseTotalPrincipal();
    message.collateralType = object.collateralType ?? '';
    message.amount =
      object.amount !== undefined && object.amount !== null
        ? Coin.fromPartial(object.amount)
        : undefined;
    return message;
  },
};

function createBaseTotalCollateral(): TotalCollateral {
  return { collateralType: '', amount: undefined };
}

export const TotalCollateral = {
  encode(
    message: TotalCollateral,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.collateralType !== '') {
      writer.uint32(10).string(message.collateralType);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TotalCollateral {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTotalCollateral();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collateralType = reader.string();
          break;
        case 2:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TotalCollateral {
    return {
      collateralType: isSet(object.collateralType)
        ? String(object.collateralType)
        : '',
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined,
    };
  },

  toJSON(message: TotalCollateral): unknown {
    const obj: any = {};
    message.collateralType !== undefined &&
      (obj.collateralType = message.collateralType);
    message.amount !== undefined &&
      (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TotalCollateral>, I>>(
    object: I
  ): TotalCollateral {
    const message = createBaseTotalCollateral();
    message.collateralType = object.collateralType ?? '';
    message.amount =
      object.amount !== undefined && object.amount !== null
        ? Coin.fromPartial(object.amount)
        : undefined;
    return message;
  },
};

function createBaseOwnerCDPIndex(): OwnerCDPIndex {
  return { cdpIds: [] };
}

export const OwnerCDPIndex = {
  encode(
    message: OwnerCDPIndex,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.cdpIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OwnerCDPIndex {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOwnerCDPIndex();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.cdpIds.push(reader.uint64() as Long);
            }
          } else {
            message.cdpIds.push(reader.uint64() as Long);
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OwnerCDPIndex {
    return {
      cdpIds: Array.isArray(object?.cdpIds)
        ? object.cdpIds.map((e: any) => Long.fromString(e))
        : [],
    };
  },

  toJSON(message: OwnerCDPIndex): unknown {
    const obj: any = {};
    if (message.cdpIds) {
      obj.cdpIds = message.cdpIds.map((e) => (e || Long.UZERO).toString());
    } else {
      obj.cdpIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<OwnerCDPIndex>, I>>(
    object: I
  ): OwnerCDPIndex {
    const message = createBaseOwnerCDPIndex();
    message.cdpIds = object.cdpIds?.map((e) => Long.fromValue(e)) || [];
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  throw 'Unable to locate global object';
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, 'base64').toString('binary'));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, 'binary').toString('base64'));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (const byte of arr) {
    bin.push(String.fromCharCode(byte));
  }
  return btoa(bin.join(''));
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds.toNumber() * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === 'string') {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
