class QuestionDropDown {

    constructor(parent) {
	this.parent = parent
	
	this.attributes = {}
	this.attributes["choices"] = []
	this.element = document.createElement("div")

	this.createElement()
	this.parent.appendChild(this.element)
    }

    createElement() {
	let div = this.element

	// Question Text
	let div2 = document.createElement("div")
	let questionText = document.createElement("input")
	questionText.type = "text"
	questionText.placeholder = "Enter a text question..."
	div2.appendChild(questionText)

	this.attributes["questionText"] = () => {
	    return questionText.value
	}

	let div3 = document.createElement("div")
	let addChoice = document.createElement("button")
	addChoice.innerHTML = "Add Choice"

	let divChoices = document.createElement("div")

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

	div.appendChild(div2)
	div.appendChild(div3)
	div.appendChild(divChoices)
    }

    data() {
	let data = {}

	data["type"] = "dropdown"

	for (var attr in this.attributes) {
	    if (attr == "choices")
		continue

	    let val = this.attributes[attr]()
	    data[attr] = val
	}

	data.choices = []
	
	this.attributes["choices"].forEach((current, index, arr) => {
	    data.choices.push(current())
	})

	return data
    }


}

export {QuestionDropDown}
