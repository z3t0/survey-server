
class Question {

    constructor(survey, parent, opts) {
	this.survey = survey
	this.parent = parent

	this.attributes = {}
	this.attributes['main'] = {}

	if (opts) {
	    if (opts.data) {
		this.attributes['main']['questionText'] = opts.data.name
		this.order = opts.data.index
	    }
	}


    } 
    init(order) {
	if (order && !this.order) 
	    this.order = order

	this.element = document.createElement('div')

	this.createElement()

	this.parent.appendChild(this.element)
    }

    createElement(help) {
	let self = this
	let div = this.element

	let divName = document.createElement('div')
	divName.className = "row"

	// Question Numbers
	let divNumber = document.createElement('div')
	divNumber.className = 'column-2'
	let number = document.createElement('p')
	number.textContent = this.order
	this.setOrder = (order) => {
	    this.order = order
	    number.textContent = order
	}

	divNumber.appendChild(number)
	
	// Question Text
	let divText = document.createElement('div')
	divText.className = 'column'
	let questionText = document.createElement('input')
	questionText.type = 'text'
	questionText.placeholder = help

	if (this.attributes['main']['questionText'])
	    questionText.value = this.attributes['main']['questionText']

	divText.appendChild(questionText)

	this.attributes['main']['questionText'] = () => {
	    return questionText.value
	}

	// Error Text
	let divError = document.createElement('div')
	divError.hidden = true
	let errorText = document.createElement('p')
	errorText.className = "errors"

	this.errorText = (err) => {
	    if (err) {
		errorText.textContent = err
		divError.hidden = false
	    }

	    else {
		divError.hidden = true
		errorText.textContent = ""
	    }
	}
	divError.appendChild(errorText)

	// Question Controls
	let divControls = document.createElement('div')
	divControls.className = "row question-controls"

	// Up Button
	let divButtonUp = document.createElement('div')
	divButtonUp.className = "column control-down"
	let buttonUp = document.createElement('a')
	buttonUp.className = 'button button-outline'
	buttonUp.textContent = 'Up'
	$(buttonUp).click(() => {
	    this.moveUp()
	})

	divButtonUp.appendChild(buttonUp)
	divControls.appendChild(divButtonUp)

	// Down Button
	let divButtonDown = document.createElement('div')
	divButtonDown.className = "column control-down"
	let buttonDown = document.createElement('a')
	buttonDown.className = 'button button-outline'
	buttonDown.textContent = 'Down'
	$(buttonDown).click(() => {
	    this.moveDown()
	})

	divButtonDown.appendChild(buttonDown)
	divControls.appendChild(divButtonDown)


	divName.appendChild(divNumber)
	divName.appendChild(divText)

	div.appendChild(divError)
	div.appendChild(divName)
	div.appendChild(divControls)

	return div
    }

    moveUp() {
	// Move the element up one question 
	let order = this.survey.moveUp(this)
    }

    moveDown() {
	let order = this.survey.moveDown(this)
    }

    data() {
	let data = {}

	data['type'] = 'text'
	data['order'] = this.order

	for (var attr in this.attributes['main']) {

	    let val = this.attributes['main'][attr]()
	    data[attr] = val
	}

	return data
    }
}

export {Question}
