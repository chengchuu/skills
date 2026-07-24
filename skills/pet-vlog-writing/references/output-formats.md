# Output formats

Use only requested sections. Labels may be `zh`, `en`, and `jp` when the user follows the source convention.

## Title only

- Required: scene and target language.
- Optional: pet identity, tone, platform, real or generated status.
- Length: usually one short line per language.
- Order: Chinese, English, Japanese unless the user specifies otherwise.
- Hashtags/BGM: omit.
- Mistake to avoid: adding an unsupported action to make the title vivid.

```text
zh:
小猫的午后时光

en:
A Sleepy Afternoon

jp:
お昼寝前のごろごろ
```

## Title and description

- Required: observable scene and languages.
- Optional: mood, pet identity, location, length.
- Length: one title plus one or two concise sentences.
- Hashtags/BGM: omit unless requested.
- Mistake to avoid: making each language literal or adding facts in only one version.

## Full multilingual Vlog note

- Required: scene, requested languages, real-life or generated status.
- Optional: pet identity, platform, mood, location, BGM, tags, compact tags.
- Order within each language: title, description, BGM if supplied, spaced hashtags, compact hashtags if requested.
- Recommended length: title plus 1–2 sentences and 4–10 relevant tags per language.
- Mistake to avoid: changing the scene, proper nouns, or fictional status between languages.

```text
zh:
<title>
<description>
BGM: <exact supplied title>
<spaced hashtags>
<compact hashtags when requested>

en:
...

jp:
...
```

## Platform-ready short caption

- Required: platform, scene, language.
- Optional: title, BGM, pet identity, tags.
- YouTube Shorts: keep the opening immediate; `#shorts` is allowed when requested or clearly part of the format.
- TikTok and Instagram Reels: favor a fast hook and a small relevant tag set; do not invent trending audio.
- 小红书: a concise title and natural Chinese body may use restrained emoji and scene-specific tags.
- Bilibili: favor a clear searchable title and concise description; do not add platform slang automatically.
- Other/unknown: follow the user's explicit schema and avoid platform-only tags.

## Health note

- Required: confirmed visible situation, health fact, and current status. If any of these are materially ambiguous, ask.
- Optional: supplied treatment/care, date or recovery day, supportive close.
- Order: visible situation → confirmed fact → supplied care → current status → neutral support.
- Length: concise but sufficient to preserve qualifiers.
- Language availability: any requested language; ensure medical meaning stays aligned.
- Hashtags: use restrained health/recovery tags only when requested.
- Mistakes: diagnosis from appearance, generalized recovery period, claimed treatment effect, veterinary conclusion, or guaranteed recovery.

## AI-generated story caption

- Required: generated/fictional status, scene, genre, languages.
- Optional: real pet identity, version, location setting, BGM, cinematic tone.
- Clearly separate real identity facts from the fictional visual event.
- Preserve `v01`, `v02`, or other version labels when supplied.
- Hashtags may describe `AI`, `generated`, `cinematic`, `fantasy`, or the supplied genre.
- Mistake to avoid: presenting the generated sword fight, city, dance, job, or prop as a real event.

## Translation or rewrite

- Required: source text, source/target languages, requested artifact.
- Optional: platform, tone, length, facts that must remain exact.
- Preserve factual strength and omissions. Naturalize idiom, syntax, title rhythm, and tags independently.
- Do not introduce a description, BGM, tag, location, or pet name absent from the source unless requested.
