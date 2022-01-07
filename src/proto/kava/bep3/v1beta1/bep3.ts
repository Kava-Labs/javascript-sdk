/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Duration } from '../../../google/protobuf/duration';
import { Coin } from '../../../cosmos/base/v1beta1/coin';

export const protobufPackage = 'kava.bep3.v1beta1';

/** SwapStatus is the status of an AtomicSwap */
export enum SwapStatus {
  /** SWAP_STATUS_UNSPECIFIED - SWAP_STATUS_UNSPECIFIED represents an unspecified status */
  SWAP_STATUS_UNSPECIFIED = 0,
  /** SWAP_STATUS_OPEN - SWAP_STATUS_OPEN represents an open swap */
  SWAP_STATUS_OPEN = 1,
  /** SWAP_STATUS_COMPLETED - SWAP_STATUS_COMPLETED represents a completed swap */
  SWAP_STATUS_COMPLETED = 2,
  /** SWAP_STATUS_EXPIRED - SWAP_STATUS_EXPIRED represents an expired swap */
  SWAP_STATUS_EXPIRED = 3,
  UNRECOGNIZED = -1,
}

export function swapStatusFromJSON(object: any): SwapStatus {
  switch (object) {
    case 0:
    case 'SWAP_STATUS_UNSPECIFIED':
      return SwapStatus.SWAP_STATUS_UNSPECIFIED;
    case 1:
    case 'SWAP_STATUS_OPEN':
      return SwapStatus.SWAP_STATUS_OPEN;
    case 2:
    case 'SWAP_STATUS_COMPLETED':
      return SwapStatus.SWAP_STATUS_COMPLETED;
    case 3:
    case 'SWAP_STATUS_EXPIRED':
      return SwapStatus.SWAP_STATUS_EXPIRED;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return SwapStatus.UNRECOGNIZED;
  }
}

export function swapStatusToJSON(object: SwapStatus): string {
  switch (object) {
    case SwapStatus.SWAP_STATUS_UNSPECIFIED:
      return 'SWAP_STATUS_UNSPECIFIED';
    case SwapStatus.SWAP_STATUS_OPEN:
      return 'SWAP_STATUS_OPEN';
    case SwapStatus.SWAP_STATUS_COMPLETED:
      return 'SWAP_STATUS_COMPLETED';
    case SwapStatus.SWAP_STATUS_EXPIRED:
      return 'SWAP_STATUS_EXPIRED';
    default:
      return 'UNKNOWN';
  }
}

/** SwapDirection is the direction of an AtomicSwap */
export enum SwapDirection {
  /** SWAP_DIRECTION_UNSPECIFIED - SWAP_DIRECTION_UNSPECIFIED represents unspecified or invalid swap direcation */
  SWAP_DIRECTION_UNSPECIFIED = 0,
  /** SWAP_DIRECTION_INCOMING - SWAP_DIRECTION_INCOMING represents is incoming swap (to the kava chain) */
  SWAP_DIRECTION_INCOMING = 1,
  /** SWAP_DIRECTION_OUTGOING - SWAP_DIRECTION_OUTGOING represents an outgoing swap (from the kava chain) */
  SWAP_DIRECTION_OUTGOING = 2,
  UNRECOGNIZED = -1,
}

export function swapDirectionFromJSON(object: any): SwapDirection {
  switch (object) {
    case 0:
    case 'SWAP_DIRECTION_UNSPECIFIED':
      return SwapDirection.SWAP_DIRECTION_UNSPECIFIED;
    case 1:
    case 'SWAP_DIRECTION_INCOMING':
      return SwapDirection.SWAP_DIRECTION_INCOMING;
    case 2:
    case 'SWAP_DIRECTION_OUTGOING':
      return SwapDirection.SWAP_DIRECTION_OUTGOING;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return SwapDirection.UNRECOGNIZED;
  }
}

export function swapDirectionToJSON(object: SwapDirection): string {
  switch (object) {
    case SwapDirection.SWAP_DIRECTION_UNSPECIFIED:
      return 'SWAP_DIRECTION_UNSPECIFIED';
    case SwapDirection.SWAP_DIRECTION_INCOMING:
      return 'SWAP_DIRECTION_INCOMING';
    case SwapDirection.SWAP_DIRECTION_OUTGOING:
      return 'SWAP_DIRECTION_OUTGOING';
    default:
      return 'UNKNOWN';
  }
}

