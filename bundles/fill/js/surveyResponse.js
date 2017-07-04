import {QuestionTextResponse} from './questionTextResponse.js'
import $ from 'jquery'

let csrftoken = getCookie('csrftoken')

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
})

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = $.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


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

    submit() {
	let data = this.get_data()
	console.log(data)
	$.ajax({
	    url: 'http://localhost:8000/survey-fill/' + id,
	    type: 'POST',
	    contentType: 'application/json; charset=utf-8',
	    data: JSON.stringify(data),
	    dataType: 'text',
	    success: function(result) {
		console.log('success')
	    }
	})
    }
	
}

export { SurveyResponse }
