import test from "node:test";
import assert from "node:assert/strict";
import { classifyAdapter, adapterName, TIERS } from "../src/gpu.js";
import { capDelay } from "../src/archive-motion.js";
import { UI } from "../src/i18n.js";

test("adapters are classified from their WebGL renderer strings", () => {
  const cases = [
    ["ANGLE (NVIDIA, NVIDIA GeForce RTX 5070 Laptop GPU (0x00002D58) Direct3D11 vs_5_0 ps_5_0, D3D11)", "discrete"],
    ["ANGLE (NVIDIA, Vulkan 1.4.325 (NVIDIA NVIDIA GeForce RTX 5070 Laptop GPU (0x00002D58)), NVIDIA)", "discrete"],
    ["ANGLE (Intel, Intel(R) Graphics (0x00007D67) Direct3D11 vs_5_0 ps_5_0, D3D11)", "integrated"],
    ["ANGLE (Intel, Intel(R) UHD Graphics 620 Direct3D11 vs_5_0 ps_5_0, D3D11)", "integrated"],
    ["ANGLE (Intel, Intel(R) Iris(R) Xe Graphics Direct3D11 vs_5_0 ps_5_0, D3D11)", "integrated"],
    ["ANGLE (Intel, Intel(R) Arc(TM) Graphics Direct3D11 vs_5_0 ps_5_0, D3D11)", "integrated"],
    ["ANGLE (Intel, Intel(R) Arc(TM) A770 Graphics Direct3D11 vs_5_0 ps_5_0, D3D11)", "discrete"],
    ["ANGLE (AMD, AMD Radeon(TM) Graphics Direct3D11 vs_5_0 ps_5_0, D3D11)", "integrated"],
    ["ANGLE (AMD, AMD Radeon 780M Graphics Direct3D11 vs_5_0 ps_5_0, D3D11)", "integrated"],
    ["ANGLE (AMD, AMD Radeon(TM) RX Vega 10 Graphics Direct3D11 vs_5_0 ps_5_0, D3D11)", "integrated"],
    ["ANGLE (AMD, AMD Radeon RX 7800 XT Direct3D11 vs_5_0 ps_5_0, D3D11)", "discrete"],
    ["ANGLE (ATI Technologies Inc., AMD Radeon Pro 5500M OpenGL Engine, OpenGL 4.1)", "discrete"],
    ["ANGLE (Apple, ANGLE Metal Renderer: Apple M2, Unspecified Version)", "apple"],
    ["Apple GPU", "apple"],
    ["ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero) (0x0000C0DE)), SwiftShader driver)", "software"],
    ["ANGLE (Microsoft, Microsoft Basic Render Driver Direct3D11 vs_5_0 ps_5_0, D3D11)", "software"],
    ["llvmpipe (LLVM 15.0.7, 256 bits)", "software"],
    ["Adreno (TM) 740", "mobile"],
    ["Mali-G710", "mobile"],
    ["", "unknown"],
  ];
  for (const [renderer, kind] of cases) assert.equal(classifyAdapter(renderer), kind, renderer);
});

test("adapter names are shortened for the notice", () => {
  assert.equal(adapterName("ANGLE (Intel, Intel(R) Graphics (0x00007D67) Direct3D11 vs_5_0 ps_5_0, D3D11)"), "Intel(R) Graphics");
  assert.equal(adapterName("ANGLE (NVIDIA, NVIDIA GeForce RTX 5070 Laptop GPU (0x00002D58) Direct3D11 vs_5_0 ps_5_0, D3D11)"), "NVIDIA GeForce RTX 5070 Laptop GPU");
  assert.equal(adapterName("Apple GPU"), "Apple GPU");
});

test("tiers only lower quality below the discrete tier", () => {
  assert.equal(TIERS.high.maxFps, 0);
  assert.ok(TIERS.low.maxPixelRatio < TIERS.high.maxPixelRatio && TIERS.minimal.maxPixelRatio <= TIERS.low.maxPixelRatio);
  assert.ok(TIERS.low.idleFps > 0 && TIERS.low.idleFps <= TIERS.low.maxFps);
  assert.equal(TIERS.minimal.breathing, false);
});

test("frame-rate caps land on whole refreshes", () => {
  assert.equal(capDelay(100, 90, 0), 0);
  // 60 fps cap on a 170 Hz display: not after 2 refreshes (11.8 ms), yes after 3 (17.6 ms).
  assert.ok(capDelay(111.8, 100, 60) > 1);
  assert.equal(capDelay(117.6, 100, 60), 0);
  // 60 fps cap on a 60 Hz display draws every refresh.
  assert.equal(capDelay(116.7, 100, 60), 0);
});

test("graphics notice text exists in both languages", () => {
  for (const key of Object.keys(UI).filter((k) => k.startsWith("gpu."))) {
    assert.ok(UI[key].zh && UI[key].en, key);
  }
  assert.match(UI["gpu.windows"].zh, /显示卡/);
  assert.match(UI["gpu.windows"].en, /Settings → System → Display → Graphics/);
  assert.match(UI["gpu.flag"].en, /Force High Performance GPU/);
});
