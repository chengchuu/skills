import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const skillRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(skillRoot, "..", "..");
const sourcePath = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(repoRoot, "temp", "pet-examples", "pet.md");
const examplesRoot = path.join(skillRoot, "references", "examples");
const manifestPath = path.join(skillRoot, "references", "source-manifest.md");

const groups = {
  "sleep-and-relaxation.md": [
    ["26-0407-A-Sleepy-Afternoon", "Belly-up and drowsiness", "Unknown", "Belly-up on a bed"],
    ["26-0225-Blanket-Mode-Activated", "Blanket", "Unknown", "Burrowing and peeking"],
    ["26-0225-Cozy-Blanket-Kitty", "Blanket", "Unknown", "Burrowing with half the face visible"],
    ["25-1126-Healing-Sleep-Face", "Sleeping face", "Unknown", "Sleeping"],
    ["25-1208-Healing-Sleep-Face", "Sleeping face", "Unknown", "Sleeping"],
    ["25-0930 Sleepy Head vs Playful Mode", "Drowsiness and contrast", "Unknown", "Nodding off"],
    ["25-0616 Beautiful Sunday", "Weekend rest", "Unknown", "Sleeping or relaxing"],
    ["25-0716 Cute Cat Belly-up", "Belly-up pose", "Unknown", "Resting belly-up"],
    ["25-0715 Gentle Companion", "Nap", "Unknown", "Sleeping quietly"],
    ["25-0714 Gentle Dream", "Dream and nap", "Unknown", "Napping"],
    ["25-0701-Healing-Sleep-Face", "Sleeping face", "Unknown", "Sleeping"],
    ["25-0707 Sticky Little Baby", "Afternoon relaxation", "Unknown", "Relaxing"],
    ["25-0602 Tired All the Time", "Sofa nap", "Unknown", "Sleeping on a sofa"],
  ],
  "companionship-and-affection.md": [
    ["User-provided: 圆眼睛里的好奇心", "Curious gaze", "Unknown", "Showing a curious, round-eyed expression"],
    ["User-provided: 好奇目光", "Curious gaze", "Unknown", "Looking curiously at the owner"],
    ["26-0207-Completely-Unguarded", "Tucked paws and gaze", "Unknown", "Sitting with paws tucked and looking"],
    ["25-1126-The-Most-Healing-Kitten-in-the-World", "Healing portrait", "Unknown", "Unspecified"],
    ["25-1121-A-Cat-Loves-You", "Affection and companionship", "Unknown", "Small affectionate and companionable moments"],
    ["25-1015 Obedient Kitty", "Quiet companionship", "Unknown", "Staying quietly nearby"],
    ["25-1223 Gentle Companion", "Quiet companionship", "Unknown", "Keeping the owner company"],
    ["25-1209 Quiet Little Cutie", "Gentle gaze", "Unknown", "Looking ahead"],
    ["25-1126 Little Angel Kitty", "Gentle portrait", "Unknown", "Unspecified"],
    ["25-1121 Quiet Little Cutie", "Gentle gaze", "Unknown", "Looking at the owner"],
    ["25-1107 Little Angel Kitty", "At the owner's feet", "Unknown", "Staying by the owner's feet"],
    ["25-0919 Obedient Kitty", "Gentle movement", "Unknown", "Small quiet movements"],
    ["25-0610 Cozy Kneading in My Arms", "Kneading and cuddling", "Unknown", "Kneading while held"],
    ["25-0714 Little Angel Kitty", "Quiet portrait", "Unknown", "Staying quiet"],
    ["25-0805-A-Cat-Loves-You", "Closeness", "Unknown", "Approaching the owner"],
    ["25-0714 Stay With Me", "Quiet companionship", "Unknown", "Staying beside the owner"],
    ["25-0711 Loving Gaze from a Kitten", "Gaze and paw contact", "Unknown", "Looking and holding a hand"],
  ],
  "playful-and-funny.md": [
    ["User-provided: 好奇雷达已开启", "Looking around curiously", "Unknown", "Looking around in different directions"],
    ["25-0825-Too-Cute", "Belly-up and tail flick", "Unknown", "Sprawling and flicking the tail"],
    ["26-0204-Curious-Kitty", "Curiosity", "Unknown", "Exploring; exact action unspecified"],
    ["25-1008 Playful Kitty", "Nibbling", "Unknown", "Playing near and nibbling feet"],
    ["25-0829 Bossy Little Kitty", "Boss-cat attitude", "Unknown", "Daily behavior unspecified"],
    ["25-0803 This Is My Cat", "Self-introduction joke", "Unknown", "Eating, sleeping, and destructive behavior as stated"],
    ["25-0616 Kitten Wide-Eyed and Meowing", "Meowing", "Unknown", "Wide-eyed meowing"],
    ["25-0626 Am I Not a Genius", "Frozen pose", "Unknown", "Pausing suddenly"],
    ["25-0605 Don't Even Think Once", "Zoning out", "Unknown", "Staring blankly"],
  ],
  "food-and-snacks.md": [
    ["25-1218 Enjoying Corn Time", "Corn", "Unknown", "Nibbling corn"],
    ["25-0724 Snack Time for a Clever Kitty", "Freeze-dried snack test", "Unknown", "Trying poses for a snack"],
    ["25-0721 Kitten Hiccups", "Chicken breast and hiccups", "Unknown", "Eating chicken breast and hiccuping"],
  ],
  "grooming-and-care.md": [
    ["User-provided: 认真洗脸中", "Face washing", "Unknown", "Washing the face with repeated paw movements"],
    ["25-0731 The Joy of Head Massage", "Head massage", "Unknown", "Receiving a head massage"],
    ["25-0921 Sticky Little Baby", "Bath and dryer", "Unknown", "Sitting in a dryer after a bath"],
    ["25-0703 Relaxed Moments for This Cat", "Head scratches", "Unknown", "Receiving head scratches"],
  ],
  "health-and-recovery.md": [
    ["25-1014 Sick Kitty", "Pododermatitis recovery note", "Unknown", "Wearing an Elizabeth collar"],
  ],
  "growth-and-milestones.md": [
    ["25-1026 From Kitten to Boss Cat", "Growth comparison", "Unknown", "Kitten-to-cat comparison"],
  ],
  "daily-life-and-office.md": [
    ["User-provided: 猫砂盆里的乖巧日常", "Litter box routine", "Unknown", "Using the litter box and covering it afterward"],
    ["25-0901-Keyboard-Guardian", "Office cat", "Unknown", "Patrolling a desk"],
    ["25-1106 Round Little Head", "Physical detail", "Unknown", "Showing the back of the head"],
    ["25-1028 A Busy Little Life", "Daily routine", "Unknown", "Chasing sunlight, watching outside, and grooming"],
    ["25-0603 Moments with a Little Cat", "Slow home moment", "Unknown", "Quiet daily moment"],
  ],
  "costume-and-music.md": [
    ["25-0831 Cat in a Flying Hat", "Costume", "Unknown", "Wearing a flying hat"],
    ["25-0603 Rock That Body", "Music and colored light", "Unknown", "Moving under colored lights"],
  ],
  "ai-storytelling.md": [
    ["26-0328 AI Sword v01", "Sword and martial arts", "Fictional generated scene", "Standing with a sword in strong wind"],
    ["26-0324 AI Monster v01", "Giant-cat monster battle", "Fictional generated scene", "Battling a monster with energy waves"],
    ["26-0323 AI Ninja v01", "Ninja in Gion", "Gion", "Moving through a rainy ninja battle"],
    ["26-0320 AI Dance v02", "Summer dance", "Fictional generated scene", "Dancing with steps, jumps, and spins"],
    ["26-0320 AI Dance v01", "Egyptian dance", "Fictional generated scene", "Standing and dancing"],
    ["26-0322 AI City v01", "Giant cat over a city", "Fictional city", "Looking down at traffic and people"],
    ["26-0319 AI CEO v02", "Office CEO story", "Fictional office", "Presenting a plan"],
    ["26-0319 AI CEO v01", "Office CEO story", "Fictional office", "Presenting with paw gestures"],
    ["26-0319 AI Phone v03", "Midnight phone story", "Fictional indoor scene", "Hiding a phone after an interruption"],
    ["26-0318 AI Phone v01", "Midnight phone story", "Fictional indoor scene", "Hiding a phone and pretending to sleep"],
  ],
};

