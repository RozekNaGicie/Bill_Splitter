$(function () {
    const butt = document.querySelector('#saveRecip');
    butt.disabled = true;

    class ShowHistory {
        constructor(recips, indexToRemove, send) {
            this.recips = recips;
            this.indexToRemove = indexToRemove;
            this.send = send
        };

        build() {
            let price = $('.show-2').text();
            let people = $('.show-1').text();
            let result = $('.result-price').text();
            this.send = {
                Price: `${price}`,
                People: `${people}`,
                result: `${result}`
            };
        };

        postFunc() {
            const somal = $('.group');
            const butt = $('#saveRecip');
            $(butt).on('click', (e) => {
                e.preventDefault();
                this.build();
                let url = "http://localhost:3000"
                $.ajax({
                    method: "POST",
                    url: url + "/operations",
                    dataType: "json",
                    data: this.send
                }).done(function (resp) {
                    somal.text('Zapisano!');
                    setTimeout(() => {
                        somal.text('');
                    }, 2000)
                });
            });
        };
        showFunc() {
            const showingButt = document.querySelector('#showRecips');
            const showingEle = document.querySelectorAll('.hide');
            showingButt.addEventListener('click', () => {
                showingButt.disabled = true;
                this.getFromAjax();
                showingEle.forEach((e) => {
                    if (e.classList.contains('hide') == true) {
                        e.classList.remove('hide');
                    } else {
                        e.classList.add('hide');
                    };
                });
            });
        };
        createBills() {
            const recipe = document.querySelector('.savedRecipe');
            const newRecip = document.createElement('p');
            newRecip.classList.add('classCount');
            recipe.appendChild(newRecip);
        };
        getFromAjax() {
            let url = "http://localhost:3000"
            $.ajax({
                method: "GET",
                url: url + "/operations",
                dataType: "json"
            }).done((response) => {
                const resp = response;
                for (let i = 0; i < resp.length; i++) {
                    this.createBills();
                };
                this.recips = document.querySelectorAll('.classCount');

                for (let i = 0; i < this.recips.length; i++) {
                    const priceHist = document.createElement('span');
                    priceHist.classList.add('price');
                    priceHist.classList.add('styling');
                    this.recips[i].appendChild(priceHist);
                    const peopleHist = document.createElement('span');
                    peopleHist.classList.add('people');
                    peopleHist.classList.add('styling');
                    this.recips[i].appendChild(peopleHist);
                    const pricePerMan = document.createElement('span');
                    pricePerMan.classList.add('pricePerMan');
                    pricePerMan.classList.add('styling');
                    this.recips[i].appendChild(pricePerMan);
                    const index = document.createElement('span');
                    index.classList.add('pricePerMan');
                    index.classList.add('styling');
                    this.recips[i].appendChild(index);
                    for (let j = 0; j < resp.length; j++) {
                        if (i == j) {
                            priceHist.innerText = `Total Price ${resp[i].Price}`;
                            peopleHist.innerText = `Number of people ${resp[i].People}`;
                            pricePerMan.innerText = `Price per Man ${resp[i].result}`;
                            index.dataset.id = `${resp[i].id}`;
                        };
                    };

                };
                this.spyClick();
            });
        };

        spyClick() {
            for (let i = 0; i < this.recips.length; i++) {
                this.recips[i].addEventListener('click', () => {
                    this.recips[i].classList.add('remove');
                    if (this.recips[i].classList.contains = 'remove') {
                        this.indexToRemove = this.recips[i].lastChild.getAttribute('data-id');
                    };
                });
            };
        };
        removeButt() {
            const buttRemove = $('#removeRecips');
            $(buttRemove).on('click', (e) => {
                let url = "http://localhost:3000"
                e.preventDefault();
                $.ajax({
                    method: "DELETE",
                    url: url + `/operations/${this.indexToRemove}`,
                    dataType: "json"
                }).done((resp) => {
                    document.location.reload(true);
                });
            });
        };
    };

    class Blitter extends ShowHistory {
        constructor(price, people, result) {
            super();
            this.price = price;
            this.people = people;
            this.result = result;
        };
        calculate() {
            const priceInp = document.querySelector('#price').value;
            const peopleInp = document.querySelector('#people').value;
            this.price = parseFloat(priceInp);
            this.people = parseInt(peopleInp);
            this.result = Math.round((this.price / this.people) * 100) / 100;
        };
        showResult() {
            const printPrice = document.querySelector('.result-price');
            const printPeople = document.querySelector('.show-1');
            const printAllPrice = document.querySelector('.show-2');
            printPrice.innerText = `${this.result} $`
            printPeople.innerText = `${this.people}`
            printAllPrice.innerText = `${this.price} $`
        };
    };

    const button = document.querySelector('button');

    const blitter = new Blitter();
    button.addEventListener('click', () => {
        blitter.calculate();
        blitter.showResult();
        butt.disabled = false;
    });
    const start = new ShowHistory();
    start.showFunc();
    start.removeButt();
    start.postFunc();

});