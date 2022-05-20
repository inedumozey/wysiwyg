
const wysiwyg=({selector, textFormat, clear=true}, cb)=>{
    
    const classObject = {
        wrapper: selector.id,
        header: 'mo-editor-header',
        editor: 'mo-editor'
    };
    
    const elements = [
        {
            innerHTML: [
                {type:'button', name:"plain", cmd:'bold', title: 'Bold', text:'<i class="fa fa-bold"></i>'},
                {type:'button', name:"plain", cmd:'italic', title: 'Italic', text:'<i class="fa fa-italic"></i>'},
                {type:'button', name:"plain", cmd:'superscript', title: 'Superscript', text:'<i class="fa fa-superscript"></i>'},
                {type:'button', name:"plain", cmd:'subscript', title: 'subscript', text:'<i class="fa fa-subscript"></i>'},
                {type:'button', name:"plain", cmd:'underline', title: 'Underline', text:'<i class="fa fa-underline"></i>'},
                {type:'button', name:"plain", cmd:'strikethrough', title: 'Strike through', text:'<i class="fa fa-strikethrough"></i>'},
            ]
        },
        {
            innerHTML: [
                {type:'select', name:"select", cmd:'fontSize', title:'Font Size', text:[1,2,3,4,5,6,7]},
                {type:'select', name:"select", cmd:'fontName', title:'Font Name', text:['calibri', 'agency fb', 'algerian', 'arial', 'arial black', 'arial narrow','arial rounded mt bold','arial unicode ms','Baskerville Old Face','bell mt','chiller','castellar','curlz mt','symbol','forte','cursive','old english text mt','Matura MT Script Capitals','Parchment', 'Times New Roman', 'sans', 'sans-serif', 'Segoe UI']},
                {type:'select', name:"select", cmd:'formatBlock', title:'Header', text:['H1', 'H2', 'H3', 'H4', 'H5', 'H6']},
            ]
        },
        {
            innerHTML: [
                {type:'label', name:'text-color', cmd:'foreColor', title:'Text Color', text:'abc'},
                {type:'label', name:'text-fill', cmd:'hiliteColor', title:'Text Fill', text:'Text Fill'},
                {type:'button', name:'link', cmd:'createLink', title:'Link', text:'<i class="fa fa-link"></i>'},
                {type:'button', name:"plain", cmd:'unlink', title: 'Bold', text:'<i class="fa fa-unlink"></i>'},
                {type:'input', name:"background", cmd:'background', title: 'Background Color', text:'Background'},
            ]
        },
        {
            innerHTML: [
                {type:'button', name:"plain", cmd:'copy', title: 'Copy', text:'<i class="fa fa-copy"></i>'},
                {type:'button', name:"plain", cmd:'cut', title: 'Cut', text:'<i class="fa fa-cut"></i>'},
                {type:'button', name:"plain", cmd:'Paste', title: 'Paste', text:'<i class="fa fa-paste"></i>'},
                {type:'button', name:"plain", cmd:'undo', title: 'Undo', text:'<i class="fa fa-undo"></i>'},
                {type:'button', name:"plain", cmd:'redo', title: 'Redo', text:'<i class="fa fa-repeat"></i>'},
            ]
        },
        {
            innerHTML: [
                {type:'label', name:'input-image', cmd:'insertImage', title:'Insert Image', text:'<i class="fa fa-image"></i>'},
                {type:'button', name:"ic", title: 'Image Configuration', text:'IC'},

            ]
        },
        {
            innerHTML: [
                {type:'button', name:"plain", cmd:'justifyLeft', title: 'Justify Left', text:'<i class="fa fa-align-left"></i>'},
                {type:'button', name:"plain", cmd:'justifyCenter', title: 'Justify Center', text:'<i class="fa fa-align-center"></i>'},
                {type:'button', name:"plain", cmd:'justifyRight', title: 'Justify Right', text:'<i class="fa fa-align-right"></i>'},
                {type:'button', name:"plain", cmd:'justifyFull', title: 'Justify', text:'<i class="fa fa-align-justify"></i>'},
            ]
        },
        {
            innerHTML: [
                {type:'button', name:"plain", cmd:'indent', title: 'Indent', text:'<i class="fa fa-indent"></i>'},
                {type:'button', name:"plain", cmd:'outdent', title: 'Outdent', text:'<i class="fa fa-dedent"></i>'},
                {type:'button', name:"plain", cmd:'insertUnorderedList', title: 'Unordered List', text:'<i class="fa fa-list-ul"></i>'},
                {type:'button', name:"plain", cmd:'insertOrderedList', title: 'Ordered List', text:'<i class="fa fa-list-ol"></i>'},
            ]
        },
        {
            innerHTML: [
                {type:'button', name:"plain", cmd:'insertParagraph', title: 'Insert Paragraph', text:'<i class="fa fa-paragraph"></i>'},
                {type:'button', name:"plain", cmd:'insertHorizontalRule', title: 'Insert Horizontal Rule', text:'HR'}
            ]
        },
        {
            innerHTML: [
                {type:'button', name:"plain", cmd:'print', title: 'Print', text:'<i class="fa fa-print"></i>'},
                {type:'button', name:"toogleCode", cmd:'view_code', title: 'View Code', text:'<i class="fa fa-code"></i>'},
            ]
        },
        {
            innerHTML: [
                {type:'button', name:"plain", cmd:'submit', title: 'submit', text:'Submit'},
            ]
        },
    ];

    //image configuration
    function ConfigureImage(key, innerHTML, wrapper){
        if(key.getAttribute('name') === 'ic'){
            key.innerHTML = innerHTML.text
            key.setAttribute('data-imgStyle', 'data-imgStyle')
            key.style.margin = '1px'
            key.style.padding = '2px'
            //create model to congigure image
            const container = document.createElement('div');
            container.setAttribute('class', 'container');
            const imgStyleWrapper = document.createElement('div');

            wrapper.prepend(container)
            container.append(imgStyleWrapper)
            container.style.cssText = `
                position:absolute;
                visibility: hidden
            `
            imgStyleWrapper.style.cssText = `
                position:absolute;
                opacity: 0;
                transition: .2s;
            `
            function showContainer(){
                container.style.cssText = `
                    position:absolute;
                    background: rgba(0,0,0,.6);
                    top:0;
                    left:0;
                    right:0;
                    bottom:0;
                    visibility: visible
                 `
                imgStyleWrapper.style.cssText = `
                    width:200px;
                    position:absolute;
                    background: #fff;
                    top:50%;
                    left:50%;
                    transform: translate(-50%, -50%);
                    padding:10px;
                    box-shadow: 2px 2px 5px #ccc, -2px -2px 5px #ccc;
                    opacity: 1;
                `
            }
            function hideContainer(e){
                container.style.cssText = `
                    position:absolute;
                    background: rgba(255,255,255,.3);
                    top:0;
                    left:0;
                    right:0;
                    bottom:0;
                    visibility: hidden
                `
                imgStyleWrapper.style.cssText = `
                    width:200px;
                    position:absolute;
                    background: #fff;
                    top:50%;
                    left:50%;
                    transform: translate(-50%, -50%);
                    padding:10px;
                    box-shadow: 2px 2px 5px #ccc, -2px -2px 5px #ccc;
                    opacity: 0;
                    transition: .2s;
                `
            }
            key.onclick=()=>{
                showContainer()
            }
            container.onclick=(e)=>{
                if(e.target.classList[0] === 'container'){
                    hideContainer()
                }
            }
            //craete form and append it to the imgStyleWrapper
            function createForm(nameText, innerText, type, ini){
                const formGoup = document.createElement('div')
                const label = document.createElement('lable')
                    label.setAttribute('for', nameText)
                    label.innerHTML = innerText + ':'
                const input = document.createElement('input')
                    input.setAttribute('id', nameText)
                    input.setAttribute('type', type)
                    input.setAttribute('name', nameText)
                    input.setAttribute('min', '0')
                    input.setAttribute('value', ini)
                formGoup.prepend(label)
                formGoup.append(input)

                //style
                formGoup.style.cssText = `
                    margin-bottom:10px;
                    display:flex;
                    justify-content:space-between;
                    align-items: center;
                    font-size: .8rem;
                `
                label.style.cssText = `
                    padding-right:5px
                `
                input.style.cssText = `
                    display:block;
                    width:100%;
                    padding:5px;
                `
                return formGoup
            }

            //function to handle select
            function selectDiv(nameText, innerText, selectArr){
                const formGoup = document.createElement('div')
                const select = document.createElement('select')
                select.setAttribute('name', nameText)
                select.setAttribute('id', nameText)
                const optionValues = selectArr;
                optionValues.forEach(optionValue=>{
                    select.innerHTML += `<option value=${optionValue}>${optionValue}</option>`
                })

                const label = document.createElement('label')
                label.setAttribute('id', nameText)
                label.innerHTML = innerText;

                formGoup.prepend(label)
                formGoup.append(select)
                //style
                formGoup.style.cssText = `
                    margin-bottom:10px;
                    display:flex;
                    justify-content:space-between;
                    align-items: center;
                    font-size: .8rem;
                `
                label.style.cssText = `
                    padding-right:5px
                `
                select.style.cssText = `
                    display:block;
                    width:100%;
                    padding:5px;
                `
                return formGoup
            }

            //form button
            const formBtn = document.createElement('button') 
            formBtn.innerHTML = 'Save';
            formBtn.style.cssText = `
                width:100%;
                padding:5px;
                cursor:pointer
            `
            //form header text
            const headerText = document.createElement('div')
            headerText.innerHTML = `<h3>Image Configuration</h3>`
            headerText.style.cssText = `
                color:#ddd;
                text-align: center;
                font-size:.8rem;
                padding:4px;
                border-bottom: 1px solid #ccc;
                margin-bottom:10px;
            `
            //append
            const form = document.createElement('form')
            form.prepend(headerText)
            form.append(createForm('width', 'Width', 'number', 400))
            form.append(createForm('height', 'Height', 'number', 400))
            form.append(createForm('border_width', 'Border Width', 'number', 0))
            form.append(createForm('border_color', 'Border Color', 'color'))
            form.append(selectDiv('border_style', 'Border Style:', ['solid', 'groove', 'dashed', 'double', 'inset', 'outset', 'hidden', 'unset', 'ridge', 'dotted']))
            form.append(createForm('border_radius', 'Border Radius', 'number', 0))
            form.append(selectDiv('object_fit', 'Object Fit:', ['cover', 'contain', 'fill', 'none']))
            form.append(formBtn)
            imgStyleWrapper.append(form)

            const imgS = {}
            form.onsubmit=(e)=>{
                e.preventDefault()
                imgS.imgWidth = e.target.width.value
                imgS.imgHeight = e.target.height.value
                imgS.imgBorderWidth = e.target.border_width.value
                imgS.imgBorderColor = e.target.border_color.value
                imgS.imgBorderStyle = e.target.border_style.value
                imgS.imgBorderRadius = e.target.border_radius.value
                imgS.imgObjectFit = e.target.object_fit.value

                localStorage.setItem('imgs', JSON.stringify(imgS));
                hideContainer()
            }
        }
    }

    //hide the textarea
    selector.style.display = 'none';

    //craete a style in the head and add *{ box-sizing: border-box } to set the box-sizing of theb whole document
    const style = document.createElement('style')
    document.head.append(style)
    style.innerHTML = `
        *{
            box-sizing: border-box;
        }
    `
    
    //create a link in the head and insert font awesome url to the whole document
    const link = document.createElement('link')
    document.head.prepend(link)
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css')
 
    //create wrapper, give it the class wrapper and insert it above the textarea
        const wrapper = document.createElement('div')
        wrapper.setAttribute('id', classObject.wrapper)
        selector.parentNode.insertBefore(wrapper, selector)
        
        //default styles which cannot be change by the developers
        wrapper.style.position = 'relative'
        wrapper.getRootNode().body.style.cssText = `
            box-sizing: border-box;
        `
        //default styles which can be change by the developers

        const wrapperStyle = getComputedStyle(wrapper)
        if(wrapperStyle.border === '0px none rgb(0, 0, 0)'){
            wrapper.style.border = '1px solid #aaa'
        }
        if(wrapperStyle.padding === '0px'){
            wrapper.style.padding = '10px'
        }
        if(wrapperStyle.height === '0px'){
            wrapper.style.height = '300px'
        }
        //create editor canvas as the second child of wrapper
        const iframe = document.createElement('iframe')
        iframe.setAttribute('name', 'editor')
        wrapper.append(iframe)

        editor.document.getElementsByTagName('body')[0].style.wordWrap = 'break-word'
        editor.document.designMode = 'on';
        editor.document.getElementsByTagName('body')[0].style.position = "relative"
        
        //create header as the first child of wrapper, give it the class header
        const header = document.createElement('div')
        header.setAttribute('class', classObject.header)
        wrapper.prepend(header)

        //default styles which cannot be changed by the developers
        header.style.cssText = `
            display: flex;			
            justify-content: flex-start;
            align-items: center
            width:100%;
            flex-wrap: wrap;
            min-height: 30px;
            padding:5px;
        `
        //default styles which can be changed by the developers
        const headerStyle = getComputedStyle(header)
        if(headerStyle.border === '0px none rgb(0, 0, 0)'){
            header.style.border = '1px solid #ddd'
        }

        //create 2 divs as children of header and implement 
        for(let i=0; i<elements.length; i++){
            let wrapperBtn = document.createElement('div');
            header.append(wrapperBtn)
            wrapperBtn.style.cssText = `
                border:1px solid #ccc;
                padding:2px;
                min-height: 30px;
                display: flex;
                margin:2px 4px;			
                flex-wrap: wrap;
                justify-content: flex-start;
                align-items: center;
                background: #fff;
                box-shadow: 1px 1px 2px #888
            `
            for(let j=0; j<elements[i].innerHTML.length; j++){
                let innerHTML = elements[i].innerHTML[j]

                //create key
                const key = document.createElement(innerHTML.type);
                wrapperBtn.append(key)
                key.setAttribute('title', innerHTML.title)
                key.setAttribute('type', innerHTML.type)
                key.setAttribute('cmd', innerHTML.cmd)
                key.setAttribute('name', innerHTML.name)

                //run configure image function
                ConfigureImage(key, innerHTML, wrapper)
                
                // check if name is plain
                if(key.getAttribute('name') === 'plain'){
                    key.innerHTML = innerHTML.text
                    key.style.margin = '1px'
                    key.style.padding = '2px'

                    key.onclick =(e)=>{
                        const cmd = e.currentTarget.getAttribute('cmd')
                        editor.document.execCommand(cmd, false, null);
                    }
                }
                // check if name is select
                if(key.getAttribute('name') === 'select'){
                    key.style.margin = '1px'
                    key.style.padding = '2px'

                    for(optionValues of innerHTML.text){
                       //create option tag
                        const option = document.createElement('option');
                        key.appendChild(option)
                        option.value = optionValues;
                        option.innerHTML = optionValues;
                    }
                    key.onchange =(e)=>{
                        const cmd = e.currentTarget.getAttribute('cmd')
                        const value = e.currentTarget.value;
                        editor.document.execCommand(cmd, false, value)
                    }
                }
                // check if name is insert
                if(key.getAttribute('name') === 'insert'){
                   key.innerHTML = innerHTML.text;
                   key.style.margin = '1px'
                   key.style.padding = '2px'
                   
                }
                // check if name is input-image
                if(key.getAttribute('name') === 'input-image'){
                    key.innerHTML = innerHTML.text; 
                    key.setAttribute('for', 'image-file');
                    //style the label tag
                    key.style.cssText= `
                        cursor: default;
                        padding: 2px;
                        border: 1px outset;
                        margin:1px
                    `

                    //create input and insert just below the label tag
                    const inputTag = document.createElement('input')
                    key.parentNode.insertBefore(inputTag, key)
                    inputTag.setAttribute('type', 'file');
                    inputTag.setAttribute('id', 'image-file');
                    inputTag.setAttribute('accept', '*');
                    inputTag.setAttribute('multiple', 'multiple');
                    inputTag.setAttribute('cmd', key.getAttribute('cmd'));

                    //hide the file input
                    inputTag.style.display = 'none';

                    // implement onchange event to get the files 
                    inputTag.onchange =(e)=>{
                        imgArray = e.target.files
                        for(let i=0; i<imgArray.length; i++){
                            const value = URL.createObjectURL(imgArray[i]);
                            const cmd = e.target.getAttribute('cmd');
                            editor.document.execCommand(cmd, false, value)[i]
                            
                            // style the image and give the user the freedom to style also
                            const imgs = editor.document.getElementsByTagName('img');

                            for(let i=0; i<imgs.length; i++){
                                const img = imgs[i]
                            
                                //img styling
                                const localImgS = localStorage.getItem('imgs')
                                if(localImgS !== null){
                                    const imgS = JSON.parse(localImgS)

                                    img.style.width = `${imgS.imgWidth}px`;
                                    img.style.height = `${imgS.imgHeight}px`;
                                    img.style.border = `${imgS.imgBorderWidth}px ${imgS.imgBorderStyle} ${imgS.imgBorderColor}`;
                                    img.style.borderRadius = `${imgS.imgBorderRadius}%`;
                                    img.style.objectFit = imgS.imgObjectFit;
                                    img.style.margin = '10px';
                                }else{
                                    img.style.width = `350px`;
                                    img.style.height = `400x`;
                                    img.style.border = `0`;
                                    img.style.borderRadius = '0px';
                                    img.style.objectFit = 
                                    'contain';
                                    img.style.margin = '5px';
                                }                               
                            }    
                        }                  
                    }

                

                 }
                 // check if name is text-color
                if(key.getAttribute('name') === 'text-color'){
                    key.innerHTML = innerHTML.text; 
                    key.setAttribute('for', 'text-color');
                    //style the input tag
                    key.style.cssText= `
                        cursor: default;
                        padding: 2px;
                        margin:1px;
                        border: 1px outset;
                    `

                    //create input and insert just below the label tag
                    const inputTag = document.createElement('input')
                    key.parentNode.insertBefore(inputTag, key)
                    inputTag.setAttribute('type', 'color');
                    inputTag.setAttribute('id', 'text-color');
                    inputTag.setAttribute('cmd', key.getAttribute('cmd'));

                    //hide the file input
                    inputTag.style.display = 'none';

                    inputTag.onchange =(e)=>{
                        const cmd = key.getAttribute('cmd')
                        const value = e.currentTarget.value;
                        key.style.color = value;
                        editor.document.execCommand(cmd, false, value)

                    }
                 }
                  // check if name is text-fill
                if(key.getAttribute('name') === 'text-fill'){
                    key.innerHTML = innerHTML.text; 
                    key.setAttribute('for', 'text-fill');
                    //style the input tag
                    key.style.cssText= `
                        cursor: default;
                        padding: 2px;
                        margin:1px;
                        border: 1px outset;
                    `

                    //create input and insert just below the label tag
                    const inputTag = document.createElement('input')
                    key.parentNode.insertBefore(inputTag, key)
                    inputTag.setAttribute('type', 'color');
                    inputTag.setAttribute('id', 'text-fill');
                    inputTag.setAttribute('cmd', key.getAttribute('cmd'));

                    //hide the file input
                    inputTag.style.display = 'none';

                    inputTag.oninput =(e)=>{
                        const cmd = key.getAttribute('cmd')
                        const value = e.currentTarget.value;
                        key.style.color = value;
                        editor.document.execCommand(cmd, false, value)
                    }
                 }
                  // check if name is toogleCode
                if(key.getAttribute('name') === 'toogleCode'){
                    key.innerHTML = innerHTML.text
                    key.style.margin = '1px'
                    key.style.padding = '2px'

                    let codeIsShown = false                    
                    key.onclick =(e)=>{
                        codeIsShown = !codeIsShown;
                        codeIsShown ? (
                            window.frames['editor'].document.body.textContent = window.frames['editor'].document.body.innerHTML 
                        ):(
                            window.frames['editor'].document.body.innerHTML = window.frames['editor'].document.body.textContent
                        )
                    }
                }
                // check if name is link
                if(key.getAttribute('name') === 'link'){
                    key.innerHTML = innerHTML.text
                    key.style.margin = '1px'
                    key.style.padding = '2px';

                    key.onclick =(e)=>{
                        const cmd = e.currentTarget.getAttribute('cmd')
                        const value = prompt('Enter the link URL ', 'https://')
                        editor.document.execCommand(cmd, false, value);
                    }
                }
                   // check if name is background
                   if(key.getAttribute('name') === 'background'){
                       key.setAttribute('type', 'color');

                       key.oninput=(e)=>{
                           const value = e.target.value;
                           localStorage.setItem('background', value)
                           setBackground()
                       }
                       function setBackground(){
                            const localBackground = localStorage.getItem('background')
                            if(localBackground !==null ){
                                window.frames['editor'].document.body.style.background = localBackground
                                key.value = localBackground
                            }
                       }
                       setBackground()
                    }

                //transfer all text from the iframe to the textarea 
                editor.oninput =()=>{
                    const innerHTML = window.frames['editor'].document.body.innerHTML
                    const innerText = window.frames['editor'].document.body.textContent

                    if(textFormat === 'innerText' || textFormat === 'textContent'){
                        selector.innerText = innerText 
                    }else{
                        selector.innerText = innerHTML;
                    }
                }  
                
                // check if name is background
                if(key.getAttribute('title') === 'submit'){

                    key.onclick=(e)=>{
                        cb(null, selector.value);
                        if(clear){
                            selector.innerHTML = "";
                            selector.innerText = "";
                            window.frames['editor'].document.body.innerHTML = "";
                        }
                    }
                    
                 }
            }
        }
        
        //default styles editor which cannot be changed by the developers
        iframe.style.cssText = `
            height: calc(100% - ${headerStyle.height});
            width:100%;
			box-sizing: border-box;
			margin:auto;
			display: block;
        `

        //default styles editor which can be changed by the developers
        const iframeStyle = getComputedStyle(iframe)
        if(iframeStyle.border === '2px inset rgb(0, 0, 0)'){
            iframe.style.border = '1px solid #eee'
        }
}
