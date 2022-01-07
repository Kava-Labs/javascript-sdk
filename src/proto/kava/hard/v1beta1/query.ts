/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Params } from '../../../kava/hard/v1beta1/hard';
import {
  PageRequest,
  PageResponse,
} from '../../../cosmos/base/query/v1beta1/pagination';
import { ModuleAccount } from '../../../cosmos/auth/v1beta1/auth';
import { Coin } from '../../../cosmos/base/v1beta1/coin';

export const protobufPackage = 'kava.hard.v1beta1';

/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  params?: Params;
}

/** QueryAccountsRequest is the request type for the Query/Accounts RPC method. */
export interface QueryAccountsRequest {}

/** QueryAccountsResponse is the response type for the Query/Accounts RPC method. */
export interface QueryAccountsResponse {
  accounts: ModuleAccount[];
}

/** QueryDepositsRequest is the request type for the Query/Deposits RPC method. */
export interface QueryDepositsRequest {
  denom: string;
  owner: string;
  pagination?: PageRequest;
}

/** QueryDepositsResponse is the response type for the Query/Deposits RPC method. */
export interface QueryDepositsResponse {
  deposits: DepositResponse[];
  pagination?: PageResponse;
}

/** QueryUnsyncedDepositsRequest is the request type for the Query/UnsyncedDeposits RPC method. */
export interface QueryUnsyncedDepositsRequest {
  denom: string;
  owner: string;
  pagination?: PageRequest;
}

/** QueryUnsyncedDepositsResponse is the response type for the Query/UnsyncedDeposits RPC method. */
export interface QueryUnsyncedDepositsResponse {
  deposits: DepositResponse[];
  pagination?: PageResponse;
}

/** QueryTotalDepositedRequest is the request type for the Query/TotalDeposited RPC method. */
export interface QueryTotalDepositedRequest {
  denom: string;
}

/** QueryTotalDepositedResponse is the response type for the Query/TotalDeposited RPC method. */
export interface QueryTotalDepositedResponse {
  suppliedCoins: Coin[];
}

/** QueryBorrowsRequest is the request type for the Query/Borrows RPC method. */
export interface QueryBorrowsRequest {
  denom: string;
  owner: string;
  pagination?: PageRequest;
}

/** QueryBorrowsResponse is the response type for the Query/Borrows RPC method. */
export interface QueryBorrowsResponse {
  borrows: BorrowResponse[];
  pagination?: PageResponse;
}

/** QueryUnsyncedBorrowsRequest is the request type for the Query/UnsyncedBorrows RPC method. */
export interface QueryUnsyncedBorrowsRequest {
  denom: string;
  owner: string;
  pagination?: PageRequest;
}

/** QueryUnsyncedBorrowsResponse is the response type for the Query/UnsyncedBorrows RPC method. */
export interface QueryUnsyncedBorrowsResponse {
  borrows: BorrowResponse[];
  pagination?: PageResponse;
}

/** QueryTotalBorrowedRequest is the request type for the Query/TotalBorrowed RPC method. */
export interface QueryTotalBorrowedRequest {
  denom: string;
}

/** QueryTotalBorrowedResponse is the response type for the Query/TotalBorrowed RPC method. */
export interface QueryTotalBorrowedResponse {
  borrowedCoins: Coin[];
}

/** QueryInterestRateRequest is the request type for the Query/InterestRate RPC method. */
export interface QueryInterestRateRequest {
  denom: string;
}

/** QueryInterestRateResponse is the response type for the Query/InterestRate RPC method. */
export interface QueryInterestRateResponse {
  interestRates: MoneyMarketInterestRate[];
}

/** QueryReservesRequest is the request type for the Query/Reserves RPC method. */
export interface QueryReservesRequest {
  denom: string;
}

/** QueryReservesResponse is the response type for the Query/Reserves RPC method. */
export interface QueryReservesResponse {
  amount: Coin[];
}

/** QueryInterestFactorsRequest is the request type for the Query/InterestFactors RPC method. */
export interface QueryInterestFactorsRequest {
  denom: string;
}

/** QueryInterestFactorsResponse is the response type for the Query/InterestFactors RPC method. */
export interface QueryInterestFactorsResponse {
  interestFactors: InterestFactor[];
}

/** DepositResponse defines an amount of coins deposited into a hard module account. */
export interface DepositResponse {
  depositor: string;
  amount: Coin[];
  index: SupplyInterestFactorResponse[];
}

/** SupplyInterestFactorResponse defines an individual borrow interest factor. */
export interface SupplyInterestFactorResponse {
  denom: string;
  /** sdk.Dec as string */
  value: string;
}

/** BorrowResponse defines an amount of coins borrowed from a hard module account. */
export interface BorrowResponse {
  borrower: string;
  amount: Coin[];
  index: BorrowInterestFactorResponse[];
}

