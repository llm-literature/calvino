import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    rules: {
      // Allow unused variables prefixed with underscore
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // Allow any type for flexibility (can be stricter in production)
      '@typescript-eslint/no-explicit-any': 'warn',
      // Disable img element rule since we use unoptimized images in static export
      '@next/next/no-img-element': 'off',
      // Disable overly strict rules for React 19 patterns
      'react-hooks/set-state-in-effect': 'off', // setState in useEffect is valid for mount detection
      'react-hooks/purity': 'warn', // Downgrade to warning - Math.random in animations is intentional
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig
