# NO HESI — Highway Traffic Simulator (browser)

A 3D highway traffic driving game inspired by Assetto Corsa "No Hesi" servers, built with Three.js.
Everything (cars, roads, buildings, textures, engine sounds, music) is generated procedurally at runtime: no external assets.

## Play

Play online: **https://noherbin.github.io/nohesi/**

Or open `dist/index.html` in Chrome, Edge or Firefox (double-clicking the file works; no server needed).
Click **CLICK TO START** (or press Enter), then **DRIVE → START DRIVING**.

## Controls

| Action | Keyboard | Controller |
| --- | --- | --- |
| Accelerate | W / ↑ | RT |
| Brake / reverse | S / ↓ | LT |
| Steer | A D / ← → | Left stick |
| Handbrake | Space | A |
| Change camera | C | Y |
| Look back (hold) | B | B |
| Reset car | R | X |
| Pause | Esc / P | Start |
| Gear up / down | Shift / Ctrl (also E / Q) | RB / LB |
| Turn signals left / right | Z / X | — |
| Interior light | L | — |
| Toggle HUD | H | View |
| Music on/off | M | — |
| Fullscreen | F | — |

Browsers reserve Ctrl+W (close tab). The game asks before closing while you're driving, but E/Q for gears or fullscreen (F) avoids it entirely.

## Features

