import {Question} from './question.js'

class QuestionText extends Question {

    constructor(parent) {
	super(parent)
    }

    data() {
	let data = super.data()
	data['type'] = 'text'

	return data
    }

}

export {QuestionText}
