/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...index]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'


//import {apiVersion, dataset, projectId} from './env'
import {schema} from './sanity/schema'
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION
export default defineConfig({
  basePath: '/studio',
  projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion:process.env.NEXT_PUBLIC_SANITY_API_VERSION,

  schema,
  plugins: [
    deskTool(),

    visionTool({defaultApiVersion: apiVersion}),
  ],
})