const supplementalExamples = [
  {
    heading: "User-provided: 好奇雷达已开启",
    body: `zh:
好奇雷达已开启
东张西望地观察四周，好奇的小眼神一刻也闲不下来。
BGM：biubiubiu
#猫咪 #猫咪日常 #好奇猫咪

en:
Curious Eyes Everywhere
Looking this way and that, she watches everything around her with bright curiosity.
BGM: biubiubiu
#Cat #CatLife #CuriousCat

jp:
きょろきょろ観察中
あっちを見たりこっちを見たり、好奇心いっぱいに辺りを見渡している。
BGM：biubiubiu
#猫 #猫のいる暮らし #好奇心旺盛`,
  },
  {
    heading: "User-provided: 好奇目光",
    body: `zh:
好奇目光
圆圆的眼睛好奇地看着我，这一刻也被轻轻记录下来。
BGM: Somewhere Only We Know
#猫咪 #猫咪日常 #好奇猫咪 #宠物日记

en:
A Curious Look
Round eyes meet mine with curiosity, captured in one simple little moment.
BGM: Somewhere Only We Know
#Cat #CatLife #CuriousCat #PetDiary

jp:
好奇心いっぱいのまなざし
BGM: Somewhere Only We Know
#猫 #猫のいる暮らし #好奇心 #ペット日記`,
  },
  {
    heading: "User-provided: 圆眼睛里的好奇心",
    body: `zh:
圆眼睛里的好奇心
好奇又软萌的小表情，让这一刻格外治愈。
BGM: Every Second
#猫咪 #可爱猫咪 #猫咪日常 #好奇心 #治愈

en:
A Quiet, Curious Gaze
The quiet curiosity in this little moment feels soft and comforting.
BGM: Every Second
#Cat #CuteCat #CatLife #CuriousCat #Gentle

jp:
まんまるな瞳の好奇心
好奇心が伝わる表情に、そっと癒やされるひとときです。
BGM: Every Second
#猫 #かわいい猫 #猫のいる暮らし #好奇心 #癒し`,
  },
  {
    heading: "User-provided: 猫砂盆里的乖巧日常",
    body: `zh:
猫砂盆里的乖巧日常
安静地上完厕所，再认真地把猫砂埋好，乖乖完成自己的小日常。
BGM：biubiubiu
#猫咪 #猫咪日常 #猫砂盆 #乖巧猫咪 #宠物日记

en:
A Neat Little Litter Box Routine
A quiet trip to the litter box ends with carefully covering everything up like a well-behaved little cat.
BGM: biubiubiu
#Cat #CatLife #LitterBoxRoutine #WellBehavedCat #PetDiary

jp:
おりこうさんのトイレ時間
静かにトイレを済ませたあとは、きちんと砂をかけて、今日もおりこうさんにできました。
BGM：biubiubiu
#猫 #猫のいる暮らし #猫トイレ #おりこうさん #ペット日記`,
  },
  {
    heading: "User-provided: 认真洗脸中",
    body: `zh:
认真洗脸中
小爪子一下又一下地擦着脸，努力完成今天的洗脸日常。
BGM: Rock That Body
#猫咪 #猫咪日常 #猫咪洗脸 #乖巧猫咪

en:
A Very Serious Face-Washing Routine
One careful paw swipe at a time, this cat works hard through the face-washing routine.
BGM: Rock That Body
#Cat #CatLife #FaceWashing #GroomingTime

jp:
一生懸命、顔洗い中
小さな前足で何度も顔をこすりながら、一生懸命にお手入れしています。
BGM：Rock That Body
#猫 #猫のいる暮らし #顔洗い #毛づくろい`,
  },
];
const supplementalHeadings = new Set(supplementalExamples.map(example => example.heading));

