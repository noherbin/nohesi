// Challenge definitions. Goals: speed (mph), close (close passes), near (near misses incl. overtakes within 2m),
// distance (miles without crashing), score (points in one run), splits.
export const CHALLENGES = [
  { id: 'tonup', title: 'Ton Up', desc: 'Reach 100 mph.', env: 'la', time: 'morning', weather: 'clear', density: 'normal', goal: { type: 'speed', value: 100 }, reward: 2000, failOnCrash: false },
  { id: 'closecalls', title: 'Close Calls', desc: 'Make 10 close passes (under 1.2 m) in one run.', env: 'la', time: 'golden', weather: 'clear', density: 'heavy', goal: { type: 'close', value: 10 }, reward: 6000, failOnCrash: true },
  { id: 'commute', title: 'Clean Commute', desc: 'Drive 3 miles through heavy traffic without crashing.', env: 'urban', time: 'morning', weather: 'clear', density: 'heavy', goal: { type: 'distance', value: 3 }, reward: 6000, failOnCrash: true },
  { id: 'rookie', title: 'Score Rookie', desc: 'Score 15,000 points in one run.', env: 'la', time: 'noon', weather: 'clear', density: 'normal', goal: { type: 'score', value: 15000 }, reward: 6000, failOnCrash: true },
  { id: 'needle', title: 'Thread the Needle', desc: 'Split between two cars 3 times in one run.', env: 'urban', time: 'dusk', weather: 'clear', density: 'rush', goal: { type: 'splits', value: 3 }, reward: 9000, failOnCrash: true },
  { id: 'bullet', title: 'Desert Bullet', desc: 'Reach 170 mph on the desert interstate.', env: 'desert', time: 'noon', weather: 'clear', density: 'light', goal: { type: 'speed', value: 170 }, reward: 10000, failOnCrash: false },
  { id: 'nightshift', title: 'Night Shift', desc: 'Score 40,000 points at night in the rain.', env: 'night', time: 'night', weather: 'rain', density: 'normal', goal: { type: 'score', value: 40000 }, reward: 18000, failOnCrash: true },
  { id: 'rushhour', title: 'Rush Hour Hero', desc: 'Get 25 near misses in rush-hour traffic.', env: 'la', time: 'dusk', weather: 'clear', density: 'rush', goal: { type: 'near', value: 25 }, reward: 16000, failOnCrash: true },
  { id: 'doubleton', title: 'Double Ton', desc: 'Reach 200 mph. You will need serious horsepower.', env: 'desert', time: 'golden', weather: 'clear', density: 'light', goal: { type: 'speed', value: 200 }, reward: 30000, failOnCrash: false },
  { id: 'legend', title: 'No Hesi Legend', desc: 'Score 150,000 points in a single run.', env: 'night', time: 'night', weather: 'clear', density: 'heavy', goal: { type: 'score', value: 150000 }, reward: 60000, failOnCrash: true },
];

export const GOAL_LABEL = {
  speed: (v) => `${v} MPH`,
  close: (v) => `${v} CLOSE PASSES`,
  near: (v) => `${v} NEAR MISSES`,
  distance: (v) => `${v} MILES CLEAN`,
  score: (v) => `${v.toLocaleString('en-US')} PTS`,
  splits: (v) => `${v} SPLITS`,
};
