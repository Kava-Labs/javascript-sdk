/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import {
  SignedMsgType,
  signedMsgTypeFromJSON,
  signedMsgTypeToJSON,
} from '../../tendermint/types/types';
import { Timestamp } from '../../google/protobuf/timestamp';

export const protobufPackage = 'tendermint.types';

export interface CanonicalBlockID {
  hash: Uint8Array;
  partSetHeader?: CanonicalPartSetHeader;
}

export interface CanonicalPartSetHeader {
  total: number;
  hash: Uint8Array;
}

export interface CanonicalProposal {
  /** type alias for byte */
  type: SignedMsgType;
  /** canonicalization requires fixed size encoding here */
  height: Long;
  /** canonicalization requires fixed size encoding here */
  round: Long;
  polRound: Long;
  blockId?: CanonicalBlockID;
  timestamp?: Date;
  chainId: string;
}

export interface CanonicalVote {
  /** type alias for byte */
  type: SignedMsgType;
  /** canonicalization requires fixed size encoding here */
  height: Long;
  /** canonicalization requires fixed size encoding here */
  round: Long;
  blockId?: CanonicalBlockID;
  timestamp?: Date;
  chainId: string;
}

function createBaseCanonicalBlockID(): CanonicalBlockID {
  return { hash: new Uint8Array(), partSetHeader: undefined };
}