const repeatedGroups = new Map([
  ["26-0407-A-Sleepy-Afternoon", "Repeated Chinese title with 25-0707; different descriptions and English titles"],
  ["25-0707 Sticky Little Baby", "Repeated Chinese title with 26-0407; different descriptions and English titles"],
  ["25-1126-Healing-Sleep-Face", "Repeated multilingual title family; description and BGM coverage differ"],
  ["25-1208-Healing-Sleep-Face", "Repeated multilingual title family; description omitted here"],
  ["25-0701-Healing-Sleep-Face", "Repeated Chinese title family; English and Japanese wording differ"],
  ["25-1121-A-Cat-Loves-You", "Repeated Chinese and English titles with 25-0805; descriptions differ"],
  ["25-0805-A-Cat-Loves-You", "Repeated Chinese and English titles with 25-1121; descriptions differ"],
  ["25-1015 Obedient Kitty", "Repeated Chinese and English titles with 25-0919; descriptions differ"],
  ["25-0919 Obedient Kitty", "Repeated Chinese and English titles with 25-1015; descriptions differ"],
  ["25-1223 Gentle Companion", "Repeated Chinese and English titles with 25-0715; descriptions differ"],
  ["25-0715 Gentle Companion", "Repeated Chinese and English titles with 25-1223; descriptions differ"],
  ["25-1209 Quiet Little Cutie", "Repeated multilingual titles with 25-1121; gaze target and tags differ"],
  ["25-1121 Quiet Little Cutie", "Repeated multilingual titles with 25-1209; gaze target and tags differ"],
  ["25-1126 Little Angel Kitty", "Repeated title family; BGM and description coverage differ"],
  ["25-1107 Little Angel Kitty", "Repeated title family; source descriptions differ"],
  ["25-0714 Little Angel Kitty", "Repeated title family; source descriptions differ"],
  ["26-0319 AI Phone v03", "English block repeats v01; Chinese version text differs"],
  ["26-0318 AI Phone v01", "English block repeats v03; Chinese version text differs"],
  ["26-0319 AI CEO v02", "Versioned concept; Chinese-only shorter variant"],
  ["26-0319 AI CEO v01", "Versioned concept; trilingual availability differs"],
  ["26-0320 AI Dance v02", "Versioned dance concept with different BGM and movement"],
  ["26-0320 AI Dance v01", "Versioned dance concept with different BGM and movement"],
]);

