/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Coin } from '../../../cosmos/base/v1beta1/coin';

export const protobufPackage = 'kava.issuance.v1beta1';

/** MsgIssueTokens represents a message used by the issuer to issue new tokens */
export interface MsgIssueTokens {
  sender: string;
  tokens?: Coin;
  receiver: string;
}

/** MsgIssueTokensResponse defines the Msg/IssueTokens response type. */
export interface MsgIssueTokensResponse {}

/** MsgRedeemTokens represents a message used by the issuer to redeem (burn) tokens */
export interface MsgRedeemTokens {
  sender: string;
  tokens?: Coin;
}

/** MsgRedeemTokensResponse defines the Msg/RedeemTokens response type. */
export interface MsgRedeemTokensResponse {}

/** MsgBlockAddress represents a message used by the issuer to block an address from holding or transferring tokens */
export interface MsgBlockAddress {
  sender: string;
  denom: string;
  blockedAddress: string;
}

/** MsgBlockAddressResponse defines the Msg/BlockAddress response type. */
export interface MsgBlockAddressResponse {}

/** MsgUnblockAddress message type used by the issuer to unblock an address from holding or transferring tokens */
export interface MsgUnblockAddress {
  sender: string;
  denom: string;
  blockedAddress: string;
}

/** MsgUnblockAddressResponse defines the Msg/UnblockAddress response type. */
export interface MsgUnblockAddressResponse {}

/** MsgSetPauseStatus message type used by the issuer to pause or unpause status */
export interface MsgSetPauseStatus {
  sender: string;
  denom: string;
  status: boolean;
}

/** MsgSetPauseStatusResponse defines the Msg/SetPauseStatus response type. */
export interface MsgSetPauseStatusResponse {}

function createBaseMsgIssueTokens(): MsgIssueTokens {
  return { sender: '', tokens: undefined, receiver: '' };
}

