/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Coin } from '../../../cosmos/base/v1beta1/coin';
import { Timestamp } from '../../../google/protobuf/timestamp';

export const protobufPackage = 'kava.auction.v1beta1';

/** BaseAuction defines common attributes of all auctions */
export interface BaseAuction {
  id: Long;
  initiator: string;
  lot?: Coin;
  bidder: Uint8Array;
  bid?: Coin;
  hasReceivedBids: boolean;
  endTime?: Date;
  maxEndTime?: Date;
}

/**
 * SurplusAuction is a forward auction that burns what it receives from bids.
 * It is normally used to sell off excess pegged asset acquired by the CDP system.
 */
export interface SurplusAuction {
  baseAuction?: BaseAuction;
}

/**
 * DebtAuction is a reverse auction that mints what it pays out.
 * It is normally used to acquire pegged asset to cover the CDP system's debts that were not covered by selling
 * collateral.
 */
export interface DebtAuction {
  baseAuction?: BaseAuction;
  correspondingDebt?: Coin;
}

/**
 * CollateralAuction is a two phase auction.
 * Initially, in forward auction phase, bids can be placed up to a max bid.
 * Then it switches to a reverse auction phase, where the initial amount up for auction is bid down.
 * Unsold Lot is sent to LotReturns, being divided among the addresses by weight.
 * Collateral auctions are normally used to sell off collateral seized from CDPs.
 */
export interface CollateralAuction {
  baseAuction?: BaseAuction;
  correspondingDebt?: Coin;
  maxBid?: Coin;
  lotReturns?: WeightedAddresses;
}

/** WeightedAddresses is a type for storing some addresses and associated weights. */
export interface WeightedAddresses {
  addresses: Uint8Array[];
  weights: Uint8Array[];
}

function createBaseBaseAuction(): BaseAuction {
  return {
    id: Long.UZERO,
    initiator: '',
    lot: undefined,
    bidder: new Uint8Array(),
    bid: undefined,
    hasReceivedBids: false,
    endTime: undefined,
    maxEndTime: undefined,
  };
}

