/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Coin } from '../../../cosmos/base/v1beta1/coin';
import { Timestamp } from '../../../google/protobuf/timestamp';
import { CDP, Deposit } from '../../../kava/cdp/v1beta1/cdp';

export const protobufPackage = 'kava.cdp.v1beta1';

/** GenesisState defines the cdp module's genesis state. */
export interface GenesisState {
  /** params defines all the paramaters of the module. */
  params?: Params;
  cdps: CDP[];
  deposits: Deposit[];
  startingCdpId: Long;
  debtDenom: string;
  govDenom: string;
  previousAccumulationTimes: GenesisAccumulationTime[];
  totalPrincipals: GenesisTotalPrincipal[];
}

/** Params defines the parameters for the cdp module. */
export interface Params {
  collateralParams: CollateralParam[];
  debtParam?: DebtParam;
  globalDebtLimit?: Coin;
  surplusAuctionThreshold: string;
  surplusAuctionLot: string;
  debtAuctionThreshold: string;
  debtAuctionLot: string;
  circuitBreaker: boolean;
}

/** DebtParam defines governance params for debt assets */
export interface DebtParam {
  denom: string;
  referenceAsset: string;
  conversionFactor: string;
  debtFloor: string;
}

/** CollateralParam defines governance parameters for each collateral type within the cdp module */
export interface CollateralParam {
  denom: string;
  type: string;
  liquidationRatio: string;
  debtLimit?: Coin;
  stabilityFee: string;
  auctionSize: string;
  liquidationPenalty: string;
  spotMarketId: string;
  liquidationMarketId: string;
  keeperRewardPercentage: string;
  checkCollateralizationIndexCount: string;
  conversionFactor: string;
}

/** GenesisAccumulationTime defines the previous distribution time and its corresponding denom */
export interface GenesisAccumulationTime {
  collateralType: string;
  previousAccumulationTime?: Date;
  interestFactor: string;
}

/** GenesisTotalPrincipal defines the total principal and its corresponding collateral type */
export interface GenesisTotalPrincipal {
  collateralType: string;
  totalPrincipal: string;
}

function createBaseGenesisState(): GenesisState {
  return {
    params: undefined,
    cdps: [],
    deposits: [],
    startingCdpId: Long.UZERO,
    debtDenom: '',
    govDenom: '',
    previousAccumulationTimes: [],
    totalPrincipals: [],
  };
}

