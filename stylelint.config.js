/** Only rules that guard a design decision; formatting is Prettier's job. */
export default {
  rules: {
    // Breakpoints in range syntax (`width < 900px` / `width >= 900px`) leave no 1px gap between two queries.
    'media-feature-range-notation': 'context',
    // Dimmed questions are toned down via colors; opacity would also fade the text below its contrast.
    'rule-selector-property-disallowed-list': { '/\\.question\\.(dont-care|muted)/': ['opacity'] },
  },
};
