from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponseRedirect, HttpResponse
from django.urls import reverse
import json
from django.contrib.auth import logout
from .models import Question, QuestionText, QuestionDropDown, Survey, SurveyResponse, QuestionResponse, QuestionResponseText


@login_required
def createSurvey(request):
    if request.method == "POST":
        data = json.loads(request.body)

        # Survey data
        survey = Survey(name= data["title"], description=data["description"], author=request.user)
        survey.save()

        # Question data
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

        response = {'status': 1, 'message': "Ok", 'url': reverse('survey:index')}
        return HttpResponse(json.dumps(response), content_type='application/json')

    return render(request, 'survey/create_survey.html')

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

        # Save data using user

    survey = Survey.objects.get(pk=survey_id)
    context = {'survey' : survey}

    return render(request, 'survey/fill.html', context)


def resultsSurvey(request, survey_id):
    survey = Survey.objects.get(pk=survey_id)
    context = {'survey' : survey}

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
            Survey.objects.get(pk=id).delete()
            response = {'status': 1, 'message': "Ok", 'url': reverse('survey:index')}
            return HttpResponse(json.dumps(response), content_type='application/json')

        except:
            print("Failed to delete survey with id=" + id)


def logout_view(request):
    logout(request)

    return HttpResponseRedirect(reverse('survey:index'))
