# GitHub Pages and Namecheap

Repository: https://github.com/rogerbootsma/ultrasi

Publish directory: `dist/`. GitHub Pages source: GitHub Actions.

Custom domain: `ultrasi.io`.

GitHub's documented apex A records:

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | rogerbootsma.github.io |

Configure the custom domain on GitHub before changing DNS. Preserve unrelated MX, TXT, and service records. Enable Enforce HTTPS once GitHub provisions its certificate. GitHub Actions deployments use the custom domain in Pages settings; no `CNAME` file is required.

Source: [GitHub custom-domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), checked 2 November 2026.

Deployment status, 2 November 2026: published successfully to GitHub Pages. Source commit `d874df23f2de67b6d9d107f6e7c83f0dbaad3cae`; successful workflow run https://github.com/rogerbootsma/ultrasi/actions/runs/41426493493. The custom domain is assigned in Pages settings. Namecheap apex A records and the www CNAME above are saved; the existing mail configuration is preserved. Public Google and Cloudflare DNS return the GitHub addresses. The origin returns HTTP 200 and the domain has been verified in the browser over HTTP. The TLS certificate is active, Enforce HTTPS is enabled, and https://ultrasi.io/ returns HTTP 200 with normal certificate validation as of 10:43 UTC. No certificate warning was bypassed.

The simulation partner is now UltraSim.io, with a separate local website at `../ultrasim/` and preview at `http://127.0.0.1:4179/`. Ultrasi remains at `http://127.0.0.1:4178/`. The earlier ASimulation partnership references have been replaced; the separate ASimulation source was not edited.