/** Params defines the parameters for the bep3 module. */
export interface Params {
  /** asset_params define the parameters for each bep3 asset */
  assetParams: AssetParam[];
}

/** AssetParam defines parameters for each bep3 asset. */
export interface AssetParam {
  /** denom represents the denominatin for this asset */
  denom: string;
  /** coin_id represents the registered coin type to use (https://github.com/satoshilabs/slips/blob/master/slip-0044.md) */
  coinId: Long;
  /** supply_limit defines the maximum supply allowed for the asset - a total or time based rate limit */
  supplyLimit?: SupplyLimit;
  /** active specifies if the asset is live or paused */
  active: boolean;
  /** deputy_address the kava address of the deputy */
  deputyAddress: Uint8Array;
  /** fixed_fee defines the fee for incoming swaps */
  fixedFee: string;
  /** min_swap_amount defines the minimum amount able to be swapped in a single message */
  minSwapAmount: string;
  /** max_swap_amount defines the maximum amount able to be swapped in a single message */
  maxSwapAmount: string;
  /** min_block_lock defined the minimum blocks to lock */
  minBlockLock: Long;
  /** min_block_lock defined the maximum blocks to lock */
  maxBlockLock: Long;
}

/** SupplyLimit define the absolute and time-based limits for an assets's supply. */
export interface SupplyLimit {
  /** limit defines the total supply allowed */
  limit: string;
  /** time_limited enables or disables time based supply limiting */
  timeLimited: boolean;
  /** time_period specifies the duration that time_based_limit is evalulated */
  timePeriod?: Duration;
  /** time_based_limit defines the maximum supply that can be swapped within time_period */
  timeBasedLimit: string;
}

/** AtomicSwap defines an atomic swap between chains for the pricefeed module. */
export interface AtomicSwap {
  /** amount represents the amount being swapped */
  amount: Coin[];
  /** random_number_hash represents the hash of the random number */
  randomNumberHash: Uint8Array;
  /** expire_height represents the height when the swap expires */
  expireHeight: Long;
  /** timestamp represents the timestamp of the swap */
  timestamp: Long;
  /** sender is the kava chain sender of the swap */
  sender: Uint8Array;
  /** recipient is the kava chain recipient of the swap */
  recipient: Uint8Array;
  /** sender_other_chain is the sender on the other chain */
  senderOtherChain: string;
  /** recipient_other_chain is the recipient on the other chain */
  recipientOtherChain: string;
  /** closed_block is the block when the swap is closed */
  closedBlock: Long;
  /** status represents the current status of the swap */
  status: SwapStatus;
  /** cross_chain identifies whether the atomic swap is cross chain */
  crossChain: boolean;
  /** direction identifies if the swap is incoming or outgoing */
  direction: SwapDirection;
}

/** AssetSupply defines information about an asset's supply. */
export interface AssetSupply {
  /** incoming_supply represents the incoming supply of an asset */
  incomingSupply?: Coin;
  /** outgoing_supply represents the outgoing supply of an asset */
  outgoingSupply?: Coin;
  /** current_supply represents the current on-chain supply of an asset */
  currentSupply?: Coin;
  /** time_limited_current_supply represents the time limited current supply of an asset */
  timeLimitedCurrentSupply?: Coin;
  /** time_elapsed represents the time elapsed */
  timeElapsed?: Duration;
}

