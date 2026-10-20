import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const packageUrl = new URL('../package.json', import.meta.url)

test('the plugin follows the compatible pre-1.0 dsh host contract', async () => {
  const manifest = JSON.parse(await readFile(packageUrl, 'utf8'))

  assert.equal(manifest.engines.dsh, '>=0.2.0-rc.2 <1.0.0-0')

  for (const name of [
    '@deepseek-ai/dsh-client-connection',
    '@deepseek-ai/dsh-settings',
    '@deepseek-ai/dsh-credentials',
    '@deepseek-ai/dsh-tools',
  ]) {
    assert.equal(manifest.peerDependencies[name], '*')
    assert.equal(manifest.peerDependenciesMeta[name]?.optional, true)
    assert.equal(manifest.devDependencies[name], 'next')
  }

  assert.equal(manifest.peerDependencies['@deepseek-ai/cordis'], '^4.0.1')
  assert.equal(manifest.peerDependencies['@deepseek-ai/schemastery'], '^3.18.1')
})
