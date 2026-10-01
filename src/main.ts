import { Game } from './game';
import { prewarmBossModels } from './entities/bossModels';

new Game();
// sculpt the bosses while the title screen idles, not when one arrives
prewarmBossModels();
