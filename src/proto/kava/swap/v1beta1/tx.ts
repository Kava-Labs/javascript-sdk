/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Coin } from '../../../cosmos/base/v1beta1/coin';

export const protobufPackage = 'kava.swap.v1beta1';

/** MsgDeposit represents a message for depositing liquidity into a pool */
export interface MsgDeposit {
  /** depositor represents the address to deposit funds from */
  depositor: string;
  /** token_a represents one token of deposit pair */
  tokenA?: Coin;
  /** token_b represents one token of deposit pair */
  tokenB?: Coin;
  /** slippage represents the max decimal percentage price change */
  slippage: string;
  /** deadline represents the unix timestamp to complete the deposit by */
  deadline: Long;
}

/** MsgDepositResponse defines the Msg/Deposit response type. */
export interface MsgDepositResponse {}

/** MsgWithdraw represents a message for withdrawing liquidity from a pool */
export interface MsgWithdraw {
  /** from represents the address we are withdrawing for */
  from: string;
  /** shares represents the amount of shares to withdraw */
  shares: string;
  /** min_token_a represents the minimum a token to withdraw */
  minTokenA?: Coin;
  /** min_token_a represents the minimum a token to withdraw */
  minTokenB?: Coin;
  /** deadline represents the unix timestamp to complete the withdraw by */
  deadline: Long;
}

/** MsgWithdrawResponse defines the Msg/Withdraw response type. */
export interface MsgWithdrawResponse {}

/** MsgSwapExactForTokens represents a message for trading exact coinA for coinB */
export interface MsgSwapExactForTokens {
  /** represents the address swaping the tokens */
  requester: string;
  /** exact_token_a represents the exact amount to swap for token_b */
  exactTokenA?: Coin;
  /** token_b represents the desired token_b to swap for */
  tokenB?: Coin;
  /** slippage represents the maximum change in token_b allowed */
  slippage: string;
  /** deadline represents the unix timestamp to complete the swap by */
  deadline: Long;
}

/**
 * MsgSwapExactForTokensResponse defines the Msg/SwapExactForTokens response
 * type.
 */
export interface MsgSwapExactForTokensResponse {}

/**
 * MsgSwapForExactTokens represents a message for trading coinA for an exact
 * coinB
 */
export interface MsgSwapForExactTokens {
  /** represents the address swaping the tokens */
  requester: string;
  /** token_a represents the desired token_a to swap for */
  tokenA?: Coin;
  /** exact_token_b represents the exact token b amount to swap for token a */
  exactTokenB?: Coin;
  /** slippage represents the maximum change in token_a allowed */
  slippage: string;
  /** deadline represents the unix timestamp to complete the swap by */
  deadline: Long;
}

/**
 * MsgSwapForExactTokensResponse defines the Msg/SwapForExactTokensResponse
 * response type.
 */
export interface MsgSwapForExactTokensResponse {}

function createBaseMsgDeposit(): MsgDeposit {
  return {
    depositor: '',
    tokenA: undefined,
    tokenB: undefined,
    slippage: '',
    deadline: Long.ZERO,
  };
}