export const CanonicalBlockID = {
  encode(
    message: CanonicalBlockID,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.hash.length !== 0) {
      writer.uint32(10).bytes(message.hash);
    }
    if (message.partSetHeader !== undefined) {
      CanonicalPartSetHeader.encode(
        message.partSetHeader,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CanonicalBlockID {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCanonicalBlockID();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.bytes();
          break;
        case 2:
          message.partSetHeader = CanonicalPartSetHeader.decode(
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

  fromJSON(object: any): CanonicalBlockID {
    return {
      hash: isSet(object.hash)
        ? bytesFromBase64(object.hash)
        : new Uint8Array(),
      partSetHeader: isSet(object.partSetHeader)
        ? CanonicalPartSetHeader.fromJSON(object.partSetHeader)
        : undefined,
    };
  },

  toJSON(message: CanonicalBlockID): unknown {
    const obj: any = {};
    message.hash !== undefined &&
      (obj.hash = base64FromBytes(
        message.hash !== undefined ? message.hash : new Uint8Array()
      ));
    message.partSetHeader !== undefined &&
      (obj.partSetHeader = message.partSetHeader
        ? CanonicalPartSetHeader.toJSON(message.partSetHeader)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CanonicalBlockID>, I>>(
    object: I
  ): CanonicalBlockID {
    const message = createBaseCanonicalBlockID();
    message.hash = object.hash ?? new Uint8Array();
    message.partSetHeader =
      object.partSetHeader !== undefined && object.partSetHeader !== null
        ? CanonicalPartSetHeader.fromPartial(object.partSetHeader)
        : undefined;
    return message;
  },
};

function createBaseCanonicalPartSetHeader(): CanonicalPartSetHeader {
  return { total: 0, hash: new Uint8Array() };
}

export const CanonicalPartSetHeader = {
  encode(
    message: CanonicalPartSetHeader,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.total !== 0) {
      writer.uint32(8).uint32(message.total);
    }
    if (message.hash.length !== 0) {
      writer.uint32(18).bytes(message.hash);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CanonicalPartSetHeader {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCanonicalPartSetHeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.total = reader.uint32();
          break;
        case 2:
          message.hash = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CanonicalPartSetHeader {
    return {
      total: isSet(object.total) ? Number(object.total) : 0,
      hash: isSet(object.hash)
        ? bytesFromBase64(object.hash)
        : new Uint8Array(),
    };
  },

  toJSON(message: CanonicalPartSetHeader): unknown {
    const obj: any = {};
    message.total !== undefined && (obj.total = Math.round(message.total));
    message.hash !== undefined &&
      (obj.hash = base64FromBytes(
        message.hash !== undefined ? message.hash : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CanonicalPartSetHeader>, I>>(
    object: I
  ): CanonicalPartSetHeader {
    const message = createBaseCanonicalPartSetHeader();
    message.total = object.total ?? 0;
    message.hash = object.hash ?? new Uint8Array();
    return message;
  },
};

function createBaseCanonicalProposal(): CanonicalProposal {
  return {
    type: 0,
    height: Long.ZERO,
    round: Long.ZERO,
    polRound: Long.ZERO,
    blockId: undefined,
    timestamp: undefined,
    chainId: '',
  };
}

export const CanonicalProposal = {
  encode(
    message: CanonicalProposal,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (!message.height.isZero()) {
      writer.uint32(17).sfixed64(message.height);
    }
    if (!message.round.isZero()) {
      writer.uint32(25).sfixed64(message.round);
    }
    if (!message.polRound.isZero()) {
      writer.uint32(32).int64(message.polRound);
    }
    if (message.blockId !== undefined) {
      CanonicalBlockID.encode(
        message.blockId,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.chainId !== '') {
      writer.uint32(58).string(message.chainId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CanonicalProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCanonicalProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.height = reader.sfixed64() as Long;
          break;
        case 3:
          message.round = reader.sfixed64() as Long;
          break;
        case 4:
          message.polRound = reader.int64() as Long;
          break;
        case 5:
          message.blockId = CanonicalBlockID.decode(reader, reader.uint32());
          break;
        case 6:
          message.timestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 7:
          message.chainId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CanonicalProposal {
    return {
      type: isSet(object.type) ? signedMsgTypeFromJSON(object.type) : 0,
      height: isSet(object.height) ? Long.fromString(object.height) : Long.ZERO,
      round: isSet(object.round) ? Long.fromString(object.round) : Long.ZERO,
      polRound: isSet(object.polRound)
        ? Long.fromString(object.polRound)
        : Long.ZERO,
      blockId: isSet(object.blockId)
        ? CanonicalBlockID.fromJSON(object.blockId)
        : undefined,
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
      chainId: isSet(object.chainId) ? String(object.chainId) : '',
    };
  },

  toJSON(message: CanonicalProposal): unknown {
    const obj: any = {};
    message.type !== undefined &&
      (obj.type = signedMsgTypeToJSON(message.type));
    message.height !== undefined &&
      (obj.height = (message.height || Long.ZERO).toString());
    message.round !== undefined &&
      (obj.round = (message.round || Long.ZERO).toString());
    message.polRound !== undefined &&
      (obj.polRound = (message.polRound || Long.ZERO).toString());
    message.blockId !== undefined &&
      (obj.blockId = message.blockId
        ? CanonicalBlockID.toJSON(message.blockId)
        : undefined);
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    message.chainId !== undefined && (obj.chainId = message.chainId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CanonicalProposal>, I>>(
    object: I
  ): CanonicalProposal {
    const message = createBaseCanonicalProposal();
    message.type = object.type ?? 0;
    message.height =
      object.height !== undefined && object.height !== null
        ? Long.fromValue(object.height)
        : Long.ZERO;
    message.round =
      object.round !== undefined && object.round !== null
        ? Long.fromValue(object.round)
        : Long.ZERO;
    message.polRound =
      object.polRound !== undefined && object.polRound !== null
        ? Long.fromValue(object.polRound)
        : Long.ZERO;
    message.blockId =
      object.blockId !== undefined && object.blockId !== null
        ? CanonicalBlockID.fromPartial(object.blockId)
        : undefined;
    message.timestamp = object.timestamp ?? undefined;
    message.chainId = object.chainId ?? '';
    return message;
  },
};

function createBaseCanonicalVote(): CanonicalVote {
  return {
    type: 0,
    height: Long.ZERO,
    round: Long.ZERO,
    blockId: undefined,
    timestamp: undefined,
    chainId: '',
  };
}

export const CanonicalVote = {
  encode(
    message: CanonicalVote,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (!message.height.isZero()) {
      writer.uint32(17).sfixed64(message.height);
    }
    if (!message.round.isZero()) {
      writer.uint32(25).sfixed64(message.round);
    }
    if (message.blockId !== undefined) {
      CanonicalBlockID.encode(
        message.blockId,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.chainId !== '') {
      writer.uint32(50).string(message.chainId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CanonicalVote {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCanonicalVote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.height = reader.sfixed64() as Long;
          break;
        case 3:
          message.round = reader.sfixed64() as Long;
          break;
        case 4:
          message.blockId = CanonicalBlockID.decode(reader, reader.uint32());
          break;
        case 5:
          message.timestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 6:
          message.chainId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CanonicalVote {
    return {
      type: isSet(object.type) ? signedMsgTypeFromJSON(object.type) : 0,
      height: isSet(object.height) ? Long.fromString(object.height) : Long.ZERO,
      round: isSet(object.round) ? Long.fromString(object.round) : Long.ZERO,
      blockId: isSet(object.blockId)
        ? CanonicalBlockID.fromJSON(object.blockId)
        : undefined,
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
      chainId: isSet(object.chainId) ? String(object.chainId) : '',
    };
  },

  toJSON(message: CanonicalVote): unknown {
    const obj: any = {};
    message.type !== undefined &&
      (obj.type = signedMsgTypeToJSON(message.type));
    message.height !== undefined &&
      (obj.height = (message.height || Long.ZERO).toString());
    message.round !== undefined &&
      (obj.round = (message.round || Long.ZERO).toString());
    message.blockId !== undefined &&
      (obj.blockId = message.blockId
        ? CanonicalBlockID.toJSON(message.blockId)
        : undefined);
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    message.chainId !== undefined && (obj.chainId = message.chainId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CanonicalVote>, I>>(
    object: I
  ): CanonicalVote {
    const message = createBaseCanonicalVote();
    message.type = object.type ?? 0;
    message.height =
      object.height !== undefined && object.height !== null
        ? Long.fromValue(object.height)
        : Long.ZERO;
    message.round =
      object.round !== undefined && object.round !== null
        ? Long.fromValue(object.round)
        : Long.ZERO;
    message.blockId =
      object.blockId !== undefined && object.blockId !== null
        ? CanonicalBlockID.fromPartial(object.blockId)
        : undefined;
    message.timestamp = object.timestamp ?? undefined;
    message.chainId = object.chainId ?? '';
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