function createBaseParams(): Params {
  return { assetParams: [] };
}

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.assetParams) {
      AssetParam.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assetParams.push(AssetParam.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      assetParams: Array.isArray(object?.assetParams)
        ? object.assetParams.map((e: any) => AssetParam.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.assetParams) {
      obj.assetParams = message.assetParams.map((e) =>
        e ? AssetParam.toJSON(e) : undefined
      );
    } else {
      obj.assetParams = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.assetParams =
      object.assetParams?.map((e) => AssetParam.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAssetParam(): AssetParam {
  return {
    denom: '',
    coinId: Long.ZERO,
    supplyLimit: undefined,
    active: false,
    deputyAddress: new Uint8Array(),
    fixedFee: '',
    minSwapAmount: '',
    maxSwapAmount: '',
    minBlockLock: Long.UZERO,
    maxBlockLock: Long.UZERO,
  };
}

export const AssetParam = {
  encode(
    message: AssetParam,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.denom !== '') {
      writer.uint32(10).string(message.denom);
    }
    if (!message.coinId.isZero()) {
      writer.uint32(16).int64(message.coinId);
    }
    if (message.supplyLimit !== undefined) {
      SupplyLimit.encode(
        message.supplyLimit,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.active === true) {
      writer.uint32(32).bool(message.active);
    }
    if (message.deputyAddress.length !== 0) {
      writer.uint32(42).bytes(message.deputyAddress);
    }
    if (message.fixedFee !== '') {
      writer.uint32(50).string(message.fixedFee);
    }
    if (message.minSwapAmount !== '') {
      writer.uint32(58).string(message.minSwapAmount);
    }
    if (message.maxSwapAmount !== '') {
      writer.uint32(66).string(message.maxSwapAmount);
    }
    if (!message.minBlockLock.isZero()) {
      writer.uint32(72).uint64(message.minBlockLock);
    }
    if (!message.maxBlockLock.isZero()) {
      writer.uint32(80).uint64(message.maxBlockLock);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AssetParam {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAssetParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.coinId = reader.int64() as Long;
          break;
        case 3:
          message.supplyLimit = SupplyLimit.decode(reader, reader.uint32());
          break;
        case 4:
          message.active = reader.bool();
          break;
        case 5:
          message.deputyAddress = reader.bytes();
          break;
        case 6:
          message.fixedFee = reader.string();
          break;
        case 7:
          message.minSwapAmount = reader.string();
          break;
        case 8:
          message.maxSwapAmount = reader.string();
          break;
        case 9:
          message.minBlockLock = reader.uint64() as Long;
          break;
        case 10:
          message.maxBlockLock = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AssetParam {
    return {
      denom: isSet(object.denom) ? String(object.denom) : '',
      coinId: isSet(object.coinId) ? Long.fromString(object.coinId) : Long.ZERO,
      supplyLimit: isSet(object.supplyLimit)
        ? SupplyLimit.fromJSON(object.supplyLimit)
        : undefined,
      active: isSet(object.active) ? Boolean(object.active) : false,
      deputyAddress: isSet(object.deputyAddress)
        ? bytesFromBase64(object.deputyAddress)
        : new Uint8Array(),
      fixedFee: isSet(object.fixedFee) ? String(object.fixedFee) : '',
      minSwapAmount: isSet(object.minSwapAmount)
        ? String(object.minSwapAmount)
        : '',
      maxSwapAmount: isSet(object.maxSwapAmount)
        ? String(object.maxSwapAmount)
        : '',
      minBlockLock: isSet(object.minBlockLock)
        ? Long.fromString(object.minBlockLock)
        : Long.UZERO,
      maxBlockLock: isSet(object.maxBlockLock)
        ? Long.fromString(object.maxBlockLock)
        : Long.UZERO,
    };
  },

  toJSON(message: AssetParam): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    message.coinId !== undefined &&
      (obj.coinId = (message.coinId || Long.ZERO).toString());
    message.supplyLimit !== undefined &&
      (obj.supplyLimit = message.supplyLimit
        ? SupplyLimit.toJSON(message.supplyLimit)
        : undefined);
    message.active !== undefined && (obj.active = message.active);
    message.deputyAddress !== undefined &&
      (obj.deputyAddress = base64FromBytes(
        message.deputyAddress !== undefined
          ? message.deputyAddress
          : new Uint8Array()
      ));
    message.fixedFee !== undefined && (obj.fixedFee = message.fixedFee);
    message.minSwapAmount !== undefined &&
      (obj.minSwapAmount = message.minSwapAmount);
    message.maxSwapAmount !== undefined &&
      (obj.maxSwapAmount = message.maxSwapAmount);
    message.minBlockLock !== undefined &&
      (obj.minBlockLock = (message.minBlockLock || Long.UZERO).toString());
    message.maxBlockLock !== undefined &&
      (obj.maxBlockLock = (message.maxBlockLock || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AssetParam>, I>>(
    object: I
  ): AssetParam {
    const message = createBaseAssetParam();
    message.denom = object.denom ?? '';
    message.coinId =
      object.coinId !== undefined && object.coinId !== null
        ? Long.fromValue(object.coinId)
        : Long.ZERO;
    message.supplyLimit =
      object.supplyLimit !== undefined && object.supplyLimit !== null
        ? SupplyLimit.fromPartial(object.supplyLimit)
        : undefined;
    message.active = object.active ?? false;
    message.deputyAddress = object.deputyAddress ?? new Uint8Array();
    message.fixedFee = object.fixedFee ?? '';
    message.minSwapAmount = object.minSwapAmount ?? '';
    message.maxSwapAmount = object.maxSwapAmount ?? '';
    message.minBlockLock =
      object.minBlockLock !== undefined && object.minBlockLock !== null
        ? Long.fromValue(object.minBlockLock)
        : Long.UZERO;
    message.maxBlockLock =
      object.maxBlockLock !== undefined && object.maxBlockLock !== null
        ? Long.fromValue(object.maxBlockLock)
        : Long.UZERO;
    return message;
  },
};

function createBaseSupplyLimit(): SupplyLimit {
  return {
    limit: '',
    timeLimited: false,
    timePeriod: undefined,
    timeBasedLimit: '',
  };
}

export const SupplyLimit = {
  encode(
    message: SupplyLimit,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.limit !== '') {
      writer.uint32(10).string(message.limit);
    }
    if (message.timeLimited === true) {
      writer.uint32(16).bool(message.timeLimited);
    }
    if (message.timePeriod !== undefined) {
      Duration.encode(message.timePeriod, writer.uint32(26).fork()).ldelim();
    }
    if (message.timeBasedLimit !== '') {
      writer.uint32(34).string(message.timeBasedLimit);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SupplyLimit {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSupplyLimit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.limit = reader.string();
          break;
        case 2:
          message.timeLimited = reader.bool();
          break;
        case 3:
          message.timePeriod = Duration.decode(reader, reader.uint32());
          break;
        case 4:
          message.timeBasedLimit = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SupplyLimit {
    return {
      limit: isSet(object.limit) ? String(object.limit) : '',
      timeLimited: isSet(object.timeLimited)
        ? Boolean(object.timeLimited)
        : false,
      timePeriod: isSet(object.timePeriod)
        ? Duration.fromJSON(object.timePeriod)
        : undefined,
      timeBasedLimit: isSet(object.timeBasedLimit)
        ? String(object.timeBasedLimit)
        : '',
    };
  },

  toJSON(message: SupplyLimit): unknown {
    const obj: any = {};
    message.limit !== undefined && (obj.limit = message.limit);
    message.timeLimited !== undefined &&
      (obj.timeLimited = message.timeLimited);
    message.timePeriod !== undefined &&
      (obj.timePeriod = message.timePeriod
        ? Duration.toJSON(message.timePeriod)
        : undefined);
    message.timeBasedLimit !== undefined &&
      (obj.timeBasedLimit = message.timeBasedLimit);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SupplyLimit>, I>>(
    object: I
  ): SupplyLimit {
    const message = createBaseSupplyLimit();
    message.limit = object.limit ?? '';
    message.timeLimited = object.timeLimited ?? false;
    message.timePeriod =
      object.timePeriod !== undefined && object.timePeriod !== null
        ? Duration.fromPartial(object.timePeriod)
        : undefined;
    message.timeBasedLimit = object.timeBasedLimit ?? '';
    return message;
  },
};

function createBaseAtomicSwap(): AtomicSwap {
  return {
    amount: [],
    randomNumberHash: new Uint8Array(),
    expireHeight: Long.UZERO,
    timestamp: Long.ZERO,
    sender: new Uint8Array(),
    recipient: new Uint8Array(),
    senderOtherChain: '',
    recipientOtherChain: '',
    closedBlock: Long.ZERO,
    status: 0,
    crossChain: false,
    direction: 0,
  };
}

export const AtomicSwap = {
  encode(
    message: AtomicSwap,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.randomNumberHash.length !== 0) {
      writer.uint32(18).bytes(message.randomNumberHash);
    }
    if (!message.expireHeight.isZero()) {
      writer.uint32(24).uint64(message.expireHeight);
    }
    if (!message.timestamp.isZero()) {
      writer.uint32(32).int64(message.timestamp);
    }
    if (message.sender.length !== 0) {
      writer.uint32(42).bytes(message.sender);
    }
    if (message.recipient.length !== 0) {
      writer.uint32(50).bytes(message.recipient);
    }
    if (message.senderOtherChain !== '') {
      writer.uint32(58).string(message.senderOtherChain);
    }
    if (message.recipientOtherChain !== '') {
      writer.uint32(66).string(message.recipientOtherChain);
    }
    if (!message.closedBlock.isZero()) {
      writer.uint32(72).int64(message.closedBlock);
    }
    if (message.status !== 0) {
      writer.uint32(80).int32(message.status);
    }
    if (message.crossChain === true) {
      writer.uint32(88).bool(message.crossChain);
    }
    if (message.direction !== 0) {
      writer.uint32(96).int32(message.direction);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AtomicSwap {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAtomicSwap();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount.push(Coin.decode(reader, reader.uint32()));
          break;
        case 2:
          message.randomNumberHash = reader.bytes();
          break;
        case 3:
          message.expireHeight = reader.uint64() as Long;
          break;
        case 4:
          message.timestamp = reader.int64() as Long;
          break;
        case 5:
          message.sender = reader.bytes();
          break;
        case 6:
          message.recipient = reader.bytes();
          break;
        case 7:
          message.senderOtherChain = reader.string();
          break;
        case 8:
          message.recipientOtherChain = reader.string();
          break;
        case 9:
          message.closedBlock = reader.int64() as Long;
          break;
        case 10:
          message.status = reader.int32() as any;
          break;
        case 11:
          message.crossChain = reader.bool();
          break;
        case 12:
          message.direction = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AtomicSwap {
    return {
      amount: Array.isArray(object?.amount)
        ? object.amount.map((e: any) => Coin.fromJSON(e))
        : [],
      randomNumberHash: isSet(object.randomNumberHash)
        ? bytesFromBase64(object.randomNumberHash)
        : new Uint8Array(),
      expireHeight: isSet(object.expireHeight)
        ? Long.fromString(object.expireHeight)
        : Long.UZERO,
      timestamp: isSet(object.timestamp)
        ? Long.fromString(object.timestamp)
        : Long.ZERO,
      sender: isSet(object.sender)
        ? bytesFromBase64(object.sender)
        : new Uint8Array(),
      recipient: isSet(object.recipient)
        ? bytesFromBase64(object.recipient)
        : new Uint8Array(),
      senderOtherChain: isSet(object.senderOtherChain)
        ? String(object.senderOtherChain)
        : '',
      recipientOtherChain: isSet(object.recipientOtherChain)
        ? String(object.recipientOtherChain)
        : '',
      closedBlock: isSet(object.closedBlock)
        ? Long.fromString(object.closedBlock)
        : Long.ZERO,
      status: isSet(object.status) ? swapStatusFromJSON(object.status) : 0,
      crossChain: isSet(object.crossChain) ? Boolean(object.crossChain) : false,
      direction: isSet(object.direction)
        ? swapDirectionFromJSON(object.direction)
        : 0,
    };
  },

  toJSON(message: AtomicSwap): unknown {
    const obj: any = {};
    if (message.amount) {
      obj.amount = message.amount.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.amount = [];
    }
    message.randomNumberHash !== undefined &&
      (obj.randomNumberHash = base64FromBytes(
        message.randomNumberHash !== undefined
          ? message.randomNumberHash
          : new Uint8Array()
      ));
    message.expireHeight !== undefined &&
      (obj.expireHeight = (message.expireHeight || Long.UZERO).toString());
    message.timestamp !== undefined &&
      (obj.timestamp = (message.timestamp || Long.ZERO).toString());
    message.sender !== undefined &&
      (obj.sender = base64FromBytes(
        message.sender !== undefined ? message.sender : new Uint8Array()
      ));
    message.recipient !== undefined &&
      (obj.recipient = base64FromBytes(
        message.recipient !== undefined ? message.recipient : new Uint8Array()
      ));
    message.senderOtherChain !== undefined &&
      (obj.senderOtherChain = message.senderOtherChain);
    message.recipientOtherChain !== undefined &&
      (obj.recipientOtherChain = message.recipientOtherChain);
    message.closedBlock !== undefined &&
      (obj.closedBlock = (message.closedBlock || Long.ZERO).toString());
    message.status !== undefined &&
      (obj.status = swapStatusToJSON(message.status));
    message.crossChain !== undefined && (obj.crossChain = message.crossChain);
    message.direction !== undefined &&
      (obj.direction = swapDirectionToJSON(message.direction));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AtomicSwap>, I>>(
    object: I
  ): AtomicSwap {
    const message = createBaseAtomicSwap();
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    message.randomNumberHash = object.randomNumberHash ?? new Uint8Array();
    message.expireHeight =
      object.expireHeight !== undefined && object.expireHeight !== null
        ? Long.fromValue(object.expireHeight)
        : Long.UZERO;
    message.timestamp =
      object.timestamp !== undefined && object.timestamp !== null
        ? Long.fromValue(object.timestamp)
        : Long.ZERO;
    message.sender = object.sender ?? new Uint8Array();
    message.recipient = object.recipient ?? new Uint8Array();
    message.senderOtherChain = object.senderOtherChain ?? '';
    message.recipientOtherChain = object.recipientOtherChain ?? '';
    message.closedBlock =
      object.closedBlock !== undefined && object.closedBlock !== null
        ? Long.fromValue(object.closedBlock)
        : Long.ZERO;
    message.status = object.status ?? 0;
    message.crossChain = object.crossChain ?? false;
    message.direction = object.direction ?? 0;
    return message;
  },
};

function createBaseAssetSupply(): AssetSupply {
  return {
    incomingSupply: undefined,
    outgoingSupply: undefined,
    currentSupply: undefined,
    timeLimitedCurrentSupply: undefined,
    timeElapsed: undefined,
  };
}

export const AssetSupply = {
  encode(
    message: AssetSupply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.incomingSupply !== undefined) {
      Coin.encode(message.incomingSupply, writer.uint32(10).fork()).ldelim();
    }
    if (message.outgoingSupply !== undefined) {
      Coin.encode(message.outgoingSupply, writer.uint32(18).fork()).ldelim();
    }
    if (message.currentSupply !== undefined) {
      Coin.encode(message.currentSupply, writer.uint32(26).fork()).ldelim();
    }
    if (message.timeLimitedCurrentSupply !== undefined) {
      Coin.encode(
        message.timeLimitedCurrentSupply,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.timeElapsed !== undefined) {
      Duration.encode(message.timeElapsed, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AssetSupply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAssetSupply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.incomingSupply = Coin.decode(reader, reader.uint32());
          break;
        case 2:
          message.outgoingSupply = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.currentSupply = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.timeLimitedCurrentSupply = Coin.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.timeElapsed = Duration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AssetSupply {
    return {
      incomingSupply: isSet(object.incomingSupply)
        ? Coin.fromJSON(object.incomingSupply)
        : undefined,
      outgoingSupply: isSet(object.outgoingSupply)
        ? Coin.fromJSON(object.outgoingSupply)
        : undefined,
      currentSupply: isSet(object.currentSupply)
        ? Coin.fromJSON(object.currentSupply)
        : undefined,
      timeLimitedCurrentSupply: isSet(object.timeLimitedCurrentSupply)
        ? Coin.fromJSON(object.timeLimitedCurrentSupply)
        : undefined,
      timeElapsed: isSet(object.timeElapsed)
        ? Duration.fromJSON(object.timeElapsed)
        : undefined,
    };
  },

  toJSON(message: AssetSupply): unknown {
    const obj: any = {};
    message.incomingSupply !== undefined &&
      (obj.incomingSupply = message.incomingSupply
        ? Coin.toJSON(message.incomingSupply)
        : undefined);
    message.outgoingSupply !== undefined &&
      (obj.outgoingSupply = message.outgoingSupply
        ? Coin.toJSON(message.outgoingSupply)
        : undefined);
    message.currentSupply !== undefined &&
      (obj.currentSupply = message.currentSupply
        ? Coin.toJSON(message.currentSupply)
        : undefined);
    message.timeLimitedCurrentSupply !== undefined &&
      (obj.timeLimitedCurrentSupply = message.timeLimitedCurrentSupply
        ? Coin.toJSON(message.timeLimitedCurrentSupply)
        : undefined);
    message.timeElapsed !== undefined &&
      (obj.timeElapsed = message.timeElapsed
        ? Duration.toJSON(message.timeElapsed)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AssetSupply>, I>>(
    object: I
  ): AssetSupply {
    const message = createBaseAssetSupply();
    message.incomingSupply =
      object.incomingSupply !== undefined && object.incomingSupply !== null
        ? Coin.fromPartial(object.incomingSupply)
        : undefined;
    message.outgoingSupply =
      object.outgoingSupply !== undefined && object.outgoingSupply !== null
        ? Coin.fromPartial(object.outgoingSupply)
        : undefined;
    message.currentSupply =
      object.currentSupply !== undefined && object.currentSupply !== null
        ? Coin.fromPartial(object.currentSupply)
        : undefined;
    message.timeLimitedCurrentSupply =
      object.timeLimitedCurrentSupply !== undefined &&
      object.timeLimitedCurrentSupply !== null
        ? Coin.fromPartial(object.timeLimitedCurrentSupply)
        : undefined;
    message.timeElapsed =
      object.timeElapsed !== undefined && object.timeElapsed !== null
        ? Duration.fromPartial(object.timeElapsed)
        : undefined;
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
