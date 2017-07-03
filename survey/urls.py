from django.conf.urls import url

from . import views

app_name = 'survey'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^create-survey/$', views.createSurvey, name='create_survey'),
    url(r'^(?P<survey_id>[0-9]+)/survey-edit/$', views.editSurvey, name='survey_edit'),
    url(r'^(?P<survey_id>[0-9]+)/survey-fill/$', views.editSurvey, name='survey_fill'),
    url(r'^(?P<survey_id>[0-9]+)/survey-results/$', views.editSurvey, name='survey_results'),
]
