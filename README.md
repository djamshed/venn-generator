# venn-generator
An AWS lambda service that generates Venn diagram on the fly using [Rough.js](https://roughjs.com/).



## Demo

https://ixx9x10k8k.execute-api.us-east-1.amazonaws.com/venn/vis.svg?labels=intersection,hello,world,bla


![venn demo](docs/demo0.png "demo venn diagram")



Find the `labels` in URL (eg: `labels=intersection,hello,world,bla`), try changing it to something more clever. Some examples:

[?labels=success,hard work,luck](https://ixx9x10k8k.execute-api.us-east-1.amazonaws.com/venn/vis.svg?labels=success,hard+work,luck)

![venn demo](docs/demo6.png "success venn diagram")

<br/><br/>

[?labels=squash,vegetables,sports,ways to die](https://ixx9x10k8k.execute-api.us-east-1.amazonaws.com/venn/vis.svg?labels=squash,vegetables,sports,ways+to+die)

![venn demo](docs/demo1.png "squash venn diagram")

<br/><br/>

[?labels=Santa,eats your food,breaks into houses,leaves stuff behind](https://ixx9x10k8k.execute-api.us-east-1.amazonaws.com/venn/vis.svg?labels=Santa,eats+your+food,breaks+into+houses,leaves+stuff+behind)

![venn demo](docs/demo2.png "santa venn diagram")

<br/><br/>

[?labels=panda,black bear, polar bear](https://ixx9x10k8k.execute-api.us-east-1.amazonaws.com/venn/vis.svg?labels=panda,black+bear,polar+bear)

![venn demo](docs/demo3.png "panda venn diagram")

<br/><br/>


Oh, did I mention emojies are allowed:

[?labels=😎,🙂,🕶️](https://ixx9x10k8k.execute-api.us-east-1.amazonaws.com/venn/vis.svg?labels=😎,🙂,🕶️)

![venn demo](docs/demo4.png "sunglasses venn diagram")

<br/><br/>

[?labels=😂,😄,😭](https://ixx9x10k8k.execute-api.us-east-1.amazonaws.com/venn/vis.svg?labels=😂,😄,😭)

![venn demo](docs/demo5.png "smile venn diagram")



## What is this?

This is a venn diagram generator that uses custom labels provided by the user. Generated Venn diagram is an SVG string (browser can directly render it) or you can embed it to your website using an `<img src="...">`.

eg: `<img src="https://ixx9x10k8k.execute-api.us-east-1.amazonaws.com/venn/vis.svg?labels=success,hard work,luck">`


## How it works?

Request for a venn service hits AWS Gateway API, which triggers AWS Lambda function, which in turn, generates SVG string. [Rough.js](https://roughjs.com/) is used to generate hand-drawn diagram. [Indie-Flower](https://fonts.google.com/specimen/Indie+Flower) font was used to give a hand-written style. This font was embedded as base64 string in order to enable Venn diagram to be embedded as an image source.
