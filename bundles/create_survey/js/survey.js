import {QuestionText} from './questionText.js'
import {QuestionDropDown} from './questionDropDown.js'
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

class Survey {

    constructor(id) {
	this.questions = []
	this.questionsElement = document.getElementById("questions")
	this.questionNumber = 0

	if (id) {
	    this.id = id

	    $.ajax({
		url: 'http://localhost:8000/survey-data/',
		type: 'GET',
		contentType: 'application/json; charset=utf-8',
		data: {id: id},
		dataType: 'text',
		success: (res) => {
		    let data = JSON.parse(res)

		    console.log(data)

		    $("#surveyTitle").val(data.name)
		    $("#surveyTitle").focus()
		    $("#surveyDescription").val(data.description)
		    $("#surveyDescription").focus()

		    data.questions.forEach((question) => {
			if (question.type == 'text') {
			    let opts = {data: question}
			    this.createQuestionText(opts)
			}
		    })
		} 
	    })

	}


	this.createElement()

    }

    createElement() {
	this.title = () => {
	    return $("#surveyTitle").val()
	}

	this.description = () => {
	    return $("#surveyDescription").val()
	}
    }

    createQuestionDropDown() {
	let question = new QuestionDropDown(this, this.questionsElement)
	question.init(++this.questionNumber)
	this.questions.push(question)
    }

    createQuestionText(opts) {

	let question = new QuestionText(this, this.questionsElement, opts)

	question.init(++this.questionNumber)
	this.questions.push(question)
    }

    moveUp(question) {
	// TOOD: bounds check
	
	let above = this.getQuestionByIndex(question.order - 1)

	if (above) {
	    let order = above.order
	    above.setOrder(question.order)
	    question.setOrder(order)
	    $(question.element).insertBefore($(above.element))
	}

	else {
	    console.error("faield to reorder question")
	}
    }

    moveDown(question) {
	let below = this.getQuestionByIndex(question.order + 1)
	console.log(question.order)


	if (below) {
	    let order = below.order
	    below.setOrder(question.order)
	    question.setOrder(order)
	    $(question.element).insertAfter($(below.element))
	}

	else {
	    console.error("faield to reorder question")
	}
    }

    data() {
	let data = {}

	data.questions = []
	data.title = this.title()
	data.description = this.description()
	data.id = this.id
	data.errors = []

	this.questions.forEach((current, index, array) => {
	    data.questions.push(current.data())
	})

	return data
    }

    error (err) {
	let div = $("#error-main")
	div.children().remove()

	if (err) {
	    if (err.questions) {
		let questionError = false

		err.questions.forEach((error) => {
		    let question = this.getQuestionByIndex(error.order)
		    question.errorText(error.error)
		})

	    }

	    if (err.survey) {
		err.survey.forEach((error) => {
		    let msg = document.createElement('p')
		    msg.textContent = error
		    msg.className = 'errors'
		    div.append(msg)
		})
	    }

	    div.show()
	}

	else {
	    div.hide() 
	}
    }

    getQuestionByIndex(index) {
	let question = this.questions.find((q) => {
	    return q.order == index
	})
	
	return question
    }

    submit() {
	let data = this.data()
	let cb = this.error.bind(this)

	$.ajax({
	    url: 'http://localhost:8000/survey-create/',
	    type: 'POST',
	    contentType: 'application/json; charset=utf-8',
	    data: JSON.stringify(data),
	    dataType: 'text',
	    success: function(result) {
		
		try {
		    result = JSON.parse(result)
		    if (result.errors) {
			cb(result.errors)
			return
		    }

		    else {
			window.location = result.url
		    }
			
		}

		catch (e) {
		    console.error('failed to submit survey data')
		    console.error(e)
		}
	    }
	});
    }
}

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


export {Survey}
