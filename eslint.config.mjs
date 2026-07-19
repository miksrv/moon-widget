import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import importPlugin from 'eslint-plugin-import'
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import jestPlugin from 'eslint-plugin-jest'

export default defineConfig([
    // register all the plugins up-front
    {
        // note - intentionally uses computed syntax to make it easy to sort the keys
        plugins: {
            ['@typescript-eslint']: tseslint.plugin,
            ['react']: reactPlugin,
            ['react-hooks']: reactHooksPlugin,
            ['import']: importPlugin,
            ['prettier']: prettierPlugin,
            ['simple-import-sort']: simpleImportSortPlugin,
            // ['next']: nextPlugin,
            // ['jsx-a11y']: jsxA11yPlugin,
            // ['unicorn']: unicornPlugin,
        },
        extends: [prettierConfig],
    },

    // register all the configs up-front
    {
        ignores: [
            '**/.yarn/**',
            '**/eslint.config.mjs',
            '**/declarations.d.ts',
            '**/node_modules/**',
            '**/build/**',
            '**/dist/**',
            '**/coverage/**',
            'apps/**',

            // WebPack
            // '**/webpack.config.js',

            // RollUp
            '**/rollup.config.js',

            // PM2 Server
            // '**/ecosystem.config.js',

            // Jest
            '**/jest.config.{js,ts}',
            '**/jest.setup.ts',
            '**/test/fileMock.js',

            // tsup
            '**/tsup.config.ts',
        ],
    },

    // jest test files
    {
        files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
        plugins: { jest: jestPlugin },
        languageOptions: {
            globals: jestPlugin.environments.globals.globals,
        },
        rules: {
            ...jestPlugin.configs.recommended.rules,
        },
    },

    // extends ...
    tseslint.configs.recommended,

    {
        languageOptions: {
            parserOptions: {
                allowAutomaticSingleRunInference: true,
                warnOnUnsupportedTypeScriptVersion: false,
                project: ['eslint.tsconfig.json'],
            },
        },

        settings: {
            react: {
                version: 'detect',
            },
        },

        rules: {
            //
            // eslint-base
            //
            // ✅ Requires curly braces for all control statements
            curly: ['error', 'all'],
            // ✅ Disallow semicolons
            semi: ['error', 'never'],
            // ✅ Require === and !== except when comparing to null
            eqeqeq: ['error', 'always', { null: 'never' }],
            // ✅ Error when the same module is imported multiple times
            'no-duplicate-imports': 'error',
            // ✅ Enforce using logical assignment operators (&&=, ||=, ??=)
            'logical-assignment-operators': 'error',
            // ✅ Disallow return in else after if with return
            'no-else-return': 'error',
            // ✅ Disallow console except console.warn and console.error
            'no-console': ['error', { allow: ['warn', 'error'] }],
            // ✅ Disallow process.exit()
            'no-process-exit': 'error',
            // ✅ Disallow fallthrough in switch/case unless marked with a comment
            'no-fallthrough': [
                'error',
                { commentPattern: '.*intentional fallthrough.*' },
            ],
            // ✅ Warn if double quotes are used instead of single quotes
            quotes: ['warn', 'single'],
            // ❌ Warn if trailing commas are used (Prettier Config)
            // -> 'comma-dangle': ['warn', 'never'],
            // ❌ Prefer single quotes in JSX (Prettier Config)
            // -> 'jsx-quotes': ['warn', 'prefer-single'],
            // ✅ Disallow declaring multiple variables in one statement
            'one-var': ['error', 'never'],
            // ✅ Warn if lines exceed 120 characters, ignoring strings, templates, and comments
            'max-len': [
                'warn',
                {
                    code: 120,
                    ignoreUrls: true,
                    ignoreTemplateLiterals: true,
                    ignoreStrings: true,
                    ignoreComments: true,
                },
            ],
            // ✅ Enforce consistent indentation (2 spaces)
            'object-curly-spacing': ['error', 'always'],
            // ✅ Enforce consistent spacing inside braces
            'object-curly-newline': [
                'error',
                {
                    ObjectExpression: {
                        multiline: true,
                        minProperties: 2,
                    },
                    ImportDeclaration: {
                        multiline: true,
                        minProperties: 6, // Wrap to new lines if there are more than 5 imports
                    },
                },
            ],
            // ✅ Enforce consistent line breaks inside braces
            'padding-line-between-statements': [
                'error',
                // Add an empty line after the last import
                { blankLine: 'always', prev: 'import', next: '*' },
                // Allow multiple consecutive imports without empty lines
                { blankLine: 'any', prev: 'import', next: 'import' },
            ],

            //
            // eslint-plugin-prettier
            //
            'prettier/prettier': 'error',

            //
            // typescript-eslint
            //
            // ❌ Not require explicit return types on functions and class methods
            '@typescript-eslint/explicit-function-return-type': ['off'],
            // ❌ Typescript unnecessary conditions
            '@typescript-eslint/no-unnecessary-condition': 'off',
            // ✅ Disallow usage of any type
            '@typescript-eslint/no-explicit-any': 'warn',
            // ✅ Disallow constant conditions (e.g., while(true) or if(1))
            'no-constant-condition': 'error',
            // ✅ Disallow require() in TypeScript files
            '@typescript-eslint/no-var-requires': 'warn',
            // ✅ Prefer literal enum members, allow bitwise expressions
            '@typescript-eslint/prefer-literal-enum-member': [
                'error',
                { allowBitwiseExpressions: true },
            ],
            // ✅ Prefer startsWith/endsWith over indexOf or substr comparisons
            '@typescript-eslint/prefer-string-starts-ends-with': [
                'error',
                { allowSingleElementEquality: 'always' },
            ],
            // ✅ Allow unbound methods (without this)
            '@typescript-eslint/unbound-method': 'off',
            // ✅ Require explicit accessibility modifiers on class properties and methods (public, private, protected)
            '@typescript-eslint/explicit-member-accessibility': [
                'error',
                { accessibility: 'explicit' },
            ],
            // ✅ Disallow floating promises (promises that are not awaited or handled)
            '@typescript-eslint/no-floating-promises': 'error',
            // ✅ Disallow calling `await` on non-Promise values
            '@typescript-eslint/await-thenable': 'warn',
            // ✅ Require using `Promise.allSettled` or `Promise.all` with proper handling
            '@typescript-eslint/no-misused-promises': [
                'error',
                { checksVoidReturn: false },
            ],
            // ✅ Require `this` to be used only inside classes or objects where it makes sense
            '@typescript-eslint/no-invalid-this': 'error',
            // ✅ Prefer using `Array<T>` or `T[]` instead of `Array<any>`
            '@typescript-eslint/array-type': [
                'error',
                { default: 'array-simple' },
            ],
            // ✅ Ban `// @ts-ignore` unless justified with a comment
            '@typescript-eslint/ban-ts-comment': [
                'error',
                { 'ts-ignore': 'allow-with-description' },
            ],
            // ✅ Require all switch-case statements to have a `default` case
            '@typescript-eslint/switch-exhaustiveness-check': 'error',
            // ✅ Require type-safe use of template expressions (avoid accidentally adding numbers, booleans, etc.)
            '@typescript-eslint/restrict-template-expressions': [
                'error',
                { allowNumber: true, allowBoolean: false, allowAny: false },
            ],
            // ✅ Disallow unused variables, ignore variables or args starting with underscore
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    caughtErrors: 'all',
                    varsIgnorePattern: '^_',
                    argsIgnorePattern: '^_',
                },
            ],

            //
            // react
            //
            // ❌ Check hook dependencies
            'react-hooks/exhaustive-deps': 'off',
            // Turn off prop-types checks (TypeScript handles this)
            'react/prop-types': 'off',
            // ✅ Disallow unsafe lifecycle methods
            'react/no-unsafe': 'error',
            // ✅ Disallow this.state inside setState
            'react/no-access-state-in-setstate': 'error',
            // ✅ Check hook usage rules
            'react-hooks/rules-of-hooks': 'error',
            // ✅ Prefer function components over class components
            'react/prefer-stateless-function': [
                'warn',
                { ignorePureComponents: true },
            ],
            // ✅ Check for keys in maps
            'react/jsx-key': 'error',
            // ✅ Limit max JSX nesting
            'react/jsx-max-depth': ['warn', { max: 4 }],
            // ✅ Ensure readability of JSX elements with multiple props
            'react/jsx-max-props-per-line': [
                'warn',
                { maximum: 1, when: 'multiline' },
            ],
            // ✅ Prefer using shorthand <></> for Fragment
            'react/jsx-fragments': ['warn', 'syntax'],

            //
            // eslint-plugin-import
            //
            // ✅ Enforce all import statements to appear at the top of the file
            'import/first': 'error',
            // ✅ Error if importing a module that is not in package.json
            'import/no-extraneous-dependencies': [
                'error',
                {
                    devDependencies: [
                        '**/*.test.{ts,tsx}',
                        '**/*.spec.{ts,tsx}',
                        '**/jest.config.{js,ts}',
                        '**/jest.setup.ts',
                    ],
                },
            ],
            // ✅ Warning if there are cyclic dependencies
            'import/no-cycle': ['warn', { maxDepth: Infinity }],
            // ✅ Error if absolute paths are specified instead of relative ones (can be disabled if necessary)
            'import/no-absolute-path': 'error',
            // ❌ Error if non-existent files/modules are imported
            'import/no-unresolved': 'off',
            // ✅ Warning if there are duplicate imports
            'import/no-duplicates': 'warn',
            // ✅ Disallow a module importing itself
            'import/no-self-import': 'error',
            // ✅ Enforce a consistent type specifier style in imports
            'import/consistent-type-specifier-style': 'error',

            //
            // eslint-plugin-simple-import-sort
            //
            // ✅ Automatic sorting of exports
            'simple-import-sort/exports': 'error',
            // ✅ Automatic sorting of imports
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        // React and its libraries
                        ['^react', '^@?react'],
                        // Node.js builtin модули (fs, path, etc.)
                        ['^node:'],
                        [
                            '^(assert|buffer|child_process|cluster|crypto|dgram|dns|domain|events|fs|http|https|net|os|path|punycode|querystring|readline|stream|string_decoder|timers|tls|tty|url|util|v8|vm|zlib)(/.*|$)',
                        ],
                        // npm packages (others external)
                        ['^next', '^@?\\w'],
                        // aliases (@/ or src/)
                        ['^@/', '^src/'],
                        // relative imports (parent)
                        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                        // relative imports (current folder and index)
                        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                        // type-only imports (sometimes .d.ts or import type)
                        ['^.+\\.d\\.ts$', '^\\u0000'],
                        // styles
                        [
                            '^.+\\.css$',
                            '^.+\\.scss$',
                            '^.+\\.sass$',
                            '^.+\\.less$',
                        ],
                    ],
                },
            ],
        },
    },
])
