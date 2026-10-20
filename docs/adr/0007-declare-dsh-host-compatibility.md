# ADR 0007: Declare compatibility through the DSH host version

Status: Accepted
Date: 2026-10-20

## Context

Milvus for DSH consumes services such as Settings, Credentials, Tools, and the
client connection from the DSH host. Those service packages share the DSH
release version, but they are not packages a profile should install and own.

Version `0.1.4` declared each DSH service as an exact `0.2.0-rc.2` peer. DSH
`0.2.1-rc.2` therefore rejected the plugin before loading it, even though the
plugin still uses the same 0.2 host contracts. Repeating every fast-moving DSH
prerelease in plugin peer ranges does not express the real compatibility
boundary.

## Decision

Declare `engines.dsh` as `>=0.2.0-rc.2 <1.0.0-0`. Current DSH gives this field
precedence over DSH peer ranges and includes prerelease versions when matching
it. DSH service packages remain optional, version-agnostic host peers. Local
development follows their `next` channel, while the committed lockfile records
the exact versions used by CI.

Cordis and Schemastery retain compatible-major peer ranges because they have
independent stable version lines. DSH 1.0 remains outside the declared range
until its host contracts are reviewed and verified.

Register the browser configuration card in `plugins.bundle.config`, keyed by
the npm package name. This plugin-details contract is present throughout the
supported DSH 0.2 line and avoids relying on a settings-tab integration that
current DSH does not render for third-party bundles.

## Consequences

- DSH 0.x updates do not require a plugin release solely to repeat a new host
  package version.
- The runtime owns DSH service versions and profile package managers do not
  install private copies for this plugin.
- A lockfile refresh intentionally tests the current DSH prerelease contracts
  without making published compatibility depend on that exact build.
- Users configure Milvus from the plugin details page in both Desktop and Web.
- Breaking changes within the pre-1.0 line can still require a plugin fix, so
  releases continue to run contract tests and a live DSH smoke test.
