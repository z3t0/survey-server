import {SurveyResponse} from './surveyResponse.js'

$(document).ready(function() {
    // Submit data
    $('#btnSubmitAnswers').on('click', () => {
	console.log("Submit data")
    })

    // Get survey data
    let data = {id: id}
    $.ajax({
	url: url_base + '/survey-data/',
	type: 'GET',
	contentType: 'application/json; charset=utf-8',
	data: data,
	dataType: 'text',
	success: (res) => {
	    gotSurveyData(JSON.parse(res))
	} 
});
})

function gotSurveyData(data) {
    let surveyResponse = new SurveyResponse(data, $('#survey-fill-in-form'))
    surveyResponse.init()

    $("#btnSubmit").on('click', () => {
	surveyResponse.submit()
    })
}
