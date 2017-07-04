import {Question} from './question.js'

class QuestionDropDown extends Question {

    constructor(parent) {
	super(parent)

	this.attributes["choices"] = []
    }

    createElement() {
	let div = super.createElement('Enter a drop down question...')

	// choices
	let div3 = document.createElement("div")
	let addChoice = document.createElement("button")
	addChoice.innerHTML = "Add Choice"

	let divChoices = document.createElement("div")
	divChoices.className=""

	addChoice.addEventListener("click", () => {
	    let div4 = document.createElement("div")
	    let choiceText = document.createElement("input")
	    choiceText.type = "text"
	    choiceText.placeholder = "Enter a choice..."
	    div4.appendChild(choiceText)
	    divChoices.appendChild(div4)

	    this.attributes["choices"].push(() => {
		return choiceText.value
	    })
	})

	div3.appendChild(addChoice)

	div.appendChild(divChoices)
	div.appendChild(div3)
    }

    data() {
	let data = super.data()

	data["type"] = "dropdown"

	data.choices = []
	
	this.attributes["choices"].forEach((current, index, arr) => {
	    data.choices.push(current())
	})

	return data
    }


}

export {QuestionDropDown}
