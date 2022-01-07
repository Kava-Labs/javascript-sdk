/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Coin } from '../../../cosmos/base/v1beta1/coin';
import { Timestamp } from '../../../google/protobuf/timestamp';

export const protobufPackage = 'kava.incentive.v1beta1';

/** RewardPeriod stores the state of an ongoing reward */
export interface RewardPeriod {
  active: boolean;
  collateralType: string;
  start?: Date;
  end?: Date;
  rewardsPerSecond?: Coin;
}

/** MultiRewardPeriod supports multiple reward types */
export interface MultiRewardPeriod {
  active: boolean;
  collateralType: string;
  start?: Date;
  end?: Date;
  rewardsPerSecond: Coin[];
}

/** Multiplier amount the claim rewards get increased by, along with how long the claim rewards are locked */
export interface Multiplier {
  name: string;
  monthsLockup: Long;
  factor: Uint8Array;
}

/** MultipliersPerDenom is a map of denoms to a set of multipliers */
export interface MultipliersPerDenom {
  denom: string;
  multipliers: Multiplier[];
}

/** Params */
export interface Params {
  usdxMintingRewardPeriods: RewardPeriod[];
  hardSupplyRewardPeriods: MultiRewardPeriod[];
  hardBorrowRewardPeriods: MultiRewardPeriod[];
  delegatorRewardPeriods: MultiRewardPeriod[];
  swapRewardPeriods: MultiRewardPeriod[];
  claimMultipliers: MultipliersPerDenom[];
  claimEnd?: Date;
}

function createBaseRewardPeriod(): RewardPeriod {
  return {
    active: false,
    collateralType: '',
    start: undefined,
    end: undefined,
    rewardsPerSecond: undefined,
  };
}

