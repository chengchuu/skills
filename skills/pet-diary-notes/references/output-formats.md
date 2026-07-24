# Output formats

Use only requested sections. Labels may be `zh`, `en`, and `jp` when the user follows the source convention.

## Pet-name behavior

- Treat a supplied pet name as identity context only.
- Omit pet names, possessive name forms, and name hashtags from every format by default.
- Include the exact name only when the user explicitly asks for naming, attribution, a branded series title, or a branded hashtag.

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

## Caption only

- Required: observable scene and target language.
- Optional: mood, tone, platform, content form, and pet identity.
- Length: usually one or two concise sentences.
- Hashtags/BGM: omit unless requested.
- Mistake to avoid: turning a quiet diary observation into promotional copy.

## Title and caption

- Required: observable scene and languages.
- Optional: mood, pet identity, location, length.
- Length: one title plus one or two concise sentences.
- Hashtags/BGM: omit unless requested.
- Mistake to avoid: making each language literal or adding facts in only one version.

## Short diary note

- Required: one or more supplied observations and target language.
- Optional: title, date, milestone, mood, BGM, and hashtags.
- Length: one short title or one to three sentences.
- Platform: optional; do not force social-media hooks or tags.
- Mistake to avoid: inventing what happened before or after the recorded moment.

## Plog entry

- Required: facts visible across the supplied photo or photo set and target language.
- Optional: title, date, location, sequence, mood, BGM note, and hashtags.
- Order: title when requested → concise photo-diary caption → BGM if supplied → hashtags if requested.
- Describe only visible or supplied details; do not introduce motion or a video timeline.

## Vlog entry

- Required: supplied video event and target language.
- Optional: title, sequence, platform, location, mood, BGM, and hashtags.
- Order: title when requested → concise event description → BGM if supplied → hashtags if requested.
- Preserve the supplied event sequence; do not invent actions between clips.

## Full multilingual entry

- Required: scene, requested languages, real-life or generated status.
- Optional: pet identity, diary/Plog/Vlog form, platform, mood, location, BGM, tags, compact tags.
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

## Platform-ready photo caption

- Required: photo facts, platform, and target language.
- Optional: title, sequence, BGM note, pet identity, and tags.
- Do not add video-specific wording, movement, audio, or `#shorts`.
- For multi-photo Plogs, follow the supplied photo order without inventing transitions.

## Platform-ready video caption

- Required: platform, scene, language.
- Optional: title, BGM, pet identity, tags.
- YouTube Shorts: keep the opening immediate; `#shorts` is allowed when requested or clearly part of the format.
- TikTok and Instagram Reels: favor a fast hook and a small relevant tag set; do not invent trending audio.
- 小红书: a concise title and natural Chinese body may use restrained emoji and scene-specific tags.
- Bilibili: favor a clear searchable title and concise description; do not add platform slang automatically.
- Other/unknown: follow the user's explicit schema and avoid platform-only tags.

## Milestone note

- Required: confirmed milestone and supplied date or comparison facts.
- Optional: title, earlier/later labels, measured detail, mood, and hashtags.
- Keep chronology and quantities exact; omit uncertain dates rather than reconciling them.
- Mistake to avoid: turning an example-specific milestone into a stable profile fact.

## Health or recovery note

- Required: confirmed visible situation, health fact, and current status. If any of these are materially ambiguous, ask.
- Optional: supplied treatment/care, date or recovery day, supportive close.
- Order: visible situation → confirmed fact → supplied care → current status → neutral support.
- Length: concise but sufficient to preserve qualifiers.
- Language availability: any requested language; ensure medical meaning stays aligned.
- Hashtags: use restrained health/recovery tags only when requested.
- Mistakes: diagnosis from appearance, generalized recovery period, claimed treatment effect, veterinary conclusion, or guaranteed recovery.

## AI-generated story note

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
- Do not introduce a description, BGM, tag, location, or pet name unless requested. A pet name present only in an identity field remains omitted from the rewritten or translated artifact by default.