- **Endless procedural freeway** with gentle curves and hills, floating origin (no precision jitter after long drives), chunk streaming and pooled props.
- **4 environments:** Los Angeles freeway, elevated urban expressway, desert interstate, neon night city. Time of day (dawn to night, or a live day/night cycle) and weather (clear, overcast, rain, which reduces grip and visibility and wets the road).
- **Vehicle physics:** Pacejka-style tyres, friction ellipse, longitudinal and lateral load transfer, aero drag and downforce, torque curves, turbo lag, gearbox (auto or manual), traction control, stability and countersteer assists, handbrake slides, speed-sensitive steering.
- **14 cars** (fictional, inspired by real classes): Japanese sports sedan, street hatch, 80s hatch coupe with pop-up lamps, rotary coupe, twin-turbo straight-six GT, German super-sedan, rear-engine coupe, German super wagon, electric super sedan, American muscle, British V12 grand tourer, V10 supercar, Italian V12 supercar, hypercar. Buy them with the cash you earn (or turn on the sandbox in Settings, which makes all cars and parts free). Engine sounds are synthesised per layout (flat-four, inline-four and six, rotary, flat-six, V8s, V10, two V12 characters, and an electric motor whine for the EV, which has instant torque, a two-speed gearbox and no exhaust).
- **Money:** you start with $5,000 and the two starter cars. Every Endless or Time Attack run pays $1 per point scored plus $0.20 per metre driven, and challenges pay prize money. Spend it on cars in the Garage and on parts in Customize, where you can try any part on the car before buying it. Parts are bought per car and stay yours to swap back to; colours, tint and the plate are free. Older saves keep every car they had unlocked and every part already fitted, plus $10,000.
- **Customisation (the parts shop):** paint finishes, 19 wheel styles, rim and caliper colours, tint, suspension drop, spoilers, body kits, exhausts (sound and pops), licence plate. Body kits run from street and aggressive to a moulded widebody and two bolt-on widebodies: **Tokyo Rivet** (Rocket Bunny-style riveted over-fenders, splitter, canards and a ducktail) and **Outlaw Works** (Liberty Walk-style huge boxy riveted flares and a GT wing). Both push the wheels out to fill the flares and fit fatter tyres.
- **Traffic AI:** IDM car-following, lane changes with turn signals, brake lights, honking when you cut them off, cars, SUVs, pickups, vans, box trucks and semis, plus oncoming traffic. Density grows as a run goes on.
- **No Hesi scoring:** overtakes, close and extremely close passes, splits between two cars, chains, speed streaks, dense-traffic bonus, multipliers with a combo timer. Crashing ends the run.
- **Modes:** Endless Highway, Free Drive, Time Attack (2 minutes), 10 Challenges.
- **Leaderboard:** Endless score, Time Attack distance and Top Speed boards. A global board shared by everyone who plays (GitHub Pages, the zip or claude.ai) ranks each driver's personal bests, which post automatically after a run with no account needed; set a driver name on the leaderboard screen. The top 10 runs on each device are also kept in the save. Scores are stored in a Firebase Firestore project (anonymous sign-in; security rules let anyone read and each player write only their own entry, within values the game can produce).
- **Cameras:** chase, far chase, cockpit (working gauges, steering wheel and hands, live mirrors, dash lighting), hood, bumper, cinematic.
- **Audio:** engine sound synthesised per engine layout (flat-4, I4, rotary, I6, flat-6, V8, V10) with RPM crossfades, turbo whistle and blow-off, supercharger whine, exhaust pops, shifts, tyre squeal, wind, road and rain noise, pass-by whooshes, horns, crashes and optional procedural synthwave.
- **Graphics:** dynamic shadows plus soft contact shadows under every car, physically based paint with clearcoat (traffic too), bloom, time-of-day colour grading, sun lens flare, sky with clouds, stars and an overcast layer for rain, fog, night lighting modelled on real No Hesi runs (white LED streetlights that light the cars passing under them, a near-black sky, headlight flares only from lamps pointed at you), retroreflective lane markers, wet-road reflections, road spray in the rain, raindrops on the windscreen in cockpit view, motion blur, auto quality scaling.
- **Unique interiors (config/interiors.js):** every car has its own cockpit matched to its class: dashboard architecture (two-tier rally dash, low horizontal hot-hatch dash with red trim, flat 80s fascia, driver-wrapped 90s cockpit with an angled stack, 90s GT dash with a hooded multi-function display, sweeping luxury dash with wood and a curved glass panel, 911-style horizontal dash with five round dials and a chrono clock, black-glass estate dash with stacked screens, slim EV dash with a light line and passenger display, muscle-car double brow, leather-wrapped GT fascia, hexagonal V10 design, fighter-jet centre spine, floating carbon beam), its own instrument cluster (twin analog, digital sport with shift lights, 80s bar-graph digital dash, three-gauge 90s binnacle, speedo / tach / boost triple, wide digital, five dials, full digital cockpit with a map, EV power meter, deep twin tunnels, counter-rotating tachometer, hexagonal TFT, speed-tape TFT with G-meter, column pod), centre screen or period head unit, vents (rectangular, slim, eyeball, turbine, hexagonal), climate controls (knobs, buttons, sliders, touch panel, toggle switches, overhead strip), shifter (H-pattern with boot and handbrake, e-shifter with rotary controller, PDK toggle, buttons, carbon spine), steering wheel (fourteen designs), seats (sport, bucket, cloth retro, quilted comfort, crested sport, muscle with stripes, carbon bucket, fixed race seat with harness), belts, pedals, floor mats, door cards, headliner, materials (leather, alcantara, cloth, quilting, carbon, wood, brushed aluminium, piano black) and ambient light colour. Each car sets its own seating position, so the first-person view differs too.
- **Working details:** gauges sweep on start-up, speedo and rev counter follow the car, turn signals (Z / X) blink with a relay tick and cancel after the lane change, reversing lamps, brake lamps, interior light (L), wheel turns with the steering, discs spin with the wheels.
- **Car bodies:** sculpted cross-sections (shoulder crease, tucked sills, flank scallop), muscular haunches over flush-fitted wheels, bonnet set below the wing tops, body-coloured A-pillars with gloss-black window surrounds and B-pillars, panel gaps (bonnet, boot, bumpers), black lower sills and valances, honeycomb grille mesh, fog lamps, badges, side markers, high-mount stop lamp, lettered tyres, and a horizon-lit reflection map so paint reads as metal.
- **Scenery:** buildings come in several silhouettes per type (setback towers, cornices, podiums, rooftop plant rooms, AC units, water tanks, antenna masts with blinking aircraft-warning lights), grass tufts along the verges, high-voltage transmission towers with sagging wires, graffiti tags and ivy on the sound walls, skid marks, sealed cracks, patch repairs and oil drips on the asphalt, anti-glare screens on city medians, and on the open interstate guardrail delineators that catch the light at night, emergency call boxes and mile markers. Nothing overlaps: every large prop reserves its footprint.
- **Purpose-built fronts:** each car's openings follow its layout: hexagonal grille and fog lamps on the rally sedan, slot grille and big lower intake on the hot hatch, no grille on the pop-up-lamp rotary coupe, kidney grille on the super-sedan, three low radiator intakes on the rear-engined coupe, a trapezoid grille on the muscle car, and side engine intakes on the mid-engined cars. Lamps are polished reflectors behind clear glass with projector lenses and always-on LED daytime running lights; cars also carry windscreen wipers and (four-seaters) a roof antenna fin.
- **Buildings:** curtain-wall glass towers, ribbon-window office blocks, punched-window apartments, shopfronts and ribbed-metal warehouses; glass reflects the sky while concrete stays matte, and at night offices light up in runs along each floor (ceiling-lit, desks, blinds) while homes glow warm behind curtains.
- **Real-car details:** pop-up lamps and black bumpers with a rubbing strip on the 80s coupe, a bonnet duct on the GT, roof rails, C-pillar, roof spoiler and rear wiper on the estate, side gills and bonnet vents on the grand tourer, louvred engine covers on the mid- and rear-engined cars, a roof scoop on the hypercar, a triple centre exhaust on the hot hatch, chrome window lines on the luxury cars, and signature lights: Y-shaped LED graphics, four-point EV headlamps, full-width bars, blade and band tail lamps.
- **Bodywork:** taut body sides with a crisp shoulder line and a lower character line, upright nose and tail panels, tyres set flush with each fender (front and rear tracks follow the body), baked ambient occlusion that darkens sills, wheel wells and the tucked-under lower body, and lamps built as units: chrome reflector bowls and projectors behind a clear cover glass, LED-cell tail lenses that glow in segments. The garage lights cars like a photo studio (overhead softbox, side strips), so the paint carries long, crisp highlight lines.
- **Wheels & finish:** a different rim design per car (5-spoke, multi-spoke, mesh, split, deep dish, turbine, Y-spoke, centre-lock, classic 8-spoke, 6-spoke, V-spoke, aero disc, GT 20-spoke, blade) plus shop wheels: deep dishes with the centre set far back behind a polished barrel and lip (3-piece deep mesh with a ring of bolts, deep 5-star and super-deep 12-spoke with stepped lips), banded steelies and turbofans with dished tapered spokes, lug nuts and centre caps, drilled ventilated discs, twin-piston calipers, directional tread, a clear coat with a faint orange-peel ripple, and an exhaust run and silencer under the car.
- **Car detail:** lights, grilles and trim follow the body surface (projector lenses, DRLs, door shut lines, handles, window trim), real mirror housings on stalks, a full cockpit interior (door cards, seats, rear bench, parcel shelf) so the cabin is solid from every angle.

## Project structure

```
src/
  main.js, game.js            entry point and orchestrator (state machine, game loop)
  core/                       math utils, input (keyboard + gamepad), save data
  config/                     cars, environments, challenges
  world/                      road path generation, highway chunks, props, scenery details, textures, sky
  vehicles/                   procedural car builder, physics, player car
  traffic/                    traffic AI and instanced rendering
  gameplay/                   scoring, collisions, leaderboard, autopilot (menu background)
  camera/                     camera rig and cockpit interior
  fx/                         glows, particles, rain, post-processing
  audio/                      engine synthesis, sound system, music
  ui/                         menus, garage, settings, HUD
  garage/                     showroom scene
index.html, style.css         UI markup and styling
```

## Build from source

```
npm install
npm run build        # minified bundle -> dist/game.js (+ copies index.html, style.css)
npm run build:dev    # unminified
```
