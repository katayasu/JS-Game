import { Screen } from './screen';
import { Loading } from './scenes/loading';

export class Game {
    constructor({width = 640, height = 640} = {}) {
        this.screen = new Screen(width,height);
        this.screen.loadImages({
           dog: 'img/rpg-pack/mobs/kobold-idle.png',
           player: 'img/rpg-pack/gabe/gabe-idle-run.png',
           tiles: 'img/rpg-pack/tiles/tiles.jpg'
        }
        )
        this.scenes = {
            loading: new Loading(this)
        };
        this.currentScene = this.scenes.loading;
        this.currentScene.init();
    }

    frame(time) {
        if(this.currentScene.isActive == false) {
            this.currentScene = this.scenes[this.currentScene.nextScene];
            this.currentScene.init();
        }
        this.currentScene.render(time);
        requestAnimationFrame(time => this.frame(time));
    }

    run() {
        requestAnimationFrame(time => this.frame(time));
    }
}