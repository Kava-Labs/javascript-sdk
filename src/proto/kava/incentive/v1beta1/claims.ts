/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Coin } from '../../../cosmos/base/v1beta1/coin';

export const protobufPackage = 'kava.incentive.v1beta1';

/** BaseClaim is a claim with a single reward coin types */
export interface BaseClaim {
  owner: Uint8Array;
  reward?: Coin;
}

/** BaseMultiClaim is a claim with multiple reward coin types */
export interface BaseMultiClaim {
  owner: Uint8Array;
  reward: Coin[];
}

/** RewardIndex stores reward accumulation information */
export interface RewardIndex {
  collateralType: string;
  rewardFactor: Uint8Array;
}

/** RewardIndexesProto defines a Protobuf wrapper around a RewardIndexes slice */
export interface RewardIndexesProto {
  rewardIndexes: RewardIndex[];
}

/** MultiRewardIndex stores reward accumulation information on multiple reward types */
export interface MultiRewardIndex {
  collateralType: string;
  rewardIndexes: RewardIndex[];
}

/** MultiRewardIndexesProto defines a Protobuf wrapper around a MultiRewardIndexes slice */
export interface MultiRewardIndexesProto {
  multiRewardIndexes: MultiRewardIndex[];
}

/** USDXMintingClaim is for USDX minting rewards */
export interface USDXMintingClaim {
  baseClaim?: BaseClaim;
  rewardIndexes: RewardIndex[];
}

/** HardLiquidityProviderClaim stores the hard liquidity provider rewards that can be claimed by owner */
export interface HardLiquidityProviderClaim {
  baseClaim?: BaseMultiClaim;
  supplyRewardIndexes: MultiRewardIndex[];
  borrowRewardIndexes: MultiRewardIndex[];
}

/** DelegatorClaim stores delegation rewards that can be claimed by owner */
export interface DelegatorClaim {
  baseClaim?: BaseMultiClaim;
  rewardIndexes: MultiRewardIndex[];
}

/** SwapClaim stores the swap rewards that can be claimed by owner */
export interface SwapClaim {
  baseClaim?: BaseMultiClaim;
  rewardIndexes: MultiRewardIndex[];
}

function createBaseBaseClaim(): BaseClaim {
  return { owner: new Uint8Array(), reward: undefined };
}

