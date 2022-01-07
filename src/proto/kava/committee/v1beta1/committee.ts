/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Duration } from '../../../google/protobuf/duration';
import { Any } from '../../../google/protobuf/any';

export const protobufPackage = 'kava.committee.v1beta1';

/** TallyOption enumerates the valid types of a tally. */
export enum TallyOption {
  /** TALLY_OPTION_UNSPECIFIED - TALLY_OPTION_UNSPECIFIED defines a null tally option. */
  TALLY_OPTION_UNSPECIFIED = 0,
  /** TALLY_OPTION_FIRST_PAST_THE_POST - Votes are tallied each block and the proposal passes as soon as the vote threshold is reached */
  TALLY_OPTION_FIRST_PAST_THE_POST = 1,
  /** TALLY_OPTION_DEADLINE - Votes are tallied exactly once, when the deadline time is reached */
  TALLY_OPTION_DEADLINE = 2,
  UNRECOGNIZED = -1,
}

export function tallyOptionFromJSON(object: any): TallyOption {
  switch (object) {
    case 0:
    case 'TALLY_OPTION_UNSPECIFIED':
      return TallyOption.TALLY_OPTION_UNSPECIFIED;
    case 1:
    case 'TALLY_OPTION_FIRST_PAST_THE_POST':
      return TallyOption.TALLY_OPTION_FIRST_PAST_THE_POST;
    case 2:
    case 'TALLY_OPTION_DEADLINE':
      return TallyOption.TALLY_OPTION_DEADLINE;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return TallyOption.UNRECOGNIZED;
  }
}

export function tallyOptionToJSON(object: TallyOption): string {
  switch (object) {
    case TallyOption.TALLY_OPTION_UNSPECIFIED:
      return 'TALLY_OPTION_UNSPECIFIED';
    case TallyOption.TALLY_OPTION_FIRST_PAST_THE_POST:
      return 'TALLY_OPTION_FIRST_PAST_THE_POST';
    case TallyOption.TALLY_OPTION_DEADLINE:
      return 'TALLY_OPTION_DEADLINE';
    default:
      return 'UNKNOWN';
  }
}

/** BaseCommittee is a common type shared by all Committees */
export interface BaseCommittee {
  id: Long;
  description: string;
  members: Uint8Array[];
  permissions: Any[];
  /** Smallest percentage that must vote for a proposal to pass */
  voteThreshold: string;
  /** The length of time a proposal remains active for. Proposals will close earlier if they get enough votes. */
  proposalDuration?: Duration;
  tallyOption: TallyOption;
}

/** MemberCommittee is an alias of BaseCommittee */
export interface MemberCommittee {
  baseCommittee?: BaseCommittee;
}

/** TokenCommittee supports voting on proposals by token holders */
export interface TokenCommittee {
  baseCommittee?: BaseCommittee;
  quorum: string;
  tallyDenom: string;
}

function createBaseBaseCommittee(): BaseCommittee {
  return {
    id: Long.UZERO,
    description: '',
    members: [],
    permissions: [],
    voteThreshold: '',
    proposalDuration: undefined,
    tallyOption: 0,
  };
}

