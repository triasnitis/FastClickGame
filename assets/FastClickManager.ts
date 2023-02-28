import { _decorator, Component, Node, Label, ProgressBar, CCInteger } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FastClickManager')
export class FastClickManager extends Component {
    @property(Label) lblPopUp : Label = null!;
    @property(Label) lblLavel : Label = null!;
    @property(Label) lblScore : Label = null!;
    @property(Label) lblValueTimer : Label = null!;

    @property(Node) nodePopup : Node = null!;
    @property(ProgressBar) progressLevel : ProgressBar = null!;

    @property(CCInteger) timeNum : number = 0;

    @property(Number) rangArr : Number[] = [0, 50, 100];
    @property(String) levelArr : String[] = [" TURTLE !! ", " OCTOPUS !! ", " TIGER !! "];

    totalClick: number = 0;
    totalTime : number = 0;
    callbackScheduleTime : any;
    isPlay : boolean = false;

    onLoad() {
        this.setOpenerPopup(false);
        this.totalTime = this.timeNum;
    }

    onPlayAgain() {
        this.setOpenerPopup(false);
        this.isPlay = false;
        this.timeNum = this.totalTime;
        this.totalClick = 0;
        this.lblScore.string = this.totalClick.toString();
        this.progressLevel.progress = 0;
    }

    onClickGame() {
        if(!this.isPlay) {
            this.isPlay = true;
            this.countdownTimer();
        }

        this.countClick();
    }

    countClick() {
        this.totalClick++;
        this.lblScore.string = this.totalClick.toString();
        this.progressLevel.progress = this.totalClick*0.01;
    }

    resetGame() {
        this.setOpenerPopup(true)
        this.totalClick = 0;
        this.lblScore.string = this.totalClick.toString();
        this.progressLevel.progress = 0;
    }

    countdownTimer() {
        this.lblValueTimer.string = this.timeNum.toString();

        this.callbackScheduleTime = function() {
            this.timeNum--;
            this.lblValueTimer.string = this.timeNum.toString();

            if(this.timeNum == 0) {
                this.unschedule(this.callbackScheduleTime);
                this.resetGame();
            }
        }

        this.schedule(this.callbackScheduleTime, 1);
    }

    setOpenerPopup(activate : boolean) {
        this.nodePopup.active = activate

        if(activate) {
            this.lblPopUp.string = "You Made "+this.totalClick.toString() + " Click in " + this.totalTime.toString()+" Second";

            if(this.totalClick < this.rangArr[1]) {//turtle
                this.lblLavel.string = this.levelArr[0].toString();
                return;
            } else if(this.totalClick < this.rangArr[2]){//octopus
                this.lblLavel.string = this.levelArr[1].toString();
                return;
            }else if(this.totalClick > this.rangArr[2]){//tiger
                this.lblLavel.string = this.levelArr[3].toString();
                return;
            }
        }
        
    }
}


