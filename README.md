# Stellaris Tales · 群星叙事档案馆

从本地《群星》安装读取原版剧情、中文与英文文本、事件选项和美术，以可交互档案呈现。参考 RhineLabUI 的立体档案、抽取和缓动风格，采用有限 DOM 阵列与按需载入，适配桌面和手机。

## 开发

需要 Node.js 24+；网站运行与构建无第三方依赖。

```sh
npm run dev
npm test
npm run build
node scripts/serve.mjs --dist
```

浏览器打开 `http://127.0.0.1:4173`。静态产物为 `dist/`，支持子路径，可部署至 GitHub Pages。

## 从游戏更新全部内容

提取器需要 Python 3.10+ 和 Pillow（`pip install Pillow`）。只读取游戏，不修改或运行游戏文件。

```sh
python scripts/extract.py --game "D:/Living/Steam/steamapps/common/Stellaris"
python -m unittest discover -s tests -p "test_*.py"
npm test
npm run build
```

覆盖范围为基础安装与所有本地 DLC ZIP 的事件，以及考古、星界裂隙、局势、特殊项目、事件链定义。递归展开内联模板，保留动态文本、条件变体、选项、直接事件连接和项目/阶段连接。工坊模组及存档运行状态不在此范围。

`public/data/coverage.json` 是实际覆盖报告，`sources.json` 和 `art-sources.json` 保存原始路径及 SHA-256。非标题/正文的后台事件仍可通过“包含后台事件与定义”查阅。原始缺失本地化不编造补写。

## 维护与扩展

**先读 [CodexDoc.md](CodexDoc.md)**，其中记录结构、约束、milestones、验证结果和限制。不要手改生成数据；修改提取器后重新生成。人工解读与分类规则应置于 `content/`，与原版文本分开并注明来源。

## 发布

仓库带 GitHub Pages Actions 工作流；仓库 Settings → Pages 的 Source 需设为 GitHub Actions，且账户套餐须允许当前仓库可见性使用 Pages。推送 `main` 后测试、构建与发布自动运行。

## 来源与版权

非官方爱好者项目，与 Paradox Interactive 无隶属关系。原版文本、图像及《群星》商标属于其各自权利人；转换格式不会改变原始版权。游戏内容不包含在本项目代码授权之内。

RhineLabUI 是本地提供的动画参考（LBEILC，MIT）。本站重新实现档案动效，没有使用该项目的明日方舟美术或品牌。中文 Wiki：<https://qunxing.huijiwiki.com/wiki/首页>；目前没有导入无法读取或核实的 Wiki 解读。
