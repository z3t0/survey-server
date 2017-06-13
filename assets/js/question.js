class Question {

    constructor(parent, attributes) {
	this.parent = parent

	this.attributes = {}
	this.attributes['main'] = {}

    }

    init() {
	this.element = document.createElement('div')

	this.createElement()

	this.parent.appendChild(this.element)
    }

    createElement() {
	let div = this.element

	// Question Text
	let div2 = document.createElement('div')
	let questionText = document.createElement('input')
	questionText.type = 'text'
	questionText.placeholder = 'Enter a text question...'
	div2.appendChild(questionText)

	this.attributes['main']['questionText'] = () => {
	    return questionText.value
	}

	div.appendChild(div2)

	return div
    }

    data() {
	let data = {}

	data['type'] = 'text'

	for (var attr in this.attributes['main']) {

	    let val = this.attributes['main'][attr]()
	    data[attr] = val
	}

	return data
    }
}

export {Question}
