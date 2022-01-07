/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';

export const protobufPackage = 'kava.incentive.v1beta1';

/**
 * Selection is a pair of denom and multiplier name. It holds the choice of multiplier a user makes when they claim a
 * denom.
 */
export interface Selection {
  denom: string;
  multiplierName: string;
}

/** MsgClaimUSDXMintingReward message type used to claim USDX minting rewards */
export interface MsgClaimUSDXMintingReward {
  sender: string;
  multiplierName: string;
}

/** MsgClaimUSDXMintingRewardResponse defines the Msg/ClaimUSDXMintingReward response type. */
export interface MsgClaimUSDXMintingRewardResponse {}

/** MsgClaimHardReward message type used to claim Hard liquidity provider rewards */
export interface MsgClaimHardReward {
  sender: string;
  denomsToClaim: Selection[];
}

/** MsgClaimHardRewardResponse defines the Msg/ClaimHardReward response type. */
export interface MsgClaimHardRewardResponse {}

/** MsgClaimDelegatorReward message type used to claim delegator rewards */
export interface MsgClaimDelegatorReward {
  sender: string;
  denomsToClaim: Selection[];
}

/** MsgClaimDelegatorRewardResponse defines the Msg/ClaimDelegatorReward response type. */
export interface MsgClaimDelegatorRewardResponse {}

/** MsgClaimSwapReward message type used to claim delegator rewards */
export interface MsgClaimSwapReward {
  sender: string;
  denomsToClaim: Selection[];
}

/** MsgClaimSwapRewardResponse defines the Msg/ClaimSwapReward response type. */
export interface MsgClaimSwapRewardResponse {}

function createBaseSelection(): Selection {
  return { denom: '', multiplierName: '' };
}