export const GenesisState = {
  encode(
    message: GenesisState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.cdps) {
      CDP.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.deposits) {
      Deposit.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (!message.startingCdpId.isZero()) {
      writer.uint32(32).uint64(message.startingCdpId);
    }
    if (message.debtDenom !== '') {
      writer.uint32(42).string(message.debtDenom);
    }
    if (message.govDenom !== '') {
      writer.uint32(50).string(message.govDenom);
    }
    for (const v of message.previousAccumulationTimes) {
      GenesisAccumulationTime.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.totalPrincipals) {
      GenesisTotalPrincipal.encode(v!, writer.uint32(66).fork()).ldelim();
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
          message.cdps.push(CDP.decode(reader, reader.uint32()));
          break;
        case 3:
          message.deposits.push(Deposit.decode(reader, reader.uint32()));
          break;
        case 4:
          message.startingCdpId = reader.uint64() as Long;
          break;
        case 5:
          message.debtDenom = reader.string();
          break;
        case 6:
          message.govDenom = reader.string();
          break;
        case 7:
          message.previousAccumulationTimes.push(
            GenesisAccumulationTime.decode(reader, reader.uint32())
          );
          break;
        case 8:
          message.totalPrincipals.push(
            GenesisTotalPrincipal.decode(reader, reader.uint32())
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
      cdps: Array.isArray(object?.cdps)
        ? object.cdps.map((e: any) => CDP.fromJSON(e))
        : [],
      deposits: Array.isArray(object?.deposits)
        ? object.deposits.map((e: any) => Deposit.fromJSON(e))
        : [],
      startingCdpId: isSet(object.startingCdpId)
        ? Long.fromString(object.startingCdpId)
        : Long.UZERO,
      debtDenom: isSet(object.debtDenom) ? String(object.debtDenom) : '',
      govDenom: isSet(object.govDenom) ? String(object.govDenom) : '',
      previousAccumulationTimes: Array.isArray(
        object?.previousAccumulationTimes
      )
        ? object.previousAccumulationTimes.map((e: any) =>
            GenesisAccumulationTime.fromJSON(e)
          )
        : [],
      totalPrincipals: Array.isArray(object?.totalPrincipals)
        ? object.totalPrincipals.map((e: any) =>
            GenesisTotalPrincipal.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.cdps) {
      obj.cdps = message.cdps.map((e) => (e ? CDP.toJSON(e) : undefined));
    } else {
      obj.cdps = [];
    }
    if (message.deposits) {
      obj.deposits = message.deposits.map((e) =>
        e ? Deposit.toJSON(e) : undefined
      );
    } else {
      obj.deposits = [];
    }
    message.startingCdpId !== undefined &&
      (obj.startingCdpId = (message.startingCdpId || Long.UZERO).toString());
    message.debtDenom !== undefined && (obj.debtDenom = message.debtDenom);
    message.govDenom !== undefined && (obj.govDenom = message.govDenom);
    if (message.previousAccumulationTimes) {
      obj.previousAccumulationTimes = message.previousAccumulationTimes.map(
        (e) => (e ? GenesisAccumulationTime.toJSON(e) : undefined)
      );
    } else {
      obj.previousAccumulationTimes = [];
    }
    if (message.totalPrincipals) {
      obj.totalPrincipals = message.totalPrincipals.map((e) =>
        e ? GenesisTotalPrincipal.toJSON(e) : undefined
      );
    } else {
      obj.totalPrincipals = [];
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
    message.cdps = object.cdps?.map((e) => CDP.fromPartial(e)) || [];
    message.deposits =
      object.deposits?.map((e) => Deposit.fromPartial(e)) || [];
    message.startingCdpId =
      object.startingCdpId !== undefined && object.startingCdpId !== null
        ? Long.fromValue(object.startingCdpId)
        : Long.UZERO;
    message.debtDenom = object.debtDenom ?? '';
    message.govDenom = object.govDenom ?? '';
    message.previousAccumulationTimes =
      object.previousAccumulationTimes?.map((e) =>
        GenesisAccumulationTime.fromPartial(e)
      ) || [];
    message.totalPrincipals =
      object.totalPrincipals?.map((e) =>
        GenesisTotalPrincipal.fromPartial(e)
      ) || [];
    return message;
  },
};

function createBaseParams(): Params {
  return {
    collateralParams: [],
    debtParam: undefined,
    globalDebtLimit: undefined,
    surplusAuctionThreshold: '',
    surplusAuctionLot: '',
    debtAuctionThreshold: '',
    debtAuctionLot: '',
    circuitBreaker: false,
  };
}

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.collateralParams) {
      CollateralParam.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.debtParam !== undefined) {
      DebtParam.encode(message.debtParam, writer.uint32(18).fork()).ldelim();
    }
    if (message.globalDebtLimit !== undefined) {
      Coin.encode(message.globalDebtLimit, writer.uint32(26).fork()).ldelim();
    }
    if (message.surplusAuctionThreshold !== '') {
      writer.uint32(34).string(message.surplusAuctionThreshold);
    }
    if (message.surplusAuctionLot !== '') {
      writer.uint32(42).string(message.surplusAuctionLot);
    }
    if (message.debtAuctionThreshold !== '') {
      writer.uint32(50).string(message.debtAuctionThreshold);
    }
    if (message.debtAuctionLot !== '') {
      writer.uint32(58).string(message.debtAuctionLot);
    }
    if (message.circuitBreaker === true) {
      writer.uint32(64).bool(message.circuitBreaker);
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
          message.collateralParams.push(
            CollateralParam.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.debtParam = DebtParam.decode(reader, reader.uint32());
          break;
        case 3:
          message.globalDebtLimit = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.surplusAuctionThreshold = reader.string();
          break;
        case 5:
          message.surplusAuctionLot = reader.string();
          break;
        case 6:
          message.debtAuctionThreshold = reader.string();
          break;
        case 7:
          message.debtAuctionLot = reader.string();
          break;
        case 8:
          message.circuitBreaker = reader.bool();
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
      collateralParams: Array.isArray(object?.collateralParams)
        ? object.collateralParams.map((e: any) => CollateralParam.fromJSON(e))
        : [],
      debtParam: isSet(object.debtParam)
        ? DebtParam.fromJSON(object.debtParam)
        : undefined,
      globalDebtLimit: isSet(object.globalDebtLimit)
        ? Coin.fromJSON(object.globalDebtLimit)
        : undefined,
      surplusAuctionThreshold: isSet(object.surplusAuctionThreshold)
        ? String(object.surplusAuctionThreshold)
        : '',
      surplusAuctionLot: isSet(object.surplusAuctionLot)
        ? String(object.surplusAuctionLot)
        : '',
      debtAuctionThreshold: isSet(object.debtAuctionThreshold)
        ? String(object.debtAuctionThreshold)
        : '',
      debtAuctionLot: isSet(object.debtAuctionLot)
        ? String(object.debtAuctionLot)
        : '',
      circuitBreaker: isSet(object.circuitBreaker)
        ? Boolean(object.circuitBreaker)
        : false,
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.collateralParams) {
      obj.collateralParams = message.collateralParams.map((e) =>
        e ? CollateralParam.toJSON(e) : undefined
      );
    } else {
      obj.collateralParams = [];
    }
    message.debtParam !== undefined &&
      (obj.debtParam = message.debtParam
        ? DebtParam.toJSON(message.debtParam)
        : undefined);
    message.globalDebtLimit !== undefined &&
      (obj.globalDebtLimit = message.globalDebtLimit
        ? Coin.toJSON(message.globalDebtLimit)
        : undefined);
    message.surplusAuctionThreshold !== undefined &&
      (obj.surplusAuctionThreshold = message.surplusAuctionThreshold);
    message.surplusAuctionLot !== undefined &&
      (obj.surplusAuctionLot = message.surplusAuctionLot);
    message.debtAuctionThreshold !== undefined &&
      (obj.debtAuctionThreshold = message.debtAuctionThreshold);
    message.debtAuctionLot !== undefined &&
      (obj.debtAuctionLot = message.debtAuctionLot);
    message.circuitBreaker !== undefined &&
      (obj.circuitBreaker = message.circuitBreaker);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.collateralParams =
      object.collateralParams?.map((e) => CollateralParam.fromPartial(e)) || [];
    message.debtParam =
      object.debtParam !== undefined && object.debtParam !== null
        ? DebtParam.fromPartial(object.debtParam)
        : undefined;
    message.globalDebtLimit =
      object.globalDebtLimit !== undefined && object.globalDebtLimit !== null
        ? Coin.fromPartial(object.globalDebtLimit)
        : undefined;
    message.surplusAuctionThreshold = object.surplusAuctionThreshold ?? '';
    message.surplusAuctionLot = object.surplusAuctionLot ?? '';
    message.debtAuctionThreshold = object.debtAuctionThreshold ?? '';
    message.debtAuctionLot = object.debtAuctionLot ?? '';
    message.circuitBreaker = object.circuitBreaker ?? false;
    return message;
  },
};

function createBaseDebtParam(): DebtParam {
  return { denom: '', referenceAsset: '', conversionFactor: '', debtFloor: '' };
}

export const DebtParam = {
  encode(
    message: DebtParam,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.denom !== '') {
      writer.uint32(10).string(message.denom);
    }
    if (message.referenceAsset !== '') {
      writer.uint32(18).string(message.referenceAsset);
    }
    if (message.conversionFactor !== '') {
      writer.uint32(26).string(message.conversionFactor);
    }
    if (message.debtFloor !== '') {
      writer.uint32(34).string(message.debtFloor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DebtParam {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDebtParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.referenceAsset = reader.string();
          break;
        case 3:
          message.conversionFactor = reader.string();
          break;
        case 4:
          message.debtFloor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DebtParam {
    return {
      denom: isSet(object.denom) ? String(object.denom) : '',
      referenceAsset: isSet(object.referenceAsset)
        ? String(object.referenceAsset)
        : '',
      conversionFactor: isSet(object.conversionFactor)
        ? String(object.conversionFactor)
        : '',
      debtFloor: isSet(object.debtFloor) ? String(object.debtFloor) : '',
    };
  },

  toJSON(message: DebtParam): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    message.referenceAsset !== undefined &&
      (obj.referenceAsset = message.referenceAsset);
    message.conversionFactor !== undefined &&
      (obj.conversionFactor = message.conversionFactor);
    message.debtFloor !== undefined && (obj.debtFloor = message.debtFloor);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DebtParam>, I>>(
    object: I
  ): DebtParam {
    const message = createBaseDebtParam();
    message.denom = object.denom ?? '';
    message.referenceAsset = object.referenceAsset ?? '';
    message.conversionFactor = object.conversionFactor ?? '';
    message.debtFloor = object.debtFloor ?? '';
    return message;
  },
};

function createBaseCollateralParam(): CollateralParam {
  return {
    denom: '',
    type: '',
    liquidationRatio: '',
    debtLimit: undefined,
    stabilityFee: '',
    auctionSize: '',
    liquidationPenalty: '',
    spotMarketId: '',
    liquidationMarketId: '',
    keeperRewardPercentage: '',
    checkCollateralizationIndexCount: '',
    conversionFactor: '',
  };
}

export const CollateralParam = {
  encode(
    message: CollateralParam,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.denom !== '') {
      writer.uint32(10).string(message.denom);
    }
    if (message.type !== '') {
      writer.uint32(18).string(message.type);
    }
    if (message.liquidationRatio !== '') {
      writer.uint32(26).string(message.liquidationRatio);
    }
    if (message.debtLimit !== undefined) {
      Coin.encode(message.debtLimit, writer.uint32(34).fork()).ldelim();
    }
    if (message.stabilityFee !== '') {
      writer.uint32(42).string(message.stabilityFee);
    }
    if (message.auctionSize !== '') {
      writer.uint32(50).string(message.auctionSize);
    }
    if (message.liquidationPenalty !== '') {
      writer.uint32(58).string(message.liquidationPenalty);
    }
    if (message.spotMarketId !== '') {
      writer.uint32(66).string(message.spotMarketId);
    }
    if (message.liquidationMarketId !== '') {
      writer.uint32(74).string(message.liquidationMarketId);
    }
    if (message.keeperRewardPercentage !== '') {
      writer.uint32(82).string(message.keeperRewardPercentage);
    }
    if (message.checkCollateralizationIndexCount !== '') {
      writer.uint32(90).string(message.checkCollateralizationIndexCount);
    }
    if (message.conversionFactor !== '') {
      writer.uint32(98).string(message.conversionFactor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CollateralParam {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCollateralParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.type = reader.string();
          break;
        case 3:
          message.liquidationRatio = reader.string();
          break;
        case 4:
          message.debtLimit = Coin.decode(reader, reader.uint32());
          break;
        case 5:
          message.stabilityFee = reader.string();
          break;
        case 6:
          message.auctionSize = reader.string();
          break;
        case 7:
          message.liquidationPenalty = reader.string();
          break;
        case 8:
          message.spotMarketId = reader.string();
          break;
        case 9:
          message.liquidationMarketId = reader.string();
          break;
        case 10:
          message.keeperRewardPercentage = reader.string();
          break;
        case 11:
          message.checkCollateralizationIndexCount = reader.string();
          break;
        case 12:
          message.conversionFactor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CollateralParam {
    return {
      denom: isSet(object.denom) ? String(object.denom) : '',
      type: isSet(object.type) ? String(object.type) : '',
      liquidationRatio: isSet(object.liquidationRatio)
        ? String(object.liquidationRatio)
        : '',
      debtLimit: isSet(object.debtLimit)
        ? Coin.fromJSON(object.debtLimit)
        : undefined,
      stabilityFee: isSet(object.stabilityFee)
        ? String(object.stabilityFee)
        : '',
      auctionSize: isSet(object.auctionSize) ? String(object.auctionSize) : '',
      liquidationPenalty: isSet(object.liquidationPenalty)
        ? String(object.liquidationPenalty)
        : '',
      spotMarketId: isSet(object.spotMarketId)
        ? String(object.spotMarketId)
        : '',
      liquidationMarketId: isSet(object.liquidationMarketId)
        ? String(object.liquidationMarketId)
        : '',
      keeperRewardPercentage: isSet(object.keeperRewardPercentage)
        ? String(object.keeperRewardPercentage)
        : '',
      checkCollateralizationIndexCount: isSet(
        object.checkCollateralizationIndexCount
      )
        ? String(object.checkCollateralizationIndexCount)
        : '',
      conversionFactor: isSet(object.conversionFactor)
        ? String(object.conversionFactor)
        : '',
    };
  },

  toJSON(message: CollateralParam): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    message.type !== undefined && (obj.type = message.type);
    message.liquidationRatio !== undefined &&
      (obj.liquidationRatio = message.liquidationRatio);
    message.debtLimit !== undefined &&
      (obj.debtLimit = message.debtLimit
        ? Coin.toJSON(message.debtLimit)
        : undefined);
    message.stabilityFee !== undefined &&
      (obj.stabilityFee = message.stabilityFee);
    message.auctionSize !== undefined &&
      (obj.auctionSize = message.auctionSize);
    message.liquidationPenalty !== undefined &&
      (obj.liquidationPenalty = message.liquidationPenalty);
    message.spotMarketId !== undefined &&
      (obj.spotMarketId = message.spotMarketId);
    message.liquidationMarketId !== undefined &&
      (obj.liquidationMarketId = message.liquidationMarketId);
    message.keeperRewardPercentage !== undefined &&
      (obj.keeperRewardPercentage = message.keeperRewardPercentage);
    message.checkCollateralizationIndexCount !== undefined &&
      (obj.checkCollateralizationIndexCount =
        message.checkCollateralizationIndexCount);
    message.conversionFactor !== undefined &&
      (obj.conversionFactor = message.conversionFactor);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CollateralParam>, I>>(
    object: I
  ): CollateralParam {
    const message = createBaseCollateralParam();
    message.denom = object.denom ?? '';
    message.type = object.type ?? '';
    message.liquidationRatio = object.liquidationRatio ?? '';
    message.debtLimit =
      object.debtLimit !== undefined && object.debtLimit !== null
        ? Coin.fromPartial(object.debtLimit)
        : undefined;
    message.stabilityFee = object.stabilityFee ?? '';
    message.auctionSize = object.auctionSize ?? '';
    message.liquidationPenalty = object.liquidationPenalty ?? '';
    message.spotMarketId = object.spotMarketId ?? '';
    message.liquidationMarketId = object.liquidationMarketId ?? '';
    message.keeperRewardPercentage = object.keeperRewardPercentage ?? '';
    message.checkCollateralizationIndexCount =
      object.checkCollateralizationIndexCount ?? '';
    message.conversionFactor = object.conversionFactor ?? '';
    return message;
  },
};

function createBaseGenesisAccumulationTime(): GenesisAccumulationTime {
  return {
    collateralType: '',
    previousAccumulationTime: undefined,
    interestFactor: '',
  };
}

export const GenesisAccumulationTime = {
  encode(
    message: GenesisAccumulationTime,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.collateralType !== '') {
      writer.uint32(10).string(message.collateralType);
    }
    if (message.previousAccumulationTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.previousAccumulationTime),
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.interestFactor !== '') {
      writer.uint32(26).string(message.interestFactor);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GenesisAccumulationTime {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisAccumulationTime();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collateralType = reader.string();
          break;
        case 2:
          message.previousAccumulationTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.interestFactor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisAccumulationTime {
    return {
      collateralType: isSet(object.collateralType)
        ? String(object.collateralType)
        : '',
      previousAccumulationTime: isSet(object.previousAccumulationTime)
        ? fromJsonTimestamp(object.previousAccumulationTime)
        : undefined,
      interestFactor: isSet(object.interestFactor)
        ? String(object.interestFactor)
        : '',
    };
  },

  toJSON(message: GenesisAccumulationTime): unknown {
    const obj: any = {};
    message.collateralType !== undefined &&
      (obj.collateralType = message.collateralType);
    message.previousAccumulationTime !== undefined &&
      (obj.previousAccumulationTime =
        message.previousAccumulationTime.toISOString());
    message.interestFactor !== undefined &&
      (obj.interestFactor = message.interestFactor);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisAccumulationTime>, I>>(
    object: I
  ): GenesisAccumulationTime {
    const message = createBaseGenesisAccumulationTime();
    message.collateralType = object.collateralType ?? '';
    message.previousAccumulationTime =
      object.previousAccumulationTime ?? undefined;
    message.interestFactor = object.interestFactor ?? '';
    return message;
  },
};

function createBaseGenesisTotalPrincipal(): GenesisTotalPrincipal {
  return { collateralType: '', totalPrincipal: '' };
}

export const GenesisTotalPrincipal = {
  encode(
    message: GenesisTotalPrincipal,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.collateralType !== '') {
      writer.uint32(10).string(message.collateralType);
    }
    if (message.totalPrincipal !== '') {
      writer.uint32(18).string(message.totalPrincipal);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GenesisTotalPrincipal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisTotalPrincipal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collateralType = reader.string();
          break;
        case 2:
          message.totalPrincipal = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisTotalPrincipal {
    return {
      collateralType: isSet(object.collateralType)
        ? String(object.collateralType)
        : '',
      totalPrincipal: isSet(object.totalPrincipal)
        ? String(object.totalPrincipal)
        : '',
    };
  },

  toJSON(message: GenesisTotalPrincipal): unknown {
    const obj: any = {};
    message.collateralType !== undefined &&
      (obj.collateralType = message.collateralType);
    message.totalPrincipal !== undefined &&
      (obj.totalPrincipal = message.totalPrincipal);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisTotalPrincipal>, I>>(
    object: I
  ): GenesisTotalPrincipal {
    const message = createBaseGenesisTotalPrincipal();
    message.collateralType = object.collateralType ?? '';
    message.totalPrincipal = object.totalPrincipal ?? '';
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
