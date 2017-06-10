from django.shortcuts import render


def createSurvey(request):
    return render(request, 'survey/create_survey.html')
