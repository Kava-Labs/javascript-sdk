/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Any } from '../../../google/protobuf/any';
import {
  PageRequest,
  PageResponse,
} from '../../../cosmos/base/query/v1beta1/pagination';
import {
  VoteType,
  voteTypeFromJSON,
  voteTypeToJSON,
} from '../../../kava/committee/v1beta1/genesis';
import { Timestamp } from '../../../google/protobuf/timestamp';

export const protobufPackage = 'kava.committee.v1beta1';

/** QueryCommitteesRequest defines the request type for querying x/committee committees. */
export interface QueryCommitteesRequest {}

/** QueryCommitteesResponse defines the response type for querying x/committee committees. */
export interface QueryCommitteesResponse {
  committees: Any[];
}

/** QueryCommitteeRequest defines the request type for querying x/committee committee. */
export interface QueryCommitteeRequest {
  committeeId: Long;
}

/** QueryCommitteeResponse defines the response type for querying x/committee committee. */
export interface QueryCommitteeResponse {
  committee?: Any;
}

/** QueryProposalsRequest defines the request type for querying x/committee proposals. */
export interface QueryProposalsRequest {
  committeeId: Long;
}

/** QueryProposalsResponse defines the response type for querying x/committee proposals. */
export interface QueryProposalsResponse {
  proposals: QueryProposalResponse[];
}

/** QueryProposalRequest defines the request type for querying x/committee proposal. */
export interface QueryProposalRequest {
  proposalId: Long;
}

/** QueryProposalResponse defines the response type for querying x/committee proposal. */
export interface QueryProposalResponse {
  pubProposal?: Any;
  id: Long;
  committeeId: Long;
  deadline?: Date;
}

/** QueryNextProposalIDRequest defines the request type for querying x/committee NextProposalID. */
export interface QueryNextProposalIDRequest {}

/** QueryNextProposalIDRequest defines the response type for querying x/committee NextProposalID. */
export interface QueryNextProposalIDResponse {
  nextProposalId: Long;
}

/** QueryVotesRequest defines the request type for querying x/committee votes. */
export interface QueryVotesRequest {
  proposalId: Long;
  pagination?: PageRequest;
}

