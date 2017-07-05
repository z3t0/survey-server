from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponseRedirect, HttpResponse
from django.urls import reverse
import json
from django.contrib.auth import logout
from .models import Question, QuestionText, QuestionDropDown, Survey, SurveyResponse, QuestionResponse, QuestionResponseText
from datetime import datetime

@login_required
def createSurvey(request, survey_id=None):
    context = {}

    if survey_id != None:
        # Edit survey
        context['mode'] = 'edit'
        context['id'] = survey_id

    else:
        # create survey
        context['mode'] = 'create'

    if request.method == "POST":
        data = json.loads(request.body)
        errors = {}
        errors['questions'] = []
        errors['survey'] = []

        # Create Survey
        date = datetime.fromtimestamp(data['date'] / 1000.0)
        print(date)
        survey = Survey(name=data["title"], description=data["description"], author=request.user, date=date)

        # Validate first
        surveyErrors = survey.validate()
        if len(surveyErrors) > 0:
            for error in surveyErrors:
                errors['survey'].append(error)

        if len(data['questions']) == 0:
            errors['survey'].append("Please create some questions")

        questionError = False
        # Validate questions
        for question in data['questions']:
            """ Text Question """
            if question['type'] == 'text':
                print(question)
                try:
                    q = QuestionText(name=question["questionText"], index=question["order"])
                    question_errors = q.validate()

                    if len(question_errors) > 0:
                        for error in question_errors:
                            errors['questions'].append({'error': error, 'order': question['order']})

                        if not questionError:
                            questionError = True
                            errors['survey'].append('Please check your questions')
                        
                except:
                    print("an error occured while creating a text question")

            elif question['type'] == 'dropdown':
                print(question)
            else:
                print("Unsupported Question type: " + question["type"])

        if len(errors['questions']) > 0 or len(errors['survey']) > 0:
            # If there are errors, send them back
            response = {'status': 0, 'errors': errors}
            return HttpResponse(json.dumps(response), content_type='application/json')
            
        else:
            # Otherwise, save the data and redirect
            survey.save()
            # Save the data this time
            for question in data['questions']:
                """ Text Question """
                if question['type'] == 'text':
                    print(question)
                    try:
                        q = QuestionText(name=question["questionText"], index=question["order"], survey=survey)
                        q.save()
                    except:
                        print("an error occured while creating a text question")

                elif question['type'] == 'dropdown':
                    print(question)
                else:
                    print("Unsupported Question type: " + question["type"])

            response = {'status': 1, 'url': reverse('survey:index')}
            return HttpResponse(json.dumps(response), content_type='application/json')

    return render(request, 'survey/create_survey.html', context)

@login_required
def index(request):

    surveys = Survey.objects.all().order_by('-date')
    context = {'surveys': surveys}

    print('index')

    return render(request, 'survey/index.html', context)

@login_required
def editSurvey(request, survey_id):
    survey = Survey.objects.get(pk=survey_id)
    context = {'survey' : survey}

    return render(request, 'survey/edit.html', context)

@login_required
def fillSurvey(request, survey_id):
    if request.method == "POST":
        data = json.loads(request.body)

        print(data)


        survey = Survey.objects.get(pk=survey_id)
        surveyResponse = SurveyResponse(survey=survey, author=request.user)
        surveyResponse.save()

        # Validate data
        for response in data['questions']:
            if response['type'] == 'text':
                q = Question.objects.get(pk = response['id'])
                res = QuestionResponseText(question = q, response = response['response'], parent = surveyResponse) 
                res.save()

                print(response)
            else:
                print("Unsupported question type" + response["type"])

        response = {'status': 1, 'message': "Ok", 'url': reverse('survey:survey_results', kwargs={'survey_id': survey_id})}
        print(response['url'])
        return HttpResponse(json.dumps(response), content_type='application/json')
        

        # Save data using user

    survey = Survey.objects.get(pk=survey_id)
    context = {'survey' : survey}

    return render(request, 'survey/fill.html', context)


def resultsSurvey(request, survey_id):
    survey = Survey.objects.get(pk=survey_id)
    surveyResponses = SurveyResponse.objects.filter(survey_id=survey_id)

    responses = []
    for response in surveyResponses:
        res = {}
        res['surveyResponse'] = response

        questionResponses = QuestionResponse.objects.filter(parent_id=response)

        res['questionResponses'] = []
        for question in questionResponses:
            res['questionResponses'].append(question)

        responses.append(res)
        

    context = {'responses': responses, 'survey': survey}

    return render(request, 'survey/results.html', context)

def dataSurvey(request):
    if request.method == "GET":
        id = request.GET.get('id', None)
        data = Survey.objects.get(pk=id).get_info()

        return JsonResponse(data)

def deleteSurvey(request):
    if request.method == "POST":
        id = json.loads(request.body)['id']

        try:
            survey = Survey.objects.get(pk=id)

            # Only the author can delete a survey, or a superuser
            if (survey.author == request.user or survey.autho.super_user):
                survey.delete()
                response = {'status': 1, 'message': "Ok", 'url': reverse('survey:index')}
                return HttpResponse(json.dumps(response), content_type='application/json')
            else:
                response = {'status': 0, 'message': "Ok"}
                return HttpResponse(json.dumps(response), content_type='application/json')

        except:
            print("Failed to delete survey with id=" + id)


def logout_view(request):
    logout(request)

    return HttpResponseRedirect(reverse('survey:index'))
