/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Duration } from '../../../google/protobuf/duration';
import { Coin } from '../../../cosmos/base/v1beta1/coin';

export const protobufPackage = 'kava.issuance.v1beta1';

/** GenesisState defines the issuance module's genesis state. */
export interface GenesisState {
  /** params defines all the paramaters of the module. */
  params?: Params;
  supplies: AssetSupply[];
}

/** Params defines the parameters for the issuance module. */
export interface Params {
  assets: Asset[];
}

/** Asset type for assets in the issuance module */
export interface Asset {
  owner: string;
  denom: string;
  blockedAddresses: string[];
  paused: boolean;
  blockable: boolean;
  rateLimit?: RateLimit;
}

/** RateLimit parameters for rate-limiting the supply of an issued asset */
export interface RateLimit {
  active: boolean;
  limit: Uint8Array;
  timePeriod?: Duration;
}

/**
 * AssetSupply contains information about an asset's rate-limited supply (the
 * total supply of the asset is tracked in the top-level supply module)
 */
export interface AssetSupply {
  currentSupply?: Coin;
  timeElapsed?: Duration;
}

function createBaseGenesisState(): GenesisState {
  return { params: undefined, supplies: [] };
}

export const GenesisState = {
  encode(
    message: GenesisState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.supplies) {
      AssetSupply.encode(v!, writer.uint32(18).fork()).ldelim();
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
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.supplies.push(AssetSupply.decode(reader, reader.uint32()));
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
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      supplies: Array.isArray(object?.supplies)
        ? object.supplies.map((e: any) => AssetSupply.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.supplies) {
      obj.supplies = message.supplies.map((e) =>
        e ? AssetSupply.toJSON(e) : undefined
      );
    } else {
      obj.supplies = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(
    object: I
  ): GenesisState {
    const message = createBaseGenesisState();
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    message.supplies =
      object.supplies?.map((e) => AssetSupply.fromPartial(e)) || [];
    return message;
  },
};

function createBaseParams(): Params {
  return { assets: [] };
}

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.assets) {
      Asset.encode(v!, writer.uint32(10).fork()).ldelim();
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
          message.assets.push(Asset.decode(reader, reader.uint32()));
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
      assets: Array.isArray(object?.assets)
        ? object.assets.map((e: any) => Asset.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.assets) {
      obj.assets = message.assets.map((e) => (e ? Asset.toJSON(e) : undefined));
    } else {
      obj.assets = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.assets = object.assets?.map((e) => Asset.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAsset(): Asset {
  return {
    owner: '',
    denom: '',
    blockedAddresses: [],
    paused: false,
    blockable: false,
    rateLimit: undefined,
  };
}

export const Asset = {
  encode(message: Asset, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.owner !== '') {
      writer.uint32(10).string(message.owner);
    }
    if (message.denom !== '') {
      writer.uint32(18).string(message.denom);
    }
    for (const v of message.blockedAddresses) {
      writer.uint32(26).string(v!);
    }
    if (message.paused === true) {
      writer.uint32(32).bool(message.paused);
    }
    if (message.blockable === true) {
      writer.uint32(40).bool(message.blockable);
    }
    if (message.rateLimit !== undefined) {
      RateLimit.encode(message.rateLimit, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Asset {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAsset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        case 3:
          message.blockedAddresses.push(reader.string());
          break;
        case 4:
          message.paused = reader.bool();
          break;
        case 5:
          message.blockable = reader.bool();
          break;
        case 6:
          message.rateLimit = RateLimit.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Asset {
    return {
      owner: isSet(object.owner) ? String(object.owner) : '',
      denom: isSet(object.denom) ? String(object.denom) : '',
      blockedAddresses: Array.isArray(object?.blockedAddresses)
        ? object.blockedAddresses.map((e: any) => String(e))
        : [],
      paused: isSet(object.paused) ? Boolean(object.paused) : false,
      blockable: isSet(object.blockable) ? Boolean(object.blockable) : false,
      rateLimit: isSet(object.rateLimit)
        ? RateLimit.fromJSON(object.rateLimit)
        : undefined,
    };
  },

  toJSON(message: Asset): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.denom !== undefined && (obj.denom = message.denom);
    if (message.blockedAddresses) {
      obj.blockedAddresses = message.blockedAddresses.map((e) => e);
    } else {
      obj.blockedAddresses = [];
    }
    message.paused !== undefined && (obj.paused = message.paused);
    message.blockable !== undefined && (obj.blockable = message.blockable);
    message.rateLimit !== undefined &&
      (obj.rateLimit = message.rateLimit
        ? RateLimit.toJSON(message.rateLimit)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Asset>, I>>(object: I): Asset {
    const message = createBaseAsset();
    message.owner = object.owner ?? '';
    message.denom = object.denom ?? '';
    message.blockedAddresses = object.blockedAddresses?.map((e) => e) || [];
    message.paused = object.paused ?? false;
    message.blockable = object.blockable ?? false;
    message.rateLimit =
      object.rateLimit !== undefined && object.rateLimit !== null
        ? RateLimit.fromPartial(object.rateLimit)
        : undefined;
    return message;
  },
};

function createBaseRateLimit(): RateLimit {
  return { active: false, limit: new Uint8Array(), timePeriod: undefined };
}

export const RateLimit = {
  encode(
    message: RateLimit,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.active === true) {
      writer.uint32(8).bool(message.active);
    }
    if (message.limit.length !== 0) {
      writer.uint32(18).bytes(message.limit);
    }
    if (message.timePeriod !== undefined) {
      Duration.encode(message.timePeriod, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RateLimit {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRateLimit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.active = reader.bool();
          break;
        case 2:
          message.limit = reader.bytes();
          break;
        case 3:
          message.timePeriod = Duration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RateLimit {
    return {
      active: isSet(object.active) ? Boolean(object.active) : false,
      limit: isSet(object.limit)
        ? bytesFromBase64(object.limit)
        : new Uint8Array(),
      timePeriod: isSet(object.timePeriod)
        ? Duration.fromJSON(object.timePeriod)
        : undefined,
    };
  },

  toJSON(message: RateLimit): unknown {
    const obj: any = {};
    message.active !== undefined && (obj.active = message.active);
    message.limit !== undefined &&
      (obj.limit = base64FromBytes(
        message.limit !== undefined ? message.limit : new Uint8Array()
      ));
    message.timePeriod !== undefined &&
      (obj.timePeriod = message.timePeriod
        ? Duration.toJSON(message.timePeriod)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RateLimit>, I>>(
    object: I
  ): RateLimit {
    const message = createBaseRateLimit();
    message.active = object.active ?? false;
    message.limit = object.limit ?? new Uint8Array();
    message.timePeriod =
      object.timePeriod !== undefined && object.timePeriod !== null
        ? Duration.fromPartial(object.timePeriod)
        : undefined;
    return message;
  },
};

function createBaseAssetSupply(): AssetSupply {
  return { currentSupply: undefined, timeElapsed: undefined };
}

export const AssetSupply = {
  encode(
    message: AssetSupply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.currentSupply !== undefined) {
      Coin.encode(message.currentSupply, writer.uint32(10).fork()).ldelim();
    }
    if (message.timeElapsed !== undefined) {
      Duration.encode(message.timeElapsed, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AssetSupply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAssetSupply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currentSupply = Coin.decode(reader, reader.uint32());
          break;
        case 2:
          message.timeElapsed = Duration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AssetSupply {
    return {
      currentSupply: isSet(object.currentSupply)
        ? Coin.fromJSON(object.currentSupply)
        : undefined,
      timeElapsed: isSet(object.timeElapsed)
        ? Duration.fromJSON(object.timeElapsed)
        : undefined,
    };
  },

  toJSON(message: AssetSupply): unknown {
    const obj: any = {};
    message.currentSupply !== undefined &&
      (obj.currentSupply = message.currentSupply
        ? Coin.toJSON(message.currentSupply)
        : undefined);
    message.timeElapsed !== undefined &&
      (obj.timeElapsed = message.timeElapsed
        ? Duration.toJSON(message.timeElapsed)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AssetSupply>, I>>(
    object: I
  ): AssetSupply {
    const message = createBaseAssetSupply();
    message.currentSupply =
      object.currentSupply !== undefined && object.currentSupply !== null
        ? Coin.fromPartial(object.currentSupply)
        : undefined;
    message.timeElapsed =
      object.timeElapsed !== undefined && object.timeElapsed !== null
        ? Duration.fromPartial(object.timeElapsed)
        : undefined;
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
