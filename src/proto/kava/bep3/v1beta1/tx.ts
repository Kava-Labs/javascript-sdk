/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Coin } from '../../../cosmos/base/v1beta1/coin';

export const protobufPackage = 'kava.bep3.v1beta1';

/** MsgCreateAtomicSwap defines the Msg/CreateAtomicSwap request type. */
export interface MsgCreateAtomicSwap {
  from: string;
  to: string;
  recipientOtherChain: string;
  senderOtherChain: string;
  randomNumberHash: string;
  timestamp: Long;
  amount: Coin[];
  heightSpan: Long;
}

/** MsgCreateAtomicSwapResponse defines the Msg/CreateAtomicSwap response type. */
export interface MsgCreateAtomicSwapResponse {}

/** MsgClaimAtomicSwap defines the Msg/ClaimAtomicSwap request type. */
export interface MsgClaimAtomicSwap {
  from: string;
  swapId: string;
  randomNumber: string;
}

/** MsgClaimAtomicSwapResponse defines the Msg/ClaimAtomicSwap response type. */
export interface MsgClaimAtomicSwapResponse {}

/** MsgRefundAtomicSwap defines the Msg/RefundAtomicSwap request type. */
export interface MsgRefundAtomicSwap {
  from: string;
  swapId: string;
}

/** MsgRefundAtomicSwapResponse defines the Msg/RefundAtomicSwap response type. */
export interface MsgRefundAtomicSwapResponse {}

function createBaseMsgCreateAtomicSwap(): MsgCreateAtomicSwap {
  return {
    from: '',
    to: '',
    recipientOtherChain: '',
    senderOtherChain: '',
    randomNumberHash: '',
    timestamp: Long.ZERO,
    amount: [],
    heightSpan: Long.UZERO,
  };
}