export const RewardPeriod = {
  encode(
    message: RewardPeriod,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.active === true) {
      writer.uint32(8).bool(message.active);
    }
    if (message.collateralType !== '') {
      writer.uint32(18).string(message.collateralType);
    }
    if (message.start !== undefined) {
      Timestamp.encode(
        toTimestamp(message.start),
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.end !== undefined) {
      Timestamp.encode(
        toTimestamp(message.end),
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.rewardsPerSecond !== undefined) {
      Coin.encode(message.rewardsPerSecond, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RewardPeriod {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRewardPeriod();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.active = reader.bool();
          break;
        case 2:
          message.collateralType = reader.string();
          break;
        case 3:
          message.start = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.end = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 5:
          message.rewardsPerSecond = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RewardPeriod {
    return {
      active: isSet(object.active) ? Boolean(object.active) : false,
      collateralType: isSet(object.collateralType)
        ? String(object.collateralType)
        : '',
      start: isSet(object.start) ? fromJsonTimestamp(object.start) : undefined,
      end: isSet(object.end) ? fromJsonTimestamp(object.end) : undefined,
      rewardsPerSecond: isSet(object.rewardsPerSecond)
        ? Coin.fromJSON(object.rewardsPerSecond)
        : undefined,
    };
  },

  toJSON(message: RewardPeriod): unknown {
    const obj: any = {};
    message.active !== undefined && (obj.active = message.active);
    message.collateralType !== undefined &&
      (obj.collateralType = message.collateralType);
    message.start !== undefined && (obj.start = message.start.toISOString());
    message.end !== undefined && (obj.end = message.end.toISOString());
    message.rewardsPerSecond !== undefined &&
      (obj.rewardsPerSecond = message.rewardsPerSecond
        ? Coin.toJSON(message.rewardsPerSecond)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RewardPeriod>, I>>(
    object: I
  ): RewardPeriod {
    const message = createBaseRewardPeriod();
    message.active = object.active ?? false;
    message.collateralType = object.collateralType ?? '';
    message.start = object.start ?? undefined;
    message.end = object.end ?? undefined;
    message.rewardsPerSecond =
      object.rewardsPerSecond !== undefined && object.rewardsPerSecond !== null
        ? Coin.fromPartial(object.rewardsPerSecond)
        : undefined;
    return message;
  },
};

function createBaseMultiRewardPeriod(): MultiRewardPeriod {
  return {
    active: false,
    collateralType: '',
    start: undefined,
    end: undefined,
    rewardsPerSecond: [],
  };
}

export const MultiRewardPeriod = {
  encode(
    message: MultiRewardPeriod,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.active === true) {
      writer.uint32(8).bool(message.active);
    }
    if (message.collateralType !== '') {
      writer.uint32(18).string(message.collateralType);
    }
    if (message.start !== undefined) {
      Timestamp.encode(
        toTimestamp(message.start),
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.end !== undefined) {
      Timestamp.encode(
        toTimestamp(message.end),
        writer.uint32(34).fork()
      ).ldelim();
    }
    for (const v of message.rewardsPerSecond) {
      Coin.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MultiRewardPeriod {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMultiRewardPeriod();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.active = reader.bool();
          break;
        case 2:
          message.collateralType = reader.string();
          break;
        case 3:
          message.start = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.end = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 5:
          message.rewardsPerSecond.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MultiRewardPeriod {
    return {
      active: isSet(object.active) ? Boolean(object.active) : false,
      collateralType: isSet(object.collateralType)
        ? String(object.collateralType)
        : '',
      start: isSet(object.start) ? fromJsonTimestamp(object.start) : undefined,
      end: isSet(object.end) ? fromJsonTimestamp(object.end) : undefined,
      rewardsPerSecond: Array.isArray(object?.rewardsPerSecond)
        ? object.rewardsPerSecond.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MultiRewardPeriod): unknown {
    const obj: any = {};
    message.active !== undefined && (obj.active = message.active);
    message.collateralType !== undefined &&
      (obj.collateralType = message.collateralType);
    message.start !== undefined && (obj.start = message.start.toISOString());
    message.end !== undefined && (obj.end = message.end.toISOString());
    if (message.rewardsPerSecond) {
      obj.rewardsPerSecond = message.rewardsPerSecond.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.rewardsPerSecond = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MultiRewardPeriod>, I>>(
    object: I
  ): MultiRewardPeriod {
    const message = createBaseMultiRewardPeriod();
    message.active = object.active ?? false;
    message.collateralType = object.collateralType ?? '';
    message.start = object.start ?? undefined;
    message.end = object.end ?? undefined;
    message.rewardsPerSecond =
      object.rewardsPerSecond?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMultiplier(): Multiplier {
  return { name: '', monthsLockup: Long.ZERO, factor: new Uint8Array() };
}

export const Multiplier = {
  encode(
    message: Multiplier,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (!message.monthsLockup.isZero()) {
      writer.uint32(16).int64(message.monthsLockup);
    }
    if (message.factor.length !== 0) {
      writer.uint32(26).bytes(message.factor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Multiplier {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMultiplier();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.monthsLockup = reader.int64() as Long;
          break;
        case 3:
          message.factor = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Multiplier {
    return {
      name: isSet(object.name) ? String(object.name) : '',
      monthsLockup: isSet(object.monthsLockup)
        ? Long.fromString(object.monthsLockup)
        : Long.ZERO,
      factor: isSet(object.factor)
        ? bytesFromBase64(object.factor)
        : new Uint8Array(),
    };
  },

  toJSON(message: Multiplier): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.monthsLockup !== undefined &&
      (obj.monthsLockup = (message.monthsLockup || Long.ZERO).toString());
    message.factor !== undefined &&
      (obj.factor = base64FromBytes(
        message.factor !== undefined ? message.factor : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Multiplier>, I>>(
    object: I
  ): Multiplier {
    const message = createBaseMultiplier();
    message.name = object.name ?? '';
    message.monthsLockup =
      object.monthsLockup !== undefined && object.monthsLockup !== null
        ? Long.fromValue(object.monthsLockup)
        : Long.ZERO;
    message.factor = object.factor ?? new Uint8Array();
    return message;
  },
};

function createBaseMultipliersPerDenom(): MultipliersPerDenom {
  return { denom: '', multipliers: [] };
}

export const MultipliersPerDenom = {
  encode(
    message: MultipliersPerDenom,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.denom !== '') {
      writer.uint32(10).string(message.denom);
    }
    for (const v of message.multipliers) {
      Multiplier.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MultipliersPerDenom {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMultipliersPerDenom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.multipliers.push(Multiplier.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MultipliersPerDenom {
    return {
      denom: isSet(object.denom) ? String(object.denom) : '',
      multipliers: Array.isArray(object?.multipliers)
        ? object.multipliers.map((e: any) => Multiplier.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MultipliersPerDenom): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    if (message.multipliers) {
      obj.multipliers = message.multipliers.map((e) =>
        e ? Multiplier.toJSON(e) : undefined
      );
    } else {
      obj.multipliers = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MultipliersPerDenom>, I>>(
    object: I
  ): MultipliersPerDenom {
    const message = createBaseMultipliersPerDenom();
    message.denom = object.denom ?? '';
    message.multipliers =
      object.multipliers?.map((e) => Multiplier.fromPartial(e)) || [];
    return message;
  },
};

function createBaseParams(): Params {
  return {
    usdxMintingRewardPeriods: [],
    hardSupplyRewardPeriods: [],
    hardBorrowRewardPeriods: [],
    delegatorRewardPeriods: [],
    swapRewardPeriods: [],
    claimMultipliers: [],
    claimEnd: undefined,
  };
}

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.usdxMintingRewardPeriods) {
      RewardPeriod.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.hardSupplyRewardPeriods) {
      MultiRewardPeriod.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.hardBorrowRewardPeriods) {
      MultiRewardPeriod.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.delegatorRewardPeriods) {
      MultiRewardPeriod.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.swapRewardPeriods) {
      MultiRewardPeriod.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.claimMultipliers) {
      MultipliersPerDenom.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.claimEnd !== undefined) {
      Timestamp.encode(
        toTimestamp(message.claimEnd),
        writer.uint32(58).fork()
      ).ldelim();
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
          message.usdxMintingRewardPeriods.push(
            RewardPeriod.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.hardSupplyRewardPeriods.push(
            MultiRewardPeriod.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.hardBorrowRewardPeriods.push(
            MultiRewardPeriod.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.delegatorRewardPeriods.push(
            MultiRewardPeriod.decode(reader, reader.uint32())
          );
          break;
        case 5:
          message.swapRewardPeriods.push(
            MultiRewardPeriod.decode(reader, reader.uint32())
          );
          break;
        case 6:
          message.claimMultipliers.push(
            MultipliersPerDenom.decode(reader, reader.uint32())
          );
          break;
        case 7:
          message.claimEnd = fromTimestamp(
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

  fromJSON(object: any): Params {
    return {
      usdxMintingRewardPeriods: Array.isArray(object?.usdxMintingRewardPeriods)
        ? object.usdxMintingRewardPeriods.map((e: any) =>
            RewardPeriod.fromJSON(e)
          )
        : [],
      hardSupplyRewardPeriods: Array.isArray(object?.hardSupplyRewardPeriods)
        ? object.hardSupplyRewardPeriods.map((e: any) =>
            MultiRewardPeriod.fromJSON(e)
          )
        : [],
      hardBorrowRewardPeriods: Array.isArray(object?.hardBorrowRewardPeriods)
        ? object.hardBorrowRewardPeriods.map((e: any) =>
            MultiRewardPeriod.fromJSON(e)
          )
        : [],
      delegatorRewardPeriods: Array.isArray(object?.delegatorRewardPeriods)
        ? object.delegatorRewardPeriods.map((e: any) =>
            MultiRewardPeriod.fromJSON(e)
          )
        : [],
      swapRewardPeriods: Array.isArray(object?.swapRewardPeriods)
        ? object.swapRewardPeriods.map((e: any) =>
            MultiRewardPeriod.fromJSON(e)
          )
        : [],
      claimMultipliers: Array.isArray(object?.claimMultipliers)
        ? object.claimMultipliers.map((e: any) =>
            MultipliersPerDenom.fromJSON(e)
          )
        : [],
      claimEnd: isSet(object.claimEnd)
        ? fromJsonTimestamp(object.claimEnd)
        : undefined,
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.usdxMintingRewardPeriods) {
      obj.usdxMintingRewardPeriods = message.usdxMintingRewardPeriods.map((e) =>
        e ? RewardPeriod.toJSON(e) : undefined
      );
    } else {
      obj.usdxMintingRewardPeriods = [];
    }
    if (message.hardSupplyRewardPeriods) {
      obj.hardSupplyRewardPeriods = message.hardSupplyRewardPeriods.map((e) =>
        e ? MultiRewardPeriod.toJSON(e) : undefined
      );
    } else {
      obj.hardSupplyRewardPeriods = [];
    }
    if (message.hardBorrowRewardPeriods) {
      obj.hardBorrowRewardPeriods = message.hardBorrowRewardPeriods.map((e) =>
        e ? MultiRewardPeriod.toJSON(e) : undefined
      );
    } else {
      obj.hardBorrowRewardPeriods = [];
    }
    if (message.delegatorRewardPeriods) {
      obj.delegatorRewardPeriods = message.delegatorRewardPeriods.map((e) =>
        e ? MultiRewardPeriod.toJSON(e) : undefined
      );
    } else {
      obj.delegatorRewardPeriods = [];
    }
    if (message.swapRewardPeriods) {
      obj.swapRewardPeriods = message.swapRewardPeriods.map((e) =>
        e ? MultiRewardPeriod.toJSON(e) : undefined
      );
    } else {
      obj.swapRewardPeriods = [];
    }
    if (message.claimMultipliers) {
      obj.claimMultipliers = message.claimMultipliers.map((e) =>
        e ? MultipliersPerDenom.toJSON(e) : undefined
      );
    } else {
      obj.claimMultipliers = [];
    }
    message.claimEnd !== undefined &&
      (obj.claimEnd = message.claimEnd.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.usdxMintingRewardPeriods =
      object.usdxMintingRewardPeriods?.map((e) =>
        RewardPeriod.fromPartial(e)
      ) || [];
    message.hardSupplyRewardPeriods =
      object.hardSupplyRewardPeriods?.map((e) =>
        MultiRewardPeriod.fromPartial(e)
      ) || [];
    message.hardBorrowRewardPeriods =
      object.hardBorrowRewardPeriods?.map((e) =>
        MultiRewardPeriod.fromPartial(e)
      ) || [];
    message.delegatorRewardPeriods =
      object.delegatorRewardPeriods?.map((e) =>
        MultiRewardPeriod.fromPartial(e)
      ) || [];
    message.swapRewardPeriods =
      object.swapRewardPeriods?.map((e) => MultiRewardPeriod.fromPartial(e)) ||
      [];
    message.claimMultipliers =
      object.claimMultipliers?.map((e) => MultipliersPerDenom.fromPartial(e)) ||
      [];
    message.claimEnd = object.claimEnd ?? undefined;
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
