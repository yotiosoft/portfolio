const width = 350;
const height = 350;
const ball_size = 10;
const racket_width = 50;
const racket_height = 10;
const racket_y = height - 50;

// 初期化
function clear_background(ctx) {
    ctx.fillStyle = 'silver';
    ctx.fillRect(0, 0, width, height);
}
function init_squash() {
    // キャンバスの作成
    const canvas_parent = document.getElementById('squash_game');
    const canvas = document.createElement('canvas');
    canvas.className = 'squash_canvas';
    canvas_parent.appendChild(canvas);

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    const ctx = canvas.getContext('2d');

    // 背景色
    clear_background(ctx);

    // 文字表示用（非表示）
    var print_obj = document.createElement('div');
    print_obj.className = 'over_canvas_print';
    canvas_parent.appendChild(print_obj);

    return [canvas, ctx, print_obj];
}

// 玉の描画
function draw_ball(ctx, x, y) {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(x, y, ball_size, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

// ラケットの描画
function draw_racket(ctx, x) {
    ctx.fillStyle = 'white';
    ctx.fillRect(x, racket_y, racket_width, racket_height);
}

// 玉の移動
function move_ball(x, y, dx, dy, racket_x, racket_y, point) {
    // 壁に当たったら跳ね返る
    if (x + dx - ball_size / 2 < 0 || x + dx + ball_size / 2 > width) {
        dx = -dx;
    }
    if (y + dy - ball_size / 2 < 0) {
        dy = -dy;
    }
    // 底辺に当たったらゲームオーバー
    var game_over = false;
    if (y + dy > height) {
        game_over = true;
    }
    // ラケットに当たったら...
    if (y + dy > racket_y && x + dx > racket_x && x + dx < racket_x + racket_width) {
        // 跳ね返る
        dy = -dy;
        // +10点
        point += 10;
    }
    // 移動
    x += dx;
    y += dy;
    return [x, y, dx, dy, game_over, point];
}

// 玉とラケットの描画
function update(ctx, ball_x, ball_y, racket_x) {
    clear_background(ctx);
    draw_ball(ctx, ball_x, ball_y);
    draw_racket(ctx, racket_x);
}

// 文字の表示
function print_text(print_obj, text) {
    print_obj.innerHTML = text;
    print_obj.style.display = 'inline';
}
function hide_text(print_obj) {
    print_obj.style.display = 'none';
}

// ゲーム
function ready(canvas, ctx, print_obj, start_immidiately) {
    draw_ball(ctx, width / 2 - ball_size / 2, racket_y - ball_size);
    var racket_x = width / 2 - racket_width / 2;
    draw_racket(ctx, racket_x);

    // 玉の初期移動
    var ball_x = width / 2 - ball_size / 2;
    var ball_y = racket_y - ball_size;
    var dx = -10;
    var dy = -10;

    // クリックでスタート
    if (start_immidiately) {
        hide_text(print_obj);
        clear_background(ctx);
        game(canvas, ctx, racket_x, ball_x, ball_y, dx, dy, print_obj);
    }
    else {
        print_text(print_obj, 'click to start');
        window.onclick = ev => {
            hide_text(print_obj);
            clear_background(ctx);
            window.onclick = null;
            game(canvas, ctx, racket_x, ball_x, ball_y, dx, dy, print_obj);
        }
    }
}

function game(canvas, ctx, racket_x, ball_x, ball_y, dx, dy, print_obj) {
    // ラケットの移動
    canvas.onmousemove = ev => {
        racket_x = ev.offsetX;
    }
    // （スマホ向け）タッチイベント
    canvas.ontouchmove = ev => {
        racket_x = ev.touches[0].clientX - canvas.getBoundingClientRect().left;
    }

    // 描画の更新
    var new_ball_x, new_ball_y, new_dx, new_dy;
    var game_over = false;
    var point = 0;
    var point_obj = document.getElementById('squash_point');
    let loop = setInterval(() => {
        // 玉の移動
        [new_ball_x, new_ball_y, new_dx, new_dy, game_over, point] = move_ball(ball_x, ball_y, dx, dy, racket_x, racket_y, point);
        ball_x = new_ball_x;
        ball_y = new_ball_y;
        dx = new_dx;
        dy = new_dy;

        // 描画の更新
        update(ctx, ball_x, ball_y, racket_x, point);

        // ポイントの表示
        point_obj.innerHTML = point;

        if (game_over) {
            // ループを止める
            clearInterval(loop);

            // ゲームオーバー
            print_text(print_obj, 'Game Over<br>click to restart');

            // 再スタート -> 再読み込み
            window.onclick = ev => {
                window.onclick = null;
                ready(canvas, ctx, print_obj, true);
            }
        }
    }, 1000 / 30);
}

addEventListener("DOMContentLoaded", function() {
    // 初期化
    var canvas, ctx;
    [canvas, ctx, print_obj] = init_squash();

    ready(canvas, ctx, print_obj, false);
});
