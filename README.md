# RUNEBLADE
## Masterwork · v1.0.0

Independent medieval-fantasy edition of the original duel engine. Seven fighters, eight arenas, arcade ladder, CPU, local versus, training, survival, boss rush and optional online duels. This is a release candidate, not a published or store-certified game.

### Play
Open `web/index.html` directly for local play. For the installable experience, host the contents of `web/` on a static HTTPS site. On iPhone, open the site in Safari and use Share > Add to Home Screen (if offered). Android/desktop installation depends on the browser. After the first successful online load and cache installation, local modes can be played offline. On static hosting, online mode needs a separately hosted relay (set its URL in `web/config.js`).

### Run the complete server locally
From this folder, with Python 3.10+ installed:

```
python -m pip install -r requirements.txt
python server.py
```

Open http://localhost:8080. To test with a second device on your trusted local network, use the host computer's LAN IP and port 8080; allow the port through its firewall if necessary. Online rooms use six-character codes. For public deployment, put the server behind HTTPS with WebSocket support. The included Dockerfile can build and run the app on a compatible host. Set PORT as required. The relay is in-memory and single-process; use one instance for matchmaking or implement shared state before scaling. It relays deterministic gameplay inputs, not authoritative game state. No ranking service or anti-cheat backend is included.

### Data and compatibility
New storage namespace `runeblade-duelists.*` (settings, recent setup and progress). No data migration or access to the Galactic Fueled Duelists saves. Internal character and arena IDs remain stable; the old game and repo are not modified. The dedicated WebSocket route `/runeblade` and protocol `runeblade:*` do not connect to the old relay.

### Build contents
- `web/index.html`: full game with embedded engine, artwork, audio and INAAM asset.
- `web/manifest.webmanifest`, `web/sw.js`, icons: PWA install/offline support.
- `web/config.js`: optional relay override for static deployments.
- `server.py`, `requirements.txt`, `Dockerfile`: independent online relay and web hosting.

### Release notes
- Six Masterwork fantasy fighters, retaining INAAM and original combat mechanics.
- Original fantasy names and fighting-form labels, revised credits and newly generated ambient menu loop.
- Removed unused franchise character GLBs and the two franchise voice clips. The legacy thrown-saber GLB is disabled; the existing drawn projectile fallback handles blade throws.
- Original source includes inherited assets and code. Confirm all asset rights before any commercial release; no claim of a complete licensing audit is made. Three.js upstream notices are retained in the embedded library.
- Full device, multiplayer lockstep gameplay and native store testing still required. No APK/IPA is included.
