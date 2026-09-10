class Points {

    constructor(x, y, maxPoints) {
        this.originalX = x;
        this.originalY = y;

        this.currentX = x;
        this.currentY = y;

        this.directionX = floor(random(0, 2));
        this.directionY = floor(random(0, 2));

        this.maxPoints = maxPoints;
        this.allPoints = [];

        this.cell = this.getCell(x, y);

        let root = this.getRoot(this.cell);

        this.rootX = root[0];
        this.rootY = root[1];

        this.generatePoints(x, y, this.cell);

        this.maxLife = 60 * 30;
        this.currentLife = 60 * 30;
    }


    getRoot(cell) {

        // x root
        if ([1, 5, 9, 13].includes(cell)) {
            var rootX = 0;
        }

        else if ([2, 3, 6, 7, 10, 11, 14, 15].includes(cell)) {
            var rootX = width / 2;
        }

        else {
            var rootX = width;
        }


        // y root
        if ([1, 2, 3, 4].includes(cell)) {
            var rootY = 0;
        }

        else if ([5, 6, 7, 8, 9, 10, 11, 12].includes(cell)) {
            var rootY = height / 2;
        }

        else {
            var rootY = height;
        }


        return [rootX, rootY];
    }


    getCell(x, y) {

        let col = floor(x / (width / 4));
        let row = floor(y / (height / 4));

        return (row * 4 + col) + 1;
    }


    generatePoints(x, y, cell) {

        if (dist(x, y, this.rootX, this.rootY) < 2) {
            return;
        }


        for (let i = 0; i < this.maxPoints; i++) {

            let toDraw = floor(random(0, 2));


            if (toDraw) {

                let distanceX = abs(x - this.rootX);
                let distanceY = abs(y - this.rootY);

                let newX = random(x - distanceX / 2, x + distanceX / 2);
                let newY = random(y - distanceY / 2, y + distanceY / 2);

                let pointSize = random(1, 4);

                let r = random(150, 255);
                let g = random(150, 255);
                let b = random(150, 255);
                let originalA = random(50, 255);


                if (this.originalX !== this.rootX) {
                    var ratioX = (newX - this.rootX) / (this.originalX - this.rootX);
                }

                else {
                    var ratioX = 0;
                }


                if (this.originalY !== this.rootY) {
                    var ratioY = (newY - this.rootY) / (this.originalY - this.rootY);
                }

                else {
                    var ratioY = 0;
                }


                let pointOriginalX = newX;
                let pointOriginalY = newY;

                let pointCurrentX = newX;
                let pointCurrentY = newY;

                let pointDirectionX = floor(random(0, 2));
                let pointDirectionY = floor(random(0, 2));

                let pointSpeedX = random(0.3, 2.0) * ratioX;
                let pointSpeedY = random(0.3, 2.0) * ratioY;


                this.allPoints.push([
                    pointSize,
                    r,
                    g,
                    b,
                    originalA,
                    ratioX,
                    ratioY,
                    pointOriginalX,
                    pointCurrentX,
                    pointOriginalY,
                    pointCurrentY,
                    pointDirectionX,
                    pointDirectionY,
                    pointSpeedX,
                    pointSpeedY
                ]);
            }
        }


        let newX = (x + this.rootX) / 2;
        let newY = (y + this.rootY) / 2;

        this.generatePoints(newX, newY, cell);
    }


    drawPoints(dragging) {

        for (let p of this.allPoints) {

            let pointSize = p[0];

            let r = p[1];
            let g = p[2];
            let b = p[3];

            let originalA = p[4];

            let lifeRatio = this.currentLife / this.maxLife;

            let fade = 1 - Math.pow(1 - lifeRatio, 3);

            let finalA = originalA * fade;

            let ratioX = p[5];
            let ratioY = p[6];

            strokeWeight(pointSize);
            stroke(r, g, b, finalA);


            if (dragging) {
                p[8] = this.rootX + ratioX * (this.currentX - this.rootX);
                p[10] = this.rootY + ratioY * (this.currentY - this.rootY);
            }


            point(p[8], p[10]);
        }
    }


    lockPoints() {

        for (let p of this.allPoints) {

            let ratioX = p[5];
            let ratioY = p[6];

            let x = this.rootX + ratioX * (this.currentX - this.rootX);
            let y = this.rootY + ratioY * (this.currentY - this.rootY);

            // original X
            p[7] = x;

            // current X
            p[8] = x;

            // original Y
            p[9] = y;

            // current Y
            p[10] = y;
        }
    }


    reverseAtLimit(p, axis, location, limit1, limit2) {

        if (location <= limit1) {

            if (axis === "x") {
                p[11] = 1;
            }

            else {
                p[12] = 1;
            }
        }


        else if (location >= limit2) {

            if (axis === "x") {
                p[11] = 0;
            }

            else {
                p[12] = 0;
            }
        }
    }


    move() {

        for (let p of this.allPoints) {

            this.reverseAtLimit(p, "x", p[8], p[7] - 100, p[7] + 100);
            this.reverseAtLimit(p, "y", p[10], p[9] - 100, p[9] + 100);

            let ratioX = p[5];
            let ratioY = p[6];

            let speedX = ceil(p[13]);
            let speedY = ceil(p[14]);

            let xMove = (ratioX + (sin(ratioY) + cos(ratioY))) / 2;


            // side = left
            if (p[11] === 0) {
                p[8] -= xMove * speedX;
            }

            // side = right
            else {
                p[8] += xMove * speedX;
            }


            let yMove = (ratioY + (sin(ratioX) + cos(ratioX))) / 2;


            // side = bottom
            if (p[12] === 0) {
                p[10] -= yMove * speedY;
            }

            // side = top
            else {
                p[10] += yMove * speedY;
            }
        }
    }


    loseLife(dragging) {

        if (!dragging) {
            this.currentLife = max(0, this.currentLife - 1);
        }
    }
}