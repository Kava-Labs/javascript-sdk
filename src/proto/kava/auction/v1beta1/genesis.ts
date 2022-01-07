/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Duration } from '../../../google/protobuf/duration';
import { Any } from '../../../google/protobuf/any';

export const protobufPackage = 'kava.auction.v1beta1';

/** GenesisState defines the auction module's genesis state. */
export interface GenesisState {
  nextAuctionId: Long;
  params?: Params;
  /** Genesis auctions */
  auctions: Any[];
}

/** Params defines the parameters for the issuance module. */
export interface Params {
  maxAuctionDuration?: Duration;
  bidDuration?: Duration;
  incrementSurplus: Uint8Array;
  incrementDebt: Uint8Array;
  incrementCollateral: Uint8Array;
}

function createBaseGenesisState(): GenesisState {
  return { nextAuctionId: Long.UZERO, params: undefined, auctions: [] };
}

export const GenesisState = {
  encode(
    message: GenesisState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.nextAuctionId.isZero()) {
      writer.uint32(8).uint64(message.nextAuctionId);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.auctions) {
      Any.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nextAuctionId = reader.uint64() as Long;
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 3:
          message.auctions.push(Any.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      nextAuctionId: isSet(object.nextAuctionId)
        ? Long.fromString(object.nextAuctionId)
        : Long.UZERO,
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      auctions: Array.isArray(object?.auctions)
        ? object.auctions.map((e: any) => Any.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.nextAuctionId !== undefined &&
      (obj.nextAuctionId = (message.nextAuctionId || Long.UZERO).toString());
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.auctions) {
      obj.auctions = message.auctions.map((e) =>
        e ? Any.toJSON(e) : undefined
      );
    } else {
      obj.auctions = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(
    object: I
  ): GenesisState {
    const message = createBaseGenesisState();
    message.nextAuctionId =
      object.nextAuctionId !== undefined && object.nextAuctionId !== null
        ? Long.fromValue(object.nextAuctionId)
        : Long.UZERO;
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    message.auctions = object.auctions?.map((e) => Any.fromPartial(e)) || [];
    return message;
  },
};

function createBaseParams(): Params {
  return {
    maxAuctionDuration: undefined,
    bidDuration: undefined,
    incrementSurplus: new Uint8Array(),
    incrementDebt: new Uint8Array(),
    incrementCollateral: new Uint8Array(),
  };
}

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.maxAuctionDuration !== undefined) {
      Duration.encode(
        message.maxAuctionDuration,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.bidDuration !== undefined) {
      Duration.encode(message.bidDuration, writer.uint32(18).fork()).ldelim();
    }
    if (message.incrementSurplus.length !== 0) {
      writer.uint32(26).bytes(message.incrementSurplus);
    }
    if (message.incrementDebt.length !== 0) {
      writer.uint32(34).bytes(message.incrementDebt);
    }
    if (message.incrementCollateral.length !== 0) {
      writer.uint32(42).bytes(message.incrementCollateral);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.maxAuctionDuration = Duration.decode(reader, reader.uint32());
          break;
        case 2:
          message.bidDuration = Duration.decode(reader, reader.uint32());
          break;
        case 3:
          message.incrementSurplus = reader.bytes();
          break;
        case 4:
          message.incrementDebt = reader.bytes();
          break;
        case 5:
          message.incrementCollateral = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      maxAuctionDuration: isSet(object.maxAuctionDuration)
        ? Duration.fromJSON(object.maxAuctionDuration)
        : undefined,
      bidDuration: isSet(object.bidDuration)
        ? Duration.fromJSON(object.bidDuration)
        : undefined,
      incrementSurplus: isSet(object.incrementSurplus)
        ? bytesFromBase64(object.incrementSurplus)
        : new Uint8Array(),
      incrementDebt: isSet(object.incrementDebt)
        ? bytesFromBase64(object.incrementDebt)
        : new Uint8Array(),
      incrementCollateral: isSet(object.incrementCollateral)
        ? bytesFromBase64(object.incrementCollateral)
        : new Uint8Array(),
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.maxAuctionDuration !== undefined &&
      (obj.maxAuctionDuration = message.maxAuctionDuration
        ? Duration.toJSON(message.maxAuctionDuration)
        : undefined);
    message.bidDuration !== undefined &&
      (obj.bidDuration = message.bidDuration
        ? Duration.toJSON(message.bidDuration)
        : undefined);
    message.incrementSurplus !== undefined &&
      (obj.incrementSurplus = base64FromBytes(
        message.incrementSurplus !== undefined
          ? message.incrementSurplus
          : new Uint8Array()
      ));
    message.incrementDebt !== undefined &&
      (obj.incrementDebt = base64FromBytes(
        message.incrementDebt !== undefined
          ? message.incrementDebt
          : new Uint8Array()
      ));
    message.incrementCollateral !== undefined &&
      (obj.incrementCollateral = base64FromBytes(
        message.incrementCollateral !== undefined
          ? message.incrementCollateral
          : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.maxAuctionDuration =
      object.maxAuctionDuration !== undefined &&
      object.maxAuctionDuration !== null
        ? Duration.fromPartial(object.maxAuctionDuration)
        : undefined;
    message.bidDuration =
      object.bidDuration !== undefined && object.bidDuration !== null
        ? Duration.fromPartial(object.bidDuration)
        : undefined;
    message.incrementSurplus = object.incrementSurplus ?? new Uint8Array();
    message.incrementDebt = object.incrementDebt ?? new Uint8Array();
    message.incrementCollateral =
      object.incrementCollateral ?? new Uint8Array();
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