export const MsgDeposit = {
  encode(
    message: MsgDeposit,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.depositor !== '') {
      writer.uint32(10).string(message.depositor);
    }
    if (message.tokenA !== undefined) {
      Coin.encode(message.tokenA, writer.uint32(18).fork()).ldelim();
    }
    if (message.tokenB !== undefined) {
      Coin.encode(message.tokenB, writer.uint32(26).fork()).ldelim();
    }
    if (message.slippage !== '') {
      writer.uint32(34).string(message.slippage);
    }
    if (!message.deadline.isZero()) {
      writer.uint32(40).int64(message.deadline);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeposit {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeposit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.depositor = reader.string();
          break;
        case 2:
          message.tokenA = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.tokenB = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.slippage = reader.string();
          break;
        case 5:
          message.deadline = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeposit {
    return {
      depositor: isSet(object.depositor) ? String(object.depositor) : '',
      tokenA: isSet(object.tokenA) ? Coin.fromJSON(object.tokenA) : undefined,
      tokenB: isSet(object.tokenB) ? Coin.fromJSON(object.tokenB) : undefined,
      slippage: isSet(object.slippage) ? String(object.slippage) : '',
      deadline: isSet(object.deadline)
        ? Long.fromString(object.deadline)
        : Long.ZERO,
    };
  },

  toJSON(message: MsgDeposit): unknown {
    const obj: any = {};
    message.depositor !== undefined && (obj.depositor = message.depositor);
    message.tokenA !== undefined &&
      (obj.tokenA = message.tokenA ? Coin.toJSON(message.tokenA) : undefined);
    message.tokenB !== undefined &&
      (obj.tokenB = message.tokenB ? Coin.toJSON(message.tokenB) : undefined);
    message.slippage !== undefined && (obj.slippage = message.slippage);
    message.deadline !== undefined &&
      (obj.deadline = (message.deadline || Long.ZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeposit>, I>>(
    object: I
  ): MsgDeposit {
    const message = createBaseMsgDeposit();
    message.depositor = object.depositor ?? '';
    message.tokenA =
      object.tokenA !== undefined && object.tokenA !== null
        ? Coin.fromPartial(object.tokenA)
        : undefined;
    message.tokenB =
      object.tokenB !== undefined && object.tokenB !== null
        ? Coin.fromPartial(object.tokenB)
        : undefined;
    message.slippage = object.slippage ?? '';
    message.deadline =
      object.deadline !== undefined && object.deadline !== null
        ? Long.fromValue(object.deadline)
        : Long.ZERO;
    return message;
  },
};

function createBaseMsgDepositResponse(): MsgDepositResponse {
  return {};
}

export const MsgDepositResponse = {
  encode(
    _: MsgDepositResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDepositResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDepositResponse();
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

  fromJSON(_: any): MsgDepositResponse {
    return {};
  },

  toJSON(_: MsgDepositResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDepositResponse>, I>>(
    _: I
  ): MsgDepositResponse {
    const message = createBaseMsgDepositResponse();
    return message;
  },
};

function createBaseMsgWithdraw(): MsgWithdraw {
  return {
    from: '',
    shares: '',
    minTokenA: undefined,
    minTokenB: undefined,
    deadline: Long.ZERO,
  };
}

export const MsgWithdraw = {
  encode(
    message: MsgWithdraw,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.from !== '') {
      writer.uint32(10).string(message.from);
    }
    if (message.shares !== '') {
      writer.uint32(18).string(message.shares);
    }
    if (message.minTokenA !== undefined) {
      Coin.encode(message.minTokenA, writer.uint32(26).fork()).ldelim();
    }
    if (message.minTokenB !== undefined) {
      Coin.encode(message.minTokenB, writer.uint32(34).fork()).ldelim();
    }
    if (!message.deadline.isZero()) {
      writer.uint32(40).int64(message.deadline);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdraw {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdraw();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.shares = reader.string();
          break;
        case 3:
          message.minTokenA = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.minTokenB = Coin.decode(reader, reader.uint32());
          break;
        case 5:
          message.deadline = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgWithdraw {
    return {
      from: isSet(object.from) ? String(object.from) : '',
      shares: isSet(object.shares) ? String(object.shares) : '',
      minTokenA: isSet(object.minTokenA)
        ? Coin.fromJSON(object.minTokenA)
        : undefined,
      minTokenB: isSet(object.minTokenB)
        ? Coin.fromJSON(object.minTokenB)
        : undefined,
      deadline: isSet(object.deadline)
        ? Long.fromString(object.deadline)
        : Long.ZERO,
    };
  },

  toJSON(message: MsgWithdraw): unknown {
    const obj: any = {};
    message.from !== undefined && (obj.from = message.from);
    message.shares !== undefined && (obj.shares = message.shares);
    message.minTokenA !== undefined &&
      (obj.minTokenA = message.minTokenA
        ? Coin.toJSON(message.minTokenA)
        : undefined);
    message.minTokenB !== undefined &&
      (obj.minTokenB = message.minTokenB
        ? Coin.toJSON(message.minTokenB)
        : undefined);
    message.deadline !== undefined &&
      (obj.deadline = (message.deadline || Long.ZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgWithdraw>, I>>(
    object: I
  ): MsgWithdraw {
    const message = createBaseMsgWithdraw();
    message.from = object.from ?? '';
    message.shares = object.shares ?? '';
    message.minTokenA =
      object.minTokenA !== undefined && object.minTokenA !== null
        ? Coin.fromPartial(object.minTokenA)
        : undefined;
    message.minTokenB =
      object.minTokenB !== undefined && object.minTokenB !== null
        ? Coin.fromPartial(object.minTokenB)
        : undefined;
    message.deadline =
      object.deadline !== undefined && object.deadline !== null
        ? Long.fromValue(object.deadline)
        : Long.ZERO;
    return message;
  },
};

function createBaseMsgWithdrawResponse(): MsgWithdrawResponse {
  return {};
}

export const MsgWithdrawResponse = {
  encode(
    _: MsgWithdrawResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawResponse();
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

  fromJSON(_: any): MsgWithdrawResponse {
    return {};
  },

  toJSON(_: MsgWithdrawResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgWithdrawResponse>, I>>(
    _: I
  ): MsgWithdrawResponse {
    const message = createBaseMsgWithdrawResponse();
    return message;
  },
};

function createBaseMsgSwapExactForTokens(): MsgSwapExactForTokens {
  return {
    requester: '',
    exactTokenA: undefined,
    tokenB: undefined,
    slippage: '',
    deadline: Long.ZERO,
  };
}

export const MsgSwapExactForTokens = {
  encode(
    message: MsgSwapExactForTokens,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requester !== '') {
      writer.uint32(10).string(message.requester);
    }
    if (message.exactTokenA !== undefined) {
      Coin.encode(message.exactTokenA, writer.uint32(18).fork()).ldelim();
    }
    if (message.tokenB !== undefined) {
      Coin.encode(message.tokenB, writer.uint32(26).fork()).ldelim();
    }
    if (message.slippage !== '') {
      writer.uint32(34).string(message.slippage);
    }
    if (!message.deadline.isZero()) {
      writer.uint32(40).int64(message.deadline);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgSwapExactForTokens {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSwapExactForTokens();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requester = reader.string();
          break;
        case 2:
          message.exactTokenA = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.tokenB = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.slippage = reader.string();
          break;
        case 5:
          message.deadline = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSwapExactForTokens {
    return {
      requester: isSet(object.requester) ? String(object.requester) : '',
      exactTokenA: isSet(object.exactTokenA)
        ? Coin.fromJSON(object.exactTokenA)
        : undefined,
      tokenB: isSet(object.tokenB) ? Coin.fromJSON(object.tokenB) : undefined,
      slippage: isSet(object.slippage) ? String(object.slippage) : '',
      deadline: isSet(object.deadline)
        ? Long.fromString(object.deadline)
        : Long.ZERO,
    };
  },

  toJSON(message: MsgSwapExactForTokens): unknown {
    const obj: any = {};
    message.requester !== undefined && (obj.requester = message.requester);
    message.exactTokenA !== undefined &&
      (obj.exactTokenA = message.exactTokenA
        ? Coin.toJSON(message.exactTokenA)
        : undefined);
    message.tokenB !== undefined &&
      (obj.tokenB = message.tokenB ? Coin.toJSON(message.tokenB) : undefined);
    message.slippage !== undefined && (obj.slippage = message.slippage);
    message.deadline !== undefined &&
      (obj.deadline = (message.deadline || Long.ZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSwapExactForTokens>, I>>(
    object: I
  ): MsgSwapExactForTokens {
    const message = createBaseMsgSwapExactForTokens();
    message.requester = object.requester ?? '';
    message.exactTokenA =
      object.exactTokenA !== undefined && object.exactTokenA !== null
        ? Coin.fromPartial(object.exactTokenA)
        : undefined;
    message.tokenB =
      object.tokenB !== undefined && object.tokenB !== null
        ? Coin.fromPartial(object.tokenB)
        : undefined;
    message.slippage = object.slippage ?? '';
    message.deadline =
      object.deadline !== undefined && object.deadline !== null
        ? Long.fromValue(object.deadline)
        : Long.ZERO;
    return message;
  },
};

function createBaseMsgSwapExactForTokensResponse(): MsgSwapExactForTokensResponse {
  return {};
}

export const MsgSwapExactForTokensResponse = {
  encode(
    _: MsgSwapExactForTokensResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgSwapExactForTokensResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSwapExactForTokensResponse();
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

  fromJSON(_: any): MsgSwapExactForTokensResponse {
    return {};
  },

  toJSON(_: MsgSwapExactForTokensResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSwapExactForTokensResponse>, I>>(
    _: I
  ): MsgSwapExactForTokensResponse {
    const message = createBaseMsgSwapExactForTokensResponse();
    return message;
  },
};

function createBaseMsgSwapForExactTokens(): MsgSwapForExactTokens {
  return {
    requester: '',
    tokenA: undefined,
    exactTokenB: undefined,
    slippage: '',
    deadline: Long.ZERO,
  };
}

export const MsgSwapForExactTokens = {
  encode(
    message: MsgSwapForExactTokens,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requester !== '') {
      writer.uint32(10).string(message.requester);
    }
    if (message.tokenA !== undefined) {
      Coin.encode(message.tokenA, writer.uint32(18).fork()).ldelim();
    }
    if (message.exactTokenB !== undefined) {
      Coin.encode(message.exactTokenB, writer.uint32(26).fork()).ldelim();
    }
    if (message.slippage !== '') {
      writer.uint32(34).string(message.slippage);
    }
    if (!message.deadline.isZero()) {
      writer.uint32(40).int64(message.deadline);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgSwapForExactTokens {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSwapForExactTokens();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requester = reader.string();
          break;
        case 2:
          message.tokenA = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.exactTokenB = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.slippage = reader.string();
          break;
        case 5:
          message.deadline = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSwapForExactTokens {
    return {
      requester: isSet(object.requester) ? String(object.requester) : '',
      tokenA: isSet(object.tokenA) ? Coin.fromJSON(object.tokenA) : undefined,
      exactTokenB: isSet(object.exactTokenB)
        ? Coin.fromJSON(object.exactTokenB)
        : undefined,
      slippage: isSet(object.slippage) ? String(object.slippage) : '',
      deadline: isSet(object.deadline)
        ? Long.fromString(object.deadline)
        : Long.ZERO,
    };
  },

  toJSON(message: MsgSwapForExactTokens): unknown {
    const obj: any = {};
    message.requester !== undefined && (obj.requester = message.requester);
    message.tokenA !== undefined &&
      (obj.tokenA = message.tokenA ? Coin.toJSON(message.tokenA) : undefined);
    message.exactTokenB !== undefined &&
      (obj.exactTokenB = message.exactTokenB
        ? Coin.toJSON(message.exactTokenB)
        : undefined);
    message.slippage !== undefined && (obj.slippage = message.slippage);
    message.deadline !== undefined &&
      (obj.deadline = (message.deadline || Long.ZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSwapForExactTokens>, I>>(
    object: I
  ): MsgSwapForExactTokens {
    const message = createBaseMsgSwapForExactTokens();
    message.requester = object.requester ?? '';
    message.tokenA =
      object.tokenA !== undefined && object.tokenA !== null
        ? Coin.fromPartial(object.tokenA)
        : undefined;
    message.exactTokenB =
      object.exactTokenB !== undefined && object.exactTokenB !== null
        ? Coin.fromPartial(object.exactTokenB)
        : undefined;
    message.slippage = object.slippage ?? '';
    message.deadline =
      object.deadline !== undefined && object.deadline !== null
        ? Long.fromValue(object.deadline)
        : Long.ZERO;
    return message;
  },
};

function createBaseMsgSwapForExactTokensResponse(): MsgSwapForExactTokensResponse {
  return {};
}

export const MsgSwapForExactTokensResponse = {
  encode(
    _: MsgSwapForExactTokensResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgSwapForExactTokensResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSwapForExactTokensResponse();
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

  fromJSON(_: any): MsgSwapForExactTokensResponse {
    return {};
  },

  toJSON(_: MsgSwapForExactTokensResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSwapForExactTokensResponse>, I>>(
    _: I
  ): MsgSwapForExactTokensResponse {
    const message = createBaseMsgSwapForExactTokensResponse();
    return message;
  },
};

/** Msg defines the swap Msg service. */
export interface Msg {
  /** Deposit defines a method for depositing liquidity into a pool */
  Deposit(request: MsgDeposit): Promise<MsgDepositResponse>;
  /** Withdraw defines a method for withdrawing liquidity into a pool */
  Withdraw(request: MsgWithdraw): Promise<MsgWithdrawResponse>;
  /** SwapExactForTokens represents a message for trading exact coinA for coinB */
  SwapExactForTokens(
    request: MsgSwapExactForTokens
  ): Promise<MsgSwapExactForTokensResponse>;
  /** SwapForExactTokens represents a message for trading coinA for an exact coinB */
  SwapForExactTokens(
    request: MsgSwapForExactTokens
  ): Promise<MsgSwapForExactTokensResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Deposit = this.Deposit.bind(this);
    this.Withdraw = this.Withdraw.bind(this);
    this.SwapExactForTokens = this.SwapExactForTokens.bind(this);
    this.SwapForExactTokens = this.SwapForExactTokens.bind(this);
  }
  Deposit(request: MsgDeposit): Promise<MsgDepositResponse> {
    const data = MsgDeposit.encode(request).finish();
    const promise = this.rpc.request('kava.swap.v1beta1.Msg', 'Deposit', data);
    return promise.then((data) =>
      MsgDepositResponse.decode(new _m0.Reader(data))
    );
  }

  Withdraw(request: MsgWithdraw): Promise<MsgWithdrawResponse> {
    const data = MsgWithdraw.encode(request).finish();
    const promise = this.rpc.request('kava.swap.v1beta1.Msg', 'Withdraw', data);
    return promise.then((data) =>
      MsgWithdrawResponse.decode(new _m0.Reader(data))
    );
  }

  SwapExactForTokens(
    request: MsgSwapExactForTokens
  ): Promise<MsgSwapExactForTokensResponse> {
    const data = MsgSwapExactForTokens.encode(request).finish();
    const promise = this.rpc.request(
      'kava.swap.v1beta1.Msg',
      'SwapExactForTokens',
      data
    );
    return promise.then((data) =>
      MsgSwapExactForTokensResponse.decode(new _m0.Reader(data))
    );
  }

  SwapForExactTokens(
    request: MsgSwapForExactTokens
  ): Promise<MsgSwapForExactTokensResponse> {
    const data = MsgSwapForExactTokens.encode(request).finish();
    const promise = this.rpc.request(
      'kava.swap.v1beta1.Msg',
      'SwapForExactTokens',
      data
    );
    return promise.then((data) =>
      MsgSwapForExactTokensResponse.decode(new _m0.Reader(data))
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
