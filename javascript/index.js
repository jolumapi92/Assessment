let countries = [];
let capitals = [];
let cleanInfo = {}

//Arrow function using Async and Await to fetch the data
const gettingInfo = async (url) => {
    let list = await fetch(url);
    let parsingInfo = await list.json()
    return parsingInfo
}

// Function Declaration using the above function to use the fetched data. Clean the info from its original form. It was messy, so i created a new object.
async function constructingObjectClean () {
    let data = await gettingInfo("https://restcountries.com/v3.1/all")
    data.forEach( (element, index) => {
        countries[index] = { capitalName: element.name.official, capital: element.capital, region: element.region, language: element.languages, population: element.population, flag: element.flags  }
    })
    return countries;
}

//Function Expression to construct the table
const constructingTable = async function() {
    let info = await constructingObjectClean();
    let orderedArray = info.sort( (a,b)=> {
        if(a.capitalName > b.capitalName ){
            return 1;
        }
        if( a.capitalName , b.capitalName ){
            return -1;
        }
        return 0;
    })
    console.log(orderedArray)
    let tablebody = document.querySelector("#table-body");
    for(let counter = 0; counter < orderedArray.length; counter++)
    {
        tableRow = document.createElement("tr");
        tableRow.classList.add('row-country');

        tableHead = document.createElement("th");
        officialName = document.createElement("td");
        capital = document.createElement("td");
        region = document.createElement("td");
        language = document.createElement("td");
        button = document.createElement("button");
        button.innerText = 'Languages';

        button.classList.add("btn-languages")

        population = document.createElement("td");
        imageContainer = document.createElement("td");
        image = document.createElement("img");
        image.style.height = "40px";
        image.style.width = "60px";
        image.setAttribute("src", orderedArray[counter].flag.png)
        imageContainer.appendChild(image)

        

        tableRow.appendChild(tableHead)
        tablebody.appendChild(tableRow);

        officialName.innerText = orderedArray[counter].capitalName;
        if(  orderedArray[counter].capital  ) {
            capital.innerText = orderedArray[counter].capital[0]
        } else {
            capital.innerText = "NO DATA"
        }
        region.innerText = orderedArray[counter].region;
        

        if ( orderedArray[counter].language ) {
            let myLanguages = '';
            let paragraph = document.createElement("p");
            paragraph.style.display = "none"
            for (const key in orderedArray[counter].language) {
                myLanguages += orderedArray[counter].language[key]
                myLanguages += " ";
                
                paragraph.innerText = myLanguages
                language.appendChild(paragraph)
            }
        } else {
            language.innerText = ""
        }

        population.innerText = orderedArray[counter].population

        
        tableRow.appendChild(officialName);
        tableRow.appendChild(capital);
        tableRow.appendChild(region);

        language.appendChild(button);
        
        tableRow.appendChild(language);
        tableRow.appendChild(population);
        tableRow.appendChild(imageContainer);

        tableHead.innerText = counter + 1;
    }    

    
    let options = {
        numberPerPage:10,
        constNumberPerPage:10,
        numberOfPages:0,
        goBar:false,
        pageCounter:true,
        hasPagination:true,
    };
    
    let filterOptions = {
        el:'#searchBox'
    };

    paginate.init('#joselitos-table',options,filterOptions);

    let btnsLanguages = document.querySelectorAll(".btn-languages")
    btnsLanguages.forEach( async function(btn) {
        btn.addEventListener("click", function(event){
            event.stopPropagation();
            let lang = this.parentElement.firstChild.innerText
            bootbox.alert({
                message: lang,
                backdrop: true
            });
            

        })
    } )

    let rows = document.querySelectorAll(".row-country")
    rows.forEach( function(row) {
       

            row.addEventListener("click", async function(event) {
                let country = this.firstElementChild.nextElementSibling.innerText
                let info = await fetch( "https://en.wikipedia.org/api/rest_v1/page/summary/" + country )
                let parsed = await info.json()
                bootbox.alert({
                    message: parsed.extract_html,
                    backdrop: true
                });
            
            })
    } )
}

constructingTable();

