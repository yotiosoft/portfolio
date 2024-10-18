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
function init_squash(canvas) {
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    const ctx = canvas.getContext('2d');

    // 背景色
    clear_background(ctx);

    return canvas, ctx;
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

addEventListener("DOMContentLoaded", function() {
    const canvas_parent = document.getElementById('squash_game');
    const canvas = document.createElement('canvas');
    canvas_parent.appendChild(canvas);

    // 初期化
    const ctx = init_squash(canvas);
    draw_ball(ctx, width / 2 - ball_size / 2, racket_y - ball_size);
    var racket_x = width / 2 - racket_width / 2;
    draw_racket(ctx, racket_x);

    // 玉の初期移動
    var ball_x = width / 2 - ball_size / 2;
    var ball_y = racket_y - ball_size;
    var dx = -10;
    var dy = -10;

    // ラケットの移動
    canvas.onmousemove = ev => {
        racket_x = ev.offsetX;
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
        }
    }, 1000 / 30);

    // ゲームオーバー
    // canvas の中央に表示
    var game_over_obj = document.createElement('div');
    game_over_obj.className = 'game_over_print';
    game_over_obj.innerHTML = 'Game Over';
    canvas_parent.appendChild(game_over_obj);
});
