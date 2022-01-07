/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import {
  Params,
  PoolRecord,
  ShareRecord,
} from '../../../kava/swap/v1beta1/swap';

export const protobufPackage = 'kava.swap.v1beta1';

/** GenesisState defines the swap module's genesis state. */
export interface GenesisState {
  /** params defines all the paramaters related to swap */
  params?: Params;
  /** pool_records defines the available pools */
  poolRecords: PoolRecord[];
  /** share_records defines the owned shares of each pool */
  shareRecords: ShareRecord[];
}

function createBaseGenesisState(): GenesisState {
  return { params: undefined, poolRecords: [], shareRecords: [] };
}

export const GenesisState = {
  encode(
    message: GenesisState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.poolRecords) {
      PoolRecord.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.shareRecords) {
      ShareRecord.encode(v!, writer.uint32(26).fork()).ldelim();
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
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.poolRecords.push(PoolRecord.decode(reader, reader.uint32()));
          break;
        case 3:
          message.shareRecords.push(
            ShareRecord.decode(reader, reader.uint32())
          );
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
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      poolRecords: Array.isArray(object?.poolRecords)
        ? object.poolRecords.map((e: any) => PoolRecord.fromJSON(e))
        : [],
      shareRecords: Array.isArray(object?.shareRecords)
        ? object.shareRecords.map((e: any) => ShareRecord.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.poolRecords) {
      obj.poolRecords = message.poolRecords.map((e) =>
        e ? PoolRecord.toJSON(e) : undefined
      );
    } else {
      obj.poolRecords = [];
    }
    if (message.shareRecords) {
      obj.shareRecords = message.shareRecords.map((e) =>
        e ? ShareRecord.toJSON(e) : undefined
      );
    } else {
      obj.shareRecords = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(
    object: I
  ): GenesisState {
    const message = createBaseGenesisState();
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    message.poolRecords =
      object.poolRecords?.map((e) => PoolRecord.fromPartial(e)) || [];
    message.shareRecords =
      object.shareRecords?.map((e) => ShareRecord.fromPartial(e)) || [];
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
