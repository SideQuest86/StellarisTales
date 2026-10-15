import test from "node:test";
import assert from "node:assert/strict";
import { renderMarkdown, inline, detectLang, hasCJK, safeUrl } from "../src/markdown.js";
import { cleanEnglish, cleanChinese } from "../src/name-tooltip.js";

test("block constructs", () => {
  const h = renderMarkdown("# Title\n\nPara one\nstill one.\n\n- a\n- b\n\n1. x\n2. y\n\n> quote");
  assert.match(h, /<h3[^>]*>Title<\/h3>/);
  assert.match(h, /<p[^>]*>Para one still one\.<\/p>/);
  assert.match(h, /<ul><li[^>]*>a<\/li><li[^>]*>b<\/li><\/ul>/);
  assert.match(h, /<ol>/);
  assert.match(h, /<blockquote[^>]*>quote<\/blockquote>/);
  assert.match(renderMarkdown("##### deep ####"), /<h5/);
});
test("inline constructs", () => {
  assert.equal(inline("**b** and *i* `distar.1030`"), "<strong>b</strong> and <em>i</em> <code>distar.1030</code>");
  assert.match(inline("[x](https://e.com/a)"), /<a href="https:\/\/e\.com\/a" rel="noopener noreferrer" target="_blank">x<\/a>/);
  assert.match(inline("[x](#sec)"), /href="#sec" rel="noopener noreferrer">x/);
  assert.doesNotMatch(inline("[x](./a.md)"), /target/);
});
test("XSS", () => {
  for (const bad of ['<script>alert(1)</script>', '[x](javascript:alert(1))', '[x](data:text/html,hi)', '<img src=x onerror=alert(1)>', '![i](http://e.com/a.png)', '[a"onmouseover="x](http://e.com)', '[x](http://e.com/"onclick="y)', '`<b>`']) {
    const h = renderMarkdown(bad);
    assert.doesNotMatch(h, /<script|<img|javascript:|data:|onerror=|<b>|"onmouseover|href="[^"]*"[^>]*onclick/i, bad);
  }
  assert.equal(inline("[x](javascript:alert(1))"), "x");
  assert.equal(safeUrl("JaVaScRiPt:alert(1)"), null);
  assert.equal(safeUrl("vbscript:x"), null);
});
test("language detection", () => {
  assert.equal(detectLang("这是一个段落"), "zh");
  assert.equal(detectLang("This is a paragraph about distar.1030"), "en");
  assert.equal(detectLang("12345"), "");
  assert.ok(hasCJK("a中"));
  const h = renderMarkdown("中文段落。\n\nEnglish twin.");
  assert.match(h, /data-lang="zh"/);
  assert.match(h, /data-lang="en"/);
});
test("name clean-up", () => {
  assert.equal(cleanEnglish("the the empire"), "The empire");
  assert.equal(cleanEnglish("the our empire"), "Our empire");
  assert.equal(cleanEnglish("Go to the this planet"), "Go to this planet");
  assert.equal(cleanEnglish("Hello. our empire"), "Hello. Our empire");
  assert.equal(cleanChinese("我们的帝国帝国"), "我们的帝国");
  assert.equal(cleanChinese("正常的文字"), "正常的文字");
});
