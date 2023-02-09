const Themes = {
    RAINBOW: "🦄",
    BLACK_WHITE: "🖤",
    supports: function (theme) { return Object.values(Themes).includes(theme); }
};
Object.freeze(Themes);

var theme;

let url = location.href;
let indexQMark = url.indexOf("?");
if (indexQMark > 0) {
    let selectedTheme = decodeURI(url.substring(indexQMark + 1, url.length));
    if (Themes.supports(selectedTheme)) {
        theme = selectedTheme;
    }
}

function findColor(depth) {
    switch (theme) {
        case Themes.BLACK_WHITE:
            return "rgb(0,0,0)";
    }

    // Rainbow theme, math based on: https://krazydad.com/tutorials/makecolors.php
    const jump = 20;
    const frequency = .1;
    const width = 127;
    const center = 128;

    let r = 0;
    let g = 0;
    let b = 0;

    r = Math.sin(frequency * depth + 0) * width + center;
    g = Math.sin(frequency * depth + 2) * width + center;
    b = Math.sin(frequency * depth + 4) * width + center;

    return `rgb(${r}, ${g}, ${b})`;
}