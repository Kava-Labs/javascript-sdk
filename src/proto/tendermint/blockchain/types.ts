/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Block } from '../../tendermint/types/block';

export const protobufPackage = 'tendermint.blockchain';

/** BlockRequest requests a block for a specific height */
export interface BlockRequest {
  height: Long;
}

/** NoBlockResponse informs the node that the peer does not have block at the requested height */
export interface NoBlockResponse {
  height: Long;
}

/** BlockResponse returns block to the requested */
export interface BlockResponse {
  block?: Block;
}

/** StatusRequest requests the status of a peer. */
export interface StatusRequest {}

/** StatusResponse is a peer response to inform their status. */
export interface StatusResponse {
  height: Long;
  base: Long;
}

export interface Message {
  blockRequest?: BlockRequest | undefined;
  noBlockResponse?: NoBlockResponse | undefined;
  blockResponse?: BlockResponse | undefined;
  statusRequest?: StatusRequest | undefined;
  statusResponse?: StatusResponse | undefined;
}

function createBaseBlockRequest(): BlockRequest {
  return { height: Long.ZERO };
}

export const BlockRequest = {
  encode(
    message: BlockRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.height.isZero()) {
      writer.uint32(8).int64(message.height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BlockRequest {
    return {
      height: isSet(object.height) ? Long.fromString(object.height) : Long.ZERO,
    };
  },

  toJSON(message: BlockRequest): unknown {
    const obj: any = {};
    message.height !== undefined &&
      (obj.height = (message.height || Long.ZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BlockRequest>, I>>(
    object: I
  ): BlockRequest {
    const message = createBaseBlockRequest();
    message.height =
      object.height !== undefined && object.height !== null
        ? Long.fromValue(object.height)
        : Long.ZERO;
    return message;
  },
};

function createBaseNoBlockResponse(): NoBlockResponse {
  return { height: Long.ZERO };
}

export const NoBlockResponse = {
  encode(
    message: NoBlockResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.height.isZero()) {
      writer.uint32(8).int64(message.height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NoBlockResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNoBlockResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NoBlockResponse {
    return {
      height: isSet(object.height) ? Long.fromString(object.height) : Long.ZERO,
    };
  },

  toJSON(message: NoBlockResponse): unknown {
    const obj: any = {};
    message.height !== undefined &&
      (obj.height = (message.height || Long.ZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NoBlockResponse>, I>>(
    object: I
  ): NoBlockResponse {
    const message = createBaseNoBlockResponse();
    message.height =
      object.height !== undefined && object.height !== null
        ? Long.fromValue(object.height)
        : Long.ZERO;
    return message;
  },
};

function createBaseBlockResponse(): BlockResponse {
  return { block: undefined };
}

export const BlockResponse = {
  encode(
    message: BlockResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.block !== undefined) {
      Block.encode(message.block, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.block = Block.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BlockResponse {
    return {
      block: isSet(object.block) ? Block.fromJSON(object.block) : undefined,
    };
  },

  toJSON(message: BlockResponse): unknown {
    const obj: any = {};
    message.block !== undefined &&
      (obj.block = message.block ? Block.toJSON(message.block) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BlockResponse>, I>>(
    object: I
  ): BlockResponse {
    const message = createBaseBlockResponse();
    message.block =
      object.block !== undefined && object.block !== null
        ? Block.fromPartial(object.block)
        : undefined;
    return message;
  },
};

function createBaseStatusRequest(): StatusRequest {
  return {};
}

export const StatusRequest = {
  encode(
    _: StatusRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatusRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatusRequest();
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

  fromJSON(_: any): StatusRequest {
    return {};
  },

  toJSON(_: StatusRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StatusRequest>, I>>(
    _: I
  ): StatusRequest {
    const message = createBaseStatusRequest();
    return message;
  },
};

function createBaseStatusResponse(): StatusResponse {
  return { height: Long.ZERO, base: Long.ZERO };
}

export const StatusResponse = {
  encode(
    message: StatusResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.height.isZero()) {
      writer.uint32(8).int64(message.height);
    }
    if (!message.base.isZero()) {
      writer.uint32(16).int64(message.base);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatusResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatusResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = reader.int64() as Long;
          break;
        case 2:
          message.base = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StatusResponse {
    return {
      height: isSet(object.height) ? Long.fromString(object.height) : Long.ZERO,
      base: isSet(object.base) ? Long.fromString(object.base) : Long.ZERO,
    };
  },

  toJSON(message: StatusResponse): unknown {
    const obj: any = {};
    message.height !== undefined &&
      (obj.height = (message.height || Long.ZERO).toString());
    message.base !== undefined &&
      (obj.base = (message.base || Long.ZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StatusResponse>, I>>(
    object: I
  ): StatusResponse {
    const message = createBaseStatusResponse();
    message.height =
      object.height !== undefined && object.height !== null
        ? Long.fromValue(object.height)
        : Long.ZERO;
    message.base =
      object.base !== undefined && object.base !== null
        ? Long.fromValue(object.base)
        : Long.ZERO;
    return message;
  },
};

function createBaseMessage(): Message {
  return {
    blockRequest: undefined,
    noBlockResponse: undefined,
    blockResponse: undefined,
    statusRequest: undefined,
    statusResponse: undefined,
  };
}

export const Message = {
  encode(
    message: Message,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.blockRequest !== undefined) {
      BlockRequest.encode(
        message.blockRequest,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.noBlockResponse !== undefined) {
      NoBlockResponse.encode(
        message.noBlockResponse,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.blockResponse !== undefined) {
      BlockResponse.encode(
        message.blockResponse,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.statusRequest !== undefined) {
      StatusRequest.encode(
        message.statusRequest,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.statusResponse !== undefined) {
      StatusResponse.encode(
        message.statusResponse,
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Message {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.blockRequest = BlockRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.noBlockResponse = NoBlockResponse.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.blockResponse = BlockResponse.decode(reader, reader.uint32());
          break;
        case 4:
          message.statusRequest = StatusRequest.decode(reader, reader.uint32());
          break;
        case 5:
          message.statusResponse = StatusResponse.decode(
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

  fromJSON(object: any): Message {
    return {
      blockRequest: isSet(object.blockRequest)
        ? BlockRequest.fromJSON(object.blockRequest)
        : undefined,
      noBlockResponse: isSet(object.noBlockResponse)
        ? NoBlockResponse.fromJSON(object.noBlockResponse)
        : undefined,
      blockResponse: isSet(object.blockResponse)
        ? BlockResponse.fromJSON(object.blockResponse)
        : undefined,
      statusRequest: isSet(object.statusRequest)
        ? StatusRequest.fromJSON(object.statusRequest)
        : undefined,
      statusResponse: isSet(object.statusResponse)
        ? StatusResponse.fromJSON(object.statusResponse)
        : undefined,
    };
  },

  toJSON(message: Message): unknown {
    const obj: any = {};
    message.blockRequest !== undefined &&
      (obj.blockRequest = message.blockRequest
        ? BlockRequest.toJSON(message.blockRequest)
        : undefined);
    message.noBlockResponse !== undefined &&
      (obj.noBlockResponse = message.noBlockResponse
        ? NoBlockResponse.toJSON(message.noBlockResponse)
        : undefined);
    message.blockResponse !== undefined &&
      (obj.blockResponse = message.blockResponse
        ? BlockResponse.toJSON(message.blockResponse)
        : undefined);
    message.statusRequest !== undefined &&
      (obj.statusRequest = message.statusRequest
        ? StatusRequest.toJSON(message.statusRequest)
        : undefined);
    message.statusResponse !== undefined &&
      (obj.statusResponse = message.statusResponse
        ? StatusResponse.toJSON(message.statusResponse)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Message>, I>>(object: I): Message {
    const message = createBaseMessage();
    message.blockRequest =
      object.blockRequest !== undefined && object.blockRequest !== null
        ? BlockRequest.fromPartial(object.blockRequest)
        : undefined;
    message.noBlockResponse =
      object.noBlockResponse !== undefined && object.noBlockResponse !== null
        ? NoBlockResponse.fromPartial(object.noBlockResponse)
        : undefined;
    message.blockResponse =
      object.blockResponse !== undefined && object.blockResponse !== null
        ? BlockResponse.fromPartial(object.blockResponse)
        : undefined;
    message.statusRequest =
      object.statusRequest !== undefined && object.statusRequest !== null
        ? StatusRequest.fromPartial(object.statusRequest)
        : undefined;
    message.statusResponse =
      object.statusResponse !== undefined && object.statusResponse !== null
        ? StatusResponse.fromPartial(object.statusResponse)
        : undefined;
    return message;
  },
};

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
