/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Any } from '../../../google/protobuf/any';
import { Timestamp } from '../../../google/protobuf/timestamp';

export const protobufPackage = 'kava.committee.v1beta1';

/** VoteType enumerates the valid types of a vote. */
export enum VoteType {
  /** VOTE_TYPE_UNSPECIFIED - VOTE_TYPE_UNSPECIFIED defines a no-op vote option. */
  VOTE_TYPE_UNSPECIFIED = 0,
  /** VOTE_TYPE_YES - VOTE_TYPE_YES defines a yes vote option. */
  VOTE_TYPE_YES = 1,
  /** VOTE_TYPE_NO - VOTE_TYPE_NO defines a no vote option. */
  VOTE_TYPE_NO = 2,
  /** VOTE_TYPE_ABSTAIN - VOTE_TYPE_ABSTAIN defines an abstain vote option. */
  VOTE_TYPE_ABSTAIN = 3,
  UNRECOGNIZED = -1,
}

export function voteTypeFromJSON(object: any): VoteType {
  switch (object) {
    case 0:
    case 'VOTE_TYPE_UNSPECIFIED':
      return VoteType.VOTE_TYPE_UNSPECIFIED;
    case 1:
    case 'VOTE_TYPE_YES':
      return VoteType.VOTE_TYPE_YES;
    case 2:
    case 'VOTE_TYPE_NO':
      return VoteType.VOTE_TYPE_NO;
    case 3:
    case 'VOTE_TYPE_ABSTAIN':
      return VoteType.VOTE_TYPE_ABSTAIN;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return VoteType.UNRECOGNIZED;
  }
}

export function voteTypeToJSON(object: VoteType): string {
  switch (object) {
    case VoteType.VOTE_TYPE_UNSPECIFIED:
      return 'VOTE_TYPE_UNSPECIFIED';
    case VoteType.VOTE_TYPE_YES:
      return 'VOTE_TYPE_YES';
    case VoteType.VOTE_TYPE_NO:
      return 'VOTE_TYPE_NO';
    case VoteType.VOTE_TYPE_ABSTAIN:
      return 'VOTE_TYPE_ABSTAIN';
    default:
      return 'UNKNOWN';
  }
}

/** GenesisState defines the committee module's genesis state. */
export interface GenesisState {
  nextProposalId: Long;
  committees: Any[];
  proposals: Proposal[];
  votes: Vote[];
}

/** Proposal is an internal record of a governance proposal submitted to a committee. */
export interface Proposal {
  content?: Any;
  id: Long;
  committeeId: Long;
  deadline?: Date;
}

/** Vote is an internal record of a single governance vote. */
export interface Vote {
  proposalId: Long;
  voter: Uint8Array;
  voteType: VoteType;
}

function createBaseGenesisState(): GenesisState {
  return {
    nextProposalId: Long.UZERO,
    committees: [],
    proposals: [],
    votes: [],
  };
}

