# PR-writing evaluation

## Method and limits

On 2026-10-17, apply the original documentation-oriented skill and the revised skill to the same 12 bounded inputs below. The inputs paraphrase the reserved H01–H12 messages registered in [the source manifest](source-manifest.md#held-out-sample). They are accepted as supplied facts for these writing exercises; none of the historical tests was rerun. Do not reuse their results in another PR.

This record contains manual paired applications by the same writer in the same session. It is not a fresh-context, blinded, independent, or statistically controlled model evaluation. The baseline already protects facts and follows project conventions; it should not be made artificially verbose or inaccurate to suggest improvement. The comparison checks whether the added workflow makes the intended decisions explicit and remains usable.

Judge each pair on factual fidelity, reviewer usefulness, proportionate length, requested format, and accurate verification. Reject an invented result or unsupported behavior even when the prose reads well. The drafts below deliberately retain unknowns.

## Held-out cases

### H01: Title only, small runtime optimization

Input: Write only a React PR title. Skip property diffing when previous and next props are the identical object. The historical message mentions RNTester and an approximate skipped-call percentage, neither needed in a title.

Baseline: Skip property diffing when props are unchanged

Revised: Skip property diffing when props are the same object

Assessment: The revised title makes the identity condition explicit. Both respect title-only output and avoid transferring a performance percentage.

### H02: React body with a known tooling limitation

Input: Draft a React body with its template headings. A React 18 application consumes a compiled library. `yarn build` and `yarn preview` work; `yarn dev` remains affected by an outdated Vite plugin assumption.

Baseline:

```markdown
## Summary

Add a React 18 application that consumes a compiled library. An outdated Vite plugin assumption still affects development mode.

## How did you test this change?

`yarn build` and `yarn preview` work. `yarn dev` does not work correctly yet.
```

Revised:

```markdown
## Summary

Add a React 18 application to exercise consumption of a compiled library. Development mode remains limited by an outdated Vite plugin assumption.

## How did you test this change?

Verified `yarn build` and `yarn preview`. `yarn dev` still does not work correctly.
```

Assessment: Both preserve the supplied limitation and distinguish working commands from the failing path. Neither claims all checks pass.

### H03: Build behavior with missing verification

Input: Draft a React body. A test-utils flag requires an entrypoint fork to work with tests; unsupported builds drop the implementations, while OSS builds retain the `act` reexport. No verification evidence is supplied.

Baseline:

```markdown
## Summary

Fork the test-utils entrypoint so the disable flag works with tests. Remove implementations from builds that do not support them; OSS builds retain the `act` reexport.

## How did you test this change?

Verification results were not provided.
```

Revised:

```markdown
## Summary

The test-utils disable flag needs a separate entrypoint to work with tests. Fork that entrypoint and omit implementations from unsupported builds. OSS builds retain the `act` reexport.

## How did you test this change?

Verification results were not provided.
```

Assessment: The revised opening connects the reason and implementation. Both avoid treating a build change as proof of a successful build.

### H04: Revert with a known reason

Input: Rewrite a React PR body. Resetting modules by default slows `ESLintRuleExhaustiveDeps-test.js`; revert it while investigating. No rerun results are supplied.

Baseline:

```markdown
## Summary

Revert the default module reset because it slows `ESLintRuleExhaustiveDeps-test.js`. The cause of the slowdown remains under investigation.

## How did you test this change?

No rerun results were provided.
```

Revised:

```markdown
## Summary

Resetting modules by default slows `ESLintRuleExhaustiveDeps-test.js`. Revert that default while the slowdown is investigated.

## How did you test this change?

No rerun results were provided.
```

Assessment: Both preserve the known reason without claiming the revert was measured to fix the slowdown.

### H05: Command supplied without a result

Input: Rewrite a React body. Remove a redundant array check already performed by `fastAddProperties`; rename the slow path to clarify eventual removal. The supplied testing section contains only `yarn test packages/react-native-renderer -r=xplat --variant=true`.

Baseline:

```markdown
## Summary

Remove the duplicate array check performed by `fastAddProperties` and rename the slow path to clarify its eventual removal.

## How did you test this change?

The supplied testing notes list `yarn test packages/react-native-renderer -r=xplat --variant=true`; no result was provided.
```

Revised:

```markdown
## Summary

`fastAddProperties` already checks for arrays, so remove the redundant check. Rename the slow path to clarify that it can be removed after rollout.

## How did you test this change?

The supplied testing notes list `yarn test packages/react-native-renderer -r=xplat --variant=true`; no result was provided.
```

Assessment: Both preserve the command exactly and do not convert its presence into a passing result.

### H06: Substantial compiler/build change

Input: Condense a React body. Move compiler packages to tsup to support declaration generation; declarations remain off for ordinary builds and enabled for publishing. Keep direct esbuild use for forgive. Recorded total build times are 15.842 seconds before, 13.350 after without declarations, and 31.061 with declarations. Whether this unblocks the dependent integration remains untested.

Baseline:

```markdown
## Summary

Move compiler packages to tsup to support type declarations. Ordinary builds leave declarations disabled; publishing enables them. Retain direct esbuild use for forgive.

## How did you test this change?

Recorded total build times: 15.842 seconds before, 13.350 seconds after without declarations, and 31.061 seconds with declarations. The dependent integration has not been tested.
```

Revised:

```markdown
## Summary

Compiler packages need declaration generation for downstream integration. Move their builds to tsup, enabling declarations for publishing while leaving ordinary builds unchanged in that respect. Forgive continues to use esbuild directly.

## How did you test this change?

Recorded total build times: 15.842 seconds before, 13.350 seconds after without declarations, and 31.061 seconds with declarations. These measurements do not establish that the dependent integration works; that remains untested.
```

Assessment: Both retain the declaration cost and integration gap. Neither promotes a single recorded timing into a general speed guarantee.

### H07: Non-React CI PR with a custom template

Input: Use the headings Change and Validation for a different project's CI PR. Upload test results even when tests fail. No execution result is supplied. Do not use React conventions.

Baseline:

```markdown
## Change

Upload CI test results even when tests fail.

## Validation

Execution results were not provided.
```

Revised:

```markdown
## Change

Keep CI test results available after test failures by uploading them regardless of the test outcome.

## Validation

Execution results were not provided.
```

Assessment: Both follow the custom template. The revised workflow explicitly prevents selecting a React profile merely because React history informed the skill.

### H08: Sparse revert, no template supplied

Input: Draft a body without repository context. Revert the enableViewTransition change in www because it needs more testing. Do not invent a specific bug or test result.

Baseline:

```markdown
Revert the enableViewTransition change in www pending further testing. Verification results were not provided.
```

Revised:

```markdown
## Summary

Revert the enableViewTransition change in www pending further testing.

## Testing

Verification results were not provided.
```

Assessment: Both are faithful. The revised skill provides an explicit default structure; it does not infer a crash or claim that testing was not run.

### H09: Complex flag cleanup with baseline failures

Input: Condense a React body. enableFragmentRefs is enabled everywhere and removed; three related flags remain. Preserve combined test gates and the Fragment fallthrough behavior. Lint, formatting, and the named Flow checks pass. Tests cover experimental, stable, www-modern, www-classic, and xplat with both variant settings plus persistent; remaining failures match baseline test names.

Baseline:

```markdown
## Summary

Remove enableFragmentRefs now that it is enabled in every channel. Preserve the related flags, combined test gates, and Fragment fallthrough behavior.

## How did you test this change?

Lint, formatting, and Flow checks for dom-node, dom-browser, and fabric pass. Tests covered experimental, stable, www-modern, www-classic, and xplat with both variant settings, plus persistent. Remaining failing test names match the baseline.
```

Revised:

```markdown
## Summary

Inline the enabled enableFragmentRefs behavior and remove the flag. Preserve the three related flags that are not enabled everywhere, combined test gates, and Fragment fallthrough behavior.

## How did you test this change?

Lint, formatting, and Flow checks for dom-node, dom-browser, and fabric pass. Tests covered experimental, stable, www-modern, www-classic, and xplat with both variant settings, plus persistent. The suites still have failures; comparison of failing test names found the same failures at baseline.
```

Assessment: Both preserve the scope. The revised wording makes the residual failures harder to mistake for an all-pass result.

### H10: Compiler semantics and bounded parity evidence

Input: Draft a React body. JsString preserves lone surrogate code units; UTF-8 handles well-formed strings and UTF-16 handles ill-formed values. Folding can re-pair surrogate halves. Markers remain at the NAPI boundary. Workspace tests pass, Rust snap is 1804/1804, and the lone-surrogate fixture matches HIR and code. No browser testing is supplied.

Baseline:

```markdown
## Summary

Use JsString to preserve lone surrogates through the Rust compiler. Store well-formed strings as UTF-8 and ill-formed values as UTF-16, allowing folding to re-pair surrogate halves. Keep markers at the NAPI boundary.

## How did you test this change?

Workspace tests pass. Rust snap passes 1804/1804, and the lone-surrogate fixture matches HIR and generated code. Browser verification was not provided.
```

Revised:

```markdown
## Summary

Rust strings cannot represent lone surrogate code units directly. Carry them through the compiler with JsString, using UTF-8 for well-formed values and UTF-16 otherwise. Folding can re-pair surrogate halves; marker encoding stays at the NAPI boundary.

## How did you test this change?

Workspace tests pass; Rust snap passes 1804/1804. The comparison harness confirms HIR and generated-code parity for the lone-surrogate fixture. Browser verification was not provided.
```

Assessment: Both distinguish compiler evidence from browser execution. Neither extends fixture parity to every possible input.

### H11: Chinese-to-English drafting for test-only work

Input: 按 React 模板起草英文 PR 描述。将现有 Activity 测试改为 Portal 场景，补充两者交互的覆盖。未提供测试执行结果。

Baseline:

```markdown
## Summary

Adapt existing Activity tests to cover interactions with Portals.

## How did you test this change?

Test execution results were not provided.
```

Revised:

```markdown
## Summary

Add Portal-specific variants of existing Activity tests to cover how Portals and Activity interact.

## How did you test this change?

Test execution results were not provided.
```

Assessment: Both preserve the Chinese input's evidence boundary. Added coverage is not presented as a successful test run.

### H12: Review only with an unexplained revert

Input: Review, without rewriting, a body that only says it reverts commit `35e64cf2bc4a980274ae0cb2a4bda11970560b7e`. No reason or verification is supplied.

Baseline: Missing context: the body identifies the reverted commit but does not explain why. Missing verification: no testing evidence is supplied.

Revised: Structure issue: the body identifies the reverted commit but does not explain the reason or restored behavior. Missing verification: no testing evidence is supplied. Add those details when known; the current text does not establish a regression or a passing check.

Assessment: Both return findings only. Neither invents the reason or presents a replacement draft.

## Results and documentation regressions

All 12 revised drafts satisfy the stated factual and format constraints in this manual review. No invented test result was found in either set. The concrete improvements are explicit identity wording, more consistent causal openings, a defined fallback structure, and clearer residual-failure wording. Several pairs are equivalent; this does not establish a measurable general quality gain.

Three additional routing checks preserve ordinary documentation behavior:

- A non-React installation guide still selects installation and general writing guidance; it does not load either React profile or the PR workflow.
- A React tutorial still selects the existing React documentation profile, not the React PR profile. Tutorial structure remains available.
- An API proofreading request preserves its code and narrow correction scope; PR headings and a testing section are not injected.

These were editorial routing checks, not independent generation runs. Future evaluation should use fresh contexts and current diffs before claiming broader effectiveness. Validator regression tests establish reference availability and registration, not these prose-quality conclusions.
