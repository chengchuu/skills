# Taxonomy

Use the smallest practical labels. Record unsupported dimensions as `unknown`; do not infer geography from language.

## Primary content categories

| Label | Use |
| --- | --- |
| Sleep and relaxation | Naps, drowsiness, blankets, belly-up rest, sofa rest |
| Companionship and affection | Quiet proximity, gaze, paw contact, kneading, owner-cat moments |
| Playful and funny | Nibbling, meowing, curiosity, blank stares, attitude, comic contrast |
| Food and snacks | Eating, snack tests, named foods, hiccups after eating |
| Grooming and care | Bathing, drying, massage, scratches, non-medical routine care |
| Health and recovery | Confirmed condition, treatment, care, or recovery status |
| Growth and milestones | Age/growth comparisons and dated milestones |
| Daily life and office | Home routine, office cat, portrait details |
| Costume and music | Worn props, colored-light or music-led clips |
| AI storytelling | Explicitly generated or fictional cinematic stories |

Secondary categories remain reusable scene concepts: blanket, belly-up, nap, gaze, kneading, meowing, food type, bath/dryer, massage, recovery, growth comparison, office, costume, dance, giant-cat city, action, fantasy, or cinematic workplace story.

## Geography

- Countries: `China`, `Japan`, `Unknown`, `AI or fictional setting`.
- Regions/cities supported in this corpus: `Shanghai`, `Kyoto`.
- Locations: `Guilin Park`, `Gion`, `Indoor home`, `Office`, `Unknown`, `Fictional generated scene`, `Fictional city`, `Fictional office`, `Fictional indoor scene`.
- Use a real country for an AI scene only when the source explicitly anchors its setting, as the Gion/Kyoto example does.
- A profile address is not the default location of a new video.

## Other dimensions

- Scene type: real indoor, real office, real location-based, generated indoor, generated city, generated fantasy/action.
- Mood: healing, calm, relaxed, warm, playful, hopeful, dramatic.
- Tone: gentle, cute, humorous, careful, contrast, stylized, cinematic.
- Pet behavior/activity: use observable source wording; choose `unspecified` when the title gives only a mood.
- Languages: `zh-CN`, `en`, `ja-JP`.
- Platforms: `YouTube Shorts`, `TikTok`, `Instagram Reels`, `小红书`, `Bilibili`, `Other`, `unknown`.
- Formats: title only, title and description, full Vlog note, platform-ready short caption, health note, AI story caption, translation, rewrite, review.
- Content type: `Real-life`, `AI-generated fictional scene`, `unknown`.
- Health: `Not stated`, `Supplied condition`, `Supplied care`, `Recovery status`, `Ambiguous health tag`.

## Classification rules

1. Classify by the dominant visible event, not by repeated emotional vocabulary.
2. Use one primary category and one practical secondary category; do not create a category for a single adjective.
3. Keep health separate from ordinary grooming only when a condition, treatment, or recovery fact is supplied.
4. Keep AI version labels. Similar concepts are separate when action, BGM, language availability, or wording meaningfully changes.
5. Repeated titles are not duplicates by themselves. Merge only exact whole-example duplicates and record the decision.
6. Mark missing language blocks explicitly. Never synthesize a missing historical translation inside the corpus.