/** QueryVotesResponse defines the response type for querying x/committee votes. */
export interface QueryVotesResponse {
  /** votes defined the queried votes. */
  votes: QueryVoteResponse[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}

/** QueryVoteRequest defines the request type for querying x/committee vote. */
export interface QueryVoteRequest {
  proposalId: Long;
  voter: string;
}

/** QueryVoteResponse defines the response type for querying x/committee vote. */
export interface QueryVoteResponse {
  proposalId: Long;
  voter: string;
  voteType: VoteType;
}

/** QueryTallyRequest defines the request type for querying x/committee tally. */
export interface QueryTallyRequest {
  proposalId: Long;
}

/** QueryTallyResponse defines the response type for querying x/committee tally. */
export interface QueryTallyResponse {
  proposalId: Long;
  yesVotes: string;
  noVotes: string;
  currentVotes: string;
  possibleVotes: string;
  voteThreshold: string;
  quorum: string;
}

/** QueryRawParamsRequest defines the request type for querying x/committee raw params. */
export interface QueryRawParamsRequest {
  subspace: string;
  key: string;
}

/** QueryRawParamsResponse defines the response type for querying x/committee raw params. */
export interface QueryRawParamsResponse {
  rawData: string;
}

function createBaseQueryCommitteesRequest(): QueryCommitteesRequest {
  return {};
}

export const QueryCommitteesRequest = {
  encode(
    _: QueryCommitteesRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryCommitteesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCommitteesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryCommitteesRequest {
    return {};
  },

  toJSON(_: QueryCommitteesRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCommitteesRequest>, I>>(
    _: I
  ): QueryCommitteesRequest {
    const message = createBaseQueryCommitteesRequest();
    return message;
  },
};

function createBaseQueryCommitteesResponse(): QueryCommitteesResponse {
  return { committees: [] };
}

export const QueryCommitteesResponse = {
  encode(
    message: QueryCommitteesResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.committees) {
      Any.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryCommitteesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCommitteesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.committees.push(Any.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryCommitteesResponse {
    return {
      committees: Array.isArray(object?.committees)
        ? object.committees.map((e: any) => Any.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryCommitteesResponse): unknown {
    const obj: any = {};
    if (message.committees) {
      obj.committees = message.committees.map((e) =>
        e ? Any.toJSON(e) : undefined
      );
    } else {
      obj.committees = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCommitteesResponse>, I>>(
    object: I
  ): QueryCommitteesResponse {
    const message = createBaseQueryCommitteesResponse();
    message.committees =
      object.committees?.map((e) => Any.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryCommitteeRequest(): QueryCommitteeRequest {
  return { committeeId: Long.UZERO };
}

export const QueryCommitteeRequest = {
  encode(
    message: QueryCommitteeRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.committeeId.isZero()) {
      writer.uint32(8).uint64(message.committeeId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryCommitteeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCommitteeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.committeeId = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryCommitteeRequest {
    return {
      committeeId: isSet(object.committeeId)
        ? Long.fromString(object.committeeId)
        : Long.UZERO,
    };
  },

  toJSON(message: QueryCommitteeRequest): unknown {
    const obj: any = {};
    message.committeeId !== undefined &&
      (obj.committeeId = (message.committeeId || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCommitteeRequest>, I>>(
    object: I
  ): QueryCommitteeRequest {
    const message = createBaseQueryCommitteeRequest();
    message.committeeId =
      object.committeeId !== undefined && object.committeeId !== null
        ? Long.fromValue(object.committeeId)
        : Long.UZERO;
    return message;
  },
};

function createBaseQueryCommitteeResponse(): QueryCommitteeResponse {
  return { committee: undefined };
}

export const QueryCommitteeResponse = {
  encode(
    message: QueryCommitteeResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.committee !== undefined) {
      Any.encode(message.committee, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryCommitteeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCommitteeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.committee = Any.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryCommitteeResponse {
    return {
      committee: isSet(object.committee)
        ? Any.fromJSON(object.committee)
        : undefined,
    };
  },

  toJSON(message: QueryCommitteeResponse): unknown {
    const obj: any = {};
    message.committee !== undefined &&
      (obj.committee = message.committee
        ? Any.toJSON(message.committee)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCommitteeResponse>, I>>(
    object: I
  ): QueryCommitteeResponse {
    const message = createBaseQueryCommitteeResponse();
    message.committee =
      object.committee !== undefined && object.committee !== null
        ? Any.fromPartial(object.committee)
        : undefined;
    return message;
  },
};

function createBaseQueryProposalsRequest(): QueryProposalsRequest {
  return { committeeId: Long.UZERO };
}

export const QueryProposalsRequest = {
  encode(
    message: QueryProposalsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.committeeId.isZero()) {
      writer.uint32(8).uint64(message.committeeId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryProposalsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProposalsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.committeeId = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryProposalsRequest {
    return {
      committeeId: isSet(object.committeeId)
        ? Long.fromString(object.committeeId)
        : Long.UZERO,
    };
  },

  toJSON(message: QueryProposalsRequest): unknown {
    const obj: any = {};
    message.committeeId !== undefined &&
      (obj.committeeId = (message.committeeId || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryProposalsRequest>, I>>(
    object: I
  ): QueryProposalsRequest {
    const message = createBaseQueryProposalsRequest();
    message.committeeId =
      object.committeeId !== undefined && object.committeeId !== null
        ? Long.fromValue(object.committeeId)
        : Long.UZERO;
    return message;
  },
};

function createBaseQueryProposalsResponse(): QueryProposalsResponse {
  return { proposals: [] };
}

export const QueryProposalsResponse = {
  encode(
    message: QueryProposalsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.proposals) {
      QueryProposalResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryProposalsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProposalsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposals.push(
            QueryProposalResponse.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryProposalsResponse {
    return {
      proposals: Array.isArray(object?.proposals)
        ? object.proposals.map((e: any) => QueryProposalResponse.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryProposalsResponse): unknown {
    const obj: any = {};
    if (message.proposals) {
      obj.proposals = message.proposals.map((e) =>
        e ? QueryProposalResponse.toJSON(e) : undefined
      );
    } else {
      obj.proposals = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryProposalsResponse>, I>>(
    object: I
  ): QueryProposalsResponse {
    const message = createBaseQueryProposalsResponse();
    message.proposals =
      object.proposals?.map((e) => QueryProposalResponse.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryProposalRequest(): QueryProposalRequest {
  return { proposalId: Long.UZERO };
}

export const QueryProposalRequest = {
  encode(
    message: QueryProposalRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.proposalId.isZero()) {
      writer.uint32(8).uint64(message.proposalId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryProposalRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProposalRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposalId = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryProposalRequest {
    return {
      proposalId: isSet(object.proposalId)
        ? Long.fromString(object.proposalId)
        : Long.UZERO,
    };
  },

  toJSON(message: QueryProposalRequest): unknown {
    const obj: any = {};
    message.proposalId !== undefined &&
      (obj.proposalId = (message.proposalId || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryProposalRequest>, I>>(
    object: I
  ): QueryProposalRequest {
    const message = createBaseQueryProposalRequest();
    message.proposalId =
      object.proposalId !== undefined && object.proposalId !== null
        ? Long.fromValue(object.proposalId)
        : Long.UZERO;
    return message;
  },
};

function createBaseQueryProposalResponse(): QueryProposalResponse {
  return {
    pubProposal: undefined,
    id: Long.UZERO,
    committeeId: Long.UZERO,
    deadline: undefined,
  };
}

export const QueryProposalResponse = {
  encode(
    message: QueryProposalResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pubProposal !== undefined) {
      Any.encode(message.pubProposal, writer.uint32(10).fork()).ldelim();
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryProposalResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProposalResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pubProposal = Any.decode(reader, reader.uint32());
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

  fromJSON(object: any): QueryProposalResponse {
    return {
      pubProposal: isSet(object.pubProposal)
        ? Any.fromJSON(object.pubProposal)
        : undefined,
      id: isSet(object.id) ? Long.fromString(object.id) : Long.UZERO,
      committeeId: isSet(object.committeeId)
        ? Long.fromString(object.committeeId)
        : Long.UZERO,
      deadline: isSet(object.deadline)
        ? fromJsonTimestamp(object.deadline)
        : undefined,
    };
  },

  toJSON(message: QueryProposalResponse): unknown {
    const obj: any = {};
    message.pubProposal !== undefined &&
      (obj.pubProposal = message.pubProposal
        ? Any.toJSON(message.pubProposal)
        : undefined);
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    message.committeeId !== undefined &&
      (obj.committeeId = (message.committeeId || Long.UZERO).toString());
    message.deadline !== undefined &&
      (obj.deadline = message.deadline.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryProposalResponse>, I>>(
    object: I
  ): QueryProposalResponse {
    const message = createBaseQueryProposalResponse();
    message.pubProposal =
      object.pubProposal !== undefined && object.pubProposal !== null
        ? Any.fromPartial(object.pubProposal)
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

function createBaseQueryNextProposalIDRequest(): QueryNextProposalIDRequest {
  return {};
}

export const QueryNextProposalIDRequest = {
  encode(
    _: QueryNextProposalIDRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryNextProposalIDRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNextProposalIDRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryNextProposalIDRequest {
    return {};
  },

  toJSON(_: QueryNextProposalIDRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryNextProposalIDRequest>, I>>(
    _: I
  ): QueryNextProposalIDRequest {
    const message = createBaseQueryNextProposalIDRequest();
    return message;
  },
};

function createBaseQueryNextProposalIDResponse(): QueryNextProposalIDResponse {
  return { nextProposalId: Long.UZERO };
}

export const QueryNextProposalIDResponse = {
  encode(
    message: QueryNextProposalIDResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.nextProposalId.isZero()) {
      writer.uint32(8).uint64(message.nextProposalId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryNextProposalIDResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNextProposalIDResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nextProposalId = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryNextProposalIDResponse {
    return {
      nextProposalId: isSet(object.nextProposalId)
        ? Long.fromString(object.nextProposalId)
        : Long.UZERO,
    };
  },

  toJSON(message: QueryNextProposalIDResponse): unknown {
    const obj: any = {};
    message.nextProposalId !== undefined &&
      (obj.nextProposalId = (message.nextProposalId || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryNextProposalIDResponse>, I>>(
    object: I
  ): QueryNextProposalIDResponse {
    const message = createBaseQueryNextProposalIDResponse();
    message.nextProposalId =
      object.nextProposalId !== undefined && object.nextProposalId !== null
        ? Long.fromValue(object.nextProposalId)
        : Long.UZERO;
    return message;
  },
};

function createBaseQueryVotesRequest(): QueryVotesRequest {
  return { proposalId: Long.UZERO, pagination: undefined };
}

export const QueryVotesRequest = {
  encode(
    message: QueryVotesRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.proposalId.isZero()) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryVotesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryVotesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposalId = reader.uint64() as Long;
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryVotesRequest {
    return {
      proposalId: isSet(object.proposalId)
        ? Long.fromString(object.proposalId)
        : Long.UZERO,
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryVotesRequest): unknown {
    const obj: any = {};
    message.proposalId !== undefined &&
      (obj.proposalId = (message.proposalId || Long.UZERO).toString());
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryVotesRequest>, I>>(
    object: I
  ): QueryVotesRequest {
    const message = createBaseQueryVotesRequest();
    message.proposalId =
      object.proposalId !== undefined && object.proposalId !== null
        ? Long.fromValue(object.proposalId)
        : Long.UZERO;
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryVotesResponse(): QueryVotesResponse {
  return { votes: [], pagination: undefined };
}

export const QueryVotesResponse = {
  encode(
    message: QueryVotesResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.votes) {
      QueryVoteResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryVotesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryVotesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.votes.push(QueryVoteResponse.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryVotesResponse {
    return {
      votes: Array.isArray(object?.votes)
        ? object.votes.map((e: any) => QueryVoteResponse.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryVotesResponse): unknown {
    const obj: any = {};
    if (message.votes) {
      obj.votes = message.votes.map((e) =>
        e ? QueryVoteResponse.toJSON(e) : undefined
      );
    } else {
      obj.votes = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryVotesResponse>, I>>(
    object: I
  ): QueryVotesResponse {
    const message = createBaseQueryVotesResponse();
    message.votes =
      object.votes?.map((e) => QueryVoteResponse.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryVoteRequest(): QueryVoteRequest {
  return { proposalId: Long.UZERO, voter: '' };
}

export const QueryVoteRequest = {
  encode(
    message: QueryVoteRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.proposalId.isZero()) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.voter !== '') {
      writer.uint32(18).string(message.voter);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryVoteRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryVoteRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposalId = reader.uint64() as Long;
          break;
        case 2:
          message.voter = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryVoteRequest {
    return {
      proposalId: isSet(object.proposalId)
        ? Long.fromString(object.proposalId)
        : Long.UZERO,
      voter: isSet(object.voter) ? String(object.voter) : '',
    };
  },

  toJSON(message: QueryVoteRequest): unknown {
    const obj: any = {};
    message.proposalId !== undefined &&
      (obj.proposalId = (message.proposalId || Long.UZERO).toString());
    message.voter !== undefined && (obj.voter = message.voter);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryVoteRequest>, I>>(
    object: I
  ): QueryVoteRequest {
    const message = createBaseQueryVoteRequest();
    message.proposalId =
      object.proposalId !== undefined && object.proposalId !== null
        ? Long.fromValue(object.proposalId)
        : Long.UZERO;
    message.voter = object.voter ?? '';
    return message;
  },
};

function createBaseQueryVoteResponse(): QueryVoteResponse {
  return { proposalId: Long.UZERO, voter: '', voteType: 0 };
}

export const QueryVoteResponse = {
  encode(
    message: QueryVoteResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.proposalId.isZero()) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.voter !== '') {
      writer.uint32(18).string(message.voter);
    }
    if (message.voteType !== 0) {
      writer.uint32(24).int32(message.voteType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryVoteResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryVoteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposalId = reader.uint64() as Long;
          break;
        case 2:
          message.voter = reader.string();
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

  fromJSON(object: any): QueryVoteResponse {
    return {
      proposalId: isSet(object.proposalId)
        ? Long.fromString(object.proposalId)
        : Long.UZERO,
      voter: isSet(object.voter) ? String(object.voter) : '',
      voteType: isSet(object.voteType) ? voteTypeFromJSON(object.voteType) : 0,
    };
  },

  toJSON(message: QueryVoteResponse): unknown {
    const obj: any = {};
    message.proposalId !== undefined &&
      (obj.proposalId = (message.proposalId || Long.UZERO).toString());
    message.voter !== undefined && (obj.voter = message.voter);
    message.voteType !== undefined &&
      (obj.voteType = voteTypeToJSON(message.voteType));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryVoteResponse>, I>>(
    object: I
  ): QueryVoteResponse {
    const message = createBaseQueryVoteResponse();
    message.proposalId =
      object.proposalId !== undefined && object.proposalId !== null
        ? Long.fromValue(object.proposalId)
        : Long.UZERO;
    message.voter = object.voter ?? '';
    message.voteType = object.voteType ?? 0;
    return message;
  },
};

function createBaseQueryTallyRequest(): QueryTallyRequest {
  return { proposalId: Long.UZERO };
}

export const QueryTallyRequest = {
  encode(
    message: QueryTallyRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.proposalId.isZero()) {
      writer.uint32(8).uint64(message.proposalId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTallyRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTallyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposalId = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryTallyRequest {
    return {
      proposalId: isSet(object.proposalId)
        ? Long.fromString(object.proposalId)
        : Long.UZERO,
    };
  },

  toJSON(message: QueryTallyRequest): unknown {
    const obj: any = {};
    message.proposalId !== undefined &&
      (obj.proposalId = (message.proposalId || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryTallyRequest>, I>>(
    object: I
  ): QueryTallyRequest {
    const message = createBaseQueryTallyRequest();
    message.proposalId =
      object.proposalId !== undefined && object.proposalId !== null
        ? Long.fromValue(object.proposalId)
        : Long.UZERO;
    return message;
  },
};

function createBaseQueryTallyResponse(): QueryTallyResponse {
  return {
    proposalId: Long.UZERO,
    yesVotes: '',
    noVotes: '',
    currentVotes: '',
    possibleVotes: '',
    voteThreshold: '',
    quorum: '',
  };
}

export const QueryTallyResponse = {
  encode(
    message: QueryTallyResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.proposalId.isZero()) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.yesVotes !== '') {
      writer.uint32(18).string(message.yesVotes);
    }
    if (message.noVotes !== '') {
      writer.uint32(26).string(message.noVotes);
    }
    if (message.currentVotes !== '') {
      writer.uint32(34).string(message.currentVotes);
    }
    if (message.possibleVotes !== '') {
      writer.uint32(42).string(message.possibleVotes);
    }
    if (message.voteThreshold !== '') {
      writer.uint32(50).string(message.voteThreshold);
    }
    if (message.quorum !== '') {
      writer.uint32(58).string(message.quorum);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTallyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTallyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposalId = reader.uint64() as Long;
          break;
        case 2:
          message.yesVotes = reader.string();
          break;
        case 3:
          message.noVotes = reader.string();
          break;
        case 4:
          message.currentVotes = reader.string();
          break;
        case 5:
          message.possibleVotes = reader.string();
          break;
        case 6:
          message.voteThreshold = reader.string();
          break;
        case 7:
          message.quorum = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryTallyResponse {
    return {
      proposalId: isSet(object.proposalId)
        ? Long.fromString(object.proposalId)
        : Long.UZERO,
      yesVotes: isSet(object.yesVotes) ? String(object.yesVotes) : '',
      noVotes: isSet(object.noVotes) ? String(object.noVotes) : '',
      currentVotes: isSet(object.currentVotes)
        ? String(object.currentVotes)
        : '',
      possibleVotes: isSet(object.possibleVotes)
        ? String(object.possibleVotes)
        : '',
      voteThreshold: isSet(object.voteThreshold)
        ? String(object.voteThreshold)
        : '',
      quorum: isSet(object.quorum) ? String(object.quorum) : '',
    };
  },

  toJSON(message: QueryTallyResponse): unknown {
    const obj: any = {};
    message.proposalId !== undefined &&
      (obj.proposalId = (message.proposalId || Long.UZERO).toString());
    message.yesVotes !== undefined && (obj.yesVotes = message.yesVotes);
    message.noVotes !== undefined && (obj.noVotes = message.noVotes);
    message.currentVotes !== undefined &&
      (obj.currentVotes = message.currentVotes);
    message.possibleVotes !== undefined &&
      (obj.possibleVotes = message.possibleVotes);
    message.voteThreshold !== undefined &&
      (obj.voteThreshold = message.voteThreshold);
    message.quorum !== undefined && (obj.quorum = message.quorum);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryTallyResponse>, I>>(
    object: I
  ): QueryTallyResponse {
    const message = createBaseQueryTallyResponse();
    message.proposalId =
      object.proposalId !== undefined && object.proposalId !== null
        ? Long.fromValue(object.proposalId)
        : Long.UZERO;
    message.yesVotes = object.yesVotes ?? '';
    message.noVotes = object.noVotes ?? '';
    message.currentVotes = object.currentVotes ?? '';
    message.possibleVotes = object.possibleVotes ?? '';
    message.voteThreshold = object.voteThreshold ?? '';
    message.quorum = object.quorum ?? '';
    return message;
  },
};

function createBaseQueryRawParamsRequest(): QueryRawParamsRequest {
  return { subspace: '', key: '' };
}

export const QueryRawParamsRequest = {
  encode(
    message: QueryRawParamsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.subspace !== '') {
      writer.uint32(10).string(message.subspace);
    }
    if (message.key !== '') {
      writer.uint32(18).string(message.key);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryRawParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRawParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.subspace = reader.string();
          break;
        case 2:
          message.key = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryRawParamsRequest {
    return {
      subspace: isSet(object.subspace) ? String(object.subspace) : '',
      key: isSet(object.key) ? String(object.key) : '',
    };
  },

  toJSON(message: QueryRawParamsRequest): unknown {
    const obj: any = {};
    message.subspace !== undefined && (obj.subspace = message.subspace);
    message.key !== undefined && (obj.key = message.key);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryRawParamsRequest>, I>>(
    object: I
  ): QueryRawParamsRequest {
    const message = createBaseQueryRawParamsRequest();
    message.subspace = object.subspace ?? '';
    message.key = object.key ?? '';
    return message;
  },
};

function createBaseQueryRawParamsResponse(): QueryRawParamsResponse {
  return { rawData: '' };
}

export const QueryRawParamsResponse = {
  encode(
    message: QueryRawParamsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.rawData !== '') {
      writer.uint32(10).string(message.rawData);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryRawParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRawParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rawData = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryRawParamsResponse {
    return {
      rawData: isSet(object.rawData) ? String(object.rawData) : '',
    };
  },

  toJSON(message: QueryRawParamsResponse): unknown {
    const obj: any = {};
    message.rawData !== undefined && (obj.rawData = message.rawData);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryRawParamsResponse>, I>>(
    object: I
  ): QueryRawParamsResponse {
    const message = createBaseQueryRawParamsResponse();
    message.rawData = object.rawData ?? '';
    return message;
  },
};

/** Query defines the gRPC querier service for committee module */
export interface Query {
  /** Committees queries all committess of the committee module. */
  Committees(request: QueryCommitteesRequest): Promise<QueryCommitteesResponse>;
  /** Committee queries a committee based on committee ID. */
  Committee(request: QueryCommitteeRequest): Promise<QueryCommitteeResponse>;
  /** Proposals queries proposals based on committee ID. */
  Proposals(request: QueryProposalsRequest): Promise<QueryProposalsResponse>;
  /** Deposits queries a proposal based on proposal ID. */
  Proposal(request: QueryProposalRequest): Promise<QueryProposalResponse>;
  /** NextProposalID queries the next proposal ID of the committee module. */
  NextProposalID(
    request: QueryNextProposalIDRequest
  ): Promise<QueryNextProposalIDResponse>;
  /** Votes queries all votes for a single proposal ID. */
  Votes(request: QueryVotesRequest): Promise<QueryVotesResponse>;
  /** Vote queries the vote of a single voter for a single proposal ID. */
  Vote(request: QueryVoteRequest): Promise<QueryVoteResponse>;
  /** Tally queries the tally of a single proposal ID. */
  Tally(request: QueryTallyRequest): Promise<QueryTallyResponse>;
  /** RawParams queries the raw params data of any subspace and key. */
  RawParams(request: QueryRawParamsRequest): Promise<QueryRawParamsResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Committees = this.Committees.bind(this);
    this.Committee = this.Committee.bind(this);
    this.Proposals = this.Proposals.bind(this);
    this.Proposal = this.Proposal.bind(this);
    this.NextProposalID = this.NextProposalID.bind(this);
    this.Votes = this.Votes.bind(this);
    this.Vote = this.Vote.bind(this);
    this.Tally = this.Tally.bind(this);
    this.RawParams = this.RawParams.bind(this);
  }
  Committees(
    request: QueryCommitteesRequest
  ): Promise<QueryCommitteesResponse> {
    const data = QueryCommitteesRequest.encode(request).finish();
    const promise = this.rpc.request(
      'kava.committee.v1beta1.Query',
      'Committees',
      data
    );
    return promise.then((data) =>
      QueryCommitteesResponse.decode(new _m0.Reader(data))
    );
  }

  Committee(request: QueryCommitteeRequest): Promise<QueryCommitteeResponse> {
    const data = QueryCommitteeRequest.encode(request).finish();
    const promise = this.rpc.request(
      'kava.committee.v1beta1.Query',
      'Committee',
      data
    );
    return promise.then((data) =>
      QueryCommitteeResponse.decode(new _m0.Reader(data))
    );
  }

  Proposals(request: QueryProposalsRequest): Promise<QueryProposalsResponse> {
    const data = QueryProposalsRequest.encode(request).finish();
    const promise = this.rpc.request(
      'kava.committee.v1beta1.Query',
      'Proposals',
      data
    );
    return promise.then((data) =>
      QueryProposalsResponse.decode(new _m0.Reader(data))
    );
  }

  Proposal(request: QueryProposalRequest): Promise<QueryProposalResponse> {
    const data = QueryProposalRequest.encode(request).finish();
    const promise = this.rpc.request(
      'kava.committee.v1beta1.Query',
      'Proposal',
      data
    );
    return promise.then((data) =>
      QueryProposalResponse.decode(new _m0.Reader(data))
    );
  }

  NextProposalID(
    request: QueryNextProposalIDRequest
  ): Promise<QueryNextProposalIDResponse> {
    const data = QueryNextProposalIDRequest.encode(request).finish();
    const promise = this.rpc.request(
      'kava.committee.v1beta1.Query',
      'NextProposalID',
      data
    );
    return promise.then((data) =>
      QueryNextProposalIDResponse.decode(new _m0.Reader(data))
    );
  }

  Votes(request: QueryVotesRequest): Promise<QueryVotesResponse> {
    const data = QueryVotesRequest.encode(request).finish();
    const promise = this.rpc.request(
      'kava.committee.v1beta1.Query',
      'Votes',
      data
    );
    return promise.then((data) =>
      QueryVotesResponse.decode(new _m0.Reader(data))
    );
  }

  Vote(request: QueryVoteRequest): Promise<QueryVoteResponse> {
    const data = QueryVoteRequest.encode(request).finish();
    const promise = this.rpc.request(
      'kava.committee.v1beta1.Query',
      'Vote',
      data
    );
    return promise.then((data) =>
      QueryVoteResponse.decode(new _m0.Reader(data))
    );
  }

  Tally(request: QueryTallyRequest): Promise<QueryTallyResponse> {
    const data = QueryTallyRequest.encode(request).finish();
    const promise = this.rpc.request(
      'kava.committee.v1beta1.Query',
      'Tally',
      data
    );
    return promise.then((data) =>
      QueryTallyResponse.decode(new _m0.Reader(data))
    );
  }

  RawParams(request: QueryRawParamsRequest): Promise<QueryRawParamsResponse> {
    const data = QueryRawParamsRequest.encode(request).finish();
    const promise = this.rpc.request(
      'kava.committee.v1beta1.Query',
      'RawParams',
      data
    );
    return promise.then((data) =>
      QueryRawParamsResponse.decode(new _m0.Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
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
