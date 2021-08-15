import { FormControl } from '@angular/forms';

export const ROUND_ROBIN_INPUT_CONTROL_KEYS = ['participantCount', 'roundCount'] as const;

export type RoundRobinInputControlKey = typeof ROUND_ROBIN_INPUT_CONTROL_KEYS[number];

export type RoundRobinInputControls = Record<RoundRobinInputControlKey, FormControl>;