/** BorrowInterestFactorResponse defines an individual borrow interest factor. */
export interface BorrowInterestFactorResponse {
  denom: string;
  /** sdk.Dec as string */
  value: string;
}

/** MoneyMarketInterestRate is a unique type returned by interest rate queries */
export interface MoneyMarketInterestRate {
  denom: string;
  /** sdk.Dec as String */
  supplyInterestRate: string;
  /** sdk.Dec as String */
  borrowInterestRate: string;
}

/** InterestFactor is a unique type returned by interest factor queries */
export interface InterestFactor {
  denom: string;
  /** sdk.Dec as String */
  borrowInterestFactor: string;
  /** sdk.Dec as String */
  supplyInterestFactor: string;
}

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(
    _: QueryParamsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(
    _: I
  ): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(
    message: QueryParamsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(
    object: I
  ): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    return message;
  },
};

function createBaseQueryAccountsRequest(): QueryAccountsRequest {
  return {};
}

export const QueryAccountsRequest = {
  encode(
    _: QueryAccountsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAccountsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountsRequest();
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

  fromJSON(_: any): QueryAccountsRequest {
    return {};
  },

  toJSON(_: QueryAccountsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAccountsRequest>, I>>(
    _: I
  ): QueryAccountsRequest {
    const message = createBaseQueryAccountsRequest();
    return message;
  },
};

function createBaseQueryAccountsResponse(): QueryAccountsResponse {
  return { accounts: [] };
}

export const QueryAccountsResponse = {
  encode(
    message: QueryAccountsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.accounts) {
      ModuleAccount.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAccountsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accounts.push(ModuleAccount.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAccountsResponse {
    return {
      accounts: Array.isArray(object?.accounts)
        ? object.accounts.map((e: any) => ModuleAccount.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryAccountsResponse): unknown {
    const obj: any = {};
    if (message.accounts) {
      obj.accounts = message.accounts.map((e) =>
        e ? ModuleAccount.toJSON(e) : undefined
      );
    } else {
      obj.accounts = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAccountsResponse>, I>>(
    object: I
  ): QueryAccountsResponse {
    const message = createBaseQueryAccountsResponse();
    message.accounts =
      object.accounts?.map((e) => ModuleAccount.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryDepositsRequest(): QueryDepositsRequest {
  return { denom: '', owner: '', pagination: undefined };
}

export const QueryDepositsRequest = {
  encode(
    message: QueryDepositsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.denom !== '') {
      writer.uint32(10).string(message.denom);
    }
    if (message.owner !== '') {
      writer.uint32(18).string(message.owner);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryDepositsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDepositsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.owner = reader.string();
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDepositsRequest {
    return {
      denom: isSet(object.denom) ? String(object.denom) : '',
      owner: isSet(object.owner) ? String(object.owner) : '',
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryDepositsRequest): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    message.owner !== undefined && (obj.owner = message.owner);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDepositsRequest>, I>>(
    object: I
  ): QueryDepositsRequest {
    const message = createBaseQueryDepositsRequest();
    message.denom = object.denom ?? '';
    message.owner = object.owner ?? '';
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryDepositsResponse(): QueryDepositsResponse {
  return { deposits: [], pagination: undefined };
}

export const QueryDepositsResponse = {
  encode(
    message: QueryDepositsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.deposits) {
      DepositResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryDepositsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDepositsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.deposits.push(
            DepositResponse.decode(reader, reader.uint32())
          );
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

  fromJSON(object: any): QueryDepositsResponse {
    return {
      deposits: Array.isArray(object?.deposits)
        ? object.deposits.map((e: any) => DepositResponse.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryDepositsResponse): unknown {
    const obj: any = {};
    if (message.deposits) {
      obj.deposits = message.deposits.map((e) =>
        e ? DepositResponse.toJSON(e) : undefined
      );
    } else {
      obj.deposits = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDepositsResponse>, I>>(
    object: I
  ): QueryDepositsResponse {
    const message = createBaseQueryDepositsResponse();
    message.deposits =
      object.deposits?.map((e) => DepositResponse.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryUnsyncedDepositsRequest(): QueryUnsyncedDepositsRequest {
  return { denom: '', owner: '', pagination: undefined };
}

export const QueryUnsyncedDepositsRequest = {
  encode(
    message: QueryUnsyncedDepositsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.denom !== '') {
      writer.uint32(10).string(message.denom);
    }
    if (message.owner !== '') {
      writer.uint32(18).string(message.owner);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryUnsyncedDepositsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUnsyncedDepositsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.owner = reader.string();
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryUnsyncedDepositsRequest {
    return {
      denom: isSet(object.denom) ? String(object.denom) : '',
      owner: isSet(object.owner) ? String(object.owner) : '',
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryUnsyncedDepositsRequest): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    message.owner !== undefined && (obj.owner = message.owner);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryUnsyncedDepositsRequest>, I>>(
    object: I
  ): QueryUnsyncedDepositsRequest {
    const message = createBaseQueryUnsyncedDepositsRequest();
    message.denom = object.denom ?? '';
    message.owner = object.owner ?? '';
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryUnsyncedDepositsResponse(): QueryUnsyncedDepositsResponse {
  return { deposits: [], pagination: undefined };
}

export const QueryUnsyncedDepositsResponse = {
  encode(
    message: QueryUnsyncedDepositsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.deposits) {
      DepositResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryUnsyncedDepositsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUnsyncedDepositsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.deposits.push(
            DepositResponse.decode(reader, reader.uint32())
          );
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

  fromJSON(object: any): QueryUnsyncedDepositsResponse {
    return {
      deposits: Array.isArray(object?.deposits)
        ? object.deposits.map((e: any) => DepositResponse.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryUnsyncedDepositsResponse): unknown {
    const obj: any = {};
    if (message.deposits) {
      obj.deposits = message.deposits.map((e) =>
        e ? DepositResponse.toJSON(e) : undefined
      );
    } else {
      obj.deposits = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryUnsyncedDepositsResponse>, I>>(
    object: I
  ): QueryUnsyncedDepositsResponse {
    const message = createBaseQueryUnsyncedDepositsResponse();
    message.deposits =
      object.deposits?.map((e) => DepositResponse.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryTotalDepositedRequest(): QueryTotalDepositedRequest {
  return { denom: '' };
}

export const QueryTotalDepositedRequest = {
  encode(
    message: QueryTotalDepositedRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.denom !== '') {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryTotalDepositedRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalDepositedRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryTotalDepositedRequest {
    return {
      denom: isSet(object.denom) ? String(object.denom) : '',
    };
  },

  toJSON(message: QueryTotalDepositedRequest): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryTotalDepositedRequest>, I>>(
    object: I
  ): QueryTotalDepositedRequest {
    const message = createBaseQueryTotalDepositedRequest();
    message.denom = object.denom ?? '';
    return message;
  },
};

function createBaseQueryTotalDepositedResponse(): QueryTotalDepositedResponse {
  return { suppliedCoins: [] };
}

export const QueryTotalDepositedResponse = {
  encode(
    message: QueryTotalDepositedResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.suppliedCoins) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryTotalDepositedResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalDepositedResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.suppliedCoins.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryTotalDepositedResponse {
    return {
      suppliedCoins: Array.isArray(object?.suppliedCoins)
        ? object.suppliedCoins.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryTotalDepositedResponse): unknown {
    const obj: any = {};
    if (message.suppliedCoins) {
      obj.suppliedCoins = message.suppliedCoins.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.suppliedCoins = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryTotalDepositedResponse>, I>>(
    object: I
  ): QueryTotalDepositedResponse {
    const message = createBaseQueryTotalDepositedResponse();
    message.suppliedCoins =
      object.suppliedCoins?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryBorrowsRequest(): QueryBorrowsRequest {
  return { denom: '', owner: '', pagination: undefined };
}

export const QueryBorrowsRequest = {
  encode(
    message: QueryBorrowsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.denom !== '') {
      writer.uint32(10).string(message.denom);
    }
    if (message.owner !== '') {
      writer.uint32(18).string(message.owner);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryBorrowsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBorrowsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.owner = reader.string();
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryBorrowsRequest {
    return {
      denom: isSet(object.denom) ? String(object.denom) : '',
      owner: isSet(object.owner) ? String(object.owner) : '',
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryBorrowsRequest): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    message.owner !== undefined && (obj.owner = message.owner);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryBorrowsRequest>, I>>(
    object: I
  ): QueryBorrowsRequest {
    const message = createBaseQueryBorrowsRequest();
    message.denom = object.denom ?? '';
    message.owner = object.owner ?? '';
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryBorrowsResponse(): QueryBorrowsResponse {
  return { borrows: [], pagination: undefined };
}

export const QueryBorrowsResponse = {
  encode(
    message: QueryBorrowsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.borrows) {
      BorrowResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryBorrowsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBorrowsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.borrows.push(BorrowResponse.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryBorrowsResponse {
    return {
      borrows: Array.isArray(object?.borrows)
        ? object.borrows.map((e: any) => BorrowResponse.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryBorrowsResponse): unknown {
    const obj: any = {};
    if (message.borrows) {
      obj.borrows = message.borrows.map((e) =>
        e ? BorrowResponse.toJSON(e) : undefined
      );
    } else {
      obj.borrows = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryBorrowsResponse>, I>>(
    object: I
  ): QueryBorrowsResponse {
    const message = createBaseQueryBorrowsResponse();
    message.borrows =
      object.borrows?.map((e) => BorrowResponse.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryUnsyncedBorrowsRequest(): QueryUnsyncedBorrowsRequest {
  return { denom: '', owner: '', pagination: undefined };
}

export const QueryUnsyncedBorrowsRequest = {
  encode(
    message: QueryUnsyncedBorrowsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.denom !== '') {
      writer.uint32(10).string(message.denom);
    }
    if (message.owner !== '') {
      writer.uint32(18).string(message.owner);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryUnsyncedBorrowsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUnsyncedBorrowsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.owner = reader.string();
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryUnsyncedBorrowsRequest {
    return {
      denom: isSet(object.denom) ? String(object.denom) : '',
      owner: isSet(object.owner) ? String(object.owner) : '',
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryUnsyncedBorrowsRequest): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    message.owner !== undefined && (obj.owner = message.owner);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryUnsyncedBorrowsRequest>, I>>(
    object: I
  ): QueryUnsyncedBorrowsRequest {
    const message = createBaseQueryUnsyncedBorrowsRequest();
    message.denom = object.denom ?? '';
    message.owner = object.owner ?? '';
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryUnsyncedBorrowsResponse(): QueryUnsyncedBorrowsResponse {
  return { borrows: [], pagination: undefined };
}

export const QueryUnsyncedBorrowsResponse = {
  encode(
    message: QueryUnsyncedBorrowsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.borrows) {
      BorrowResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryUnsyncedBorrowsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUnsyncedBorrowsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.borrows.push(BorrowResponse.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryUnsyncedBorrowsResponse {
    return {
      borrows: Array.isArray(object?.borrows)
        ? object.borrows.map((e: any) => BorrowResponse.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryUnsyncedBorrowsResponse): unknown {
    const obj: any = {};
    if (message.borrows) {
      obj.borrows = message.borrows.map((e) =>
        e ? BorrowResponse.toJSON(e) : undefined
      );
    } else {
      obj.borrows = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryUnsyncedBorrowsResponse>, I>>(
    object: I
  ): QueryUnsyncedBorrowsResponse {
    const message = createBaseQueryUnsyncedBorrowsResponse();
    message.borrows =
      object.borrows?.map((e) => BorrowResponse.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryTotalBorrowedRequest(): QueryTotalBorrowedRequest {
  return { denom: '' };
}

export const QueryTotalBorrowedRequest = {
  encode(
    message: QueryTotalBorrowedRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.denom !== '') {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryTotalBorrowedRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalBorrowedRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryTotalBorrowedRequest {
    return {
      denom: isSet(object.denom) ? String(object.denom) : '',
    };
  },

  toJSON(message: QueryTotalBorrowedRequest): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryTotalBorrowedRequest>, I>>(
    object: I
  ): QueryTotalBorrowedRequest {
    const message = createBaseQueryTotalBorrowedRequest();
    message.denom = object.denom ?? '';
    return message;
  },
};

function createBaseQueryTotalBorrowedResponse(): QueryTotalBorrowedResponse {
  return { borrowedCoins: [] };
}

export const QueryTotalBorrowedResponse = {
  encode(
    message: QueryTotalBorrowedResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.borrowedCoins) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryTotalBorrowedResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalBorrowedResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.borrowedCoins.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryTotalBorrowedResponse {
    return {
      borrowedCoins: Array.isArray(object?.borrowedCoins)
        ? object.borrowedCoins.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryTotalBorrowedResponse): unknown {
    const obj: any = {};
    if (message.borrowedCoins) {
      obj.borrowedCoins = message.borrowedCoins.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.borrowedCoins = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryTotalBorrowedResponse>, I>>(
    object: I
  ): QueryTotalBorrowedResponse {
    const message = createBaseQueryTotalBorrowedResponse();
    message.borrowedCoins =
      object.borrowedCoins?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryInterestRateRequest(): QueryInterestRateRequest {
  return { denom: '' };
}

export const QueryInterestRateRequest = {
  encode(
    message: QueryInterestRateRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.denom !== '') {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryInterestRateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryInterestRateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryInterestRateRequest {
    return {
      denom: isSet(object.denom) ? String(object.denom) : '',
    };
  },

  toJSON(message: QueryInterestRateRequest): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryInterestRateRequest>, I>>(
    object: I
  ): QueryInterestRateRequest {
    const message = createBaseQueryInterestRateRequest();
    message.denom = object.denom ?? '';
    return message;
  },
};

function createBaseQueryInterestRateResponse(): QueryInterestRateResponse {
  return { interestRates: [] };
}

export const QueryInterestRateResponse = {
  encode(
    message: QueryInterestRateResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.interestRates) {
      MoneyMarketInterestRate.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryInterestRateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryInterestRateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.interestRates.push(
            MoneyMarketInterestRate.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryInterestRateResponse {
    return {
      interestRates: Array.isArray(object?.interestRates)
        ? object.interestRates.map((e: any) =>
            MoneyMarketInterestRate.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: QueryInterestRateResponse): unknown {
    const obj: any = {};
    if (message.interestRates) {
      obj.interestRates = message.interestRates.map((e) =>
        e ? MoneyMarketInterestRate.toJSON(e) : undefined
      );
    } else {
      obj.interestRates = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryInterestRateResponse>, I>>(
    object: I
  ): QueryInterestRateResponse {
    const message = createBaseQueryInterestRateResponse();
    message.interestRates =
      object.interestRates?.map((e) =>
        MoneyMarketInterestRate.fromPartial(e)
      ) || [];
    return message;
  },
};

function createBaseQueryReservesRequest(): QueryReservesRequest {
  return { denom: '' };
}

export const QueryReservesRequest = {
  encode(
    message: QueryReservesRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.denom !== '') {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryReservesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryReservesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryReservesRequest {
    return {
      denom: isSet(object.denom) ? String(object.denom) : '',
    };
  },

  toJSON(message: QueryReservesRequest): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryReservesRequest>, I>>(
    object: I
  ): QueryReservesRequest {
    const message = createBaseQueryReservesRequest();
    message.denom = object.denom ?? '';
    return message;
  },
};

function createBaseQueryReservesResponse(): QueryReservesResponse {
  return { amount: [] };
}

export const QueryReservesResponse = {
  encode(
    message: QueryReservesResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryReservesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryReservesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.amount.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryReservesResponse {
    return {
      amount: Array.isArray(object?.amount)
        ? object.amount.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryReservesResponse): unknown {
    const obj: any = {};
    if (message.amount) {
      obj.amount = message.amount.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.amount = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryReservesResponse>, I>>(
    object: I
  ): QueryReservesResponse {
    const message = createBaseQueryReservesResponse();
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryInterestFactorsRequest(): QueryInterestFactorsRequest {
  return { denom: '' };
}

export const QueryInterestFactorsRequest = {
  encode(
    message: QueryInterestFactorsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.denom !== '') {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryInterestFactorsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryInterestFactorsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryInterestFactorsRequest {
    return {
      denom: isSet(object.denom) ? String(object.denom) : '',
    };
  },

  toJSON(message: QueryInterestFactorsRequest): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryInterestFactorsRequest>, I>>(
    object: I
  ): QueryInterestFactorsRequest {
    const message = createBaseQueryInterestFactorsRequest();
    message.denom = object.denom ?? '';
    return message;
  },
};

function createBaseQueryInterestFactorsResponse(): QueryInterestFactorsResponse {
  return { interestFactors: [] };
}

export const QueryInterestFactorsResponse = {
  encode(
    message: QueryInterestFactorsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.interestFactors) {
      InterestFactor.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryInterestFactorsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryInterestFactorsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.interestFactors.push(
            InterestFactor.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryInterestFactorsResponse {
    return {
      interestFactors: Array.isArray(object?.interestFactors)
        ? object.interestFactors.map((e: any) => InterestFactor.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryInterestFactorsResponse): unknown {
    const obj: any = {};
    if (message.interestFactors) {
      obj.interestFactors = message.interestFactors.map((e) =>
        e ? InterestFactor.toJSON(e) : undefined
      );
    } else {
      obj.interestFactors = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryInterestFactorsResponse>, I>>(
    object: I
  ): QueryInterestFactorsResponse {
    const message = createBaseQueryInterestFactorsResponse();
    message.interestFactors =
      object.interestFactors?.map((e) => InterestFactor.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDepositResponse(): DepositResponse {
  return { depositor: '', amount: [], index: [] };
}

export const DepositResponse = {
  encode(
    message: DepositResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.depositor !== '') {
      writer.uint32(10).string(message.depositor);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.index) {
      SupplyInterestFactorResponse.encode(
        v!,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DepositResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDepositResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.depositor = reader.string();
          break;
        case 2:
          message.amount.push(Coin.decode(reader, reader.uint32()));
          break;
        case 3:
          message.index.push(
            SupplyInterestFactorResponse.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DepositResponse {
    return {
      depositor: isSet(object.depositor) ? String(object.depositor) : '',
      amount: Array.isArray(object?.amount)
        ? object.amount.map((e: any) => Coin.fromJSON(e))
        : [],
      index: Array.isArray(object?.index)
        ? object.index.map((e: any) => SupplyInterestFactorResponse.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DepositResponse): unknown {
    const obj: any = {};
    message.depositor !== undefined && (obj.depositor = message.depositor);
    if (message.amount) {
      obj.amount = message.amount.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.amount = [];
    }
    if (message.index) {
      obj.index = message.index.map((e) =>
        e ? SupplyInterestFactorResponse.toJSON(e) : undefined
      );
    } else {
      obj.index = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DepositResponse>, I>>(
    object: I
  ): DepositResponse {
    const message = createBaseDepositResponse();
    message.depositor = object.depositor ?? '';
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    message.index =
      object.index?.map((e) => SupplyInterestFactorResponse.fromPartial(e)) ||
      [];
    return message;
  },
};

function createBaseSupplyInterestFactorResponse(): SupplyInterestFactorResponse {
  return { denom: '', value: '' };
}

export const SupplyInterestFactorResponse = {
  encode(
    message: SupplyInterestFactorResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.denom !== '') {
      writer.uint32(10).string(message.denom);
    }
    if (message.value !== '') {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SupplyInterestFactorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSupplyInterestFactorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SupplyInterestFactorResponse {
    return {
      denom: isSet(object.denom) ? String(object.denom) : '',
      value: isSet(object.value) ? String(object.value) : '',
    };
  },

  toJSON(message: SupplyInterestFactorResponse): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SupplyInterestFactorResponse>, I>>(
    object: I
  ): SupplyInterestFactorResponse {
    const message = createBaseSupplyInterestFactorResponse();
    message.denom = object.denom ?? '';
    message.value = object.value ?? '';
    return message;
  },
};

function createBaseBorrowResponse(): BorrowResponse {
  return { borrower: '', amount: [], index: [] };
}

export const BorrowResponse = {
  encode(
    message: BorrowResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.borrower !== '') {
      writer.uint32(10).string(message.borrower);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.index) {
      BorrowInterestFactorResponse.encode(
        v!,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BorrowResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBorrowResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.borrower = reader.string();
          break;
        case 2:
          message.amount.push(Coin.decode(reader, reader.uint32()));
          break;
        case 3:
          message.index.push(
            BorrowInterestFactorResponse.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BorrowResponse {
    return {
      borrower: isSet(object.borrower) ? String(object.borrower) : '',
      amount: Array.isArray(object?.amount)
        ? object.amount.map((e: any) => Coin.fromJSON(e))
        : [],
      index: Array.isArray(object?.index)
        ? object.index.map((e: any) => BorrowInterestFactorResponse.fromJSON(e))
        : [],
    };
  },

  toJSON(message: BorrowResponse): unknown {
    const obj: any = {};
    message.borrower !== undefined && (obj.borrower = message.borrower);
    if (message.amount) {
      obj.amount = message.amount.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.amount = [];
    }
    if (message.index) {
      obj.index = message.index.map((e) =>
        e ? BorrowInterestFactorResponse.toJSON(e) : undefined
      );
    } else {
      obj.index = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BorrowResponse>, I>>(
    object: I
  ): BorrowResponse {
    const message = createBaseBorrowResponse();
    message.borrower = object.borrower ?? '';
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    message.index =
      object.index?.map((e) => BorrowInterestFactorResponse.fromPartial(e)) ||
      [];
    return message;
  },
};

function createBaseBorrowInterestFactorResponse(): BorrowInterestFactorResponse {
  return { denom: '', value: '' };
}

export const BorrowInterestFactorResponse = {
  encode(
    message: BorrowInterestFactorResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.denom !== '') {
      writer.uint32(10).string(message.denom);
    }
    if (message.value !== '') {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): BorrowInterestFactorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBorrowInterestFactorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BorrowInterestFactorResponse {
    return {
      denom: isSet(object.denom) ? String(object.denom) : '',
      value: isSet(object.value) ? String(object.value) : '',
    };
  },

  toJSON(message: BorrowInterestFactorResponse): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BorrowInterestFactorResponse>, I>>(
    object: I
  ): BorrowInterestFactorResponse {
    const message = createBaseBorrowInterestFactorResponse();
    message.denom = object.denom ?? '';
    message.value = object.value ?? '';
    return message;
  },
};

function createBaseMoneyMarketInterestRate(): MoneyMarketInterestRate {
  return { denom: '', supplyInterestRate: '', borrowInterestRate: '' };
}

export const MoneyMarketInterestRate = {
  encode(
    message: MoneyMarketInterestRate,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.denom !== '') {
      writer.uint32(10).string(message.denom);
    }
    if (message.supplyInterestRate !== '') {
      writer.uint32(18).string(message.supplyInterestRate);
    }
    if (message.borrowInterestRate !== '') {
      writer.uint32(26).string(message.borrowInterestRate);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MoneyMarketInterestRate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMoneyMarketInterestRate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.supplyInterestRate = reader.string();
          break;
        case 3:
          message.borrowInterestRate = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MoneyMarketInterestRate {
    return {
      denom: isSet(object.denom) ? String(object.denom) : '',
      supplyInterestRate: isSet(object.supplyInterestRate)
        ? String(object.supplyInterestRate)
        : '',
      borrowInterestRate: isSet(object.borrowInterestRate)
        ? String(object.borrowInterestRate)
        : '',
    };
  },

  toJSON(message: MoneyMarketInterestRate): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    message.supplyInterestRate !== undefined &&
      (obj.supplyInterestRate = message.supplyInterestRate);
    message.borrowInterestRate !== undefined &&
      (obj.borrowInterestRate = message.borrowInterestRate);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MoneyMarketInterestRate>, I>>(
    object: I
  ): MoneyMarketInterestRate {
    const message = createBaseMoneyMarketInterestRate();
    message.denom = object.denom ?? '';
    message.supplyInterestRate = object.supplyInterestRate ?? '';
    message.borrowInterestRate = object.borrowInterestRate ?? '';
    return message;
  },
};

function createBaseInterestFactor(): InterestFactor {
  return { denom: '', borrowInterestFactor: '', supplyInterestFactor: '' };
}

export const InterestFactor = {
  encode(
    message: InterestFactor,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.denom !== '') {
      writer.uint32(10).string(message.denom);
    }
    if (message.borrowInterestFactor !== '') {
      writer.uint32(18).string(message.borrowInterestFactor);
    }
    if (message.supplyInterestFactor !== '') {
      writer.uint32(26).string(message.supplyInterestFactor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InterestFactor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInterestFactor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.borrowInterestFactor = reader.string();
          break;
        case 3:
          message.supplyInterestFactor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InterestFactor {
    return {
      denom: isSet(object.denom) ? String(object.denom) : '',
      borrowInterestFactor: isSet(object.borrowInterestFactor)
        ? String(object.borrowInterestFactor)
        : '',
      supplyInterestFactor: isSet(object.supplyInterestFactor)
        ? String(object.supplyInterestFactor)
        : '',
    };
  },

  toJSON(message: InterestFactor): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    message.borrowInterestFactor !== undefined &&
      (obj.borrowInterestFactor = message.borrowInterestFactor);
    message.supplyInterestFactor !== undefined &&
      (obj.supplyInterestFactor = message.supplyInterestFactor);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<InterestFactor>, I>>(
    object: I
  ): InterestFactor {
    const message = createBaseInterestFactor();
    message.denom = object.denom ?? '';
    message.borrowInterestFactor = object.borrowInterestFactor ?? '';
    message.supplyInterestFactor = object.supplyInterestFactor ?? '';
    return message;
  },
};

/** Query defines the gRPC querier service for bep3 module. */
export interface Query {
  /** Params queries module params. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Accounts queries module accounts. */
  Accounts(request: QueryAccountsRequest): Promise<QueryAccountsResponse>;
  /** Deposits queries hard deposits. */
  Deposits(request: QueryDepositsRequest): Promise<QueryDepositsResponse>;
  /** UnsyncedDeposits queries unsynced deposits. */
  UnsyncedDeposits(
    request: QueryUnsyncedDepositsRequest
  ): Promise<QueryUnsyncedDepositsResponse>;
  /** TotalDeposited queries total coins deposited to hard liquidity pools. */
  TotalDeposited(
    request: QueryTotalDepositedRequest
  ): Promise<QueryTotalDepositedResponse>;
  /** Borrows queries hard borrows. */
  Borrows(request: QueryBorrowsRequest): Promise<QueryBorrowsResponse>;
  /** UnsyncedBorrows queries unsynced borrows. */
  UnsyncedBorrows(
    request: QueryUnsyncedBorrowsRequest
  ): Promise<QueryUnsyncedBorrowsResponse>;
  /** TotalBorrowed queries total coins borrowed from hard liquidity pools. */
  TotalBorrowed(
    request: QueryTotalBorrowedRequest
  ): Promise<QueryTotalBorrowedResponse>;
  /** InterestRate queries the hard module interest rates. */
  InterestRate(
    request: QueryInterestRateRequest
  ): Promise<QueryInterestRateResponse>;
  /** Reserves queries total hard reserve coins. */
  Reserves(request: QueryReservesRequest): Promise<QueryReservesResponse>;
  /** InterestFactors queries hard module interest factors. */
  InterestFactors(
    request: QueryInterestFactorsRequest
  ): Promise<QueryInterestFactorsResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Accounts = this.Accounts.bind(this);
    this.Deposits = this.Deposits.bind(this);
    this.UnsyncedDeposits = this.UnsyncedDeposits.bind(this);
    this.TotalDeposited = this.TotalDeposited.bind(this);
    this.Borrows = this.Borrows.bind(this);
    this.UnsyncedBorrows = this.UnsyncedBorrows.bind(this);
    this.TotalBorrowed = this.TotalBorrowed.bind(this);
    this.InterestRate = this.InterestRate.bind(this);
    this.Reserves = this.Reserves.bind(this);
    this.InterestFactors = this.InterestFactors.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request('kava.hard.v1beta1.Query', 'Params', data);
    return promise.then((data) =>
      QueryParamsResponse.decode(new _m0.Reader(data))
    );
  }

  Accounts(request: QueryAccountsRequest): Promise<QueryAccountsResponse> {
    const data = QueryAccountsRequest.encode(request).finish();
    const promise = this.rpc.request(
      'kava.hard.v1beta1.Query',
      'Accounts',
      data
    );
    return promise.then((data) =>
      QueryAccountsResponse.decode(new _m0.Reader(data))
    );
  }

  Deposits(request: QueryDepositsRequest): Promise<QueryDepositsResponse> {
    const data = QueryDepositsRequest.encode(request).finish();
    const promise = this.rpc.request(
      'kava.hard.v1beta1.Query',
      'Deposits',
      data
    );
    return promise.then((data) =>
      QueryDepositsResponse.decode(new _m0.Reader(data))
    );
  }

  UnsyncedDeposits(
    request: QueryUnsyncedDepositsRequest
  ): Promise<QueryUnsyncedDepositsResponse> {
    const data = QueryUnsyncedDepositsRequest.encode(request).finish();
    const promise = this.rpc.request(
      'kava.hard.v1beta1.Query',
      'UnsyncedDeposits',
      data
    );
    return promise.then((data) =>
      QueryUnsyncedDepositsResponse.decode(new _m0.Reader(data))
    );
  }

  TotalDeposited(
    request: QueryTotalDepositedRequest
  ): Promise<QueryTotalDepositedResponse> {
    const data = QueryTotalDepositedRequest.encode(request).finish();
    const promise = this.rpc.request(
      'kava.hard.v1beta1.Query',
      'TotalDeposited',
      data
    );
    return promise.then((data) =>
      QueryTotalDepositedResponse.decode(new _m0.Reader(data))
    );
  }

  Borrows(request: QueryBorrowsRequest): Promise<QueryBorrowsResponse> {
    const data = QueryBorrowsRequest.encode(request).finish();
    const promise = this.rpc.request(
      'kava.hard.v1beta1.Query',
      'Borrows',
      data
    );
    return promise.then((data) =>
      QueryBorrowsResponse.decode(new _m0.Reader(data))
    );
  }

  UnsyncedBorrows(
    request: QueryUnsyncedBorrowsRequest
  ): Promise<QueryUnsyncedBorrowsResponse> {
    const data = QueryUnsyncedBorrowsRequest.encode(request).finish();
    const promise = this.rpc.request(
      'kava.hard.v1beta1.Query',
      'UnsyncedBorrows',
      data
    );
    return promise.then((data) =>
      QueryUnsyncedBorrowsResponse.decode(new _m0.Reader(data))
    );
  }

  TotalBorrowed(
    request: QueryTotalBorrowedRequest
  ): Promise<QueryTotalBorrowedResponse> {
    const data = QueryTotalBorrowedRequest.encode(request).finish();
    const promise = this.rpc.request(
      'kava.hard.v1beta1.Query',
      'TotalBorrowed',
      data
    );
    return promise.then((data) =>
      QueryTotalBorrowedResponse.decode(new _m0.Reader(data))
    );
  }

  InterestRate(
    request: QueryInterestRateRequest
  ): Promise<QueryInterestRateResponse> {
    const data = QueryInterestRateRequest.encode(request).finish();
    const promise = this.rpc.request(
      'kava.hard.v1beta1.Query',
      'InterestRate',
      data
    );
    return promise.then((data) =>
      QueryInterestRateResponse.decode(new _m0.Reader(data))
    );
  }

  Reserves(request: QueryReservesRequest): Promise<QueryReservesResponse> {
    const data = QueryReservesRequest.encode(request).finish();
    const promise = this.rpc.request(
      'kava.hard.v1beta1.Query',
      'Reserves',
      data
    );
    return promise.then((data) =>
      QueryReservesResponse.decode(new _m0.Reader(data))
    );
  }

  InterestFactors(
    request: QueryInterestFactorsRequest
  ): Promise<QueryInterestFactorsResponse> {
    const data = QueryInterestFactorsRequest.encode(request).finish();
    const promise = this.rpc.request(
      'kava.hard.v1beta1.Query',
      'InterestFactors',
      data
    );
    return promise.then((data) =>
      QueryInterestFactorsResponse.decode(new _m0.Reader(data))
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
