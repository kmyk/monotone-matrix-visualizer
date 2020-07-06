(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function generateMatrixByHillClimbing(h, w, range, evaluate) {
    const f = generateRandom(h, w, range);
    while (true) {
        const penalty = evaluate(f);
        if (penalty == 0) {
            break;
        }
        const y = Math.floor(Math.random() * h);
        const x = Math.floor(Math.random() * w);
        const preserved = f[y][x];
        f[y][x] = Math.floor(Math.random() * range);
        const delta = evaluate(f) - penalty;
        if (delta > 0 || Math.random() < 0.1 / (h * w)) {
            f[y][x] = preserved; // revert
        }
    }
    return f;
}
function estimateHowMuchNotMonge(f) {
    const h = f.length;
    const w = f[0].length;
    let penalty = 0;
    for (let y1 = 0; y1 < h; ++y1) {
        for (let y2 = y1 + 1; y2 < h; ++y2) {
            for (let x1 = 0; x1 < w; ++x1) {
                for (let x2 = x1 + 1; x2 < w; ++x2) {
                    const a = f[y1][x1];
                    const b = f[y1][x2];
                    const c = f[y2][x1];
                    const d = f[y2][x2];
                    const pred = (b + c >= a + d);
                    if (!pred) {
                        penalty += 1;
                    }
                }
            }
        }
    }
    return penalty;
}
function generateMonge(h, w, range) {
    return generateMatrixByHillClimbing(h, w, range, estimateHowMuchNotMonge);
}
function estimateHowMuchNotTotallyMonotone(f) {
    const h = f.length;
    const w = f[0].length;
    let penalty = 0;
    for (let y1 = 0; y1 < h; ++y1) {
        for (let y2 = y1 + 1; y2 < h; ++y2) {
            for (let x1 = 0; x1 < w; ++x1) {
                for (let x2 = x1 + 1; x2 < w; ++x2) {
                    const a = f[y1][x1];
                    const b = f[y1][x2];
                    const c = f[y2][x1];
                    const d = f[y2][x2];
                    const pred = (c < d ? a < b : c == d ? a <= b : true);
                    if (!pred) {
                        penalty += 1;
                    }
                }
            }
        }
    }
    return penalty;
}
function generateTotallyMonotone(h, w, range) {
    return generateMatrixByHillClimbing(h, w, range, estimateHowMuchNotTotallyMonotone);
}
function estimateHowMuchNotMonotone(f) {
    const h = f.length;
    const w = f[0].length;
    const argmin = [];
    for (let y = 0; y < h; ++y) {
        argmin.push([]);
        let min = Infinity;
        for (let x = 0; x < w; ++x) {
            if (f[y][x] < min) {
                min = f[y][x];
                argmin[y] = [];
            }
            if (f[y][x] == min) {
                argmin[y].push(x);
            }
        }
    }
    let penalty = 0;
    for (let y1 = 0; y1 < h; ++y1) {
        for (let y2 = y1 + 1; y2 < h; ++y2) {
            for (let x1 of argmin[y1]) {
                for (let x2 of argmin[y2]) {
                    if (x1 > x2) {
                        penalty += 1;
                    }
                }
            }
        }
    }
    return penalty;
}
function generateMonotone(h, w, range) {
    return generateMatrixByHillClimbing(h, w, range, estimateHowMuchNotMonotone);
}
function generateRandom(h, w, range) {
    const f = [];
    for (let y = 0; y < h; ++y) {
        f.push([]);
        for (let x = 0; x < w; ++x) {
            f[y].push(Math.floor(Math.random() * range));
        }
    }
    return f;
}
function rgbFromCMYK(c) {
    const k = c[3];
    return [
        Math.round(255 - Math.min(255, c[0] * (255 - k) / 255 + k)),
        Math.round(255 - Math.min(255, c[1] * (255 - k) / 255 + k)),
        Math.round(255 - Math.min(255, c[2] * (255 - k) / 255 + k)),
    ];
}
function cmykFromRGB(c) {
    const k = 255 - Math.max(c[0], c[1], c[2]);
    return [
        Math.round((255 - c[0] - k) / (255 - k)),
        Math.round((255 - c[1] - k) / (255 - k)),
        Math.round((255 - c[2] - k) / (255 - k)),
        k,
    ];
}
function getColorOfValue(value, range) {
    // generated at https://gka.github.io/palettes/#/100|d|00429d,96ffea,ffffe0|ffffe0,ff005e,93003a|1|1
    const palette = ['#00429d', '#0d469f', '#1649a0', '#1d4da2', '#2351a4', '#2854a6', '#2d58a7', '#315ca9', '#3660ab', '#3a64ad', '#3e67ae', '#426bb0', '#456fb2', '#4973b3', '#4d77b5', '#507bb7', '#547fb8', '#5783ba', '#5b87bb', '#5e8bbd', '#618fbf', '#6593c0', '#6896c2', '#6c9ac3', '#6f9ec5', '#73a2c6', '#77a6c8', '#7aabc9', '#7eafcb', '#82b3cc', '#85b7ce', '#89bbcf', '#8dbfd1', '#91c3d2', '#95c7d3', '#9acbd5', '#9ecfd6', '#a2d3d7', '#a7d7d8', '#acdbda', '#b1dfdb', '#b6e2dc', '#bbe6dd', '#c1eade', '#c7eedf', '#cdf1e0', '#d4f5e0', '#dcf8e1', '#e5fbe1', '#f0fee1', '#fffadc', '#fff5d8', '#ffefd4', '#ffead0', '#ffe5cc', '#ffe0c8', '#ffdac4', '#ffd5c0', '#ffd0bc', '#ffcab9', '#ffc5b5', '#ffbfb1', '#ffbaad', '#ffb4a9', '#ffaea5', '#ffa9a1', '#ffa39d', '#ff9d98', '#fe9794', '#fd9291', '#fb8c8d', '#fa878a', '#f88286', '#f67d83', '#f4777f', '#f2727c', '#ef6d79', '#ed6875', '#ea6272', '#e75d6f', '#e5586c', '#e25369', '#df4e66', '#db4863', '#d84360', '#d43e5d', '#d1395a', '#cd3457', '#c92f54', '#c52a52', '#c1254f', '#bc1f4c', '#b81a4a', '#b31547', '#ae1045', '#a90a43', '#a40640', '#9e023e', '#99013c', '#93003a'];
    if (palette.length != range) {
        throw 'please update palette';
    }
    return palette[value];
}
function visualizeMatrix(f, range, table) {
    const h = f.length;
    const w = f[0].length;
    const tbody = document.createElement('tbody');
    for (let y = 0; y < h; ++y) {
        const tr = document.createElement('tr');
        for (let x = 0; x < w; ++x) {
            const td = document.createElement('td');
            td.textContent = f[y][x].toString();
            td.style.backgroundColor = getColorOfValue(f[y][x], range);
            tr.insertBefore(td, null);
        }
        tbody.insertBefore(tr, null);
    }
    table.insertBefore(tbody, null);
}
window.addEventListener('DOMContentLoaded', () => {
    const h = 9;
    const w = 18;
    const range = 100;
    visualizeMatrix(generateRandom(h, w, range), range, document.getElementById('random'));
    visualizeMatrix(generateMonotone(h, w, range), range, document.getElementById('monotone'));
    visualizeMatrix(generateTotallyMonotone(h, w, range), range, document.getElementById('totally-monotone'));
    visualizeMatrix(generateMonge(h, w, range), range, document.getElementById('monge'));
});

},{}]},{},[1]);
