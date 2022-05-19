### useMover
##### Description

* useMover is a hook that works both in react and vanilla javascript
* It contains two functions; drag and resize


##### Installation

```
npm i "@mozeyinedu/mover"
```

#### drag()

##### Usage 

##### Usage in Vanilla Javascript

```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div id="div1" style="width: 100px; height: 70px; background: red">drag div 1</div>

        <div id="div2" style="width: 100px; height: 70px; background: red; top: 100px">drag div 2</div>

        <script src="https://unpkg.com/@mozeyinedu/mover@1.0.0/dist/index.js"></script>
        <!-- make sure you use the most current version -->

        <script>
            const div1 = document.getElementById('div1')
            const div2 = document.getElementById('div2')

            const { drag, resize } = useMover()

            drag(div1);

            drag(div2, '10px solid teal'); //the second parameter is border during drag
        </script>
    </body>
    </html>

```

##### Usage in React

```
    import React, {useRef, useEffect} = "react";
    import {useMover} = "@mozeyinedu/mover";

    function App(){

        const el1 = useRef(null);
        const el2 = useRef(null);
        const { drag, resize } useMover();

        useEffect(()=>{
            drag(el1);

            drag(el2, "2px dotted gold");

        }, [])
        
        return (
            <div ref={el1} style={{
                width: 100px;
                height: 70px;
                background: red}}
            >
                Drag Me
            </div>
            <div ref={el2} style={{
                width: 100px;
                height: 70px;
                top: 100px;
                background: teal}}
            >
                Drag Me
            </div>
        )
    }

    export default App;
    
```

#### resize()

##### Usage 

##### Usage in Vanilla Javascript

......
......

##### Usage in Vanilla React