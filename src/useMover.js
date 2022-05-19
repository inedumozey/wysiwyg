
function useMover(){

    return {
        drag: (selector, border='1px solid #000')=>{

            let item = selector
            let prevBorder = getComputedStyle(item).border;
            item.style.position = 'absolute';
            item.addEventListener('mousedown', mousedown)
            
            function mousedown(e){
                window.addEventListener('mousemove', mousemove)
                window.addEventListener('mouseup', mouseup)

                let prevX = e.clientX;
                let prevY = e.clientY;
                item.style.cursor = `move`;
                
                function mousemove(e){
                    let newX = prevX - e.clientX
                    let newY = prevY - e.clientY
                    let rect = item.getBoundingClientRect()

                    item.classList.add('moborder')
                    if(item.classList.contains('moborder')){
                        item.style.border = border;
                    }
                    
                    item.style.left = `${rect.left - newX}px`;
                    item.style.top = `${rect.top - newY}px`;
                    item.style.cursor = `default`;

                    prevX = e.clientX
                    prevY = e.clientY

                }

                function mouseup(e){
                    window.removeEventListener('mousemove', mousemove)
                    window.removeEventListener('mouseup', mouseup)
                    item.classList.remove('moborder');
                    item.style.cursor = `move`;
                    
                    if(!item.classList.contains('moborder')){
                        item.style.border = prevBorder
                    }            
                }
            }
        },

        resize: (selector)=>{
            console.log('...........resize is in progress!...........')
            console.log(selector)
            console.log('...........resize is in progress!...........')
        }
    }

    
}

export default useMover;