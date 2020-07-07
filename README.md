# Visualizer of monotone, totally monotone, and Monge

demo: <https://kmyk.github.io/monotone-matrix-visualizer/>

## how to build locally

``` console
$ npm install
$ npm run build
$ open build/index.html
```

## TODO

-   distinct でない場合の monotone の定義が正しいか確認する。現在は「monotone minima できる」かつ「totally monotone (ただし「任意の 2x2 部分行列が〜」という形で定義したもの) ならば monotone が成り立つ」を満たすように選んだ
-   表の生成が遅いかつたぶん偏ってるのを改善する。現在の実装は山登りしてる
