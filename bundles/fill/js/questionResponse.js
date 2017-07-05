class QuestionResponse {

    constructor(data, parent) {
	this.name = data.name
	this.id = data.id
	this.index = data.index
	this.type = data.type
	this.parent = parent
    }

    init() {
	this.createElement(this.parent)
    }

    createElement(parent) {
	let div = document.createElement('div')

	let divName = document.createElement('div')
	divName.className = 'question-name'

	let questionName = document.createElement('h4')
	questionName.textContent = this.name

	divName.appendChild(questionName)

	div.appendChild(divName)

	return div
    }

    data () {

	let data = {}

	data.name = this.name
	data.index = this.index
	data.type = this.type
	data.id = this.id

	return data
    }

}

export {QuestionResponse}