export const Selection = {
  encode(
    message: Selection,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.denom !== '') {
      writer.uint32(10).string(message.denom);
    }
    if (message.multiplierName !== '') {
      writer.uint32(18).string(message.multiplierName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Selection {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSelection();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.multiplierName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Selection {
    return {
      denom: isSet(object.denom) ? String(object.denom) : '',
      multiplierName: isSet(object.multiplierName)
        ? String(object.multiplierName)
        : '',
    };
  },

  toJSON(message: Selection): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    message.multiplierName !== undefined &&
      (obj.multiplierName = message.multiplierName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Selection>, I>>(
    object: I
  ): Selection {
    const message = createBaseSelection();
    message.denom = object.denom ?? '';
    message.multiplierName = object.multiplierName ?? '';
    return message;
  },
};

function createBaseMsgClaimUSDXMintingReward(): MsgClaimUSDXMintingReward {
  return { sender: '', multiplierName: '' };
}

export const MsgClaimUSDXMintingReward = {
  encode(
    message: MsgClaimUSDXMintingReward,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sender !== '') {
      writer.uint32(10).string(message.sender);
    }
    if (message.multiplierName !== '') {
      writer.uint32(18).string(message.multiplierName);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgClaimUSDXMintingReward {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimUSDXMintingReward();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.multiplierName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgClaimUSDXMintingReward {
    return {
      sender: isSet(object.sender) ? String(object.sender) : '',
      multiplierName: isSet(object.multiplierName)
        ? String(object.multiplierName)
        : '',
    };
  },

  toJSON(message: MsgClaimUSDXMintingReward): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.multiplierName !== undefined &&
      (obj.multiplierName = message.multiplierName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgClaimUSDXMintingReward>, I>>(
    object: I
  ): MsgClaimUSDXMintingReward {
    const message = createBaseMsgClaimUSDXMintingReward();
    message.sender = object.sender ?? '';
    message.multiplierName = object.multiplierName ?? '';
    return message;
  },
};

function createBaseMsgClaimUSDXMintingRewardResponse(): MsgClaimUSDXMintingRewardResponse {
  return {};
}

export const MsgClaimUSDXMintingRewardResponse = {
  encode(
    _: MsgClaimUSDXMintingRewardResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgClaimUSDXMintingRewardResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimUSDXMintingRewardResponse();
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

  fromJSON(_: any): MsgClaimUSDXMintingRewardResponse {
    return {};
  },

  toJSON(_: MsgClaimUSDXMintingRewardResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<MsgClaimUSDXMintingRewardResponse>, I>
  >(_: I): MsgClaimUSDXMintingRewardResponse {
    const message = createBaseMsgClaimUSDXMintingRewardResponse();
    return message;
  },
};

function createBaseMsgClaimHardReward(): MsgClaimHardReward {
  return { sender: '', denomsToClaim: [] };
}

export const MsgClaimHardReward = {
  encode(
    message: MsgClaimHardReward,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sender !== '') {
      writer.uint32(10).string(message.sender);
    }
    for (const v of message.denomsToClaim) {
      Selection.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgClaimHardReward {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimHardReward();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.denomsToClaim.push(Selection.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgClaimHardReward {
    return {
      sender: isSet(object.sender) ? String(object.sender) : '',
      denomsToClaim: Array.isArray(object?.denomsToClaim)
        ? object.denomsToClaim.map((e: any) => Selection.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgClaimHardReward): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    if (message.denomsToClaim) {
      obj.denomsToClaim = message.denomsToClaim.map((e) =>
        e ? Selection.toJSON(e) : undefined
      );
    } else {
      obj.denomsToClaim = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgClaimHardReward>, I>>(
    object: I
  ): MsgClaimHardReward {
    const message = createBaseMsgClaimHardReward();
    message.sender = object.sender ?? '';
    message.denomsToClaim =
      object.denomsToClaim?.map((e) => Selection.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgClaimHardRewardResponse(): MsgClaimHardRewardResponse {
  return {};
}

export const MsgClaimHardRewardResponse = {
  encode(
    _: MsgClaimHardRewardResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgClaimHardRewardResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimHardRewardResponse();
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

  fromJSON(_: any): MsgClaimHardRewardResponse {
    return {};
  },

  toJSON(_: MsgClaimHardRewardResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgClaimHardRewardResponse>, I>>(
    _: I
  ): MsgClaimHardRewardResponse {
    const message = createBaseMsgClaimHardRewardResponse();
    return message;
  },
};

function createBaseMsgClaimDelegatorReward(): MsgClaimDelegatorReward {
  return { sender: '', denomsToClaim: [] };
}

export const MsgClaimDelegatorReward = {
  encode(
    message: MsgClaimDelegatorReward,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sender !== '') {
      writer.uint32(10).string(message.sender);
    }
    for (const v of message.denomsToClaim) {
      Selection.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgClaimDelegatorReward {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimDelegatorReward();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.denomsToClaim.push(Selection.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgClaimDelegatorReward {
    return {
      sender: isSet(object.sender) ? String(object.sender) : '',
      denomsToClaim: Array.isArray(object?.denomsToClaim)
        ? object.denomsToClaim.map((e: any) => Selection.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgClaimDelegatorReward): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    if (message.denomsToClaim) {
      obj.denomsToClaim = message.denomsToClaim.map((e) =>
        e ? Selection.toJSON(e) : undefined
      );
    } else {
      obj.denomsToClaim = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgClaimDelegatorReward>, I>>(
    object: I
  ): MsgClaimDelegatorReward {
    const message = createBaseMsgClaimDelegatorReward();
    message.sender = object.sender ?? '';
    message.denomsToClaim =
      object.denomsToClaim?.map((e) => Selection.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgClaimDelegatorRewardResponse(): MsgClaimDelegatorRewardResponse {
  return {};
}

export const MsgClaimDelegatorRewardResponse = {
  encode(
    _: MsgClaimDelegatorRewardResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgClaimDelegatorRewardResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimDelegatorRewardResponse();
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

  fromJSON(_: any): MsgClaimDelegatorRewardResponse {
    return {};
  },

  toJSON(_: MsgClaimDelegatorRewardResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgClaimDelegatorRewardResponse>, I>>(
    _: I
  ): MsgClaimDelegatorRewardResponse {
    const message = createBaseMsgClaimDelegatorRewardResponse();
    return message;
  },
};

function createBaseMsgClaimSwapReward(): MsgClaimSwapReward {
  return { sender: '', denomsToClaim: [] };
}

export const MsgClaimSwapReward = {
  encode(
    message: MsgClaimSwapReward,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sender !== '') {
      writer.uint32(10).string(message.sender);
    }
    for (const v of message.denomsToClaim) {
      Selection.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgClaimSwapReward {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimSwapReward();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.denomsToClaim.push(Selection.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgClaimSwapReward {
    return {
      sender: isSet(object.sender) ? String(object.sender) : '',
      denomsToClaim: Array.isArray(object?.denomsToClaim)
        ? object.denomsToClaim.map((e: any) => Selection.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgClaimSwapReward): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    if (message.denomsToClaim) {
      obj.denomsToClaim = message.denomsToClaim.map((e) =>
        e ? Selection.toJSON(e) : undefined
      );
    } else {
      obj.denomsToClaim = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgClaimSwapReward>, I>>(
    object: I
  ): MsgClaimSwapReward {
    const message = createBaseMsgClaimSwapReward();
    message.sender = object.sender ?? '';
    message.denomsToClaim =
      object.denomsToClaim?.map((e) => Selection.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgClaimSwapRewardResponse(): MsgClaimSwapRewardResponse {
  return {};
}

export const MsgClaimSwapRewardResponse = {
  encode(
    _: MsgClaimSwapRewardResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgClaimSwapRewardResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimSwapRewardResponse();
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

  fromJSON(_: any): MsgClaimSwapRewardResponse {
    return {};
  },

  toJSON(_: MsgClaimSwapRewardResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgClaimSwapRewardResponse>, I>>(
    _: I
  ): MsgClaimSwapRewardResponse {
    const message = createBaseMsgClaimSwapRewardResponse();
    return message;
  },
};

/** Msg defines the incentive Msg service. */
export interface Msg {
  /** ClaimUSDXMintingReward is a message type used to claim USDX minting rewards */
  ClaimUSDXMintingReward(
    request: MsgClaimUSDXMintingReward
  ): Promise<MsgClaimUSDXMintingRewardResponse>;
  /** ClaimHardReward is a message type used to claim Hard liquidity provider rewards */
  ClaimHardReward(
    request: MsgClaimHardReward
  ): Promise<MsgClaimHardRewardResponse>;
  /** ClaimDelegatorReward is a message type used to claim delegator rewards */
  ClaimDelegatorReward(
    request: MsgClaimDelegatorReward
  ): Promise<MsgClaimDelegatorRewardResponse>;
  /** ClaimSwapReward is a message type used to claim delegator rewards */
  ClaimSwapReward(
    request: MsgClaimSwapReward
  ): Promise<MsgClaimSwapRewardResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ClaimUSDXMintingReward = this.ClaimUSDXMintingReward.bind(this);
    this.ClaimHardReward = this.ClaimHardReward.bind(this);
    this.ClaimDelegatorReward = this.ClaimDelegatorReward.bind(this);
    this.ClaimSwapReward = this.ClaimSwapReward.bind(this);
  }
  ClaimUSDXMintingReward(
    request: MsgClaimUSDXMintingReward
  ): Promise<MsgClaimUSDXMintingRewardResponse> {
    const data = MsgClaimUSDXMintingReward.encode(request).finish();
    const promise = this.rpc.request(
      'kava.incentive.v1beta1.Msg',
      'ClaimUSDXMintingReward',
      data
    );
    return promise.then((data) =>
      MsgClaimUSDXMintingRewardResponse.decode(new _m0.Reader(data))
    );
  }

  ClaimHardReward(
    request: MsgClaimHardReward
  ): Promise<MsgClaimHardRewardResponse> {
    const data = MsgClaimHardReward.encode(request).finish();
    const promise = this.rpc.request(
      'kava.incentive.v1beta1.Msg',
      'ClaimHardReward',
      data
    );
    return promise.then((data) =>
      MsgClaimHardRewardResponse.decode(new _m0.Reader(data))
    );
  }

  ClaimDelegatorReward(
    request: MsgClaimDelegatorReward
  ): Promise<MsgClaimDelegatorRewardResponse> {
    const data = MsgClaimDelegatorReward.encode(request).finish();
    const promise = this.rpc.request(
      'kava.incentive.v1beta1.Msg',
      'ClaimDelegatorReward',
      data
    );
    return promise.then((data) =>
      MsgClaimDelegatorRewardResponse.decode(new _m0.Reader(data))
    );
  }

  ClaimSwapReward(
    request: MsgClaimSwapReward
  ): Promise<MsgClaimSwapRewardResponse> {
    const data = MsgClaimSwapReward.encode(request).finish();
    const promise = this.rpc.request(
      'kava.incentive.v1beta1.Msg',
      'ClaimSwapReward',
      data
    );
    return promise.then((data) =>
      MsgClaimSwapRewardResponse.decode(new _m0.Reader(data))
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