export const MsgCreateAtomicSwap = {
  encode(
    message: MsgCreateAtomicSwap,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.from !== '') {
      writer.uint32(10).string(message.from);
    }
    if (message.to !== '') {
      writer.uint32(18).string(message.to);
    }
    if (message.recipientOtherChain !== '') {
      writer.uint32(26).string(message.recipientOtherChain);
    }
    if (message.senderOtherChain !== '') {
      writer.uint32(34).string(message.senderOtherChain);
    }
    if (message.randomNumberHash !== '') {
      writer.uint32(42).string(message.randomNumberHash);
    }
    if (!message.timestamp.isZero()) {
      writer.uint32(48).int64(message.timestamp);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (!message.heightSpan.isZero()) {
      writer.uint32(64).uint64(message.heightSpan);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateAtomicSwap {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateAtomicSwap();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.to = reader.string();
          break;
        case 3:
          message.recipientOtherChain = reader.string();
          break;
        case 4:
          message.senderOtherChain = reader.string();
          break;
        case 5:
          message.randomNumberHash = reader.string();
          break;
        case 6:
          message.timestamp = reader.int64() as Long;
          break;
        case 7:
          message.amount.push(Coin.decode(reader, reader.uint32()));
          break;
        case 8:
          message.heightSpan = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateAtomicSwap {
    return {
      from: isSet(object.from) ? String(object.from) : '',
      to: isSet(object.to) ? String(object.to) : '',
      recipientOtherChain: isSet(object.recipientOtherChain)
        ? String(object.recipientOtherChain)
        : '',
      senderOtherChain: isSet(object.senderOtherChain)
        ? String(object.senderOtherChain)
        : '',
      randomNumberHash: isSet(object.randomNumberHash)
        ? String(object.randomNumberHash)
        : '',
      timestamp: isSet(object.timestamp)
        ? Long.fromString(object.timestamp)
        : Long.ZERO,
      amount: Array.isArray(object?.amount)
        ? object.amount.map((e: any) => Coin.fromJSON(e))
        : [],
      heightSpan: isSet(object.heightSpan)
        ? Long.fromString(object.heightSpan)
        : Long.UZERO,
    };
  },

  toJSON(message: MsgCreateAtomicSwap): unknown {
    const obj: any = {};
    message.from !== undefined && (obj.from = message.from);
    message.to !== undefined && (obj.to = message.to);
    message.recipientOtherChain !== undefined &&
      (obj.recipientOtherChain = message.recipientOtherChain);
    message.senderOtherChain !== undefined &&
      (obj.senderOtherChain = message.senderOtherChain);
    message.randomNumberHash !== undefined &&
      (obj.randomNumberHash = message.randomNumberHash);
    message.timestamp !== undefined &&
      (obj.timestamp = (message.timestamp || Long.ZERO).toString());
    if (message.amount) {
      obj.amount = message.amount.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.amount = [];
    }
    message.heightSpan !== undefined &&
      (obj.heightSpan = (message.heightSpan || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateAtomicSwap>, I>>(
    object: I
  ): MsgCreateAtomicSwap {
    const message = createBaseMsgCreateAtomicSwap();
    message.from = object.from ?? '';
    message.to = object.to ?? '';
    message.recipientOtherChain = object.recipientOtherChain ?? '';
    message.senderOtherChain = object.senderOtherChain ?? '';
    message.randomNumberHash = object.randomNumberHash ?? '';
    message.timestamp =
      object.timestamp !== undefined && object.timestamp !== null
        ? Long.fromValue(object.timestamp)
        : Long.ZERO;
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    message.heightSpan =
      object.heightSpan !== undefined && object.heightSpan !== null
        ? Long.fromValue(object.heightSpan)
        : Long.UZERO;
    return message;
  },
};

function createBaseMsgCreateAtomicSwapResponse(): MsgCreateAtomicSwapResponse {
  return {};
}

export const MsgCreateAtomicSwapResponse = {
  encode(
    _: MsgCreateAtomicSwapResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreateAtomicSwapResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateAtomicSwapResponse();
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

  fromJSON(_: any): MsgCreateAtomicSwapResponse {
    return {};
  },

  toJSON(_: MsgCreateAtomicSwapResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateAtomicSwapResponse>, I>>(
    _: I
  ): MsgCreateAtomicSwapResponse {
    const message = createBaseMsgCreateAtomicSwapResponse();
    return message;
  },
};

function createBaseMsgClaimAtomicSwap(): MsgClaimAtomicSwap {
  return { from: '', swapId: '', randomNumber: '' };
}

export const MsgClaimAtomicSwap = {
  encode(
    message: MsgClaimAtomicSwap,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.from !== '') {
      writer.uint32(10).string(message.from);
    }
    if (message.swapId !== '') {
      writer.uint32(18).string(message.swapId);
    }
    if (message.randomNumber !== '') {
      writer.uint32(26).string(message.randomNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgClaimAtomicSwap {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimAtomicSwap();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.swapId = reader.string();
          break;
        case 3:
          message.randomNumber = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgClaimAtomicSwap {
    return {
      from: isSet(object.from) ? String(object.from) : '',
      swapId: isSet(object.swapId) ? String(object.swapId) : '',
      randomNumber: isSet(object.randomNumber)
        ? String(object.randomNumber)
        : '',
    };
  },

  toJSON(message: MsgClaimAtomicSwap): unknown {
    const obj: any = {};
    message.from !== undefined && (obj.from = message.from);
    message.swapId !== undefined && (obj.swapId = message.swapId);
    message.randomNumber !== undefined &&
      (obj.randomNumber = message.randomNumber);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgClaimAtomicSwap>, I>>(
    object: I
  ): MsgClaimAtomicSwap {
    const message = createBaseMsgClaimAtomicSwap();
    message.from = object.from ?? '';
    message.swapId = object.swapId ?? '';
    message.randomNumber = object.randomNumber ?? '';
    return message;
  },
};

function createBaseMsgClaimAtomicSwapResponse(): MsgClaimAtomicSwapResponse {
  return {};
}

export const MsgClaimAtomicSwapResponse = {
  encode(
    _: MsgClaimAtomicSwapResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgClaimAtomicSwapResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimAtomicSwapResponse();
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

  fromJSON(_: any): MsgClaimAtomicSwapResponse {
    return {};
  },

  toJSON(_: MsgClaimAtomicSwapResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgClaimAtomicSwapResponse>, I>>(
    _: I
  ): MsgClaimAtomicSwapResponse {
    const message = createBaseMsgClaimAtomicSwapResponse();
    return message;
  },
};

function createBaseMsgRefundAtomicSwap(): MsgRefundAtomicSwap {
  return { from: '', swapId: '' };
}

export const MsgRefundAtomicSwap = {
  encode(
    message: MsgRefundAtomicSwap,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.from !== '') {
      writer.uint32(10).string(message.from);
    }
    if (message.swapId !== '') {
      writer.uint32(18).string(message.swapId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRefundAtomicSwap {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRefundAtomicSwap();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.swapId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRefundAtomicSwap {
    return {
      from: isSet(object.from) ? String(object.from) : '',
      swapId: isSet(object.swapId) ? String(object.swapId) : '',
    };
  },

  toJSON(message: MsgRefundAtomicSwap): unknown {
    const obj: any = {};
    message.from !== undefined && (obj.from = message.from);
    message.swapId !== undefined && (obj.swapId = message.swapId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRefundAtomicSwap>, I>>(
    object: I
  ): MsgRefundAtomicSwap {
    const message = createBaseMsgRefundAtomicSwap();
    message.from = object.from ?? '';
    message.swapId = object.swapId ?? '';
    return message;
  },
};

function createBaseMsgRefundAtomicSwapResponse(): MsgRefundAtomicSwapResponse {
  return {};
}

export const MsgRefundAtomicSwapResponse = {
  encode(
    _: MsgRefundAtomicSwapResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgRefundAtomicSwapResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRefundAtomicSwapResponse();
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

  fromJSON(_: any): MsgRefundAtomicSwapResponse {
    return {};
  },

  toJSON(_: MsgRefundAtomicSwapResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRefundAtomicSwapResponse>, I>>(
    _: I
  ): MsgRefundAtomicSwapResponse {
    const message = createBaseMsgRefundAtomicSwapResponse();
    return message;
  },
};

/** Msg defines the bep3 Msg service. */
export interface Msg {
  /** CreateAtomicSwap defines a method for creating an atomic swap */
  CreateAtomicSwap(
    request: MsgCreateAtomicSwap
  ): Promise<MsgCreateAtomicSwapResponse>;
  /** ClaimAtomicSwap defines a method for claiming an atomic swap */
  ClaimAtomicSwap(
    request: MsgClaimAtomicSwap
  ): Promise<MsgClaimAtomicSwapResponse>;
  /** RefundAtomicSwap defines a method for refunding an atomic swap */
  RefundAtomicSwap(
    request: MsgRefundAtomicSwap
  ): Promise<MsgRefundAtomicSwapResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateAtomicSwap = this.CreateAtomicSwap.bind(this);
    this.ClaimAtomicSwap = this.ClaimAtomicSwap.bind(this);
    this.RefundAtomicSwap = this.RefundAtomicSwap.bind(this);
  }
  CreateAtomicSwap(
    request: MsgCreateAtomicSwap
  ): Promise<MsgCreateAtomicSwapResponse> {
    const data = MsgCreateAtomicSwap.encode(request).finish();
    const promise = this.rpc.request(
      'kava.bep3.v1beta1.Msg',
      'CreateAtomicSwap',
      data
    );
    return promise.then((data) =>
      MsgCreateAtomicSwapResponse.decode(new _m0.Reader(data))
    );
  }

  ClaimAtomicSwap(
    request: MsgClaimAtomicSwap
  ): Promise<MsgClaimAtomicSwapResponse> {
    const data = MsgClaimAtomicSwap.encode(request).finish();
    const promise = this.rpc.request(
      'kava.bep3.v1beta1.Msg',
      'ClaimAtomicSwap',
      data
    );
    return promise.then((data) =>
      MsgClaimAtomicSwapResponse.decode(new _m0.Reader(data))
    );
  }

  RefundAtomicSwap(
    request: MsgRefundAtomicSwap
  ): Promise<MsgRefundAtomicSwapResponse> {
    const data = MsgRefundAtomicSwap.encode(request).finish();
    const promise = this.rpc.request(
      'kava.bep3.v1beta1.Msg',
      'RefundAtomicSwap',
      data
    );
    return promise.then((data) =>
      MsgRefundAtomicSwapResponse.decode(new _m0.Reader(data))
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
