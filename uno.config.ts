import { defineConfig } from "unocss";

export default defineConfig({
  rules: [
    [/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
    [/^mr-([\.\d]+)$/, ([_, num]) => ({ "margin-right": `${num}px` })],

    [
      /^m-([\.\d]+)-([\.\d]+)$/,
      ([_, num1, num2]) => ({ margin: `${num1}px ${num2}px` }),
    ],

    [/^p-([\.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })],
    [
      /^p-([\.\d]+)-([\.\d]+)$/,
      ([_, num1, num2]) => ({ padding: `${num1}px ${num2}px` }),
    ],
    [
      "box",
      {
        "border-radius": "5px",
        "background-color": "white",
        "box-shadow": "0px 8px 25px 0px #0000000D",
      },
    ],
    [
      "df",
      {
        display: "flex",
        "align-items": "center",
      },
    ],
    [
      "jc-sb",
      {
        "justify-content": "space-between",
      },
    ],
  ],
});