export const BaseClaim = {
  encode(
    message: BaseClaim,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner.length !== 0) {
      writer.uint32(10).bytes(message.owner);
    }
    if (message.reward !== undefined) {
      Coin.encode(message.reward, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BaseClaim {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBaseClaim();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.bytes();
          break;
        case 2:
          message.reward = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BaseClaim {
    return {
      owner: isSet(object.owner)
        ? bytesFromBase64(object.owner)
        : new Uint8Array(),
      reward: isSet(object.reward) ? Coin.fromJSON(object.reward) : undefined,
    };
  },

  toJSON(message: BaseClaim): unknown {
    const obj: any = {};
    message.owner !== undefined &&
      (obj.owner = base64FromBytes(
        message.owner !== undefined ? message.owner : new Uint8Array()
      ));
    message.reward !== undefined &&
      (obj.reward = message.reward ? Coin.toJSON(message.reward) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BaseClaim>, I>>(
    object: I
  ): BaseClaim {
    const message = createBaseBaseClaim();
    message.owner = object.owner ?? new Uint8Array();
    message.reward =
      object.reward !== undefined && object.reward !== null
        ? Coin.fromPartial(object.reward)
        : undefined;
    return message;
  },
};

function createBaseBaseMultiClaim(): BaseMultiClaim {
  return { owner: new Uint8Array(), reward: [] };
}

export const BaseMultiClaim = {
  encode(
    message: BaseMultiClaim,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner.length !== 0) {
      writer.uint32(10).bytes(message.owner);
    }
    for (const v of message.reward) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BaseMultiClaim {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBaseMultiClaim();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.bytes();
          break;
        case 2:
          message.reward.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BaseMultiClaim {
    return {
      owner: isSet(object.owner)
        ? bytesFromBase64(object.owner)
        : new Uint8Array(),
      reward: Array.isArray(object?.reward)
        ? object.reward.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: BaseMultiClaim): unknown {
    const obj: any = {};
    message.owner !== undefined &&
      (obj.owner = base64FromBytes(
        message.owner !== undefined ? message.owner : new Uint8Array()
      ));
    if (message.reward) {
      obj.reward = message.reward.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.reward = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BaseMultiClaim>, I>>(
    object: I
  ): BaseMultiClaim {
    const message = createBaseBaseMultiClaim();
    message.owner = object.owner ?? new Uint8Array();
    message.reward = object.reward?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRewardIndex(): RewardIndex {
  return { collateralType: '', rewardFactor: new Uint8Array() };
}

export const RewardIndex = {
  encode(
    message: RewardIndex,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.collateralType !== '') {
      writer.uint32(10).string(message.collateralType);
    }
    if (message.rewardFactor.length !== 0) {
      writer.uint32(18).bytes(message.rewardFactor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RewardIndex {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRewardIndex();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collateralType = reader.string();
          break;
        case 2:
          message.rewardFactor = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RewardIndex {
    return {
      collateralType: isSet(object.collateralType)
        ? String(object.collateralType)
        : '',
      rewardFactor: isSet(object.rewardFactor)
        ? bytesFromBase64(object.rewardFactor)
        : new Uint8Array(),
    };
  },

  toJSON(message: RewardIndex): unknown {
    const obj: any = {};
    message.collateralType !== undefined &&
      (obj.collateralType = message.collateralType);
    message.rewardFactor !== undefined &&
      (obj.rewardFactor = base64FromBytes(
        message.rewardFactor !== undefined
          ? message.rewardFactor
          : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RewardIndex>, I>>(
    object: I
  ): RewardIndex {
    const message = createBaseRewardIndex();
    message.collateralType = object.collateralType ?? '';
    message.rewardFactor = object.rewardFactor ?? new Uint8Array();
    return message;
  },
};

function createBaseRewardIndexesProto(): RewardIndexesProto {
  return { rewardIndexes: [] };
}

export const RewardIndexesProto = {
  encode(
    message: RewardIndexesProto,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.rewardIndexes) {
      RewardIndex.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RewardIndexesProto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRewardIndexesProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rewardIndexes.push(
            RewardIndex.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RewardIndexesProto {
    return {
      rewardIndexes: Array.isArray(object?.rewardIndexes)
        ? object.rewardIndexes.map((e: any) => RewardIndex.fromJSON(e))
        : [],
    };
  },

  toJSON(message: RewardIndexesProto): unknown {
    const obj: any = {};
    if (message.rewardIndexes) {
      obj.rewardIndexes = message.rewardIndexes.map((e) =>
        e ? RewardIndex.toJSON(e) : undefined
      );
    } else {
      obj.rewardIndexes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RewardIndexesProto>, I>>(
    object: I
  ): RewardIndexesProto {
    const message = createBaseRewardIndexesProto();
    message.rewardIndexes =
      object.rewardIndexes?.map((e) => RewardIndex.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMultiRewardIndex(): MultiRewardIndex {
  return { collateralType: '', rewardIndexes: [] };
}

export const MultiRewardIndex = {
  encode(
    message: MultiRewardIndex,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.collateralType !== '') {
      writer.uint32(10).string(message.collateralType);
    }
    for (const v of message.rewardIndexes) {
      RewardIndex.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MultiRewardIndex {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMultiRewardIndex();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collateralType = reader.string();
          break;
        case 2:
          message.rewardIndexes.push(
            RewardIndex.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MultiRewardIndex {
    return {
      collateralType: isSet(object.collateralType)
        ? String(object.collateralType)
        : '',
      rewardIndexes: Array.isArray(object?.rewardIndexes)
        ? object.rewardIndexes.map((e: any) => RewardIndex.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MultiRewardIndex): unknown {
    const obj: any = {};
    message.collateralType !== undefined &&
      (obj.collateralType = message.collateralType);
    if (message.rewardIndexes) {
      obj.rewardIndexes = message.rewardIndexes.map((e) =>
        e ? RewardIndex.toJSON(e) : undefined
      );
    } else {
      obj.rewardIndexes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MultiRewardIndex>, I>>(
    object: I
  ): MultiRewardIndex {
    const message = createBaseMultiRewardIndex();
    message.collateralType = object.collateralType ?? '';
    message.rewardIndexes =
      object.rewardIndexes?.map((e) => RewardIndex.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMultiRewardIndexesProto(): MultiRewardIndexesProto {
  return { multiRewardIndexes: [] };
}

export const MultiRewardIndexesProto = {
  encode(
    message: MultiRewardIndexesProto,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.multiRewardIndexes) {
      MultiRewardIndex.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MultiRewardIndexesProto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMultiRewardIndexesProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.multiRewardIndexes.push(
            MultiRewardIndex.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MultiRewardIndexesProto {
    return {
      multiRewardIndexes: Array.isArray(object?.multiRewardIndexes)
        ? object.multiRewardIndexes.map((e: any) =>
            MultiRewardIndex.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: MultiRewardIndexesProto): unknown {
    const obj: any = {};
    if (message.multiRewardIndexes) {
      obj.multiRewardIndexes = message.multiRewardIndexes.map((e) =>
        e ? MultiRewardIndex.toJSON(e) : undefined
      );
    } else {
      obj.multiRewardIndexes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MultiRewardIndexesProto>, I>>(
    object: I
  ): MultiRewardIndexesProto {
    const message = createBaseMultiRewardIndexesProto();
    message.multiRewardIndexes =
      object.multiRewardIndexes?.map((e) => MultiRewardIndex.fromPartial(e)) ||
      [];
    return message;
  },
};

function createBaseUSDXMintingClaim(): USDXMintingClaim {
  return { baseClaim: undefined, rewardIndexes: [] };
}

export const USDXMintingClaim = {
  encode(
    message: USDXMintingClaim,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.baseClaim !== undefined) {
      BaseClaim.encode(message.baseClaim, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.rewardIndexes) {
      RewardIndex.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): USDXMintingClaim {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUSDXMintingClaim();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseClaim = BaseClaim.decode(reader, reader.uint32());
          break;
        case 2:
          message.rewardIndexes.push(
            RewardIndex.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): USDXMintingClaim {
    return {
      baseClaim: isSet(object.baseClaim)
        ? BaseClaim.fromJSON(object.baseClaim)
        : undefined,
      rewardIndexes: Array.isArray(object?.rewardIndexes)
        ? object.rewardIndexes.map((e: any) => RewardIndex.fromJSON(e))
        : [],
    };
  },

  toJSON(message: USDXMintingClaim): unknown {
    const obj: any = {};
    message.baseClaim !== undefined &&
      (obj.baseClaim = message.baseClaim
        ? BaseClaim.toJSON(message.baseClaim)
        : undefined);
    if (message.rewardIndexes) {
      obj.rewardIndexes = message.rewardIndexes.map((e) =>
        e ? RewardIndex.toJSON(e) : undefined
      );
    } else {
      obj.rewardIndexes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<USDXMintingClaim>, I>>(
    object: I
  ): USDXMintingClaim {
    const message = createBaseUSDXMintingClaim();
    message.baseClaim =
      object.baseClaim !== undefined && object.baseClaim !== null
        ? BaseClaim.fromPartial(object.baseClaim)
        : undefined;
    message.rewardIndexes =
      object.rewardIndexes?.map((e) => RewardIndex.fromPartial(e)) || [];
    return message;
  },
};

function createBaseHardLiquidityProviderClaim(): HardLiquidityProviderClaim {
  return {
    baseClaim: undefined,
    supplyRewardIndexes: [],
    borrowRewardIndexes: [],
  };
}

export const HardLiquidityProviderClaim = {
  encode(
    message: HardLiquidityProviderClaim,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.baseClaim !== undefined) {
      BaseMultiClaim.encode(
        message.baseClaim,
        writer.uint32(10).fork()
      ).ldelim();
    }
    for (const v of message.supplyRewardIndexes) {
      MultiRewardIndex.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.borrowRewardIndexes) {
      MultiRewardIndex.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): HardLiquidityProviderClaim {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHardLiquidityProviderClaim();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseClaim = BaseMultiClaim.decode(reader, reader.uint32());
          break;
        case 2:
          message.supplyRewardIndexes.push(
            MultiRewardIndex.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.borrowRewardIndexes.push(
            MultiRewardIndex.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HardLiquidityProviderClaim {
    return {
      baseClaim: isSet(object.baseClaim)
        ? BaseMultiClaim.fromJSON(object.baseClaim)
        : undefined,
      supplyRewardIndexes: Array.isArray(object?.supplyRewardIndexes)
        ? object.supplyRewardIndexes.map((e: any) =>
            MultiRewardIndex.fromJSON(e)
          )
        : [],
      borrowRewardIndexes: Array.isArray(object?.borrowRewardIndexes)
        ? object.borrowRewardIndexes.map((e: any) =>
            MultiRewardIndex.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: HardLiquidityProviderClaim): unknown {
    const obj: any = {};
    message.baseClaim !== undefined &&
      (obj.baseClaim = message.baseClaim
        ? BaseMultiClaim.toJSON(message.baseClaim)
        : undefined);
    if (message.supplyRewardIndexes) {
      obj.supplyRewardIndexes = message.supplyRewardIndexes.map((e) =>
        e ? MultiRewardIndex.toJSON(e) : undefined
      );
    } else {
      obj.supplyRewardIndexes = [];
    }
    if (message.borrowRewardIndexes) {
      obj.borrowRewardIndexes = message.borrowRewardIndexes.map((e) =>
        e ? MultiRewardIndex.toJSON(e) : undefined
      );
    } else {
      obj.borrowRewardIndexes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<HardLiquidityProviderClaim>, I>>(
    object: I
  ): HardLiquidityProviderClaim {
    const message = createBaseHardLiquidityProviderClaim();
    message.baseClaim =
      object.baseClaim !== undefined && object.baseClaim !== null
        ? BaseMultiClaim.fromPartial(object.baseClaim)
        : undefined;
    message.supplyRewardIndexes =
      object.supplyRewardIndexes?.map((e) => MultiRewardIndex.fromPartial(e)) ||
      [];
    message.borrowRewardIndexes =
      object.borrowRewardIndexes?.map((e) => MultiRewardIndex.fromPartial(e)) ||
      [];
    return message;
  },
};

function createBaseDelegatorClaim(): DelegatorClaim {
  return { baseClaim: undefined, rewardIndexes: [] };
}

export const DelegatorClaim = {
  encode(
    message: DelegatorClaim,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.baseClaim !== undefined) {
      BaseMultiClaim.encode(
        message.baseClaim,
        writer.uint32(10).fork()
      ).ldelim();
    }
    for (const v of message.rewardIndexes) {
      MultiRewardIndex.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DelegatorClaim {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegatorClaim();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseClaim = BaseMultiClaim.decode(reader, reader.uint32());
          break;
        case 2:
          message.rewardIndexes.push(
            MultiRewardIndex.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DelegatorClaim {
    return {
      baseClaim: isSet(object.baseClaim)
        ? BaseMultiClaim.fromJSON(object.baseClaim)
        : undefined,
      rewardIndexes: Array.isArray(object?.rewardIndexes)
        ? object.rewardIndexes.map((e: any) => MultiRewardIndex.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DelegatorClaim): unknown {
    const obj: any = {};
    message.baseClaim !== undefined &&
      (obj.baseClaim = message.baseClaim
        ? BaseMultiClaim.toJSON(message.baseClaim)
        : undefined);
    if (message.rewardIndexes) {
      obj.rewardIndexes = message.rewardIndexes.map((e) =>
        e ? MultiRewardIndex.toJSON(e) : undefined
      );
    } else {
      obj.rewardIndexes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DelegatorClaim>, I>>(
    object: I
  ): DelegatorClaim {
    const message = createBaseDelegatorClaim();
    message.baseClaim =
      object.baseClaim !== undefined && object.baseClaim !== null
        ? BaseMultiClaim.fromPartial(object.baseClaim)
        : undefined;
    message.rewardIndexes =
      object.rewardIndexes?.map((e) => MultiRewardIndex.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSwapClaim(): SwapClaim {
  return { baseClaim: undefined, rewardIndexes: [] };
}

export const SwapClaim = {
  encode(
    message: SwapClaim,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.baseClaim !== undefined) {
      BaseMultiClaim.encode(
        message.baseClaim,
        writer.uint32(10).fork()
      ).ldelim();
    }
    for (const v of message.rewardIndexes) {
      MultiRewardIndex.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SwapClaim {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSwapClaim();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseClaim = BaseMultiClaim.decode(reader, reader.uint32());
          break;
        case 2:
          message.rewardIndexes.push(
            MultiRewardIndex.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SwapClaim {
    return {
      baseClaim: isSet(object.baseClaim)
        ? BaseMultiClaim.fromJSON(object.baseClaim)
        : undefined,
      rewardIndexes: Array.isArray(object?.rewardIndexes)
        ? object.rewardIndexes.map((e: any) => MultiRewardIndex.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SwapClaim): unknown {
    const obj: any = {};
    message.baseClaim !== undefined &&
      (obj.baseClaim = message.baseClaim
        ? BaseMultiClaim.toJSON(message.baseClaim)
        : undefined);
    if (message.rewardIndexes) {
      obj.rewardIndexes = message.rewardIndexes.map((e) =>
        e ? MultiRewardIndex.toJSON(e) : undefined
      );
    } else {
      obj.rewardIndexes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SwapClaim>, I>>(
    object: I
  ): SwapClaim {
    const message = createBaseSwapClaim();
    message.baseClaim =
      object.baseClaim !== undefined && object.baseClaim !== null
        ? BaseMultiClaim.fromPartial(object.baseClaim)
        : undefined;
    message.rewardIndexes =
      object.rewardIndexes?.map((e) => MultiRewardIndex.fromPartial(e)) || [];
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  throw 'Unable to locate global object';
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, 'base64').toString('binary'));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, 'binary').toString('base64'));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (const byte of arr) {
    bin.push(String.fromCharCode(byte));
  }
  return btoa(bin.join(''));
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
