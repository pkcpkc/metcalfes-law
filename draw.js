const PADDING = 5;
const DELAY = 200;
const MARKER = "rendered";
var pointCount = 2;

function equalCoordinates(a, b) {
    return a[0] == b[0] && a[1] == b[1];
}

function equalConnection(a, b) {
    return equalCoordinates(a[0], b[0]) && equalCoordinates(a[1], b[1]) ||
        equalCoordinates(a[0], b[1]) && equalCoordinates(a[1], b[0]);
}

function addCanvas() {
    let canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;
    document.getElementsByTagName("body")[0].insertBefore(
        canvas,
        document.getElementsByTagName("input")[0]);
    render();
}

function render() {
    Array.from(document.getElementsByTagName("canvas")).forEach(canvas => {
        if (canvas.classList.contains(MARKER)) {
            return;
        }
        canvas.classList.add(MARKER);
        canvas.addEventListener('click', addCanvas, false);
        canvas.width = 100;
        canvas.height = 100;

        let degreeStep = Math.PI * 2 / pointCount++;
        let radius = canvas.width / 2
        let context2d = canvas.getContext('2d');
        let xCenter = radius;
        let yCenter = radius;
        radius -= PADDING;

        // frame
        context2d.beginPath();
        context2d.arc(radius + 4, radius + 4, radius, 0, 2 * Math.PI);
        context2d.strokeStyle = '#E0E0E0';
        context2d.stroke();

        var degree = 0;
        let coordinates = [];
        while (degree < 2 * Math.PI) {
            let x = Math.floor(xCenter + Math.cos(degree) * radius);
            let y = Math.floor(yCenter + Math.sin(degree) * radius);
            coordinates.push([x, y]);
            context2d.beginPath();
            context2d.arc(x, y, 2, 0, 2 * Math.PI, false);
            context2d.fill();
            context2d.stroke();
            degree += degreeStep;
        }

        let connections = [];
        for (var i = 0; i < coordinates.length; i++) {
            for (var j = 0; j < coordinates.length; j++) {
                let startPoint = [coordinates[i][0], coordinates[i][1]];
                let endPoint = [coordinates[j][0], coordinates[j][1]];
                let nextConnection = [startPoint, endPoint];
                if (!equalCoordinates(startPoint, endPoint) && connections.filter(connection => {
                    return equalConnection(connection, nextConnection);
                }).length < 1) {
                    connections.push(nextConnection);
                }
            }
        }

        var count = 0;
        connections.forEach(connection => {
            setTimeout(function (context2d, x1, y1, x2, y2, count) {
                context2d.beginPath();
                context2d.moveTo(x1, y1);
                context2d.lineTo(x2, y2);
                context2d.strokeStyle = findColor(count);
                context2d.stroke();
            }, DELAY * count++, context2d, connection[0][0], connection[0][1], connection[1][0], connection[1][1], count++);
        });
    });
}

render();