export const BaseCommittee = {
  encode(
    message: BaseCommittee,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.description !== '') {
      writer.uint32(18).string(message.description);
    }
    for (const v of message.members) {
      writer.uint32(26).bytes(v!);
    }
    for (const v of message.permissions) {
      Any.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.voteThreshold !== '') {
      writer.uint32(42).string(message.voteThreshold);
    }
    if (message.proposalDuration !== undefined) {
      Duration.encode(
        message.proposalDuration,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.tallyOption !== 0) {
      writer.uint32(56).int32(message.tallyOption);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BaseCommittee {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBaseCommittee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64() as Long;
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.members.push(reader.bytes());
          break;
        case 4:
          message.permissions.push(Any.decode(reader, reader.uint32()));
          break;
        case 5:
          message.voteThreshold = reader.string();
          break;
        case 6:
          message.proposalDuration = Duration.decode(reader, reader.uint32());
          break;
        case 7:
          message.tallyOption = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BaseCommittee {
    return {
      id: isSet(object.id) ? Long.fromString(object.id) : Long.UZERO,
      description: isSet(object.description) ? String(object.description) : '',
      members: Array.isArray(object?.members)
        ? object.members.map((e: any) => bytesFromBase64(e))
        : [],
      permissions: Array.isArray(object?.permissions)
        ? object.permissions.map((e: any) => Any.fromJSON(e))
        : [],
      voteThreshold: isSet(object.voteThreshold)
        ? String(object.voteThreshold)
        : '',
      proposalDuration: isSet(object.proposalDuration)
        ? Duration.fromJSON(object.proposalDuration)
        : undefined,
      tallyOption: isSet(object.tallyOption)
        ? tallyOptionFromJSON(object.tallyOption)
        : 0,
    };
  },

  toJSON(message: BaseCommittee): unknown {
    const obj: any = {};
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    message.description !== undefined &&
      (obj.description = message.description);
    if (message.members) {
      obj.members = message.members.map((e) =>
        base64FromBytes(e !== undefined ? e : new Uint8Array())
      );
    } else {
      obj.members = [];
    }
    if (message.permissions) {
      obj.permissions = message.permissions.map((e) =>
        e ? Any.toJSON(e) : undefined
      );
    } else {
      obj.permissions = [];
    }
    message.voteThreshold !== undefined &&
      (obj.voteThreshold = message.voteThreshold);
    message.proposalDuration !== undefined &&
      (obj.proposalDuration = message.proposalDuration
        ? Duration.toJSON(message.proposalDuration)
        : undefined);
    message.tallyOption !== undefined &&
      (obj.tallyOption = tallyOptionToJSON(message.tallyOption));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BaseCommittee>, I>>(
    object: I
  ): BaseCommittee {
    const message = createBaseBaseCommittee();
    message.id =
      object.id !== undefined && object.id !== null
        ? Long.fromValue(object.id)
        : Long.UZERO;
    message.description = object.description ?? '';
    message.members = object.members?.map((e) => e) || [];
    message.permissions =
      object.permissions?.map((e) => Any.fromPartial(e)) || [];
    message.voteThreshold = object.voteThreshold ?? '';
    message.proposalDuration =
      object.proposalDuration !== undefined && object.proposalDuration !== null
        ? Duration.fromPartial(object.proposalDuration)
        : undefined;
    message.tallyOption = object.tallyOption ?? 0;
    return message;
  },
};

function createBaseMemberCommittee(): MemberCommittee {
  return { baseCommittee: undefined };
}

export const MemberCommittee = {
  encode(
    message: MemberCommittee,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.baseCommittee !== undefined) {
      BaseCommittee.encode(
        message.baseCommittee,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MemberCommittee {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMemberCommittee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseCommittee = BaseCommittee.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MemberCommittee {
    return {
      baseCommittee: isSet(object.baseCommittee)
        ? BaseCommittee.fromJSON(object.baseCommittee)
        : undefined,
    };
  },

  toJSON(message: MemberCommittee): unknown {
    const obj: any = {};
    message.baseCommittee !== undefined &&
      (obj.baseCommittee = message.baseCommittee
        ? BaseCommittee.toJSON(message.baseCommittee)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MemberCommittee>, I>>(
    object: I
  ): MemberCommittee {
    const message = createBaseMemberCommittee();
    message.baseCommittee =
      object.baseCommittee !== undefined && object.baseCommittee !== null
        ? BaseCommittee.fromPartial(object.baseCommittee)
        : undefined;
    return message;
  },
};

function createBaseTokenCommittee(): TokenCommittee {
  return { baseCommittee: undefined, quorum: '', tallyDenom: '' };
}

export const TokenCommittee = {
  encode(
    message: TokenCommittee,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.baseCommittee !== undefined) {
      BaseCommittee.encode(
        message.baseCommittee,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.quorum !== '') {
      writer.uint32(18).string(message.quorum);
    }
    if (message.tallyDenom !== '') {
      writer.uint32(26).string(message.tallyDenom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TokenCommittee {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTokenCommittee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseCommittee = BaseCommittee.decode(reader, reader.uint32());
          break;
        case 2:
          message.quorum = reader.string();
          break;
        case 3:
          message.tallyDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TokenCommittee {
    return {
      baseCommittee: isSet(object.baseCommittee)
        ? BaseCommittee.fromJSON(object.baseCommittee)
        : undefined,
      quorum: isSet(object.quorum) ? String(object.quorum) : '',
      tallyDenom: isSet(object.tallyDenom) ? String(object.tallyDenom) : '',
    };
  },

  toJSON(message: TokenCommittee): unknown {
    const obj: any = {};
    message.baseCommittee !== undefined &&
      (obj.baseCommittee = message.baseCommittee
        ? BaseCommittee.toJSON(message.baseCommittee)
        : undefined);
    message.quorum !== undefined && (obj.quorum = message.quorum);
    message.tallyDenom !== undefined && (obj.tallyDenom = message.tallyDenom);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TokenCommittee>, I>>(
    object: I
  ): TokenCommittee {
    const message = createBaseTokenCommittee();
    message.baseCommittee =
      object.baseCommittee !== undefined && object.baseCommittee !== null
        ? BaseCommittee.fromPartial(object.baseCommittee)
        : undefined;
    message.quorum = object.quorum ?? '';
    message.tallyDenom = object.tallyDenom ?? '';
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
