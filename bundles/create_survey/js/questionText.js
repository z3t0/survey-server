import {Question} from './question.js'

class QuestionText extends Question {

    constructor(survey, parent, data) {
	super(survey, parent, data)
    }

    createElement() {
	let div = super.createElement('Enter a text question...')
    }

    data() {
	let data= super.data()
	data['type'] = 'text'

	return data
    }

}

export {QuestionText}
