const Themes = {
    RAINBOW: "🦄",
    BLACK_WHITE: "🖤",
    GRAY: "⬜",
    DIABOLO: "👹",
    PANTONE: "🎨",
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

let pantone = ["ccc188", "ceb487", "d0b173", "f2ad00", "e4a700", "c79600", "d99300", "e69400", "af8552", "d8ba2e", "e5dfcc", "dfcea1", "e6d9bd", "ecea41", "f6b256", "fdda38", "a6937b", "a09465", "f2c000", "f2bf00", "b89650", "a4861a", "ffa600", "e2ac00", "f7a11f", "eba557", "eba557", "d97604", "bb4926", "c13524", "f97a31", "e8540d", "f46f29", "db5316", "d55d23", "ea7625", "d6654e", "a02725", "a0001c", "991424", "870a24", "6c1b2a", "581e29", "402226", "6d312b", "791f24", "c68873", "992a28", "cf7278", "e3a0ac", "ab392d", "cc515e", "ca3f51", "bf111b", "d36b56", "b01d42", "a7323e", "865d86", "8f3f51", "ca5b91", "69193b", "7e63a1", "d0b173", "853d7d", "9d8493", "2f4a71", "0e4666", "162e7b", "193058", "1a1d2a", "004389", "38618c", "2d3944", "245878", "00427f", "1a2740", "2781bb", "202e53", "667b9a", "0071b5", "004c91", "138992", "005688", "00747d", "00747d", "28275a", "486591", "6391b0", "327663", "266d3b", "276230", "4e553d", "004547", "0e4438", "3b3d33", "2b3626", "302f22", "213529", "426e38", "68825f", "293a37", "76785b", "443f31", "383b34", "00664f", "4d8542", "4b9b3e", "b2d8b4", "394937", "87a180", "3c372a", "008455", "56723d", "005c54", "77bbbd", "2e554b", "006f43", "00855a", "3f8884", "75adb1", "798790", "8c969f", "827d67", "79796c", "999a9f", "6d7270", "766a5d", "756444", "585e55", "565957", "525a60", "575e62", "585346", "4c5057", "363d43", "2e3236", "d0b173", "7f8279", "484b52", "354044", "919089", "5b686f", "b5b5a7", "7a8376", "928d75", "c4caca", "949294", "7e8082", "b0b3af", "6d6b64", "9aa0a7", "929899", "505455", "8b7045", "9c6935", "774c3b", "815333", "904e3b", "6b442a", "735230", "5b3927", "64312a", "49372a", "5a2e2a", "4f3128", "45302b", "3b3332", "1e1a1a", "a45c32", "7b5741", "765d4d", "4f3b2b"];

function hexToRgb(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return `rgb(${r},${g},${b})`;
}

function findColor(depth) {
    switch (theme) {
        case Themes.BLACK_WHITE:
            return "rgb(0,0,0)";
        case Themes.GRAY:
            var gray = Math.abs(Math.cos(.1 * depth)) * 230;
            return `rgb(${gray},${gray},${gray})`;
        case Themes.DIABOLO:
            return `rgb(${Math.sin(.1 * depth) * 127 + 128},${0},${0})`;
        case Themes.PANTONE:
            var index = depth - 1 % pantone.length;
            return hexToRgb(pantone[index]);
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