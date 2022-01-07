/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Coin } from '../../../cosmos/base/v1beta1/coin';

export const protobufPackage = 'kava.cdp.v1beta1';

/** MsgCreateCDP defines a message to create a new CDP. */
export interface MsgCreateCDP {
  sender: string;
  collateral?: Coin;
  principal?: Coin;
  collateralType: string;
}

/** MsgCreateCDPResponse defines the Msg/CreateCDP response type. */
export interface MsgCreateCDPResponse {
  cdpId: Long;
}

/** MsgDeposit defines a message to deposit to a CDP. */
export interface MsgDeposit {
  depositor: string;
  owner: string;
  collateral?: Coin;
  collateralType: string;
}

/** MsgDepositResponse defines the Msg/Deposit response type. */
export interface MsgDepositResponse {}

/** MsgWithdraw defines a message to withdraw collateral from a CDP. */
export interface MsgWithdraw {
  depositor: string;
  owner: string;
  collateral?: Coin;
  collateralType: string;
}

/** MsgWithdrawResponse defines the Msg/Withdraw response type. */
export interface MsgWithdrawResponse {}

/** MsgDrawDebt defines a message to draw debt from a CDP. */
export interface MsgDrawDebt {
  sender: string;
  collateralType: string;
  principal?: Coin;
}

/** MsgDrawDebtResponse defines the Msg/DrawDebt response type. */
export interface MsgDrawDebtResponse {}

/** MsgRepayDebt defines a message to repay debt from a CDP. */
export interface MsgRepayDebt {
  sender: string;
  collateralType: string;
  payment?: Coin;
}

/** MsgRepayDebtResponse defines the Msg/RepayDebt response type. */
export interface MsgRepayDebtResponse {}

/**
 * MsgLiquidate defines a message to attempt to liquidate a CDP whos
 * collateralization ratio is under its liquidation ratio.
 */
export interface MsgLiquidate {
  keeper: string;
  borrower: string;
  collateralType: string;
}

/** MsgLiquidateResponse defines the Msg/Liquidate response type. */
export interface MsgLiquidateResponse {}

function createBaseMsgCreateCDP(): MsgCreateCDP {
  return {
    sender: '',
    collateral: undefined,
    principal: undefined,
    collateralType: '',
  };
}

