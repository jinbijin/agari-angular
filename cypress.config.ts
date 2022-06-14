import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: '53hibb',
  e2e: {
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
