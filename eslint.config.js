export default {
  root: true,
  ignorePatterns: ["dist"],
  rules: {
    // Basic rules that don't require parser plugins
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-unused-vars": "warn",
  },
}