export const BaseAuction = {
  encode(
    message: BaseAuction,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.initiator !== '') {
      writer.uint32(18).string(message.initiator);
    }
    if (message.lot !== undefined) {
      Coin.encode(message.lot, writer.uint32(26).fork()).ldelim();
    }
    if (message.bidder.length !== 0) {
      writer.uint32(34).bytes(message.bidder);
    }
    if (message.bid !== undefined) {
      Coin.encode(message.bid, writer.uint32(42).fork()).ldelim();
    }
    if (message.hasReceivedBids === true) {
      writer.uint32(48).bool(message.hasReceivedBids);
    }
    if (message.endTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.endTime),
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.maxEndTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.maxEndTime),
        writer.uint32(66).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BaseAuction {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBaseAuction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64() as Long;
          break;
        case 2:
          message.initiator = reader.string();
          break;
        case 3:
          message.lot = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.bidder = reader.bytes();
          break;
        case 5:
          message.bid = Coin.decode(reader, reader.uint32());
          break;
        case 6:
          message.hasReceivedBids = reader.bool();
          break;
        case 7:
          message.endTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 8:
          message.maxEndTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BaseAuction {
    return {
      id: isSet(object.id) ? Long.fromString(object.id) : Long.UZERO,
      initiator: isSet(object.initiator) ? String(object.initiator) : '',
      lot: isSet(object.lot) ? Coin.fromJSON(object.lot) : undefined,
      bidder: isSet(object.bidder)
        ? bytesFromBase64(object.bidder)
        : new Uint8Array(),
      bid: isSet(object.bid) ? Coin.fromJSON(object.bid) : undefined,
      hasReceivedBids: isSet(object.hasReceivedBids)
        ? Boolean(object.hasReceivedBids)
        : false,
      endTime: isSet(object.endTime)
        ? fromJsonTimestamp(object.endTime)
        : undefined,
      maxEndTime: isSet(object.maxEndTime)
        ? fromJsonTimestamp(object.maxEndTime)
        : undefined,
    };
  },

  toJSON(message: BaseAuction): unknown {
    const obj: any = {};
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    message.initiator !== undefined && (obj.initiator = message.initiator);
    message.lot !== undefined &&
      (obj.lot = message.lot ? Coin.toJSON(message.lot) : undefined);
    message.bidder !== undefined &&
      (obj.bidder = base64FromBytes(
        message.bidder !== undefined ? message.bidder : new Uint8Array()
      ));
    message.bid !== undefined &&
      (obj.bid = message.bid ? Coin.toJSON(message.bid) : undefined);
    message.hasReceivedBids !== undefined &&
      (obj.hasReceivedBids = message.hasReceivedBids);
    message.endTime !== undefined &&
      (obj.endTime = message.endTime.toISOString());
    message.maxEndTime !== undefined &&
      (obj.maxEndTime = message.maxEndTime.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BaseAuction>, I>>(
    object: I
  ): BaseAuction {
    const message = createBaseBaseAuction();
    message.id =
      object.id !== undefined && object.id !== null
        ? Long.fromValue(object.id)
        : Long.UZERO;
    message.initiator = object.initiator ?? '';
    message.lot =
      object.lot !== undefined && object.lot !== null
        ? Coin.fromPartial(object.lot)
        : undefined;
    message.bidder = object.bidder ?? new Uint8Array();
    message.bid =
      object.bid !== undefined && object.bid !== null
        ? Coin.fromPartial(object.bid)
        : undefined;
    message.hasReceivedBids = object.hasReceivedBids ?? false;
    message.endTime = object.endTime ?? undefined;
    message.maxEndTime = object.maxEndTime ?? undefined;
    return message;
  },
};

function createBaseSurplusAuction(): SurplusAuction {
  return { baseAuction: undefined };
}

export const SurplusAuction = {
  encode(
    message: SurplusAuction,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.baseAuction !== undefined) {
      BaseAuction.encode(
        message.baseAuction,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SurplusAuction {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSurplusAuction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseAuction = BaseAuction.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SurplusAuction {
    return {
      baseAuction: isSet(object.baseAuction)
        ? BaseAuction.fromJSON(object.baseAuction)
        : undefined,
    };
  },

  toJSON(message: SurplusAuction): unknown {
    const obj: any = {};
    message.baseAuction !== undefined &&
      (obj.baseAuction = message.baseAuction
        ? BaseAuction.toJSON(message.baseAuction)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SurplusAuction>, I>>(
    object: I
  ): SurplusAuction {
    const message = createBaseSurplusAuction();
    message.baseAuction =
      object.baseAuction !== undefined && object.baseAuction !== null
        ? BaseAuction.fromPartial(object.baseAuction)
        : undefined;
    return message;
  },
};

function createBaseDebtAuction(): DebtAuction {
  return { baseAuction: undefined, correspondingDebt: undefined };
}

export const DebtAuction = {
  encode(
    message: DebtAuction,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.baseAuction !== undefined) {
      BaseAuction.encode(
        message.baseAuction,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.correspondingDebt !== undefined) {
      Coin.encode(message.correspondingDebt, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DebtAuction {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDebtAuction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseAuction = BaseAuction.decode(reader, reader.uint32());
          break;
        case 2:
          message.correspondingDebt = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DebtAuction {
    return {
      baseAuction: isSet(object.baseAuction)
        ? BaseAuction.fromJSON(object.baseAuction)
        : undefined,
      correspondingDebt: isSet(object.correspondingDebt)
        ? Coin.fromJSON(object.correspondingDebt)
        : undefined,
    };
  },

  toJSON(message: DebtAuction): unknown {
    const obj: any = {};
    message.baseAuction !== undefined &&
      (obj.baseAuction = message.baseAuction
        ? BaseAuction.toJSON(message.baseAuction)
        : undefined);
    message.correspondingDebt !== undefined &&
      (obj.correspondingDebt = message.correspondingDebt
        ? Coin.toJSON(message.correspondingDebt)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DebtAuction>, I>>(
    object: I
  ): DebtAuction {
    const message = createBaseDebtAuction();
    message.baseAuction =
      object.baseAuction !== undefined && object.baseAuction !== null
        ? BaseAuction.fromPartial(object.baseAuction)
        : undefined;
    message.correspondingDebt =
      object.correspondingDebt !== undefined &&
      object.correspondingDebt !== null
        ? Coin.fromPartial(object.correspondingDebt)
        : undefined;
    return message;
  },
};

function createBaseCollateralAuction(): CollateralAuction {
  return {
    baseAuction: undefined,
    correspondingDebt: undefined,
    maxBid: undefined,
    lotReturns: undefined,
  };
}

export const CollateralAuction = {
  encode(
    message: CollateralAuction,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.baseAuction !== undefined) {
      BaseAuction.encode(
        message.baseAuction,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.correspondingDebt !== undefined) {
      Coin.encode(message.correspondingDebt, writer.uint32(18).fork()).ldelim();
    }
    if (message.maxBid !== undefined) {
      Coin.encode(message.maxBid, writer.uint32(26).fork()).ldelim();
    }
    if (message.lotReturns !== undefined) {
      WeightedAddresses.encode(
        message.lotReturns,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CollateralAuction {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCollateralAuction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseAuction = BaseAuction.decode(reader, reader.uint32());
          break;
        case 2:
          message.correspondingDebt = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.maxBid = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.lotReturns = WeightedAddresses.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CollateralAuction {
    return {
      baseAuction: isSet(object.baseAuction)
        ? BaseAuction.fromJSON(object.baseAuction)
        : undefined,
      correspondingDebt: isSet(object.correspondingDebt)
        ? Coin.fromJSON(object.correspondingDebt)
        : undefined,
      maxBid: isSet(object.maxBid) ? Coin.fromJSON(object.maxBid) : undefined,
      lotReturns: isSet(object.lotReturns)
        ? WeightedAddresses.fromJSON(object.lotReturns)
        : undefined,
    };
  },

  toJSON(message: CollateralAuction): unknown {
    const obj: any = {};
    message.baseAuction !== undefined &&
      (obj.baseAuction = message.baseAuction
        ? BaseAuction.toJSON(message.baseAuction)
        : undefined);
    message.correspondingDebt !== undefined &&
      (obj.correspondingDebt = message.correspondingDebt
        ? Coin.toJSON(message.correspondingDebt)
        : undefined);
    message.maxBid !== undefined &&
      (obj.maxBid = message.maxBid ? Coin.toJSON(message.maxBid) : undefined);
    message.lotReturns !== undefined &&
      (obj.lotReturns = message.lotReturns
        ? WeightedAddresses.toJSON(message.lotReturns)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CollateralAuction>, I>>(
    object: I
  ): CollateralAuction {
    const message = createBaseCollateralAuction();
    message.baseAuction =
      object.baseAuction !== undefined && object.baseAuction !== null
        ? BaseAuction.fromPartial(object.baseAuction)
        : undefined;
    message.correspondingDebt =
      object.correspondingDebt !== undefined &&
      object.correspondingDebt !== null
        ? Coin.fromPartial(object.correspondingDebt)
        : undefined;
    message.maxBid =
      object.maxBid !== undefined && object.maxBid !== null
        ? Coin.fromPartial(object.maxBid)
        : undefined;
    message.lotReturns =
      object.lotReturns !== undefined && object.lotReturns !== null
        ? WeightedAddresses.fromPartial(object.lotReturns)
        : undefined;
    return message;
  },
};

function createBaseWeightedAddresses(): WeightedAddresses {
  return { addresses: [], weights: [] };
}

export const WeightedAddresses = {
  encode(
    message: WeightedAddresses,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.addresses) {
      writer.uint32(10).bytes(v!);
    }
    for (const v of message.weights) {
      writer.uint32(18).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WeightedAddresses {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWeightedAddresses();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.addresses.push(reader.bytes());
          break;
        case 2:
          message.weights.push(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WeightedAddresses {
    return {
      addresses: Array.isArray(object?.addresses)
        ? object.addresses.map((e: any) => bytesFromBase64(e))
        : [],
      weights: Array.isArray(object?.weights)
        ? object.weights.map((e: any) => bytesFromBase64(e))
        : [],
    };
  },

  toJSON(message: WeightedAddresses): unknown {
    const obj: any = {};
    if (message.addresses) {
      obj.addresses = message.addresses.map((e) =>
        base64FromBytes(e !== undefined ? e : new Uint8Array())
      );
    } else {
      obj.addresses = [];
    }
    if (message.weights) {
      obj.weights = message.weights.map((e) =>
        base64FromBytes(e !== undefined ? e : new Uint8Array())
      );
    } else {
      obj.weights = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WeightedAddresses>, I>>(
    object: I
  ): WeightedAddresses {
    const message = createBaseWeightedAddresses();
    message.addresses = object.addresses?.map((e) => e) || [];
    message.weights = object.weights?.map((e) => e) || [];
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