export const GenesisState = {
  encode(
    message: GenesisState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.nextProposalId.isZero()) {
      writer.uint32(8).uint64(message.nextProposalId);
    }
    for (const v of message.committees) {
      Any.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.proposals) {
      Proposal.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.votes) {
      Vote.encode(v!, writer.uint32(34).fork()).ldelim();
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
          message.nextProposalId = reader.uint64() as Long;
          break;
        case 2:
          message.committees.push(Any.decode(reader, reader.uint32()));
          break;
        case 3:
          message.proposals.push(Proposal.decode(reader, reader.uint32()));
          break;
        case 4:
          message.votes.push(Vote.decode(reader, reader.uint32()));
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
      nextProposalId: isSet(object.nextProposalId)
        ? Long.fromString(object.nextProposalId)
        : Long.UZERO,
      committees: Array.isArray(object?.committees)
        ? object.committees.map((e: any) => Any.fromJSON(e))
        : [],
      proposals: Array.isArray(object?.proposals)
        ? object.proposals.map((e: any) => Proposal.fromJSON(e))
        : [],
      votes: Array.isArray(object?.votes)
        ? object.votes.map((e: any) => Vote.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.nextProposalId !== undefined &&
      (obj.nextProposalId = (message.nextProposalId || Long.UZERO).toString());
    if (message.committees) {
      obj.committees = message.committees.map((e) =>
        e ? Any.toJSON(e) : undefined
      );
    } else {
      obj.committees = [];
    }
    if (message.proposals) {
      obj.proposals = message.proposals.map((e) =>
        e ? Proposal.toJSON(e) : undefined
      );
    } else {
      obj.proposals = [];
    }
    if (message.votes) {
      obj.votes = message.votes.map((e) => (e ? Vote.toJSON(e) : undefined));
    } else {
      obj.votes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(
    object: I
  ): GenesisState {
    const message = createBaseGenesisState();
    message.nextProposalId =
      object.nextProposalId !== undefined && object.nextProposalId !== null
        ? Long.fromValue(object.nextProposalId)
        : Long.UZERO;
    message.committees =
      object.committees?.map((e) => Any.fromPartial(e)) || [];
    message.proposals =
      object.proposals?.map((e) => Proposal.fromPartial(e)) || [];
    message.votes = object.votes?.map((e) => Vote.fromPartial(e)) || [];
    return message;
  },
};

function createBaseProposal(): Proposal {
  return {
    content: undefined,
    id: Long.UZERO,
    committeeId: Long.UZERO,
    deadline: undefined,
  };
}

export const Proposal = {
  encode(
    message: Proposal,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.content !== undefined) {
      Any.encode(message.content, writer.uint32(10).fork()).ldelim();
    }
    if (!message.id.isZero()) {
      writer.uint32(16).uint64(message.id);
    }
    if (!message.committeeId.isZero()) {
      writer.uint32(24).uint64(message.committeeId);
    }
    if (message.deadline !== undefined) {
      Timestamp.encode(
        toTimestamp(message.deadline),
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Proposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.content = Any.decode(reader, reader.uint32());
          break;
        case 2:
          message.id = reader.uint64() as Long;
          break;
        case 3:
          message.committeeId = reader.uint64() as Long;
          break;
        case 4:
          message.deadline = fromTimestamp(
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

  fromJSON(object: any): Proposal {
    return {
      content: isSet(object.content) ? Any.fromJSON(object.content) : undefined,
      id: isSet(object.id) ? Long.fromString(object.id) : Long.UZERO,
      committeeId: isSet(object.committeeId)
        ? Long.fromString(object.committeeId)
        : Long.UZERO,
      deadline: isSet(object.deadline)
        ? fromJsonTimestamp(object.deadline)
        : undefined,
    };
  },

  toJSON(message: Proposal): unknown {
    const obj: any = {};
    message.content !== undefined &&
      (obj.content = message.content ? Any.toJSON(message.content) : undefined);
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    message.committeeId !== undefined &&
      (obj.committeeId = (message.committeeId || Long.UZERO).toString());
    message.deadline !== undefined &&
      (obj.deadline = message.deadline.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Proposal>, I>>(object: I): Proposal {
    const message = createBaseProposal();
    message.content =
      object.content !== undefined && object.content !== null
        ? Any.fromPartial(object.content)
        : undefined;
    message.id =
      object.id !== undefined && object.id !== null
        ? Long.fromValue(object.id)
        : Long.UZERO;
    message.committeeId =
      object.committeeId !== undefined && object.committeeId !== null
        ? Long.fromValue(object.committeeId)
        : Long.UZERO;
    message.deadline = object.deadline ?? undefined;
    return message;
  },
};

function createBaseVote(): Vote {
  return { proposalId: Long.UZERO, voter: new Uint8Array(), voteType: 0 };
}

export const Vote = {
  encode(message: Vote, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.proposalId.isZero()) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.voter.length !== 0) {
      writer.uint32(18).bytes(message.voter);
    }
    if (message.voteType !== 0) {
      writer.uint32(24).int32(message.voteType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Vote {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposalId = reader.uint64() as Long;
          break;
        case 2:
          message.voter = reader.bytes();
          break;
        case 3:
          message.voteType = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Vote {
    return {
      proposalId: isSet(object.proposalId)
        ? Long.fromString(object.proposalId)
        : Long.UZERO,
      voter: isSet(object.voter)
        ? bytesFromBase64(object.voter)
        : new Uint8Array(),
      voteType: isSet(object.voteType) ? voteTypeFromJSON(object.voteType) : 0,
    };
  },

  toJSON(message: Vote): unknown {
    const obj: any = {};
    message.proposalId !== undefined &&
      (obj.proposalId = (message.proposalId || Long.UZERO).toString());
    message.voter !== undefined &&
      (obj.voter = base64FromBytes(
        message.voter !== undefined ? message.voter : new Uint8Array()
      ));
    message.voteType !== undefined &&
      (obj.voteType = voteTypeToJSON(message.voteType));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Vote>, I>>(object: I): Vote {
    const message = createBaseVote();
    message.proposalId =
      object.proposalId !== undefined && object.proposalId !== null
        ? Long.fromValue(object.proposalId)
        : Long.UZERO;
    message.voter = object.voter ?? new Uint8Array();
    message.voteType = object.voteType ?? 0;
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
