import { join } from 'path'

const keyFilename = join(
  __dirname,
  '../../application_default_credentials.json',
)

export default {
  projectId: 'ia-bot-api',
  keyFilename,
}
