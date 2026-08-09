# Frontend ESLint Defaults

Use this baseline when designing a greenfield frontend JavaScript or TypeScript project that has no established lint or formatting conventions. Preserve the target repository's current contract when one exists. Do not introduce ESLint merely to replace another maintained linting or formatting system.

## Rules Baseline

Use the following nine framework-neutral rules in a legacy ESLint configuration or the equivalent flat configuration:

```json
{
  "rules": {
    "semi": ["warn", "always"],
    "quotes": ["warn", "double"],
    "indent": ["warn", 2, { "SwitchCase": 1 }],
    "comma-dangle": ["warn", "always-multiline"],
    "eol-last": ["warn", "always"],
    "spaced-comment": ["warn", "always"],
    "object-curly-spacing": ["warn", "always"],
    "array-bracket-spacing": ["warn", "always"],
    "object-curly-newline": [
      "warn",
      {
        "ImportDeclaration": {
          "multiline": true,
          "minProperties": 4
        }
      }
    ]
  }
}
```

This baseline requires semicolons, double-quoted strings, two-space indentation, indented `case` clauses, multiline trailing commas, final newlines, spaced line comments, spaces inside object and array brackets, and multiline imports with at least four members.

## Precedence and Adoption

1. Inspect the target repository's ESLint, formatter, editor, and generated-file conventions before proposing changes.
2. Preserve an existing configuration when it is maintained and compatible with the project. Do not rewrite established source merely to adopt this baseline.
3. For a greenfield project without conventions, start every baseline rule at `warn`. Promote a rule to `error` only after the maintained source conforms and the team wants enforcement.
4. Configure the parser, environments, globals, source type, framework plugins, and file scopes separately. These rules do not define runtime or framework behavior.
5. Exclude generated artifacts or apply repository-specific overrides instead of weakening the maintained-source contract globally.

## ESLint and Formatter Compatibility

Choose one formatting authority. When a separate formatter is selected, configure it to match the ESLint behavior where possible. If the formatter cannot express a baseline style, designate either ESLint or the formatter as authoritative, disable or adapt the conflicting rule in the other tool, and record the divergence. Never propose a lint and format workflow whose automatic fixes alternate between incompatible outputs.

Verify the target project's installed ESLint version and current official rule contracts before recommending the configuration. If a named core formatting rule is unavailable, use a supported stylistic equivalent that preserves the intended behavior and state the substitution. Do not change dependencies or configuration merely to resolve a hypothetical future incompatibility.

## Architecture Output

When linting is material to the design, identify:

- the configuration format and authoritative file;
- maintained source and excluded or overridden paths;
- parser, runtime, framework, and source-type configuration ownership;
- warning versus error policy;
- formatter ownership and overlap resolution;
- local commands and CI gates that validate the contract.
