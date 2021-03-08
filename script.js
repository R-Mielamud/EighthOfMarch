class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Bezier {
    constructor(P0, P1, P2, P3) {
        this.P0 = P0;
        this.P1 = P1;
        this.P2 = P2;
        this.P3 = P3;
    }

    getX(t) {
        const part0 = Math.pow(1 - t, 3) * this.P0.x;
        const part1 = 3 * Math.pow(1 - t, 2) * t * this.P1.x;
        const part2 = 3 * (1 - t) * Math.pow(t, 2) * this.P2.x;
        const part3 = Math.pow(t, 3) * this.P3.x;
        const x = part0 + part1 + part2 + part3;

        return x;
    }

    getY(t) {
        const part0 = Math.pow(1 - t, 3) * this.P0.y;
        const part1 = 3 * Math.pow(1 - t, 2) * t * this.P1.y;
        const part2 = 3 * (1 - t) * Math.pow(t, 2) * this.P2.y;
        const part3 = Math.pow(t, 3) * this.P3.y;
        const y = part0 + part1 + part2 + part3;

        return y;
    }
}

const P = (x, y) => new Point(x, y);

const beziers = {
    left: [
        new Bezier(P(15, 0), P(30, 25), P(55, 140), P(80, 0)),
        new Bezier(P(13, 0), P(40, 20), P(60, 100), P(90, 0)),
        new Bezier(P(15, 0), P(30, 50), P(40, 80), P(65, 0)),
        new Bezier(P(10, 0), P(30, 50), P(35, 160), P(40, 0)),
        new Bezier(P(15, 0), P(35, 25), P(65, 150), P(85, 0)),
        new Bezier(P(17, 0), P(40, 100), P(50, 200), P(55, 0)),
        new Bezier(P(15, 0), P(30, 25), P(55, 140), P(70, 0)),
        new Bezier(P(15, 0), P(35, 25), P(45, 120), P(75, 0))
    ],
    right: [
        new Bezier(P(85, 0), P(75, 25), P(55, 120), P(25, 0)),
        new Bezier(P(80, 0), P(77, 35), P(57, 160), P(52, 0)),
        new Bezier(P(83, 0), P(70, 30), P(60, 140), P(30, 0)),
        new Bezier(P(87, 0), P(60, 20), P(52, 130), P(35, 0)),
        new Bezier(P(80, 0), P(50, 35), P(40, 100), P(60, 0)),
        new Bezier(P(86, 0), P(55, 40), P(65, 110), P(15, 0)),
        new Bezier(P(85, 0), P(67, 32), P(62, 110), P(20, 0)),
        new Bezier(P(84, 0), P(80, 17), P(60, 130), P(25, 0))
    ],
};

const directions = ["left", "right"];
const colors = ["red", "orange", "green", "blue", "pink", "pink", "brown"];

class Star {
    constructor() {
        this.direction = choose(directions);
        this.bezier = choose(beziers[this.direction]);
        this.color = choose(colors);
        this.interval = null;
        this.t = 0;

        this.element = document.createElement("div");
        this.element.classList.add("star");
        this.element.style.color = this.color;
        document.body.append(this.element);
    }

    animate() {
        if (!this.interval) {
            this.interval = setInterval(() => {
                const x = this.bezier.getX(this.t);
                const y = this.bezier.getY(this.t);
                this.element.style.left = vw(x);
                this.element.style.bottom = vh(y);

                if (this.t >= 1) {
                    clearInterval(this.interval);
                    this.interval = null;
                    return this.destroy();
                }

                this.t += 0.01;
            }, 20);
        }
    }

    destroy() {
        this.element.remove();
    }
}

const vw = (n) => screen.availWidth / 100 * n;
const vh = (n) => screen.availHeight / 100 * n;

const choose = (array) => {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
};

const instantiateAndAnimateStar = () => {
    const star = new Star();
    star.animate();
};

setInterval(instantiateAndAnimateStar, 50);
