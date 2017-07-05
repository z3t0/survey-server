class Question {

    constructor(parent, opts) {
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
	let div = this.element

	let divName = document.createElement('div')
	divName.className = "row"

	// Question Numbers
	let divNumber = document.createElement('div')
	divNumber.className = 'column-2'
	let number = document.createElement('p')
	number.textContent = this.order

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
	

	divName.appendChild(divNumber)
	divName.appendChild(divText)

	div.append(divError)
	div.appendChild(divName)

	return div
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
