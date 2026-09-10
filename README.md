# Stellaris Tales · 群星叙事档案

[在线浏览](https://sidequest86.github.io/StellarisTales/)

从本地《群星》读取原版剧情、中英文、选择、美术和原声，以可滑动的三维档案长列呈现故事，支持文明视角切换与原声循环。

## 开发

需要 Node.js 24 和 pnpm 11。

```sh
pnpm install --frozen-lockfile
pnpm dev
```

打开 `http://127.0.0.1:4173/`。开发命令先生成 `dist/`；修改后运行 `pnpm build` 并刷新。服务器支持音频 Range 请求。

```sh
pnpm test
pnpm build
node scripts/serve.mjs --dist
```

构建会清理项目内的生成目录 dist，打包本地 Three.js 模块，支持 GitHub Pages 子路径。

## 更新游戏内容

需要 Python 3.10+、Pillow、mutagen。游戏文件只读。

```sh
pip install Pillow mutagen
python scripts/extract.py --game "D:/Living/Steam/steamapps/common/Stellaris"
python scripts/compile-stories.py
python scripts/import-ost.py --game "D:/Living/Steam/steamapps/common/Stellaris"
python -m unittest discover -s tests -p "test_*.py"
pnpm test
pnpm build
```

保留 11,347 条原始记录，58 个起源入口使用正式名称、简介和图片。原声共 23 首，约 162 分钟，点击播放后循环。`public/data/coverage.json`、`story-coverage.json` 和 `origin-coverage.json` 保存覆盖统计。

扫描包括基础安装和本地 DLC ZIP，不包括工坊模组与存档。静态阅读不模拟游戏状态；动态名称使用叙事占位，复杂条件保留为可切换读法。原始脚本仅保存在开发数据层。

## 维护与验证

先读 [CodexDoc.md](CodexDoc.md)。不要手改生成数据。故事与起源规则在 content/；视角编译在 scripts/reactions.py。

安装 Playwright 并保证本机有 Chrome，启动本地服务器后运行 `node scripts/verify-v2.mjs`。也可设置 `STELLARIS_PLAYWRIGHT_PATH` 指向现有模块，或设置 `STELLARIS_TEST_URL` 验证线上站点。详见 [verification/README.md](verification/README.md)。

## 发布与来源

推送 main 后 GitHub Actions 测试、构建并发布。Pages Source 使用 GitHub Actions，仓库变量 `ENABLE_GITHUB_PAGES=true`。

非官方爱好者项目，与 Paradox Interactive 无隶属关系。原版文本、美术、音乐与商标属于其权利人，不包含在本项目代码授权内。

RhineLabUI（LBEILC，MIT）是布局和动画参考。本站参考其长列池、投影拖动、临界阻尼、波浪和相机锚点，使用群星内容与独立绘制的档案几何。声明见 public/THIRD_PARTY_NOTICES.txt；Three.js 许可证随构建输出。未导入无法核实的 Wiki 解读。
