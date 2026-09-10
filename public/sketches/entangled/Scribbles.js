class Scribbles {

    constructor(x, y, maxScribbles) {
        this.originalX = x;
        this.originalY = y;

        this.currentX = x;
        this.currentY = y;

        this.directionX = floor(random(0, 2));
        this.directionY = floor(random(0, 2));

        this.maxScribbles = maxScribbles;
        this.allScribbles = [];

        this.cell = this.getCell(x, y);

        let root = this.getRoot(this.cell);

        this.rootX = root[0];
        this.rootY = root[1];

        this.generateScribbles(x, y, this.cell);

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


    generateScribbles(x, y, cell) {

        if (dist(x, y, this.rootX, this.rootY) < 2) {
            return;
        }


        for (let i = 0; i < this.maxScribbles; i++) {

            let toDraw = floor(random(0, 2));

            let newCoords = [];


            if (toDraw) {

                for (let j = 0; j < 4; j++) {

                    let distanceX = abs(x - this.rootX);
                    let distanceY = abs(y - this.rootY);

                    let newX = random(x - distanceX / 2, x + distanceX / 2);
                    let newY = random(y - distanceY / 2, y + distanceY / 2);

                    newCoords[j] = [[newX, newY]];
                }


                let scribbleThickness = random(1, 4);

                let r = random(150, 255);
                let g = random(150, 255);
                let b = random(150, 255);
                let originalA = random(50, 255);


                for (let k = 0; k < newCoords.length; k++) {

                    let v = newCoords[k];


                    if (this.originalX !== this.rootX) {
                        var ratioX = (v[0][0] - this.rootX) / (this.originalX - this.rootX);
                    }

                    else {
                        var ratioX = 0;
                    }


                    if (this.originalY !== this.rootY) {
                        var ratioY = (v[0][1] - this.rootY) / (this.originalY - this.rootY);
                    }

                    else {
                        var ratioY = 0;
                    }


                    v.push([ratioX, ratioY]);


                    let vertexOriginalX = v[0][0];
                    let vertexOriginalY = v[0][1];

                    v.push([vertexOriginalX, vertexOriginalY]);


                    let vertexCurrentX = v[0][0];
                    let vertexCurrentY = v[0][1];

                    v.push([vertexCurrentX, vertexCurrentY]);


                    let vertexDirectionX = floor(random(0, 2));
                    let vertexDirectionY = floor(random(0, 2));

                    v.push([vertexDirectionX, vertexDirectionY]);


                    let vertexSpeedX = random(0.3, 2.0) * ratioX;
                    let vertexSpeedY = random(0.3, 2.0) * ratioY;

                    v.push([vertexSpeedX, vertexSpeedY]);


                    let vertexRangeX = random(50, 200) * ratioX;
                    let vertexRangeY = random(50, 200) * ratioY;

                    v.push([vertexRangeX, vertexRangeY]);
                }


                this.allScribbles.push([
                    scribbleThickness,
                    r,
                    g,
                    b,
                    originalA,
                    newCoords
                ]);
            }
        }


        let newX = (x + this.rootX) / 2;
        let newY = (y + this.rootY) / 2;

        this.generateScribbles(newX, newY, cell);
    }


    drawScribbles(dragging) {

        for (let s of this.allScribbles) {

            let scribbleThickness = s[0];

            let r = s[1];
            let g = s[2];
            let b = s[3];

            let originalA = s[4];

            let lifeRatio = this.currentLife / this.maxLife;

            let fade = 1 - Math.pow(1 - lifeRatio, 3);

            let finalA = originalA * fade;

            strokeWeight(scribbleThickness);
            stroke(r, g, b, finalA);

            let coords = s[5];


            for (let k = 0; k < coords.length; k++) {

                let v = coords[k];

                let ratioX = v[1][0];
                let ratioY = v[1][1];


                if (dragging) {
                    v[3][0] = this.rootX + ratioX * (this.currentX - this.rootX);
                    v[3][1] = this.rootY + ratioY * (this.currentY - this.rootY);
                }
            }


            beginShape();

            curveVertex(coords[0][3][0], coords[0][3][1]);

            curveVertex(coords[0][3][0], coords[0][3][1]);
            curveVertex(coords[1][3][0], coords[1][3][1]);
            curveVertex(coords[2][3][0], coords[2][3][1]);
            curveVertex(coords[3][3][0], coords[3][3][1]);
            curveVertex(coords[0][3][0], coords[0][3][1]);

            curveVertex(coords[0][3][0], coords[0][3][1]);

            endShape();
        }
    }


    lockScribbles() {

        for (let s of this.allScribbles) {

            let coords = s[5];


            for (let k = 0; k < coords.length; k++) {

                let v = coords[k];

                let ratioX = v[1][0];
                let ratioY = v[1][1];

                let x = this.rootX + ratioX * (this.currentX - this.rootX);
                let y = this.rootY + ratioY * (this.currentY - this.rootY);

                v[2][0] = x;
                v[2][1] = y;

                v[3][0] = x;
                v[3][1] = y;
            }
        }
    }


    reverseAtLimit(v, axis, location, limit1, limit2) {

        if (location <= limit1) {

            if (axis === "x") {
                v[4][0] = 1;
            }

            else {
                v[4][1] = 1;
            }
        }


        else if (location >= limit2) {

            if (axis === "x") {
                v[4][0] = 0;
            }

            else {
                v[4][1] = 0;
            }
        }
    }


    move() {

        for (let s of this.allScribbles) {

            let coords = s[5];


            for (let k = 0; k < coords.length; k++) {

                let v = coords[k];

                let ratioX = v[1][0];
                let ratioY = v[1][1];

                let speedX = ceil(v[5][0]);
                let speedY = ceil(v[5][1]);

                let rangeX = v[6][0];
                let rangeY = v[6][1];


                this.reverseAtLimit(v, "x", v[3][0], v[2][0] - rangeX, v[2][0] + rangeX);
                this.reverseAtLimit(v, "y", v[3][1], v[2][1] - rangeY, v[2][1] + rangeY);


                let xMove = (ratioX + (sin(ratioY) + cos(ratioY))) / 2;


                // side = left
                if (v[4][0] === 0) {
                    v[3][0] -= xMove * speedX;
                }

                // side = right
                else {
                    v[3][0] += xMove * speedX;
                }


                let yMove = (ratioY + (sin(ratioX) + cos(ratioX))) / 2;


                // side = bottom
                if (v[4][1] === 0) {
                    v[3][1] -= yMove * speedY;
                }

                // side = top
                else {
                    v[3][1] += yMove * speedY;
                }
            }
        }
    }


    loseLife(dragging) {

        if (!dragging) {
            this.currentLife = max(0, this.currentLife - 1);
        }
    }
}