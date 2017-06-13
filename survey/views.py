from django.shortcuts import render
import json


def createSurvey(request):

    if request.method == "POST":
        data = json.loads(request.body)

    return render(request, 'survey/create_survey.html')
