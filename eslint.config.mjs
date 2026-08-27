import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import sonarjs from "eslint-plugin-sonarjs";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  sonarjs.configs.recommended,
  {
    ignores: ['**/dist/**', '**/node_modules/**'],
    rules: {
      "sonarjs/cognitive-complexity": ["error", 15],
      "no-restricted-imports": [
        "error",
        {
          "patterns": [
            {
              "group": ["apps/*/*"],
              "message": "Las aplicaciones no pueden importar directamente de otras aplicaciones. Usa paquetes en packages/."
            }
          ]
        }
      ]
    }
  }
);
