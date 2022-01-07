/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Timestamp } from '../../../google/protobuf/timestamp';

export const protobufPackage = 'kava.pricefeed.v1beta1';

/** MsgPostPrice represents a method for creating a new post price */
export interface MsgPostPrice {
  /** address of client */
  from: string;
  marketId: string;
  price: string;
  expiry?: Date;
}

/** MsgPostPriceResponse defines the Msg/PostPrice response type. */
export interface MsgPostPriceResponse {}

function createBaseMsgPostPrice(): MsgPostPrice {
  return { from: '', marketId: '', price: '', expiry: undefined };
}

export const MsgPostPrice = {
  encode(
    message: MsgPostPrice,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.from !== '') {
      writer.uint32(10).string(message.from);
    }
    if (message.marketId !== '') {
      writer.uint32(18).string(message.marketId);
    }
    if (message.price !== '') {
      writer.uint32(26).string(message.price);
    }
    if (message.expiry !== undefined) {
      Timestamp.encode(
        toTimestamp(message.expiry),
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgPostPrice {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPostPrice();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.marketId = reader.string();
          break;
        case 3:
          message.price = reader.string();
          break;
        case 4:
          message.expiry = fromTimestamp(
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

  fromJSON(object: any): MsgPostPrice {
    return {
      from: isSet(object.from) ? String(object.from) : '',
      marketId: isSet(object.marketId) ? String(object.marketId) : '',
      price: isSet(object.price) ? String(object.price) : '',
      expiry: isSet(object.expiry)
        ? fromJsonTimestamp(object.expiry)
        : undefined,
    };
  },

  toJSON(message: MsgPostPrice): unknown {
    const obj: any = {};
    message.from !== undefined && (obj.from = message.from);
    message.marketId !== undefined && (obj.marketId = message.marketId);
    message.price !== undefined && (obj.price = message.price);
    message.expiry !== undefined && (obj.expiry = message.expiry.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgPostPrice>, I>>(
    object: I
  ): MsgPostPrice {
    const message = createBaseMsgPostPrice();
    message.from = object.from ?? '';
    message.marketId = object.marketId ?? '';
    message.price = object.price ?? '';
    message.expiry = object.expiry ?? undefined;
    return message;
  },
};

function createBaseMsgPostPriceResponse(): MsgPostPriceResponse {
  return {};
}

export const MsgPostPriceResponse = {
  encode(
    _: MsgPostPriceResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgPostPriceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPostPriceResponse();
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

  fromJSON(_: any): MsgPostPriceResponse {
    return {};
  },

  toJSON(_: MsgPostPriceResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgPostPriceResponse>, I>>(
    _: I
  ): MsgPostPriceResponse {
    const message = createBaseMsgPostPriceResponse();
    return message;
  },
};

/** Msg defines the pricefeed Msg service. */
export interface Msg {
  /** PostPrice defines a method for creating a new post price */
  PostPrice(request: MsgPostPrice): Promise<MsgPostPriceResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.PostPrice = this.PostPrice.bind(this);
  }
  PostPrice(request: MsgPostPrice): Promise<MsgPostPriceResponse> {
    const data = MsgPostPrice.encode(request).finish();
    const promise = this.rpc.request(
      'kava.pricefeed.v1beta1.Msg',
      'PostPrice',
      data
    );
    return promise.then((data) =>
      MsgPostPriceResponse.decode(new _m0.Reader(data))
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
