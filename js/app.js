const button = document.querySelector('button');


class Blitter {
    constructor(price,people,result){
        this.price = price;
        this.people = people;
        this.result = result
    }
    calculate(){
        const priceInp = document.querySelector('#price').value;
        const peopleInp = document.querySelector('#people').value;
        this.price = parseFloat(priceInp);
        this.people = parseInt(peopleInp);
        this.result = Math.round((this.price/this.people) * 100) / 100;
    }
    showResult(){
        const printPrice = document.querySelector('.result-price');
        printPrice.innerText = `${this.result} zł`

    }
}


let some = new Blitter();
button.addEventListener('click', ()=>{
    some.calculate();
    some.showResult();
})