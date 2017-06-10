# -*- coding: utf-8 -*-


from django.utils import timezone
from django.db import models
from django.contrib.auth.models import User


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
            return Question.objects.filter(survey=self.pk)
        else:
            return None

    def __str__(self):
        return self.name


class Question (models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=300, blank=True)
    survey = models.ForeignKey(Survey, null=True, blank=True)
    required = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class QuestionText(Question):
    type = models.CharField(max_length=30, default='text')


class QuestionCheckBox(Question):
    type = models.CharField(max_length=30, default='checkbox')


class QuestionDropDown(Question):
    type = models.CharField(max_length=30, default='dropdown')


class QuestionMultipleOption(models.Model):
    name = models.CharField(max_length=30)
    question = models.ForeignKey(Question, null=True)