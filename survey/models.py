# -*- coding: utf-8 -*-


from django.utils import timezone
from django.db import models
from django.contrib.auth.models import User
from django.core import serializers

from polymorphic.models import PolymorphicModel 


class Category (models.Model):
    name = models.CharField(max_length=30, blank=True, null=True, default='undefined')

    def __str__(self):
        if self.name:
            return self.name


class Survey (models.Model):
    name = models.CharField(max_length=100)
    author = models.ForeignKey(User, null=True)
    description = models.CharField(max_length=300, blank=True)
    date = models.DateField(default=timezone.now)
    category = models.ForeignKey(Category, blank=True, null=True)

    def get_questions(self):
        if self.pk:
            return Question.objects.filter(survey=self.pk).order_by('index')
        else:
            return None

    def __str__(self):
        return self.name

    def get_info(self):
        if self.pk:
            data = {}
            data['name'] = self.name
            data['description'] = self.description
            data['questions'] = []

            for question in self.get_questions():
                question_data = question.get_data()
                data['questions'].append(question_data)


            return data


class Question (PolymorphicModel):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=300, blank=True)
    survey = models.ForeignKey(Survey, null=True, blank=True)
    required = models.BooleanField(default=False)
    index = models.IntegerField(null=False)

    def get_data(self):
        data = {}
        data['name'] = self.name
        data['description'] = self.description
        data['index'] = self.index
        data['required'] = self.required
        data['id'] = self.id

        return data
        

    def __str__(self):
        return self.name

class QuestionText(Question):
    type = models.CharField(max_length=30, default="text")

    def get_data(self):
        data = Question.get_data(self)
        data['type'] = self.type

        return data

class QuestionDropDown(models.Model):
    type = models.CharField(max_length=30, default="dropdown")

class QuestionDropDownChoice(models.Model):
    name = models.CharField(max_length=30)
    question = models.ForeignKey(QuestionDropDown, null=True)

# Responses
class SurveyResponse(models.Model):
    author = models.ForeignKey(User, null=False)
    survey = models.ForeignKey(Survey, null=False)
    date = models.DateField(default=timezone.now)

class QuestionResponse(PolymorphicModel):
    question = models.ForeignKey(Question)

class QuestionResponseText(QuestionResponse):
    type = models.CharField(max_length=30, default="text")
    response = models.TextField()

