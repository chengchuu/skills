# 案例路由索引

先按国家或地区定位，再按餐厅类型或菜系选择文件。通常只需读取 1 个最相关文件；若目标语气或平台跨类型，可再读取 1 个对照文件。不要为单次请求加载全部案例。

## 按国家或地区

- 中国大陆: `examples/china/`，包含区域中餐、面食与饺子、烧烤火锅海鲜、日料与韩式餐厅、西餐快餐、咖啡茶饮甜点。
- 香港: [examples/hong-kong/cha-chaan-teng.md](examples/hong-kong/cha-chaan-teng.md)。
- 日本: `examples/japan/`，包含面与饭、烧肉与居酒屋、日式料理、咖啡甜点和其他类型。
- 韩国: `examples/south-korea/`，包含韩餐、面食、炸鸡和海鲜。
- 国家不明: `examples/unknown/`。只有来源未给出可靠国家信息的案例才放入此处。

## 完整案例文件

- 中国大陆: [chinese-regional-cuisine.md](examples/china/chinese-regional-cuisine.md)、[noodles-and-dumplings.md](examples/china/noodles-and-dumplings.md)、[barbecue-hot-pot-and-seafood.md](examples/china/barbecue-hot-pot-and-seafood.md)、[japanese-and-korean-cuisine.md](examples/china/japanese-and-korean-cuisine.md)、[western-and-fast-food.md](examples/china/western-and-fast-food.md)、[cafes-tea-and-desserts.md](examples/china/cafes-tea-and-desserts.md)。
- 香港: [cha-chaan-teng.md](examples/hong-kong/cha-chaan-teng.md)。
- 日本: [noodles-and-rice.md](examples/japan/noodles-and-rice.md)、[barbecue-izakaya-and-meat.md](examples/japan/barbecue-izakaya-and-meat.md)、[japanese-cuisine.md](examples/japan/japanese-cuisine.md)、[cafes-and-desserts.md](examples/japan/cafes-and-desserts.md)、[western-and-other.md](examples/japan/western-and-other.md)。
- 韩国: [korean-cuisine-and-noodles.md](examples/south-korea/korean-cuisine-and-noodles.md)、[fried-chicken-and-seafood.md](examples/south-korea/fried-chicken-and-seafood.md)。
- 国家不明: [fast-food.md](examples/unknown/fast-food.md)、[other.md](examples/unknown/other.md)。

## 按餐厅类型或菜系

| 请求类型 | 优先读取 |
| --- | --- |
| 中国区域菜、家常菜 | [examples/china/chinese-regional-cuisine.md](examples/china/chinese-regional-cuisine.md) |
| 中国面馆、云吞、饺子 | [examples/china/noodles-and-dumplings.md](examples/china/noodles-and-dumplings.md) |
| 中国境内烧烤、火锅、海鲜 | [examples/china/barbecue-hot-pot-and-seafood.md](examples/china/barbecue-hot-pot-and-seafood.md) |
| 中国境内日料、韩式餐厅 | [examples/china/japanese-and-korean-cuisine.md](examples/china/japanese-and-korean-cuisine.md) |
| 披萨、西餐、连锁快餐 | [examples/china/western-and-fast-food.md](examples/china/western-and-fast-food.md) 或 [examples/unknown/fast-food.md](examples/unknown/fast-food.md) |
| 咖啡、茶饮、茶室、甜点 | [examples/china/cafes-tea-and-desserts.md](examples/china/cafes-tea-and-desserts.md) 或 [examples/japan/cafes-and-desserts.md](examples/japan/cafes-and-desserts.md) |
| 日本拉面、沾面、乌冬、盖饭 | [examples/japan/noodles-and-rice.md](examples/japan/noodles-and-rice.md) |
| 日本烧肉、烧鸟、居酒屋、肉料理 | [examples/japan/barbecue-izakaya-and-meat.md](examples/japan/barbecue-izakaya-and-meat.md) |
| 日本定食、寿司、天妇罗、海鲜 | [examples/japan/japanese-cuisine.md](examples/japan/japanese-cuisine.md) |
| 韩国韩餐、拌饭、冷面 | [examples/south-korea/korean-cuisine-and-noodles.md](examples/south-korea/korean-cuisine-and-noodles.md) |
| 韩国炸鸡、海鲜、鱼汤 | [examples/south-korea/fried-chicken-and-seafood.md](examples/south-korea/fried-chicken-and-seafood.md) |

## 按情感、语气和篇幅

- 正面自然口语: 日本多数案例及中国大陆区域菜案例。
- 混合评价: 优先查看日本面饭、肉料理以及 `unknown` 文件中的相关案例。
- 负面评价: 当前没有纯负面餐厅案例；可参考混合评价的克制写法，并严格依据用户提供的问题。
- 短评: 香港茶餐厅、韩国案例和中国大陆面食案例中较多。
- 标准评价: 日本案例最集中，通常包含到店背景、菜品和一个环境或服务细节。
- 详细记录: 中国大陆区域菜、咖啡茶饮和火锅海鲜文件中有少量较长案例。
- 热情种草语气: 日本烧肉与居酒屋、其他类型文件中有少量案例；不要将其当作默认语气。

## 按平台

原始源文件没有明确标注大众点评、Google Maps 或小红书；用户新增案例只有在用户明确提供平台时才标注。平台请求应结合 [output-formats.md](output-formats.md) 使用:

- 大众点评: 选择同地域、同餐厅类型和相近篇幅的案例，再采用信息密度较高的标准评价格式。
- Google Maps: 选择克制、实用、可独立理解的案例，优先保留位置、沟通、点餐或排队事实。
- 小红书: 选择自然口语或热情型案例；只有用户提供时才加入标题、Emoji 和标签。
- 其他平台: 先遵循用户给出的字数与格式限制，再匹配最接近的案例。

完整标签定义见 [taxonomy.md](taxonomy.md)，来源对应关系见 [source-manifest.md](source-manifest.md)。
