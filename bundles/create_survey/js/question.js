class Question {

    constructor(parent, attributes) {
	this.parent = parent

	this.attributes = {}
	this.attributes['main'] = {}

    }

    init(order) {
	this.order = order
	this.element = document.createElement('div')

	this.createElement()

	this.parent.appendChild(this.element)
    }

    createElement(help) {
	let div = this.element

	// Question Text
	let div2 = document.createElement('div')
	let questionText = document.createElement('input')
	questionText.type = 'text'
	questionText.placeholder = help
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
	data['order'] = this.order

	for (var attr in this.attributes['main']) {

	    let val = this.attributes['main'][attr]()
	    data[attr] = val
	}

	return data
    }
}

export {Question}
