import {Question} from './question.js'

class QuestionText extends Question {

    constructor(parent, data) {
	super(parent, data)
    }

    createElement() {
	let div = super.createElement('Enter a text question...')
    }

    data() {
	let info = super.data()
	info.data['type'] = 'text'

	return info
    }

}

export {QuestionText}
