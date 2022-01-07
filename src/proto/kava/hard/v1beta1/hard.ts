/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Coin } from '../../../cosmos/base/v1beta1/coin';

export const protobufPackage = 'kava.hard.v1beta1';

/** Params defines the parameters for the hard module. */
export interface Params {
  moneyMarkets: MoneyMarket[];
  minimumBorrowUsdValue: string;
}

/** MoneyMarket is a money market for an individual asset. */
export interface MoneyMarket {
  denom: string;
  borrowLimit?: BorrowLimit;
  spotMarketId: string;
  conversionFactor: string;
  interestRateModel?: InterestRateModel;
  reserveFactor: string;
  keeperRewardPercentage: string;
}

/** BorrowLimit enforces restrictions on a money market. */
export interface BorrowLimit {
  hasMaxLimit: boolean;
  maximumLimit: string;
  loanToValue: string;
}

/** InterestRateModel contains information about an asset's interest rate. */
export interface InterestRateModel {
  baseRateApy: string;
  baseMultiplier: string;
  kink: string;
  jumpMultiplier: string;
}

/** Deposit defines an amount of coins deposited into a hard module account. */
export interface Deposit {
  depositor: string;
  amount: Coin[];
  index: SupplyInterestFactor[];
}

/** Borrow defines an amount of coins borrowed from a hard module account. */
export interface Borrow {
  borrower: string;
  amount: Coin[];
  index: BorrowInterestFactor[];
}

/** SupplyInterestFactor defines an individual borrow interest factor. */
export interface SupplyInterestFactor {
  denom: string;
  value: string;
}

/** BorrowInterestFactor defines an individual borrow interest factor. */
export interface BorrowInterestFactor {
  denom: string;
  value: string;
}

/** CoinsProto defines a Protobuf wrapper around a Coins slice */
export interface CoinsProto {
  coins: Coin[];
}

function createBaseParams(): Params {
  return { moneyMarkets: [], minimumBorrowUsdValue: '' };
}

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.moneyMarkets) {
      MoneyMarket.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.minimumBorrowUsdValue !== '') {
      writer.uint32(18).string(message.minimumBorrowUsdValue);
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
          message.moneyMarkets.push(
            MoneyMarket.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.minimumBorrowUsdValue = reader.string();
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
      moneyMarkets: Array.isArray(object?.moneyMarkets)
        ? object.moneyMarkets.map((e: any) => MoneyMarket.fromJSON(e))
        : [],
      minimumBorrowUsdValue: isSet(object.minimumBorrowUsdValue)
        ? String(object.minimumBorrowUsdValue)
        : '',
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.moneyMarkets) {
      obj.moneyMarkets = message.moneyMarkets.map((e) =>
        e ? MoneyMarket.toJSON(e) : undefined
      );
    } else {
      obj.moneyMarkets = [];
    }
    message.minimumBorrowUsdValue !== undefined &&
      (obj.minimumBorrowUsdValue = message.minimumBorrowUsdValue);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.moneyMarkets =
      object.moneyMarkets?.map((e) => MoneyMarket.fromPartial(e)) || [];
    message.minimumBorrowUsdValue = object.minimumBorrowUsdValue ?? '';
    return message;
  },
};

function createBaseMoneyMarket(): MoneyMarket {
  return {
    denom: '',
    borrowLimit: undefined,
    spotMarketId: '',
    conversionFactor: '',
    interestRateModel: undefined,
    reserveFactor: '',
    keeperRewardPercentage: '',
  };
}