export const MsgIssueTokens = {
  encode(
    message: MsgIssueTokens,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sender !== '') {
      writer.uint32(10).string(message.sender);
    }
    if (message.tokens !== undefined) {
      Coin.encode(message.tokens, writer.uint32(18).fork()).ldelim();
    }
    if (message.receiver !== '') {
      writer.uint32(26).string(message.receiver);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgIssueTokens {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgIssueTokens();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.tokens = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.receiver = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgIssueTokens {
    return {
      sender: isSet(object.sender) ? String(object.sender) : '',
      tokens: isSet(object.tokens) ? Coin.fromJSON(object.tokens) : undefined,
      receiver: isSet(object.receiver) ? String(object.receiver) : '',
    };
  },

  toJSON(message: MsgIssueTokens): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.tokens !== undefined &&
      (obj.tokens = message.tokens ? Coin.toJSON(message.tokens) : undefined);
    message.receiver !== undefined && (obj.receiver = message.receiver);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgIssueTokens>, I>>(
    object: I
  ): MsgIssueTokens {
    const message = createBaseMsgIssueTokens();
    message.sender = object.sender ?? '';
    message.tokens =
      object.tokens !== undefined && object.tokens !== null
        ? Coin.fromPartial(object.tokens)
        : undefined;
    message.receiver = object.receiver ?? '';
    return message;
  },
};

function createBaseMsgIssueTokensResponse(): MsgIssueTokensResponse {
  return {};
}

export const MsgIssueTokensResponse = {
  encode(
    _: MsgIssueTokensResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgIssueTokensResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgIssueTokensResponse();
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

  fromJSON(_: any): MsgIssueTokensResponse {
    return {};
  },

  toJSON(_: MsgIssueTokensResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgIssueTokensResponse>, I>>(
    _: I
  ): MsgIssueTokensResponse {
    const message = createBaseMsgIssueTokensResponse();
    return message;
  },
};

function createBaseMsgRedeemTokens(): MsgRedeemTokens {
  return { sender: '', tokens: undefined };
}

export const MsgRedeemTokens = {
  encode(
    message: MsgRedeemTokens,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sender !== '') {
      writer.uint32(10).string(message.sender);
    }
    if (message.tokens !== undefined) {
      Coin.encode(message.tokens, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRedeemTokens {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRedeemTokens();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.tokens = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRedeemTokens {
    return {
      sender: isSet(object.sender) ? String(object.sender) : '',
      tokens: isSet(object.tokens) ? Coin.fromJSON(object.tokens) : undefined,
    };
  },

  toJSON(message: MsgRedeemTokens): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.tokens !== undefined &&
      (obj.tokens = message.tokens ? Coin.toJSON(message.tokens) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRedeemTokens>, I>>(
    object: I
  ): MsgRedeemTokens {
    const message = createBaseMsgRedeemTokens();
    message.sender = object.sender ?? '';
    message.tokens =
      object.tokens !== undefined && object.tokens !== null
        ? Coin.fromPartial(object.tokens)
        : undefined;
    return message;
  },
};

function createBaseMsgRedeemTokensResponse(): MsgRedeemTokensResponse {
  return {};
}

export const MsgRedeemTokensResponse = {
  encode(
    _: MsgRedeemTokensResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgRedeemTokensResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRedeemTokensResponse();
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

  fromJSON(_: any): MsgRedeemTokensResponse {
    return {};
  },

  toJSON(_: MsgRedeemTokensResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRedeemTokensResponse>, I>>(
    _: I
  ): MsgRedeemTokensResponse {
    const message = createBaseMsgRedeemTokensResponse();
    return message;
  },
};

function createBaseMsgBlockAddress(): MsgBlockAddress {
  return { sender: '', denom: '', blockedAddress: '' };
}

export const MsgBlockAddress = {
  encode(
    message: MsgBlockAddress,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sender !== '') {
      writer.uint32(10).string(message.sender);
    }
    if (message.denom !== '') {
      writer.uint32(18).string(message.denom);
    }
    if (message.blockedAddress !== '') {
      writer.uint32(26).string(message.blockedAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBlockAddress {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBlockAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        case 3:
          message.blockedAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgBlockAddress {
    return {
      sender: isSet(object.sender) ? String(object.sender) : '',
      denom: isSet(object.denom) ? String(object.denom) : '',
      blockedAddress: isSet(object.blockedAddress)
        ? String(object.blockedAddress)
        : '',
    };
  },

  toJSON(message: MsgBlockAddress): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.denom !== undefined && (obj.denom = message.denom);
    message.blockedAddress !== undefined &&
      (obj.blockedAddress = message.blockedAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgBlockAddress>, I>>(
    object: I
  ): MsgBlockAddress {
    const message = createBaseMsgBlockAddress();
    message.sender = object.sender ?? '';
    message.denom = object.denom ?? '';
    message.blockedAddress = object.blockedAddress ?? '';
    return message;
  },
};

function createBaseMsgBlockAddressResponse(): MsgBlockAddressResponse {
  return {};
}

export const MsgBlockAddressResponse = {
  encode(
    _: MsgBlockAddressResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgBlockAddressResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBlockAddressResponse();
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

  fromJSON(_: any): MsgBlockAddressResponse {
    return {};
  },

  toJSON(_: MsgBlockAddressResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgBlockAddressResponse>, I>>(
    _: I
  ): MsgBlockAddressResponse {
    const message = createBaseMsgBlockAddressResponse();
    return message;
  },
};

function createBaseMsgUnblockAddress(): MsgUnblockAddress {
  return { sender: '', denom: '', blockedAddress: '' };
}

export const MsgUnblockAddress = {
  encode(
    message: MsgUnblockAddress,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sender !== '') {
      writer.uint32(10).string(message.sender);
    }
    if (message.denom !== '') {
      writer.uint32(18).string(message.denom);
    }
    if (message.blockedAddress !== '') {
      writer.uint32(26).string(message.blockedAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnblockAddress {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnblockAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        case 3:
          message.blockedAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUnblockAddress {
    return {
      sender: isSet(object.sender) ? String(object.sender) : '',
      denom: isSet(object.denom) ? String(object.denom) : '',
      blockedAddress: isSet(object.blockedAddress)
        ? String(object.blockedAddress)
        : '',
    };
  },

  toJSON(message: MsgUnblockAddress): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.denom !== undefined && (obj.denom = message.denom);
    message.blockedAddress !== undefined &&
      (obj.blockedAddress = message.blockedAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUnblockAddress>, I>>(
    object: I
  ): MsgUnblockAddress {
    const message = createBaseMsgUnblockAddress();
    message.sender = object.sender ?? '';
    message.denom = object.denom ?? '';
    message.blockedAddress = object.blockedAddress ?? '';
    return message;
  },
};

function createBaseMsgUnblockAddressResponse(): MsgUnblockAddressResponse {
  return {};
}

export const MsgUnblockAddressResponse = {
  encode(
    _: MsgUnblockAddressResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUnblockAddressResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnblockAddressResponse();
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

  fromJSON(_: any): MsgUnblockAddressResponse {
    return {};
  },

  toJSON(_: MsgUnblockAddressResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUnblockAddressResponse>, I>>(
    _: I
  ): MsgUnblockAddressResponse {
    const message = createBaseMsgUnblockAddressResponse();
    return message;
  },
};

function createBaseMsgSetPauseStatus(): MsgSetPauseStatus {
  return { sender: '', denom: '', status: false };
}

export const MsgSetPauseStatus = {
  encode(
    message: MsgSetPauseStatus,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sender !== '') {
      writer.uint32(10).string(message.sender);
    }
    if (message.denom !== '') {
      writer.uint32(18).string(message.denom);
    }
    if (message.status === true) {
      writer.uint32(24).bool(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetPauseStatus {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetPauseStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        case 3:
          message.status = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetPauseStatus {
    return {
      sender: isSet(object.sender) ? String(object.sender) : '',
      denom: isSet(object.denom) ? String(object.denom) : '',
      status: isSet(object.status) ? Boolean(object.status) : false,
    };
  },

  toJSON(message: MsgSetPauseStatus): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.denom !== undefined && (obj.denom = message.denom);
    message.status !== undefined && (obj.status = message.status);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetPauseStatus>, I>>(
    object: I
  ): MsgSetPauseStatus {
    const message = createBaseMsgSetPauseStatus();
    message.sender = object.sender ?? '';
    message.denom = object.denom ?? '';
    message.status = object.status ?? false;
    return message;
  },
};

function createBaseMsgSetPauseStatusResponse(): MsgSetPauseStatusResponse {
  return {};
}

export const MsgSetPauseStatusResponse = {
  encode(
    _: MsgSetPauseStatusResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgSetPauseStatusResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetPauseStatusResponse();
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

  fromJSON(_: any): MsgSetPauseStatusResponse {
    return {};
  },

  toJSON(_: MsgSetPauseStatusResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetPauseStatusResponse>, I>>(
    _: I
  ): MsgSetPauseStatusResponse {
    const message = createBaseMsgSetPauseStatusResponse();
    return message;
  },
};

/** Msg defines the issuance Msg service. */
export interface Msg {
  /** IssueTokens message type used by the issuer to issue new tokens */
  IssueTokens(request: MsgIssueTokens): Promise<MsgIssueTokensResponse>;
  /** RedeemTokens message type used by the issuer to redeem (burn) tokens */
  RedeemTokens(request: MsgRedeemTokens): Promise<MsgRedeemTokensResponse>;
  /** BlockAddress message type used by the issuer to block an address from holding or transferring tokens */
  BlockAddress(request: MsgBlockAddress): Promise<MsgBlockAddressResponse>;
  /** UnblockAddress message type used by the issuer to unblock an address from holding or transferring tokens */
  UnblockAddress(
    request: MsgUnblockAddress
  ): Promise<MsgUnblockAddressResponse>;
  /** SetPauseStatus message type used to pause or unpause status */
  SetPauseStatus(
    request: MsgSetPauseStatus
  ): Promise<MsgSetPauseStatusResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.IssueTokens = this.IssueTokens.bind(this);
    this.RedeemTokens = this.RedeemTokens.bind(this);
    this.BlockAddress = this.BlockAddress.bind(this);
    this.UnblockAddress = this.UnblockAddress.bind(this);
    this.SetPauseStatus = this.SetPauseStatus.bind(this);
  }
  IssueTokens(request: MsgIssueTokens): Promise<MsgIssueTokensResponse> {
    const data = MsgIssueTokens.encode(request).finish();
    const promise = this.rpc.request(
      'kava.issuance.v1beta1.Msg',
      'IssueTokens',
      data
    );
    return promise.then((data) =>
      MsgIssueTokensResponse.decode(new _m0.Reader(data))
    );
  }

  RedeemTokens(request: MsgRedeemTokens): Promise<MsgRedeemTokensResponse> {
    const data = MsgRedeemTokens.encode(request).finish();
    const promise = this.rpc.request(
      'kava.issuance.v1beta1.Msg',
      'RedeemTokens',
      data
    );
    return promise.then((data) =>
      MsgRedeemTokensResponse.decode(new _m0.Reader(data))
    );
  }

  BlockAddress(request: MsgBlockAddress): Promise<MsgBlockAddressResponse> {
    const data = MsgBlockAddress.encode(request).finish();
    const promise = this.rpc.request(
      'kava.issuance.v1beta1.Msg',
      'BlockAddress',
      data
    );
    return promise.then((data) =>
      MsgBlockAddressResponse.decode(new _m0.Reader(data))
    );
  }

  UnblockAddress(
    request: MsgUnblockAddress
  ): Promise<MsgUnblockAddressResponse> {
    const data = MsgUnblockAddress.encode(request).finish();
    const promise = this.rpc.request(
      'kava.issuance.v1beta1.Msg',
      'UnblockAddress',
      data
    );
    return promise.then((data) =>
      MsgUnblockAddressResponse.decode(new _m0.Reader(data))
    );
  }

  SetPauseStatus(
    request: MsgSetPauseStatus
  ): Promise<MsgSetPauseStatusResponse> {
    const data = MsgSetPauseStatus.encode(request).finish();
    const promise = this.rpc.request(
      'kava.issuance.v1beta1.Msg',
      'SetPauseStatus',
      data
    );
    return promise.then((data) =>
      MsgSetPauseStatusResponse.decode(new _m0.Reader(data))
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
