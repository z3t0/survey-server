import $ from "jquery";
import {SurveyResponse} from './surveyResponse.js'

$(document).ready(function() {
    // Submit data
    $('#btnSubmitAnswers').on('click', () => {
	console.log("Submit data")
    })

    // Get survey data
    let data = {id: id}
    $.ajax({
	url: 'http://localhost:8000/survey-data/',
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
    console.log(data)

}
