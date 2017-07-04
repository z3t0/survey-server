import {QuestionTextResponse} from './questionTextResponse.js'
import $ from 'jquery'

class SurveyResponse {
    constructor(data, parent) {
	this.data = data
	this.parent = parent
	this.questions = []
    }

    init() {
	this.createElement(this.parent)

    }

    createElement(parent) {
	let div = document.createElement('div')
	div.className = 'question'

	// Survey Title
	let divTitle = document.createElement('div')
	let surveyTitle = document.createElement('p')
	surveyTitle.textContent = this.data.name
	surveyTitle.id = "survey-title"

	this.name = () => {
	    return surveyTitle.textContent
	}

	div.appendChild(surveyTitle)

	// Survey description
	let divDescription = document.createElement('div')
	let surveyDescription = document.createElement('p')
	surveyDescription.textContent = this.data.description
	surveyDescription.id = 'survey-description'

	this.description = () => {
	    return surveyDescription.textContent
	}

	divDescription.appendChild(surveyDescription)

	div.appendChild(divTitle)
	div.appendChild(divDescription)

	// Questions
	let divQuestions = document.createElement('div')

	this.data.questions.forEach((question) => {

	    if (question.type == 'text') {
		let q = new QuestionTextResponse(question, divQuestions)
		q.init()
		this.questions.push(q)
	    }

	    else {
		console.log('unsupported question type: ' + question.type)
	    }
	    
	})

	div.appendChild(divQuestions)

	parent.append(div)
    }

    get_data() {
	let data = {}
	data.name = this.name()
	data.description = this.description()
	data.questions = []

	this.questions.forEach((question) => {
	    data.questions.push(question.data())
	})

	return data
    }
}

export { SurveyResponse }
