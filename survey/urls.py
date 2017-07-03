from django.conf.urls import url

from . import views

app_name = 'survey'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^create-survey/$', views.createSurvey, name='create_survey'),
]