export const MoneyMarket = {
  encode(
    message: MoneyMarket,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.denom !== '') {
      writer.uint32(10).string(message.denom);
    }
    if (message.borrowLimit !== undefined) {
      BorrowLimit.encode(
        message.borrowLimit,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.spotMarketId !== '') {
      writer.uint32(26).string(message.spotMarketId);
    }
    if (message.conversionFactor !== '') {
      writer.uint32(34).string(message.conversionFactor);
    }
    if (message.interestRateModel !== undefined) {
      InterestRateModel.encode(
        message.interestRateModel,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.reserveFactor !== '') {
      writer.uint32(50).string(message.reserveFactor);
    }
    if (message.keeperRewardPercentage !== '') {
      writer.uint32(58).string(message.keeperRewardPercentage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MoneyMarket {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMoneyMarket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.borrowLimit = BorrowLimit.decode(reader, reader.uint32());
          break;
        case 3:
          message.spotMarketId = reader.string();
          break;
        case 4:
          message.conversionFactor = reader.string();
          break;
        case 5:
          message.interestRateModel = InterestRateModel.decode(
            reader,
            reader.uint32()
          );
          break;
        case 6:
          message.reserveFactor = reader.string();
          break;
        case 7:
          message.keeperRewardPercentage = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MoneyMarket {
    return {
      denom: isSet(object.denom) ? String(object.denom) : '',
      borrowLimit: isSet(object.borrowLimit)
        ? BorrowLimit.fromJSON(object.borrowLimit)
        : undefined,
      spotMarketId: isSet(object.spotMarketId)
        ? String(object.spotMarketId)
        : '',
      conversionFactor: isSet(object.conversionFactor)
        ? String(object.conversionFactor)
        : '',
      interestRateModel: isSet(object.interestRateModel)
        ? InterestRateModel.fromJSON(object.interestRateModel)
        : undefined,
      reserveFactor: isSet(object.reserveFactor)
        ? String(object.reserveFactor)
        : '',
      keeperRewardPercentage: isSet(object.keeperRewardPercentage)
        ? String(object.keeperRewardPercentage)
        : '',
    };
  },

  toJSON(message: MoneyMarket): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    message.borrowLimit !== undefined &&
      (obj.borrowLimit = message.borrowLimit
        ? BorrowLimit.toJSON(message.borrowLimit)
        : undefined);
    message.spotMarketId !== undefined &&
      (obj.spotMarketId = message.spotMarketId);
    message.conversionFactor !== undefined &&
      (obj.conversionFactor = message.conversionFactor);
    message.interestRateModel !== undefined &&
      (obj.interestRateModel = message.interestRateModel
        ? InterestRateModel.toJSON(message.interestRateModel)
        : undefined);
    message.reserveFactor !== undefined &&
      (obj.reserveFactor = message.reserveFactor);
    message.keeperRewardPercentage !== undefined &&
      (obj.keeperRewardPercentage = message.keeperRewardPercentage);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MoneyMarket>, I>>(
    object: I
  ): MoneyMarket {
    const message = createBaseMoneyMarket();
    message.denom = object.denom ?? '';
    message.borrowLimit =
      object.borrowLimit !== undefined && object.borrowLimit !== null
        ? BorrowLimit.fromPartial(object.borrowLimit)
        : undefined;
    message.spotMarketId = object.spotMarketId ?? '';
    message.conversionFactor = object.conversionFactor ?? '';
    message.interestRateModel =
      object.interestRateModel !== undefined &&
      object.interestRateModel !== null
        ? InterestRateModel.fromPartial(object.interestRateModel)
        : undefined;
    message.reserveFactor = object.reserveFactor ?? '';
    message.keeperRewardPercentage = object.keeperRewardPercentage ?? '';
    return message;
  },
};

function createBaseBorrowLimit(): BorrowLimit {
  return { hasMaxLimit: false, maximumLimit: '', loanToValue: '' };
}

export const BorrowLimit = {
  encode(
    message: BorrowLimit,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.hasMaxLimit === true) {
      writer.uint32(8).bool(message.hasMaxLimit);
    }
    if (message.maximumLimit !== '') {
      writer.uint32(18).string(message.maximumLimit);
    }
    if (message.loanToValue !== '') {
      writer.uint32(26).string(message.loanToValue);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BorrowLimit {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBorrowLimit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hasMaxLimit = reader.bool();
          break;
        case 2:
          message.maximumLimit = reader.string();
          break;
        case 3:
          message.loanToValue = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BorrowLimit {
    return {
      hasMaxLimit: isSet(object.hasMaxLimit)
        ? Boolean(object.hasMaxLimit)
        : false,
      maximumLimit: isSet(object.maximumLimit)
        ? String(object.maximumLimit)
        : '',
      loanToValue: isSet(object.loanToValue) ? String(object.loanToValue) : '',
    };
  },

  toJSON(message: BorrowLimit): unknown {
    const obj: any = {};
    message.hasMaxLimit !== undefined &&
      (obj.hasMaxLimit = message.hasMaxLimit);
    message.maximumLimit !== undefined &&
      (obj.maximumLimit = message.maximumLimit);
    message.loanToValue !== undefined &&
      (obj.loanToValue = message.loanToValue);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BorrowLimit>, I>>(
    object: I
  ): BorrowLimit {
    const message = createBaseBorrowLimit();
    message.hasMaxLimit = object.hasMaxLimit ?? false;
    message.maximumLimit = object.maximumLimit ?? '';
    message.loanToValue = object.loanToValue ?? '';
    return message;
  },
};

function createBaseInterestRateModel(): InterestRateModel {
  return { baseRateApy: '', baseMultiplier: '', kink: '', jumpMultiplier: '' };
}

export const InterestRateModel = {
  encode(
    message: InterestRateModel,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.baseRateApy !== '') {
      writer.uint32(10).string(message.baseRateApy);
    }
    if (message.baseMultiplier !== '') {
      writer.uint32(18).string(message.baseMultiplier);
    }
    if (message.kink !== '') {
      writer.uint32(26).string(message.kink);
    }
    if (message.jumpMultiplier !== '') {
      writer.uint32(34).string(message.jumpMultiplier);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InterestRateModel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInterestRateModel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseRateApy = reader.string();
          break;
        case 2:
          message.baseMultiplier = reader.string();
          break;
        case 3:
          message.kink = reader.string();
          break;
        case 4:
          message.jumpMultiplier = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InterestRateModel {
    return {
      baseRateApy: isSet(object.baseRateApy) ? String(object.baseRateApy) : '',
      baseMultiplier: isSet(object.baseMultiplier)
        ? String(object.baseMultiplier)
        : '',
      kink: isSet(object.kink) ? String(object.kink) : '',
      jumpMultiplier: isSet(object.jumpMultiplier)
        ? String(object.jumpMultiplier)
        : '',
    };
  },

  toJSON(message: InterestRateModel): unknown {
    const obj: any = {};
    message.baseRateApy !== undefined &&
      (obj.baseRateApy = message.baseRateApy);
    message.baseMultiplier !== undefined &&
      (obj.baseMultiplier = message.baseMultiplier);
    message.kink !== undefined && (obj.kink = message.kink);
    message.jumpMultiplier !== undefined &&
      (obj.jumpMultiplier = message.jumpMultiplier);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<InterestRateModel>, I>>(
    object: I
  ): InterestRateModel {
    const message = createBaseInterestRateModel();
    message.baseRateApy = object.baseRateApy ?? '';
    message.baseMultiplier = object.baseMultiplier ?? '';
    message.kink = object.kink ?? '';
    message.jumpMultiplier = object.jumpMultiplier ?? '';
    return message;
  },
};

function createBaseDeposit(): Deposit {
  return { depositor: '', amount: [], index: [] };
}

export const Deposit = {
  encode(
    message: Deposit,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.depositor !== '') {
      writer.uint32(10).string(message.depositor);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.index) {
      SupplyInterestFactor.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Deposit {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeposit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.depositor = reader.string();
          break;
        case 2:
          message.amount.push(Coin.decode(reader, reader.uint32()));
          break;
        case 3:
          message.index.push(
            SupplyInterestFactor.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Deposit {
    return {
      depositor: isSet(object.depositor) ? String(object.depositor) : '',
      amount: Array.isArray(object?.amount)
        ? object.amount.map((e: any) => Coin.fromJSON(e))
        : [],
      index: Array.isArray(object?.index)
        ? object.index.map((e: any) => SupplyInterestFactor.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Deposit): unknown {
    const obj: any = {};
    message.depositor !== undefined && (obj.depositor = message.depositor);
    if (message.amount) {
      obj.amount = message.amount.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.amount = [];
    }
    if (message.index) {
      obj.index = message.index.map((e) =>
        e ? SupplyInterestFactor.toJSON(e) : undefined
      );
    } else {
      obj.index = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Deposit>, I>>(object: I): Deposit {
    const message = createBaseDeposit();
    message.depositor = object.depositor ?? '';
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    message.index =
      object.index?.map((e) => SupplyInterestFactor.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBorrow(): Borrow {
  return { borrower: '', amount: [], index: [] };
}

export const Borrow = {
  encode(
    message: Borrow,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.borrower !== '') {
      writer.uint32(10).string(message.borrower);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.index) {
      BorrowInterestFactor.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Borrow {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBorrow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.borrower = reader.string();
          break;
        case 2:
          message.amount.push(Coin.decode(reader, reader.uint32()));
          break;
        case 3:
          message.index.push(
            BorrowInterestFactor.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Borrow {
    return {
      borrower: isSet(object.borrower) ? String(object.borrower) : '',
      amount: Array.isArray(object?.amount)
        ? object.amount.map((e: any) => Coin.fromJSON(e))
        : [],
      index: Array.isArray(object?.index)
        ? object.index.map((e: any) => BorrowInterestFactor.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Borrow): unknown {
    const obj: any = {};
    message.borrower !== undefined && (obj.borrower = message.borrower);
    if (message.amount) {
      obj.amount = message.amount.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.amount = [];
    }
    if (message.index) {
      obj.index = message.index.map((e) =>
        e ? BorrowInterestFactor.toJSON(e) : undefined
      );
    } else {
      obj.index = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Borrow>, I>>(object: I): Borrow {
    const message = createBaseBorrow();
    message.borrower = object.borrower ?? '';
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    message.index =
      object.index?.map((e) => BorrowInterestFactor.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSupplyInterestFactor(): SupplyInterestFactor {
  return { denom: '', value: '' };
}

export const SupplyInterestFactor = {
  encode(
    message: SupplyInterestFactor,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.denom !== '') {
      writer.uint32(10).string(message.denom);
    }
    if (message.value !== '') {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SupplyInterestFactor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSupplyInterestFactor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SupplyInterestFactor {
    return {
      denom: isSet(object.denom) ? String(object.denom) : '',
      value: isSet(object.value) ? String(object.value) : '',
    };
  },

  toJSON(message: SupplyInterestFactor): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SupplyInterestFactor>, I>>(
    object: I
  ): SupplyInterestFactor {
    const message = createBaseSupplyInterestFactor();
    message.denom = object.denom ?? '';
    message.value = object.value ?? '';
    return message;
  },
};

function createBaseBorrowInterestFactor(): BorrowInterestFactor {
  return { denom: '', value: '' };
}

export const BorrowInterestFactor = {
  encode(
    message: BorrowInterestFactor,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.denom !== '') {
      writer.uint32(10).string(message.denom);
    }
    if (message.value !== '') {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): BorrowInterestFactor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBorrowInterestFactor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BorrowInterestFactor {
    return {
      denom: isSet(object.denom) ? String(object.denom) : '',
      value: isSet(object.value) ? String(object.value) : '',
    };
  },

  toJSON(message: BorrowInterestFactor): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BorrowInterestFactor>, I>>(
    object: I
  ): BorrowInterestFactor {
    const message = createBaseBorrowInterestFactor();
    message.denom = object.denom ?? '';
    message.value = object.value ?? '';
    return message;
  },
};

function createBaseCoinsProto(): CoinsProto {
  return { coins: [] };
}

export const CoinsProto = {
  encode(
    message: CoinsProto,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CoinsProto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCoinsProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.coins.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CoinsProto {
    return {
      coins: Array.isArray(object?.coins)
        ? object.coins.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CoinsProto): unknown {
    const obj: any = {};
    if (message.coins) {
      obj.coins = message.coins.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.coins = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CoinsProto>, I>>(
    object: I
  ): CoinsProto {
    const message = createBaseCoinsProto();
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
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
