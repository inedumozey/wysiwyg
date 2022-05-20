### wysiwyg

##### Description
Formate text

##### Installation
```
npm i #mozeyinedu/wysiwyg
```

##### Usage
* use only in vanilla.
* Can also be used in react
* wysiwyg() receives two arguments; An object with 3 key-value pair items and a callback
    ```
        const obtion = {
            selector: ',
            textFormat: ''
            clear: true
        }
    ```
* selector selects the textarea
* textFormat: value is a string (innerText, textContent or innerHTML). Default(if not specified) is innerHTML; in this case the formated text will be received just the way it is in the wysiwyg.
* clear: value is boolean (true or false). default is true; It tell the wysiwyg to either clear the textarea or not after submitted

* The callback function returns the wysiwyg data depending on the textFormat.

##### examples

```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        
        <style>
            #txt{
                width:95vw;
                max-width: 900px;
                height: 90vh;
                margin: auto;
            };
            #result{
                color: #000;
            }
        </style>
    </head>
    <body>
        
        <textarea id="txt"></textarea>
        <div id="result"></div>
        <script src="../src/wysiwyg.js" ></script>

        <script>
            const result = document.querySelector("#result");
            wysiwyg({
                selector: document.querySelector("#txt"),
            }, (err, data)=>{
                if(err){
                    console.log(err)
                }else{
                    result.innerHTML = data;
                }

            })

        </script>
    </body>
    </html>
```

```
    wysiwyg({
        selector: document.querySelector("#txt"),
        clear: false,
        textFormat: 'innerText'

    }, (err, data)=>{
        if(err){
            console.log(err)
        }else{
            result.innerHTML = data;
        }
    })
```