import {QuestionResponse} from './questionResponse.js'

class QuestionTextResponse extends QuestionResponse{

    constructor(data, parent) {
	super(data, parent)
    }

    init() {
	super.init()
    }

    createElement() {
	let div = super.createElement()

	// Text input field
	let divResponse = document.createElement('div')
	divResponse.className = 'question-text-response'

	let response = document.createElement('input')
	response.type = 'text'

	this.response = () => {
	    return response.value
	}

	divResponse.appendChild(response)

	div.appendChild(divResponse)

	this.parent.appendChild(div)
    }

    data () {
	let data = super.data()

	data['response'] = this.response()

	return data
    }

}

export {QuestionTextResponse}
