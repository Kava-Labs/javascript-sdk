/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Coin } from '../../../cosmos/base/v1beta1/coin';

export const protobufPackage = 'kava.kavadist.v1beta1';

/**
 * CommunityPoolMultiSpendProposal spends from the community pool by sending to one or more
 * addresses
 */
export interface CommunityPoolMultiSpendProposal {
  title: string;
  description: string;
  recipientList: MultiSpendRecipient[];
}

/** CommunityPoolMultiSpendProposalJSON defines a CommunityPoolMultiSpendProposal with a deposit */
export interface CommunityPoolMultiSpendProposalJSON {
  title: string;
  description: string;
  recipientList: MultiSpendRecipient[];
  deposit: Coin[];
}

/** MultiSpendRecipient defines a recipient and the amount of coins they are receiving */
export interface MultiSpendRecipient {
  address: string;
  amount: Coin[];
}

function createBaseCommunityPoolMultiSpendProposal(): CommunityPoolMultiSpendProposal {
  return { title: '', description: '', recipientList: [] };
}

export const CommunityPoolMultiSpendProposal = {
  encode(
    message: CommunityPoolMultiSpendProposal,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.title !== '') {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== '') {
      writer.uint32(18).string(message.description);
    }
    for (const v of message.recipientList) {
      MultiSpendRecipient.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommunityPoolMultiSpendProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommunityPoolMultiSpendProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.recipientList.push(
            MultiSpendRecipient.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommunityPoolMultiSpendProposal {
    return {
      title: isSet(object.title) ? String(object.title) : '',
      description: isSet(object.description) ? String(object.description) : '',
      recipientList: Array.isArray(object?.recipientList)
        ? object.recipientList.map((e: any) => MultiSpendRecipient.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CommunityPoolMultiSpendProposal): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined &&
      (obj.description = message.description);
    if (message.recipientList) {
      obj.recipientList = message.recipientList.map((e) =>
        e ? MultiSpendRecipient.toJSON(e) : undefined
      );
    } else {
      obj.recipientList = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommunityPoolMultiSpendProposal>, I>>(
    object: I
  ): CommunityPoolMultiSpendProposal {
    const message = createBaseCommunityPoolMultiSpendProposal();
    message.title = object.title ?? '';
    message.description = object.description ?? '';
    message.recipientList =
      object.recipientList?.map((e) => MultiSpendRecipient.fromPartial(e)) ||
      [];
    return message;
  },
};

function createBaseCommunityPoolMultiSpendProposalJSON(): CommunityPoolMultiSpendProposalJSON {
  return { title: '', description: '', recipientList: [], deposit: [] };
}

export const CommunityPoolMultiSpendProposalJSON = {
  encode(
    message: CommunityPoolMultiSpendProposalJSON,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.title !== '') {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== '') {
      writer.uint32(18).string(message.description);
    }
    for (const v of message.recipientList) {
      MultiSpendRecipient.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.deposit) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommunityPoolMultiSpendProposalJSON {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommunityPoolMultiSpendProposalJSON();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.recipientList.push(
            MultiSpendRecipient.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.deposit.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommunityPoolMultiSpendProposalJSON {
    return {
      title: isSet(object.title) ? String(object.title) : '',
      description: isSet(object.description) ? String(object.description) : '',
      recipientList: Array.isArray(object?.recipientList)
        ? object.recipientList.map((e: any) => MultiSpendRecipient.fromJSON(e))
        : [],
      deposit: Array.isArray(object?.deposit)
        ? object.deposit.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CommunityPoolMultiSpendProposalJSON): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined &&
      (obj.description = message.description);
    if (message.recipientList) {
      obj.recipientList = message.recipientList.map((e) =>
        e ? MultiSpendRecipient.toJSON(e) : undefined
      );
    } else {
      obj.recipientList = [];
    }
    if (message.deposit) {
      obj.deposit = message.deposit.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.deposit = [];
    }
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<CommunityPoolMultiSpendProposalJSON>, I>
  >(object: I): CommunityPoolMultiSpendProposalJSON {
    const message = createBaseCommunityPoolMultiSpendProposalJSON();
    message.title = object.title ?? '';
    message.description = object.description ?? '';
    message.recipientList =
      object.recipientList?.map((e) => MultiSpendRecipient.fromPartial(e)) ||
      [];
    message.deposit = object.deposit?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMultiSpendRecipient(): MultiSpendRecipient {
  return { address: '', amount: [] };
}

export const MultiSpendRecipient = {
  encode(
    message: MultiSpendRecipient,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== '') {
      writer.uint32(10).string(message.address);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MultiSpendRecipient {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMultiSpendRecipient();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
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

  fromJSON(object: any): MultiSpendRecipient {
    return {
      address: isSet(object.address) ? String(object.address) : '',
      amount: Array.isArray(object?.amount)
        ? object.amount.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MultiSpendRecipient): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    if (message.amount) {
      obj.amount = message.amount.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.amount = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MultiSpendRecipient>, I>>(
    object: I
  ): MultiSpendRecipient {
    const message = createBaseMultiSpendRecipient();
    message.address = object.address ?? '';
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
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