function parseSource(markdown) {
  const matches = [...markdown.matchAll(/^## (.+)$/gm)];
  return matches.map((match, index) => {
    const heading = match[1].trim();
    const start = match.index + match[0].length;
    const end = matches[index + 1]?.index ?? markdown.length;
    return { heading, body: markdown.slice(start, end).trim() };
  });
}

function parseDate(heading) {
  if (heading === "User-provided: 好奇雷达已开启") return "2026-08-11";
  if (heading === "User-provided: 好奇目光") return "2026-08-08";
  if (heading === "User-provided: 圆眼睛里的好奇心") return "2025-06-01";
  if (heading === "User-provided: 猫砂盆里的乖巧日常") return "2025-07-10";
  if (heading === "User-provided: 认真洗脸中") return "2025-08-07";
  const match = /^(\d{2})-(\d{2})(\d{2})/.exec(heading);
  return match ? `20${match[1]}-${match[2]}-${match[3]}` : "unknown";
}

function parseVersion(heading) {
  return /\bv(\d+)\b/i.exec(heading)?.[0].toLowerCase() ?? "none";
}

function parseLanguages(body) {
  return ["zh", "en", "jp"].filter(language => new RegExp(`^${language}:$`, "m").test(body));
}

function parseLanguageBlocks(body) {
  const labels = [...body.matchAll(/^(zh|en|jp):$/gm)];
  const preface = body.slice(0, labels[0]?.index ?? body.length).trim();
  const blocks = {};
  for (let index = 0; index < labels.length; index += 1) {
    const label = labels[index][1];
    const start = labels[index].index + labels[index][0].length;
    const end = labels[index + 1]?.index ?? body.length;
    const lines = body.slice(start, end).trim().split(/\r?\n/).map(line => line.trim()).filter(Boolean);
    const hashtagLines = lines.filter(line => line.startsWith("#"));
    const bgmLines = lines.filter(line => /^BGM[:：]/.test(line));
    const contentLines = lines.filter(line => !line.startsWith("#") && !/^BGM[:：]/.test(line));
    blocks[label] = {
      title: contentLines.shift() ?? "",
      description: contentLines,
      bgm: bgmLines.map(line => line.replace(/^BGM[:：]\s*/, "")),
      hashtags: hashtagLines,
    };
  }
  return { preface, blocks };
}

function detailsFor(heading) {
  for (const [file, examples] of Object.entries(groups)) {
    const item = examples.find(([candidate]) => candidate === heading);
    if (item) {
      return {
        file,
        secondary: item[1],
        aiLocation: file === "ai-storytelling.md" ? item[2] : null,
        activity: item[3],
      };
    }
  }
  throw new Error(`Missing classification for ${heading}`);
}

function categoryFor(file) {
  return {
    "sleep-and-relaxation.md": "Sleep and relaxation",
    "companionship-and-affection.md": "Companionship and affection",
    "playful-and-funny.md": "Playful and funny",
    "food-and-snacks.md": "Food and snacks",
    "grooming-and-care.md": "Grooming and care",
    "health-and-recovery.md": "Health and recovery",
    "growth-and-milestones.md": "Growth and milestones",
    "daily-life-and-office.md": "Daily life and office",
    "costume-and-music.md": "Costume and music",
    "ai-storytelling.md": "AI storytelling",
  }[file];
}

function dimensions(file, heading) {
  if (heading === "User-provided: 好奇雷达已开启") {
    return { mood: "Curious", tone: "Playful" };
  }
  if (heading === "User-provided: 好奇目光") {
    return { mood: "Curious", tone: "Gentle" };
  }
  if (heading === "User-provided: 圆眼睛里的好奇心") {
    return { mood: "Healing", tone: "Cute and gentle" };
  }
  if (file === "ai-storytelling.md") {
    if (heading === "26-0323 AI Ninja v01") {
      return { mood: "Dramatic", tone: "Cinematic" };
    }
    return { mood: "Dramatic or playful", tone: "Cinematic" };
  }
  if (heading === "25-0602 Tired All the Time") {
    return { mood: "Relaxed", tone: "Gentle" };
  }
  if (heading === "User-provided: 猫砂盆里的乖巧日常") {
    return { mood: "Calm", tone: "Well-behaved and cute" };
  }
  if (heading === "User-provided: 认真洗脸中") {
    return { mood: "Diligent", tone: "Well-behaved and cute" };
  }
  const presets = {
    "sleep-and-relaxation.md": ["Healing", "Gentle"],
    "companionship-and-affection.md": ["Healing", "Warm"],
    "playful-and-funny.md": ["Playful", "Humorous"],
    "food-and-snacks.md": ["Playful", "Cute"],
    "grooming-and-care.md": ["Calm", "Gentle"],
    "health-and-recovery.md": ["Hopeful", "Careful"],
    "growth-and-milestones.md": ["Playful", "Contrast"],
    "daily-life-and-office.md": ["Calm", "Cute"],
    "costume-and-music.md": ["Playful", "Stylized"],
  };
  const [mood, tone] = presets[file];
  return { mood, tone };
}

function healthStatus(heading) {
  if (heading === "25-1014 Sick Kitty") {
    return "Source states pododermatitis, daily spray medication, Elizabeth collar use, day three, and improving recovery";
  }
  if (heading === "25-0731 The Joy of Head Massage") {
    return "Unknown; source hashtags include sick-cat labels but give no condition";
  }
  return "Not stated";
}

function platformFor(heading) {
  if (heading === "User-provided: 好奇雷达已开启") return "多平台";
  if (heading === "User-provided: 好奇目光") return "多平台";
  if (heading === "User-provided: 圆眼睛里的好奇心") return "多平台";
  if (heading === "User-provided: 猫砂盆里的乖巧日常") return "多平台";
  if (heading === "User-provided: 认真洗脸中") return "多平台";
  return heading === "26-0225-Blanket-Mode-Activated"
    ? "YouTube Shorts indicated by an additional #shorts hashtag variant"
    : "unknown";
}

function contentTypeFor(file, heading) {
  if (heading === "User-provided: 好奇雷达已开启") return "Real-life";
  if (heading === "User-provided: 好奇目光") return "Real-life";
  if (heading === "User-provided: 圆眼睛里的好奇心") return "Real-life";
  if (heading === "User-provided: 猫砂盆里的乖巧日常") return "Real-life";
  if (heading === "User-provided: 认真洗脸中") return "Real-life";
  if (supplementalHeadings.has(heading)) return "unknown";
  return file === "ai-storytelling.md" ? "AI-generated fictional scene" : "Real-life";
}

function sourcePathFor(heading) {
  return supplementalHeadings.has(heading)
    ? "User-provided skill example"
    : "`temp/pet-examples/pet.md`";
}

function petIdentityFor(heading) {
  return [
    "User-provided: 好奇雷达已开启",
    "User-provided: 好奇目光",
    "User-provided: 圆眼睛里的好奇心",
    "User-provided: 猫砂盆里的乖巧日常",
    "User-provided: 认真洗脸中",
  ].includes(heading) ? "嘟嘟" : null;
}

function formatFor(heading) {
  return [
    "User-provided: 好奇雷达已开启",
    "User-provided: 好奇目光",
    "User-provided: 猫砂盆里的乖巧日常",
    "User-provided: 认真洗脸中",
  ].includes(heading) ? "Vlog" : null;
}

function formatLanguage(label, block) {
  const names = { zh: "Chinese", en: "English", jp: "Japanese" };
  const output = [`### ${names[label]}`, "", "#### Title", "", block.title];
  if (block.description.length) {
    output.push("", "#### Description", "", ...block.description);
  }
  if (block.bgm.length) {
    output.push("", "#### BGM", "", ...block.bgm);
  }
  const spaced = block.hashtags.filter(line => /\s/.test(line));
  const compact = block.hashtags.filter(line => !/\s/.test(line));
  if (spaced.length) output.push("", "#### Hashtags", "", ...spaced);
  if (compact.length) output.push("", "#### Compact hashtags", "", ...compact);
  return output.join("\n");
}

function exampleMarkdown(example) {
  const detail = detailsFor(example.heading);
  const dims = dimensions(detail.file, example.heading);
  const { preface, blocks } = parseLanguageBlocks(example.body);
  const languages = Object.keys(blocks);
  const bgm = [...new Set(Object.values(blocks).flatMap(block => block.bgm))];
  const contentType = contentTypeFor(detail.file, example.heading);
  const lines = [
    `## Example: ${example.heading}`,
    "",
    `- Source heading: \`${example.heading}\``,
    `- Source date: ${parseDate(example.heading)}`,
    `- Version: ${parseVersion(example.heading)}`,
    `- Category: ${categoryFor(detail.file)}`,
    `- Secondary category: ${detail.secondary}`,
    ...(detail.aiLocation ? [`- AI location: ${detail.aiLocation}`] : []),
    `- Languages: ${languages.map(language => ({ zh: "zh-CN", en: "en", jp: "ja-JP" })[language]).join(", ")}`,
    ...(petIdentityFor(example.heading) ? [`- Pet identity: ${petIdentityFor(example.heading)}`] : []),
    ...(formatFor(example.heading) ? [`- Format: ${formatFor(example.heading)}`] : []),
    `- BGM: ${bgm.length ? bgm.join(" / ") : "Not supplied"}`,
    `- Mood: ${dims.mood}`,
    `- Tone: ${dims.tone}`,
    `- Pet behavior: ${detail.activity}`,
    `- Pet activity: ${detail.activity}`,
    `- Health-related status: ${healthStatus(example.heading)}`,
    `- Content type: ${contentType}`,
    `- Platform: ${platformFor(example.heading)}`,
    `- Source path: ${sourcePathFor(example.heading)}`,
  ];
  if (preface) lines.push(`- Source preface: ${preface.replace(/\n+/g, " / ")}`);
  lines.push("");
  for (const language of languages) {
    lines.push(formatLanguage(language, blocks[language]), "");
  }
  return lines.join("\n").trim();
}

function missingFields(example) {
  const languages = parseLanguages(example.body);
  const detail = detailsFor(example.heading);
  const { blocks } = parseLanguageBlocks(example.body);
  const missing = [];
  if (parseDate(example.heading) === "unknown") missing.push("source date");
  if (!languages.includes("en")) missing.push("English");
  if (!languages.includes("jp")) missing.push("Japanese");
  if (platformFor(example.heading) === "unknown") missing.push("platform");
  if (detail.file === "ai-storytelling.md" && (!detail.aiLocation || detail.aiLocation === "Unknown")) {
    missing.push("AI location");
  }
  if (!Object.values(blocks).some(block => block.bgm.length)) missing.push("BGM");
  if (contentTypeFor(detail.file, example.heading) === "unknown") missing.push("real-life or AI-generated status");
  return missing.length ? missing.join(", ") : "none";
}

function manifestMarkdown(examples) {
  const rows = examples.map(example => {
    const detail = detailsFor(example.heading);
    const languages = parseLanguages(example.body).map(language => ({ zh: "zh-CN", en: "en", jp: "ja-JP" })[language]).join(", ");
    const repeated = repeatedGroups.get(example.heading);
    const contentType = contentTypeFor(detail.file, example.heading);
    const confidence = supplementalHeadings.has(example.heading)
      ? "High"
      : repeated
        ? "High for identity; medium for relationship"
        : "High";
    const notes = supplementalHeadings.has(example.heading)
      ? example.heading === "User-provided: 好奇雷达已开启"
        ? "Pet identity supplied as 嘟嘟; Vlog format, real-life status, and looking-around scene supplied by user"
        : example.heading === "User-provided: 好奇目光"
        ? "Pet identity supplied as 嘟嘟; Vlog format and real-life status supplied by user"
        : example.heading === "User-provided: 猫砂盆里的乖巧日常"
        ? "Pet identity supplied as 嘟嘟; Vlog format and real-life scene supplied in the request context"
        : example.heading === "User-provided: 认真洗脸中"
          ? "Pet identity supplied as 嘟嘟; Vlog format and real-life status supplied by user"
          : "Pet identity supplied as 嘟嘟; real-life status supplied by user"
      : repeated ?? "No duplicate detected";
    const aiLocation = detail.aiLocation ?? "not applicable";
    return `| \`${example.heading}\` | ${parseDate(example.heading)} | ${parseVersion(example.heading)} | ${categoryFor(detail.file)} | [${detail.file}](examples/${detail.file}) | ${languages} | ${aiLocation} | ${contentType} | ${repeated ? "Repeated or versioned" : "Unique"} | Keep distinct | ${missingFields(example)} | ${confidence} | ${notes} |`;
  });
  return `# Source manifest

This manifest maps every pet diary source section in \`temp/pet-examples/pet.md\` and separately supplied user examples to the self-contained curated corpus. The handwritten source is preserved unchanged. Dates are expanded from source-heading prefixes; no publication date is inferred beyond that notation.

## Coverage

- Source sections from \`temp/pet-examples/pet.md\`: ${examples.length - supplementalExamples.length}
- Supplemental user-provided examples: ${supplementalExamples.length}
- Curated examples: ${examples.length}
- Merge decisions: none; every distinct source section is retained.
- Language availability: zh-CN ${examples.filter(example => parseLanguages(example.body).includes("zh")).length}, en ${examples.filter(example => parseLanguages(example.body).includes("en")).length}, ja-JP ${examples.filter(example => parseLanguages(example.body).includes("jp")).length}.
- Content types: real-life ${examples.filter(example => contentTypeFor(detailsFor(example.heading).file, example.heading) === "Real-life").length}, AI-generated ${examples.filter(example => contentTypeFor(detailsFor(example.heading).file, example.heading) === "AI-generated fictional scene").length}, unknown ${examples.filter(example => contentTypeFor(detailsFor(example.heading).file, example.heading) === "unknown").length}.
- Geography policy: real-life entries omit geography; AI location is retained for generated examples only.

## Section mapping

| Original heading | Original date | Version | Final category | Final reference file | Languages | AI location | Content type | Duplicate status | Merge decision | Missing fields | Classification confidence | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
${rows.join("\n")}

## Duplicate and version decisions

- Keep all repeated-title families because their dates, descriptions, language coverage, BGM, tags, or scene details differ.
- Keep \`25-1107 Little Angel Kitty\` and \`25-0714 Little Angel Kitty\` even though their English title and description match; their Chinese descriptions and hashtag sets differ.
- Keep all three healing-sleep examples; one omits descriptions, one has a different English title, and their dates differ.
- Keep AI Phone \`v01\` and \`v03\`; their English blocks match, but their Chinese descriptions and tags differ.
- Keep AI CEO and AI Dance versions because each version demonstrates a distinct length, language set, BGM, or scene treatment.
- Reuse exact hashtag sets as evidence, but do not multiply identical tags in generated output.

## Source-level inconsistencies and uncertainties

- The milestone table says sterilization surgery occurred on 2025-09-01, while the profile prose says 2025-11-18 at 10:30 and also records a first heat from 2025-11-06 to 2025-11-11. Do not select one surgery date as authoritative.
- \`25-1014 Sick Kitty\` states a typical seven-day recovery and identifies day three as improving. Preserve those only when recounting that historical example; never turn them into medical guidance or a default recovery timeline.
- \`25-0731 The Joy of Head Massage\` uses sick-cat hashtags but supplies no diagnosis or care event.
- \`25-0714 Gentle Dream\` mentions “长女/eldest” and tuna only in that example; neither is a stable profile fact.
- \`25-0803 This Is My Cat\` uses masculine Japanese \`ボク\` even though the stable profile says female; preserve it as source variation, not a gender rule.
- English hashtags alternate between lowercase, Title Case, and PascalCase. Keep one consistent style within a newly generated set.
- Many headings repeat while descriptions, tags, BGM, or languages change. Similar emotional themes are not treated as duplicates.
- Real-life examples omit geography. AI location is retained only for generated examples and is never transferred to real-life content.
- The source table contains terse milestones such as “Kicked!”, “Sat!”, “Press on the tail”, “Eat the human hair”, and “Make a reservation.” Their meaning is uncertain, so they remain historical source notes rather than reusable caption facts.
`;
}

async function main() {
  const source = await readFile(sourcePath, "utf8");
  const examples = [...supplementalExamples, ...parseSource(source)];
  const classified = new Set(Object.values(groups).flat().map(([heading]) => heading));
  const sourceHeadings = new Set(examples.map(example => example.heading));
  const missing = examples.filter(example => !classified.has(example.heading)).map(example => example.heading);
  const extra = [...classified].filter(heading => !sourceHeadings.has(heading));
  if (missing.length || extra.length) {
    throw new Error(`Classification mismatch. Missing: ${missing.join(", ") || "none"}. Extra: ${extra.join(", ") || "none"}.`);
  }

  await mkdir(examplesRoot, { recursive: true });
  for (const [file, entries] of Object.entries(groups)) {
    const entrySet = new Set(entries.map(([heading]) => heading));
    const selected = examples.filter(example => entrySet.has(example.heading));
    const title = categoryFor(file);
    const content = `# ${title} examples\n\nHandwritten examples are preserved as style evidence. Metadata uses \`unknown\` when the source does not support a narrower value. Do not transfer example facts into a new entry.\n\n${selected.map(exampleMarkdown).join("\n\n")}\n`;
    await writeFile(path.join(examplesRoot, file), content);
  }
  await writeFile(manifestPath, manifestMarkdown(examples));
  console.log(`Built ${examples.length} examples across ${Object.keys(groups).length} files.`);
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
