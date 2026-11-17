import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  // Dónde busca Storybook las historias y las páginas de documentación
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: '@storybook/react-vite',
}

export default config
