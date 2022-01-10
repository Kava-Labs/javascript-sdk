ROOT_DIR := $(patsubst %/,%,$(dir $(abspath $(lastword $(MAKEFILE_LIST)))))
BUILD_DIR := $(ROOT_DIR)/.build
OUT_DIR := $(ROOT_DIR)/src/proto

KAVA_TAG ?= master
KAVA_PROTO_DIR = $(BUILD_DIR)/kava/proto
KAVA_THIRD_PARTY_PROTO_DIR = $(BUILD_DIR)/kava/third_party/proto

NPM_BIN_DIR := $(ROOT_DIR)/node_modules/.bin
TS_PROTO_PLUGIN_PATH := $(NPM_BIN_DIR)/protoc-gen-ts_proto

.PHONY: all
all: proto-deps proto-gen

.PHONY: proto-deps
proto-deps: clean
	mkdir -p $(BUILD_DIR) && \
		cd $(BUILD_DIR) && \
		git clone https://github.com/kava-labs/kava.git --no-checkout --depth 1 --filter=blob:none --sparse && \
		cd $(BUILD_DIR)/kava && \
		git sparse-checkout init &&\
		git sparse-checkout add proto third_party && \
		git fetch origin $(KAVA_TAG) --depth 1 && \
		git checkout FETCH_HEAD

.PHONY: proto-gen
proto-gen:
	mkdir -p $(OUT_DIR) && \
	protoc \
		--plugin="protoc-gen-ts_proto=$(TS_PROTO_PLUGIN_PATH)" \
		--ts_proto_out="$(OUT_DIR)" \
		--ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=messages" \
		--proto_path="$(KAVA_PROTO_DIR)" \
		--proto_path="$(KAVA_THIRD_PARTY_PROTO_DIR)" \
		$(shell find $(KAVA_PROTO_DIR) $(KAVA_THIRD_PARTY_PROTO_DIR) -path -prune -o -name '*.proto' -print0 | xargs -0)

.PHONY: clean
clean:
	rm -rf $(BUILD_DIR)