export const MsgCreateCDP = {
  encode(
    message: MsgCreateCDP,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sender !== '') {
      writer.uint32(10).string(message.sender);
    }
    if (message.collateral !== undefined) {
      Coin.encode(message.collateral, writer.uint32(18).fork()).ldelim();
    }
    if (message.principal !== undefined) {
      Coin.encode(message.principal, writer.uint32(26).fork()).ldelim();
    }
    if (message.collateralType !== '') {
      writer.uint32(34).string(message.collateralType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateCDP {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateCDP();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.collateral = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.principal = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.collateralType = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateCDP {
    return {
      sender: isSet(object.sender) ? String(object.sender) : '',
      collateral: isSet(object.collateral)
        ? Coin.fromJSON(object.collateral)
        : undefined,
      principal: isSet(object.principal)
        ? Coin.fromJSON(object.principal)
        : undefined,
      collateralType: isSet(object.collateralType)
        ? String(object.collateralType)
        : '',
    };
  },

  toJSON(message: MsgCreateCDP): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.collateral !== undefined &&
      (obj.collateral = message.collateral
        ? Coin.toJSON(message.collateral)
        : undefined);
    message.principal !== undefined &&
      (obj.principal = message.principal
        ? Coin.toJSON(message.principal)
        : undefined);
    message.collateralType !== undefined &&
      (obj.collateralType = message.collateralType);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateCDP>, I>>(
    object: I
  ): MsgCreateCDP {
    const message = createBaseMsgCreateCDP();
    message.sender = object.sender ?? '';
    message.collateral =
      object.collateral !== undefined && object.collateral !== null
        ? Coin.fromPartial(object.collateral)
        : undefined;
    message.principal =
      object.principal !== undefined && object.principal !== null
        ? Coin.fromPartial(object.principal)
        : undefined;
    message.collateralType = object.collateralType ?? '';
    return message;
  },
};

function createBaseMsgCreateCDPResponse(): MsgCreateCDPResponse {
  return { cdpId: Long.UZERO };
}

export const MsgCreateCDPResponse = {
  encode(
    message: MsgCreateCDPResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.cdpId.isZero()) {
      writer.uint32(8).uint64(message.cdpId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreateCDPResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateCDPResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cdpId = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateCDPResponse {
    return {
      cdpId: isSet(object.cdpId) ? Long.fromString(object.cdpId) : Long.UZERO,
    };
  },

  toJSON(message: MsgCreateCDPResponse): unknown {
    const obj: any = {};
    message.cdpId !== undefined &&
      (obj.cdpId = (message.cdpId || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateCDPResponse>, I>>(
    object: I
  ): MsgCreateCDPResponse {
    const message = createBaseMsgCreateCDPResponse();
    message.cdpId =
      object.cdpId !== undefined && object.cdpId !== null
        ? Long.fromValue(object.cdpId)
        : Long.UZERO;
    return message;
  },
};

function createBaseMsgDeposit(): MsgDeposit {
  return {
    depositor: '',
    owner: '',
    collateral: undefined,
    collateralType: '',
  };
}

export const MsgDeposit = {
  encode(
    message: MsgDeposit,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.depositor !== '') {
      writer.uint32(10).string(message.depositor);
    }
    if (message.owner !== '') {
      writer.uint32(18).string(message.owner);
    }
    if (message.collateral !== undefined) {
      Coin.encode(message.collateral, writer.uint32(26).fork()).ldelim();
    }
    if (message.collateralType !== '') {
      writer.uint32(34).string(message.collateralType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeposit {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeposit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.depositor = reader.string();
          break;
        case 2:
          message.owner = reader.string();
          break;
        case 3:
          message.collateral = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.collateralType = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeposit {
    return {
      depositor: isSet(object.depositor) ? String(object.depositor) : '',
      owner: isSet(object.owner) ? String(object.owner) : '',
      collateral: isSet(object.collateral)
        ? Coin.fromJSON(object.collateral)
        : undefined,
      collateralType: isSet(object.collateralType)
        ? String(object.collateralType)
        : '',
    };
  },

  toJSON(message: MsgDeposit): unknown {
    const obj: any = {};
    message.depositor !== undefined && (obj.depositor = message.depositor);
    message.owner !== undefined && (obj.owner = message.owner);
    message.collateral !== undefined &&
      (obj.collateral = message.collateral
        ? Coin.toJSON(message.collateral)
        : undefined);
    message.collateralType !== undefined &&
      (obj.collateralType = message.collateralType);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeposit>, I>>(
    object: I
  ): MsgDeposit {
    const message = createBaseMsgDeposit();
    message.depositor = object.depositor ?? '';
    message.owner = object.owner ?? '';
    message.collateral =
      object.collateral !== undefined && object.collateral !== null
        ? Coin.fromPartial(object.collateral)
        : undefined;
    message.collateralType = object.collateralType ?? '';
    return message;
  },
};

function createBaseMsgDepositResponse(): MsgDepositResponse {
  return {};
}

export const MsgDepositResponse = {
  encode(
    _: MsgDepositResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDepositResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDepositResponse();
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

  fromJSON(_: any): MsgDepositResponse {
    return {};
  },

  toJSON(_: MsgDepositResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDepositResponse>, I>>(
    _: I
  ): MsgDepositResponse {
    const message = createBaseMsgDepositResponse();
    return message;
  },
};

function createBaseMsgWithdraw(): MsgWithdraw {
  return {
    depositor: '',
    owner: '',
    collateral: undefined,
    collateralType: '',
  };
}

export const MsgWithdraw = {
  encode(
    message: MsgWithdraw,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.depositor !== '') {
      writer.uint32(10).string(message.depositor);
    }
    if (message.owner !== '') {
      writer.uint32(18).string(message.owner);
    }
    if (message.collateral !== undefined) {
      Coin.encode(message.collateral, writer.uint32(26).fork()).ldelim();
    }
    if (message.collateralType !== '') {
      writer.uint32(34).string(message.collateralType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdraw {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdraw();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.depositor = reader.string();
          break;
        case 2:
          message.owner = reader.string();
          break;
        case 3:
          message.collateral = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.collateralType = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgWithdraw {
    return {
      depositor: isSet(object.depositor) ? String(object.depositor) : '',
      owner: isSet(object.owner) ? String(object.owner) : '',
      collateral: isSet(object.collateral)
        ? Coin.fromJSON(object.collateral)
        : undefined,
      collateralType: isSet(object.collateralType)
        ? String(object.collateralType)
        : '',
    };
  },

  toJSON(message: MsgWithdraw): unknown {
    const obj: any = {};
    message.depositor !== undefined && (obj.depositor = message.depositor);
    message.owner !== undefined && (obj.owner = message.owner);
    message.collateral !== undefined &&
      (obj.collateral = message.collateral
        ? Coin.toJSON(message.collateral)
        : undefined);
    message.collateralType !== undefined &&
      (obj.collateralType = message.collateralType);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgWithdraw>, I>>(
    object: I
  ): MsgWithdraw {
    const message = createBaseMsgWithdraw();
    message.depositor = object.depositor ?? '';
    message.owner = object.owner ?? '';
    message.collateral =
      object.collateral !== undefined && object.collateral !== null
        ? Coin.fromPartial(object.collateral)
        : undefined;
    message.collateralType = object.collateralType ?? '';
    return message;
  },
};

function createBaseMsgWithdrawResponse(): MsgWithdrawResponse {
  return {};
}

export const MsgWithdrawResponse = {
  encode(
    _: MsgWithdrawResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawResponse();
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

  fromJSON(_: any): MsgWithdrawResponse {
    return {};
  },

  toJSON(_: MsgWithdrawResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgWithdrawResponse>, I>>(
    _: I
  ): MsgWithdrawResponse {
    const message = createBaseMsgWithdrawResponse();
    return message;
  },
};

function createBaseMsgDrawDebt(): MsgDrawDebt {
  return { sender: '', collateralType: '', principal: undefined };
}

export const MsgDrawDebt = {
  encode(
    message: MsgDrawDebt,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sender !== '') {
      writer.uint32(10).string(message.sender);
    }
    if (message.collateralType !== '') {
      writer.uint32(18).string(message.collateralType);
    }
    if (message.principal !== undefined) {
      Coin.encode(message.principal, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDrawDebt {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDrawDebt();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.collateralType = reader.string();
          break;
        case 3:
          message.principal = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDrawDebt {
    return {
      sender: isSet(object.sender) ? String(object.sender) : '',
      collateralType: isSet(object.collateralType)
        ? String(object.collateralType)
        : '',
      principal: isSet(object.principal)
        ? Coin.fromJSON(object.principal)
        : undefined,
    };
  },

  toJSON(message: MsgDrawDebt): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.collateralType !== undefined &&
      (obj.collateralType = message.collateralType);
    message.principal !== undefined &&
      (obj.principal = message.principal
        ? Coin.toJSON(message.principal)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDrawDebt>, I>>(
    object: I
  ): MsgDrawDebt {
    const message = createBaseMsgDrawDebt();
    message.sender = object.sender ?? '';
    message.collateralType = object.collateralType ?? '';
    message.principal =
      object.principal !== undefined && object.principal !== null
        ? Coin.fromPartial(object.principal)
        : undefined;
    return message;
  },
};

function createBaseMsgDrawDebtResponse(): MsgDrawDebtResponse {
  return {};
}

export const MsgDrawDebtResponse = {
  encode(
    _: MsgDrawDebtResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDrawDebtResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDrawDebtResponse();
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

  fromJSON(_: any): MsgDrawDebtResponse {
    return {};
  },

  toJSON(_: MsgDrawDebtResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDrawDebtResponse>, I>>(
    _: I
  ): MsgDrawDebtResponse {
    const message = createBaseMsgDrawDebtResponse();
    return message;
  },
};

function createBaseMsgRepayDebt(): MsgRepayDebt {
  return { sender: '', collateralType: '', payment: undefined };
}

export const MsgRepayDebt = {
  encode(
    message: MsgRepayDebt,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sender !== '') {
      writer.uint32(10).string(message.sender);
    }
    if (message.collateralType !== '') {
      writer.uint32(18).string(message.collateralType);
    }
    if (message.payment !== undefined) {
      Coin.encode(message.payment, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRepayDebt {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRepayDebt();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.collateralType = reader.string();
          break;
        case 3:
          message.payment = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRepayDebt {
    return {
      sender: isSet(object.sender) ? String(object.sender) : '',
      collateralType: isSet(object.collateralType)
        ? String(object.collateralType)
        : '',
      payment: isSet(object.payment)
        ? Coin.fromJSON(object.payment)
        : undefined,
    };
  },

  toJSON(message: MsgRepayDebt): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.collateralType !== undefined &&
      (obj.collateralType = message.collateralType);
    message.payment !== undefined &&
      (obj.payment = message.payment
        ? Coin.toJSON(message.payment)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRepayDebt>, I>>(
    object: I
  ): MsgRepayDebt {
    const message = createBaseMsgRepayDebt();
    message.sender = object.sender ?? '';
    message.collateralType = object.collateralType ?? '';
    message.payment =
      object.payment !== undefined && object.payment !== null
        ? Coin.fromPartial(object.payment)
        : undefined;
    return message;
  },
};

function createBaseMsgRepayDebtResponse(): MsgRepayDebtResponse {
  return {};
}

export const MsgRepayDebtResponse = {
  encode(
    _: MsgRepayDebtResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgRepayDebtResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRepayDebtResponse();
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

  fromJSON(_: any): MsgRepayDebtResponse {
    return {};
  },

  toJSON(_: MsgRepayDebtResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRepayDebtResponse>, I>>(
    _: I
  ): MsgRepayDebtResponse {
    const message = createBaseMsgRepayDebtResponse();
    return message;
  },
};

function createBaseMsgLiquidate(): MsgLiquidate {
  return { keeper: '', borrower: '', collateralType: '' };
}

export const MsgLiquidate = {
  encode(
    message: MsgLiquidate,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.keeper !== '') {
      writer.uint32(10).string(message.keeper);
    }
    if (message.borrower !== '') {
      writer.uint32(18).string(message.borrower);
    }
    if (message.collateralType !== '') {
      writer.uint32(26).string(message.collateralType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgLiquidate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLiquidate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.keeper = reader.string();
          break;
        case 2:
          message.borrower = reader.string();
          break;
        case 3:
          message.collateralType = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgLiquidate {
    return {
      keeper: isSet(object.keeper) ? String(object.keeper) : '',
      borrower: isSet(object.borrower) ? String(object.borrower) : '',
      collateralType: isSet(object.collateralType)
        ? String(object.collateralType)
        : '',
    };
  },

  toJSON(message: MsgLiquidate): unknown {
    const obj: any = {};
    message.keeper !== undefined && (obj.keeper = message.keeper);
    message.borrower !== undefined && (obj.borrower = message.borrower);
    message.collateralType !== undefined &&
      (obj.collateralType = message.collateralType);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgLiquidate>, I>>(
    object: I
  ): MsgLiquidate {
    const message = createBaseMsgLiquidate();
    message.keeper = object.keeper ?? '';
    message.borrower = object.borrower ?? '';
    message.collateralType = object.collateralType ?? '';
    return message;
  },
};

function createBaseMsgLiquidateResponse(): MsgLiquidateResponse {
  return {};
}

export const MsgLiquidateResponse = {
  encode(
    _: MsgLiquidateResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgLiquidateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLiquidateResponse();
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

  fromJSON(_: any): MsgLiquidateResponse {
    return {};
  },

  toJSON(_: MsgLiquidateResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgLiquidateResponse>, I>>(
    _: I
  ): MsgLiquidateResponse {
    const message = createBaseMsgLiquidateResponse();
    return message;
  },
};

/** Msg defines the cdp Msg service. */
export interface Msg {
  /** CreateCDP defines a method to create a new CDP. */
  CreateCDP(request: MsgCreateCDP): Promise<MsgCreateCDPResponse>;
  /** Deposit defines a method to deposit to a CDP. */
  Deposit(request: MsgDeposit): Promise<MsgDepositResponse>;
  /** Withdraw defines a method to withdraw collateral from a CDP. */
  Withdraw(request: MsgWithdraw): Promise<MsgWithdrawResponse>;
  /** DrawDebt defines a method to draw debt from a CDP. */
  DrawDebt(request: MsgDrawDebt): Promise<MsgDrawDebtResponse>;
  /** RepayDebt defines a method to repay debt from a CDP. */
  RepayDebt(request: MsgRepayDebt): Promise<MsgRepayDebtResponse>;
  /**
   * Liquidate defines a method to attempt to liquidate a CDP whos
   * collateralization ratio is under its liquidation ratio.
   */
  Liquidate(request: MsgLiquidate): Promise<MsgLiquidateResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateCDP = this.CreateCDP.bind(this);
    this.Deposit = this.Deposit.bind(this);
    this.Withdraw = this.Withdraw.bind(this);
    this.DrawDebt = this.DrawDebt.bind(this);
    this.RepayDebt = this.RepayDebt.bind(this);
    this.Liquidate = this.Liquidate.bind(this);
  }
  CreateCDP(request: MsgCreateCDP): Promise<MsgCreateCDPResponse> {
    const data = MsgCreateCDP.encode(request).finish();
    const promise = this.rpc.request('kava.cdp.v1beta1.Msg', 'CreateCDP', data);
    return promise.then((data) =>
      MsgCreateCDPResponse.decode(new _m0.Reader(data))
    );
  }

  Deposit(request: MsgDeposit): Promise<MsgDepositResponse> {
    const data = MsgDeposit.encode(request).finish();
    const promise = this.rpc.request('kava.cdp.v1beta1.Msg', 'Deposit', data);
    return promise.then((data) =>
      MsgDepositResponse.decode(new _m0.Reader(data))
    );
  }

  Withdraw(request: MsgWithdraw): Promise<MsgWithdrawResponse> {
    const data = MsgWithdraw.encode(request).finish();
    const promise = this.rpc.request('kava.cdp.v1beta1.Msg', 'Withdraw', data);
    return promise.then((data) =>
      MsgWithdrawResponse.decode(new _m0.Reader(data))
    );
  }

  DrawDebt(request: MsgDrawDebt): Promise<MsgDrawDebtResponse> {
    const data = MsgDrawDebt.encode(request).finish();
    const promise = this.rpc.request('kava.cdp.v1beta1.Msg', 'DrawDebt', data);
    return promise.then((data) =>
      MsgDrawDebtResponse.decode(new _m0.Reader(data))
    );
  }

  RepayDebt(request: MsgRepayDebt): Promise<MsgRepayDebtResponse> {
    const data = MsgRepayDebt.encode(request).finish();
    const promise = this.rpc.request('kava.cdp.v1beta1.Msg', 'RepayDebt', data);
    return promise.then((data) =>
      MsgRepayDebtResponse.decode(new _m0.Reader(data))
    );
  }

  Liquidate(request: MsgLiquidate): Promise<MsgLiquidateResponse> {
    const data = MsgLiquidate.encode(request).finish();
    const promise = this.rpc.request('kava.cdp.v1beta1.Msg', 'Liquidate', data);
    return promise.then((data) =>
      MsgLiquidateResponse.decode(new _m0.Reader(data))
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
