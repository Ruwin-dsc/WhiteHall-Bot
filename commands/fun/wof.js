exports.help = {
  name: "wof",
  category: "funny",
  description: "Permet de jouer à la roue",
  utilisation: "wof",
  permission: "EVERYONE"
};

exports.run = async (client, message, args) => {
  try {
    const arrowUp = "⬆";
    const arrowDown = "⬇";

    const arrowRight = "➡";
    const arrowRightTop = "↗";
    const arrowRightBottom = "↘";

    const arrowLeft = "⬅";
    const arrowLeftTop = "↖";
    const arrowLeftBottom = "↙";

    var color1 = "🟥";
    var color2 = "🟦";
    var color3 = "🟩";
    var color4 = "🟨";

    const colors = [`${color1}`, `${color2}`, `${color3}`, `${color4}`];
    const endcolor =
      colors[Math.floor(Math.random() * colors.length)];

    message
      .reply({
        content: `
          🟨⬜🟥⬜🟦
          ⬜⬛⬛⬛⬜
          🟩⬛⬜⬛🟩
          ⬜⬛⬛⬛⬜
          🟦⬜🟥⬜🟨
        `,
      })
      .then(async (msg) => {
        setTimeout(
          () =>
            msg.edit(
              `🟨⬜🟥⬜🟦
              ⬜⬛${arrowUp}⬛⬜
              🟩⬛⬜⬛🟩
              ⬜⬛⬛⬛⬜
              🟦⬜🟥⬜🟨`
            ),
          1000
        );

        setTimeout(
          () =>
            msg.edit(
              `🟨⬜🟥⬜🟦
              ⬜⬛⬛${arrowRightTop}⬜
              🟩⬛⬜⬛🟩
              ⬜⬛⬛⬛⬜
              🟦⬜🟥⬜🟨`
            ),
          2000
        );

        setTimeout(
          () =>
            msg.edit(
              `🟨⬜🟥⬜🟦
              ⬜⬛⬛⬛⬜
              🟩⬛⬜${arrowRight}🟩
              ⬜⬛⬛⬛⬜
              🟦⬜🟥⬜🟨`
            ),
          3000
        );

        setTimeout(
          () =>
            msg.edit(
              `🟨⬜🟥⬜🟦
              ⬜⬛⬛⬛⬜
              🟩⬛⬜⬛🟩
              ⬜⬛⬛${arrowRightBottom}⬜
              🟦⬜🟥⬜🟨`
            ),
          4000
        );

        setTimeout(
          () =>
            msg.edit(
              `🟨⬜🟥⬜🟦
              ⬜⬛⬛⬛⬜
              🟩⬛⬜⬛🟩
              ⬜⬛${arrowDown}⬛⬜
              🟦⬜🟥⬜🟨`
            ),
          5000
        );

        setTimeout(
          () =>
            msg.edit(
              `🟨⬜🟥⬜🟦
              ⬜⬛⬛⬛⬜
              🟩⬛⬜⬛🟩
              ⬜${arrowLeftBottom}⬛⬛⬜
              🟦⬜🟥⬜🟨`
            ),
          6000
        );

        setTimeout(
          () =>
            msg.edit(
              `🟨⬜🟥⬜🟦
              ⬜⬛⬛⬛⬜
              🟩${arrowLeft}⬜⬛🟩
              ⬜⬛⬛⬛⬜
              🟦⬜🟥⬜🟨`
            ),
          7000
        );

        setTimeout(
          () =>
            msg.edit(
              `🟨⬜🟥⬜🟦
              ⬜${arrowLeftTop}⬛⬛⬜
              🟩⬛⬜⬛🟩
              ⬜⬛⬛⬛⬜
              🟦⬜🟥⬜🟨`
            ),
          8000
        );

        setTimeout(
          () => {
            if (endcolor == color1) {
              msg.edit(
                `🟨⬜🟥⬜🟦
                ⬜⬛${arrowUp}⬛⬜
                🟩⬛⬜⬛🟩
                ⬜⬛⬛⬛⬜
                🟦⬜🟥⬜🟨`
              );
            }

            if (endcolor == color2) {
              msg.edit(
                `🟨⬜🟥⬜🟦
                ⬜⬛${arrowUp}⬛⬜
                🟩⬛⬜⬛🟩
                ⬜⬛⬛⬛⬜
                🟦⬜🟥⬜🟨`
              );

              setTimeout(
                () =>
                  msg.edit(
                    `🟨⬜🟥⬜🟦
                    ⬜⬛⬛${arrowRightTop}⬜
                    🟩⬛⬜⬛🟩
                    ⬜⬛⬛⬛⬜
                    🟦⬜🟥⬜🟨`
                  ),
                10000
              );
            }

            if (endcolor == color3) {
              msg.edit(
                `🟨⬜🟥⬜🟦
                ⬜⬛${arrowUp}⬛⬜
                🟩⬛⬜⬛🟩
                ⬜⬛⬛⬛⬜
                🟦⬜🟥⬜🟨`
              );

              setTimeout(
                () =>
                  msg.edit(
                    `🟨⬜🟥⬜🟦
                    ⬜⬛⬛${arrowRightTop}⬜
                    🟩⬛⬜⬛🟩
                    ⬜⬛⬛⬛⬜
                    🟦⬜🟥⬜🟨`
                  ),
                10000
              );

              setTimeout(
                () =>
                  msg.edit(
                    `🟨⬜🟥⬜🟦
                    ⬜⬛⬛⬛⬜
                    🟩⬛⬜${arrowRight}🟩
                    ⬜⬛⬛⬛⬜
                    🟦⬜🟥⬜🟨`
                  ),
                11000
              );
            }

            if (endcolor == color4) {
              msg.edit(
                `🟨⬜🟥⬜🟦
                ⬜⬛${arrowUp}⬛⬜
                🟩⬛⬜⬛🟩
                ⬜⬛⬛⬛⬜
                🟦⬜🟥⬜🟨`
              );

              setTimeout(
                () =>
                  msg.edit(
                    `🟨⬜🟥⬜🟦
                    ⬜⬛⬛${arrowRightTop}⬜
                    🟩⬛⬜⬛🟩
                    ⬜⬛⬛⬛⬜
                    🟦⬜🟥⬜🟨`
                  ),
                10000
              );

              setTimeout(
                () =>
                  msg.edit(
                    `🟨⬜🟥⬜🟦
                    ⬜⬛⬛⬛⬜
                    🟩⬛⬜${arrowRight}🟩
                    ⬜⬛⬛⬛⬜
                    🟦⬜🟥⬜🟨`
                  ),
                11000
              );

              setTimeout(
                () =>
                  msg.edit(
                    `🟨⬜🟥⬜🟦
                    ⬜⬛⬛⬛⬜
                    🟩⬛⬜⬛🟩
                    ⬜⬛⬛${arrowRightBottom}⬜
                    🟦⬜🟥⬜🟨`
                  ),
                12000
              );
            }
          },
          8000
        );

        setTimeout(() => {
          message.reply(`La flèche s'est arrêtée sur la couleur ${endcolor}`);
        }, 14000);
      });
  } catch (err) {
    console.log(err);
  }
};
