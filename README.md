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
| Toggle HUD | H | View |
| Music on/off | M | — |
| Fullscreen | F | — |

Browsers reserve Ctrl+W (close tab). The game asks before closing while you're driving, but E/Q for gears or fullscreen (F) avoids it entirely.

## Features

- **Endless procedural freeway** with gentle curves and hills, floating origin (no precision jitter after long drives), chunk streaming and pooled props.
- **4 environments:** Los Angeles freeway, elevated urban expressway, desert interstate, neon night city. Time of day (dawn to night, or a live day/night cycle) and weather (clear, overcast, rain, which reduces grip and visibility and wets the road).
- **Vehicle physics:** Pacejka-style tyres, friction ellipse, longitudinal and lateral load transfer, aero drag and downforce, torque curves, turbo lag, gearbox (auto or manual), traction control, stability and countersteer assists, handbrake slides, speed-sensitive steering.
- **8 cars** (fictional, inspired by real classes): Japanese sports sedan, street hatch, rotary coupe, German super-sedan, rear-engine coupe, American muscle, V10 supercar, hypercar. Unlock with career points (or use the sandbox unlock in Settings).
- **Customisation:** paint and finish, wheels, rim and caliper colours, tint, suspension drop, spoilers, body kits incl. widebody, exhausts (sound and pops), licence plate.
- **Traffic AI:** IDM car-following, lane changes with turn signals, brake lights, honking when you cut them off, cars, SUVs, pickups, vans, box trucks and semis, plus oncoming traffic. Density grows as a run goes on.
- **No Hesi scoring:** overtakes, close and extremely close passes, splits between two cars, chains, speed streaks, dense-traffic bonus, multipliers with a combo timer. Crashing ends the run.
- **Modes:** Endless Highway, Free Drive, Time Attack (2 minutes), 10 Challenges.
- **Cameras:** chase, far chase, cockpit (working gauges, steering wheel and hands, live mirrors, dash lighting), hood, bumper, cinematic.
- **Audio:** engine sound synthesised per engine layout (flat-4, I4, rotary, I6, flat-6, V8, V10) with RPM crossfades, turbo whistle and blow-off, supercharger whine, exhaust pops, shifts, tyre squeal, wind, road and rain noise, pass-by whooshes, horns, crashes and optional procedural synthwave.
- **Graphics:** dynamic shadows plus soft contact shadows under every car, physically based paint with clearcoat (traffic too), bloom, time-of-day colour grading, sun lens flare, sky with clouds, stars and an overcast layer for rain, fog, headlights and light pools at night, retroreflective lane markers, wet-road reflections, road spray in the rain, raindrops on the windscreen in cockpit view, motion blur, auto quality scaling.
- **Cockpit:** sculpted dashboard with a stitched leather top, hooded digital cluster (speed, rpm sweep, gear, boost/fuel, trip) and a free-standing centre display (map, media), slatted air vents, climate panel, start button, carbon and aluminium trim, cyan ambient light pipes on the dash and doors, console with gear selector, rotary controller and armrest, flat-bottomed sport wheel with switch pods, paddles and badge, gloved hands that grip the rim and follow it with two-bone IK arms, trimmed door cards (armrest, pull, release lever, window switches, speakers), headliner, sun visors, live rear-view and door mirrors, a small head-up display, and rain on the windscreen.
- **Car bodies:** sculpted cross-sections (shoulder crease, tucked sills, flank scallop), muscular haunches over flush-fitted wheels, bonnet set below the wing tops, body-coloured A-pillars with gloss-black window surrounds and B-pillars, panel gaps (bonnet, boot, bumpers), black lower sills and valances, honeycomb grille mesh, fog lamps, badges, side markers, high-mount stop lamp, lettered tyres, and a horizon-lit reflection map so paint reads as metal.
- **Scenery:** buildings come in several silhouettes per type (setback towers, cornices, podiums, rooftop plant rooms, AC units, water tanks, antenna masts with blinking aircraft-warning lights), grass tufts along the verges, high-voltage transmission towers with sagging wires, graffiti tags and ivy on the sound walls, skid marks, sealed cracks, patch repairs and oil drips on the asphalt, anti-glare screens on city medians, and on the open interstate guardrail delineators that catch the light at night, emergency call boxes and mile markers. Nothing overlaps: every large prop reserves its footprint.
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
  gameplay/                   scoring, collisions, autopilot (menu background)
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
