import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-cpy';
import { createDefaultConfig } from '@open-wc/building-rollup';

const config = createDefaultConfig({
  input: './index.html',
  outputDir: '../../static/',
  extensions: ['.js', '.mjs', '.ts'],
});

export default {
  ...config,
  output: {
    ...config.output,
    sourcemap: true,
  },
  plugins: [...config.plugins,
    typescript({
      tsconfig: './tsconfig.json',
    }),
  ],
};

module.exports = createDefaultConfig({
  input: './index.html',
  extensions: ['.js', '.mjs', '.ts'],
});
