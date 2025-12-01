// @ts-check
const eslint = require("@eslint/js");
const { defineConfig } = require("eslint/config");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = defineConfig([
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      // Angular Best Practices
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      "@angular-eslint/no-empty-lifecycle-method": "warn",
      "@angular-eslint/prefer-on-push-component-change-detection": "warn",
      "@angular-eslint/use-lifecycle-interface": "error",
      "@angular-eslint/no-input-rename": "error",
      "@angular-eslint/no-output-rename": "error",
      "@angular-eslint/no-output-native": "error",
      "@angular-eslint/use-injectable-provided-in": "error",

      // TypeScript Best Practices
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_"
        }
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "default",
          format: ["camelCase"],
          leadingUnderscore: "allow",
          trailingUnderscore: "allow"
        },
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
          leadingUnderscore: "allow",
          trailingUnderscore: "allow"
        },
        {
          selector: "typeLike",
          format: ["PascalCase"]
        },
        {
          selector: "enumMember",
          format: ["UPPER_CASE", "PascalCase"]
        },
        {
          selector: "property",
          format: null
        }
      ],
      "@typescript-eslint/member-ordering": [
        "error",
        {
          default: [
            "static-field",
            "instance-field",
            "static-method",
            "instance-method"
          ]
        }
      ],

      // Code Quality Rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-alert": "error",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "error",
      "arrow-body-style": ["error", "as-needed"],
      "object-shorthand": "error",
      "prefer-template": "error",
      "quotes": ["error", "single", { avoidEscape: true }],
      "semi": ["error", "always"],
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],
      "brace-style": ["error", "1tbs"],
      "max-len": ["warn", { code: 120, ignoreStrings: true, ignoreTemplateLiterals: true }],
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "no-trailing-spaces": "error",
      "comma-dangle": ["error", "only-multiline"],
      "space-before-function-paren": ["error", {
        anonymous: "always",
        named: "never",
        asyncArrow: "always"
      }],
      "indent": ["error", 2, {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        MemberExpression: 1,
        FunctionDeclaration: { parameters: 1, body: 1 },
        FunctionExpression: { parameters: 1, body: 1 },
        CallExpression: { arguments: 1 },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        ignoreComments: false,
        ignoredNodes: ['PropertyDefinition']
      }],

      // Three.js Best Practices (Memory Management)
      "no-new": "warn",
      "no-unused-expressions": "error",

      // Performance
      "@typescript-eslint/prefer-for-of": "error",
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],
    rules: {
      "@angular-eslint/template/click-events-have-key-events": "warn",
      "@angular-eslint/template/mouse-events-have-key-events": "warn",
      "@angular-eslint/template/no-autofocus": "warn",
    },
  }
]);
